# Correções — 30/09/2026

## Implementado

- Atualização do Next.js para 16.3.8, Swiper para 14.3.0 e dependências compatíveis do lockfile; remoção de react-pdf e tsparticles completo, sem uso direto.
- API de contato real via Resend, validação no servidor, limite de 16 KiB, timeout, honeypot, verificação de origem e limite de tentativas por instância.
- Sucesso somente após confirmação de aceitação pelo provedor. Sem configuração, retorna 503 e orienta a usar email/WhatsApp. Dados pessoais não são registrados em logs.
- Formulário com limites de campos, autocomplete, anúncio de estado e erro, preservação de dados em falhas e retirada do temporizador que escondia mensagens.
- Tema dark e gradiente radial definidos no CSS ativo do Tailwind 4, cores padronizadas e fontes efetivamente utilizadas.
- Diálogos nativos com Escape, foco inicial/restaurado, isolamento do fundo, bloqueio da rolagem e altura com rolagem interna. PDF e vídeo têm links alternativos.
- Cards e galeria operáveis por teclado; nomes acessíveis para controles, menu mobile e WhatsApp. Carrossel manual com controles traduzidos e módulo de acessibilidade.
- Imagens responsivas usando next/image, carregamento de vídeos apenas na interação, partículas dinâmicas com menor carga e suporte a movimento reduzido.
- Correção de aviso de hidratação encontrado no navegador ao carregar os efeitos dinâmicos.
- Página, fundo estático e rodapé como componentes de servidor; MotionConfig para respeitar movimento reduzido.
- Remoção da foto genérica externa que poderia substituir incorretamente o fundador e correção dos erros/avisos de lint.
- Open Graph, canonical, sitemap, robots e cabeçalhos nosniff, Referrer-Policy e X-Frame-Options.
- Sete testes da API, workflow de CI, modelo de ambiente e documentação de execução/implantação.
- O Next.js atualizado gerou AGENTS.md e CLAUDE.md automaticamente durante o desenvolvimento; esses arquivos registram as orientações da versão instalada.

## Validação

- Testes da API com provedor simulado: validação, origem, tamanho, ausência de credenciais, sucesso confirmado, falhas externas e limite de tentativas.
- Build com TypeScript e lint verificados após as alterações.
- Auditoria npm sem vulnerabilidades conhecidas na consulta final; isso não garante ausência de qualquer vulnerabilidade.
- Navegador: abertura por teclado, foco inicial, fechamento por Escape e restauração do foco ao card.
- Mobile em 390 × 844: modal com altura interna de 758 px e conteúdo de 955 px, overflow auto e rolagem disponível; vídeo renderizado e link de PDF disponível.
- Galeria: passagem circular da primeira foto para a oitava.
- Formulário: configuração ausente exibe indisponibilidade e preserva o nome preenchido.

## Ainda depende de configuração ou conteúdo

1. Configurar RESEND_API_KEY, CONTACT_FROM_EMAIL e CONTACT_TO_EMAIL no servidor com domínio remetente verificado. Não houve envio real nem criação de conta externa. Aceitação do provedor não comprova chegada à caixa postal.
2. Validar os números institucionais, CREA e textos de conformidade com a empresa. As afirmações originais foram preservadas, salvo retirada do selo genérico no modal.
3. Fornecer descrições técnicas, miniaturas individuais, datas/localizações das visitas. Foram usados rótulos neutros sem inventar dados.
4. Medir Lighthouse/Core Web Vitals e transcodificar vídeos se necessário. Originais preservados; otimizações de carregamento não diminuem o tamanho físico dos vídeos.
5. Em múltiplas instâncias, substituir o limitador em memória por proteção compartilhada no gateway ou armazenamento adequado; confiar em x-forwarded-for somente em proxy que o sobrescreve.
6. Publicação ainda não executada. SEO usa o domínio informado no README original; alterar se necessário.

Não foram feitas validação de credenciais profissionais, auditoria completa de conformidade/legal, teste de leitor de tela ou medição Lighthouse. A checagem visual foi pontual, não uma suíte end-to-end de todos os 17 projetos.
