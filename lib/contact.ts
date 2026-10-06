type ContactOptions = {
  env?: Record<string, string | undefined>;
  fetcher?: typeof fetch;
  now?: () => number;
};

const MAX_BYTES = 16_384;
const reply = (status: number, error: string) => Response.json({ error }, { status });

export function createContactHandler(options: ContactOptions = {}) {
  const env = options.env ?? process.env;
  const fetcher = options.fetcher ?? fetch;
  const now = options.now ?? Date.now;
  const attempts = new Map<string, { count: number; expires: number }>();

  return async function POST(request: Request): Promise<Response> {
    const origin = request.headers.get('origin');
    if (origin && origin !== new URL(request.url).origin) return reply(403, 'Origem não permitida.');
    if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') {
      return reply(415, 'Envie os dados em formato JSON.');
    }
    if (Number(request.headers.get('content-length')) > MAX_BYTES) return reply(413, 'Mensagem muito grande.');

    // Trust this header only if the hosting proxy overwrites it.
    const key = env.CONTACT_TRUST_PROXY === 'true'
      ? (request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'global') : 'global';
    const timestamp = now();
    for (const [id, entry] of attempts) if (entry.expires <= timestamp) attempts.delete(id);
    const limit = key === 'global' ? 30 : 5;
    const entry = attempts.get(key) ?? { count: 0, expires: timestamp + 60_000 };
    if (entry.count >= limit || (!attempts.has(key) && attempts.size >= 10_000)) {
      return Response.json({ error: 'Muitas tentativas. Aguarde um minuto.' }, {
        status: 429, headers: { 'Retry-After': '60' },
      });
    }
    entry.count += 1;
    attempts.set(key, entry);
    let body: unknown;
    try {
      const reader = request.body?.getReader();
      if (!reader) return reply(400, 'Preencha os campos do formulário.');
      const chunks: Uint8Array[] = [];
      let size = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > MAX_BYTES) { await reader.cancel(); return reply(413, 'Mensagem muito grande.'); }
        chunks.push(value);
      }
      const bytes = new Uint8Array(size);
      let offset = 0;
      for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
      body = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
    } catch { return reply(400, 'Dados inválidos. Revise o formulário.'); }
    if (!body || typeof body !== 'object' || Array.isArray(body)) return reply(400, 'Preencha os campos do formulário.');
    const data = body as Record<string, unknown>;
    if (data.website) return reply(400, 'Não foi possível enviar esta solicitação.');
    if (['name', 'email', 'phone', 'message'].some((field) => typeof data[field] !== 'string')) {
      return reply(400, 'Preencha todos os campos corretamente.');
    }
    const name = (data.name as string).trim();
    const email = (data.email as string).trim();
    const phone = (data.phone as string).trim();
    const message = (data.message as string).trim();
    if (name.length < 2 || name.length > 120 || /[\r\n]/.test(name) ||
        email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
        phone.length > 30 || !/^[+\d\s().-]+$/.test(phone) ||
        phone.replace(/\D/g, '').length < 8 || phone.replace(/\D/g, '').length > 15 ||
        message.length < 10 || message.length > 5000) {
      return reply(400, 'Revise nome, email, telefone e mensagem (10 a 5.000 caracteres).');
    }
    if (!env.RESEND_API_KEY || !env.CONTACT_FROM_EMAIL || !env.CONTACT_TO_EMAIL) {
      return reply(503, 'O formulário está temporariamente indisponível. Fale conosco pelo WhatsApp ou email.');
    }
    try {
      const response = await fetcher('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: env.CONTACT_FROM_EMAIL, to: [env.CONTACT_TO_EMAIL], reply_to: email,
          subject: 'Novo contato — Eletric Serviços Engenharia',
          text: `Nome: ${name}\nEmail: ${email}\nTelefone: ${phone}\n\n${message}`,
        }),
        signal: AbortSignal.timeout(10_000),
      });
      if (!response.ok) return reply(502, 'Não foi possível enviar. Tente novamente ou use o WhatsApp.');
      const result = await response.json() as { id?: string };
      if (!result.id) return reply(502, 'O envio não foi confirmado. Entre em contato pelo WhatsApp.');
      return Response.json({ message: 'Mensagem aceita para envio. Entraremos em contato em breve.' });
    } catch { return reply(502, 'Falha ao enviar. Tente novamente ou fale conosco pelo WhatsApp.'); }
  };
}
