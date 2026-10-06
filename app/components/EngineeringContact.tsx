'use client';

import { useState, type FormEvent } from 'react';
import { ArrowUpRight, Check, Mail, MapPin, MessageCircle, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EngineeringContact({ emailEnabled }: { emailEnabled: boolean }) {
  const [method, setMethod] = useState<'whatsapp' | 'email'>('whatsapp');
  const [data, setData] = useState({ name: '', email: '', phone: '', message: '', website: '' });
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState(false);
  const [prepared, setPrepared] = useState('');
  const change = (field: keyof typeof data, value: string) => { setData(previous=>({...previous,[field]:value})); setPrepared(''); setFeedback(''); };
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending || data.website) return;
    setFeedback(''); setError(false);
    const name = data.name.trim();
    const message = data.message.trim();
    const digits = data.phone.replace(/\D/g,'');
    if (name.length < 2 || message.length < 10 || digits.length < 8 || digits.length > 15) {
      setError(true); setFeedback('Revise o nome, telefone e a mensagem (mínimo de 10 caracteres).'); return;
    }
    if (method === 'whatsapp') {
      const text = `Olá, Eletric! Gostaria de conversar sobre um projeto.\n\nNome: ${name}\nEmail: ${data.email.trim()}\nTelefone: ${data.phone.trim()}\n\n${message}`;
      setPrepared(`https://wa.me/5593992200097?text=${encodeURIComponent(text)}`);
      setFeedback('Pedido preparado. Abra o WhatsApp abaixo para revisar e enviar sua mensagem.');
      return;
    }
    setSending(true);
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data), signal: AbortSignal.timeout(15_000) });
      const result = await response.json().catch(()=>null);
      if (!response.ok) { setError(true); setFeedback(result?.error || 'Não foi possível enviar. Use a opção WhatsApp ou tente novamente.'); }
      else { setFeedback('Pedido aceito para envio por email. Entraremos em contato em breve.'); setData({name:'',email:'',phone:'',message:'',website:''}); }
    } catch { setError(true); setFeedback('Falha de conexão. Seus dados foram mantidos. Tente novamente ou selecione WhatsApp.'); }
    finally { setSending(false); }
  }
  return <section id="contato" className="contact-section section-space"><div className="site-container contact-layout">
    <motion.div initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="contact-copy"><span className="eyebrow">06 / VAMOS CONECTAR?</span><h2>Seu próximo<br />projeto começa<br /><span>aqui. ↗</span></h2><p>Conte sua ideia. Nós ajudamos a encontrar<br />o caminho para energizá-la.</p><div className="contact-channels"><a href="https://wa.me/5593992200097" target="_blank" rel="noopener noreferrer"><MessageCircle size={22}/><span><small>WHATSAPP</small><strong>+55 93 9220-0097</strong></span><ArrowUpRight size={19}/></a><a href="mailto:eletricservicosengenharia1946@gmail.com"><Mail size={22}/><span><small>EMAIL</small><strong>eletricservicosengenharia1946@gmail.com</strong></span><ArrowUpRight size={19}/></a><div><MapPin size={22}/><span><small>ONDE ATENDEMOS</small><strong>Projetos em todo o Brasil</strong></span></div></div></motion.div>
    <form className="engineering-form" onSubmit={submit} aria-busy={sending}><div className="form-heading"><span className="small-label">UMA BOA CONVERSA MUDA TUDO</span><h3>Vamos falar do seu projeto.</h3></div>
      <fieldset className="contact-method" disabled={sending}><legend>Como você prefere enviar?</legend><label><input type="radio" name="method" value="whatsapp" checked={method==='whatsapp'} onChange={()=>{setMethod('whatsapp');setFeedback('');}}/><MessageCircle size={16}/>WhatsApp</label>{emailEnabled&&<label><input type="radio" name="method" value="email" checked={method==='email'} onChange={()=>{setMethod('email');setPrepared('');setFeedback('');}}/><Mail size={16}/>Email</label>}</fieldset>
      <div className="honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" value={data.website} onChange={e=>change('website',e.target.value)} tabIndex={-1} autoComplete="off" /></div>
      <div className="form-field"><label htmlFor="contact-name">Seu nome <span>*</span></label><input id="contact-name" name="name" autoComplete="name" minLength={2} maxLength={120} required value={data.name} onChange={e=>change('name',e.target.value)} placeholder="Como podemos te chamar?" /></div>
      <div className="form-row"><div className="form-field"><label htmlFor="contact-email">Email <span>*</span></label><input id="contact-email" name="email" type="email" autoComplete="email" maxLength={254} required value={data.email} onChange={e=>change('email',e.target.value)} placeholder="voce@exemplo.com" /></div><div className="form-field"><label htmlFor="contact-phone">Telefone <span>*</span></label><input id="contact-phone" name="phone" type="tel" autoComplete="tel" maxLength={30} required value={data.phone} onChange={e=>change('phone',e.target.value)} placeholder="(93) 99999-9999" /></div></div>
      <div className="form-field"><label htmlFor="contact-message">O que você tem em mente? <span>*</span></label><textarea id="contact-message" name="message" rows={4} minLength={10} maxLength={5000} required value={data.message} onChange={e=>change('message',e.target.value)} placeholder="Tipo de projeto, localização e o que você precisa..." /></div>
      <p className="form-privacy"><ShieldNote /> Seus dados serão usados para responder ao seu pedido.</p>
      <button type="submit" className="button button-lime form-submit" disabled={sending}>{sending?'Enviando…':method==='whatsapp'?'Preparar pedido no WhatsApp':'Enviar pedido por email'}{method==='whatsapp'?<ArrowUpRight size={19}/>:<Send size={18}/>}</button>
      <p className="form-note">{method==='whatsapp'?'Você revisa e envia a mensagem no WhatsApp.':'Você receberá a confirmação de aceitação do pedido aqui.'}</p>
      {feedback&&<div role={error?'alert':'status'} className={`form-feedback ${error?'feedback-error':''}`}><p>{feedback}</p>{prepared&&<a className="button button-lime" href={prepared} target="_blank" rel="noopener noreferrer">Abrir WhatsApp e enviar <ArrowUpRight size={18}/></a>}</div>}
    </form>
  </div></section>;
}

function ShieldNote() { return <Check size={13} aria-hidden="true"/>; }
