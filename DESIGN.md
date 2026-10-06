# Reformulação — 6 de outubro de 2026

Interface reconstruída com identidade de engenharia elétrica: grafite, verde elétrico, tipografia ampla, fotos reais, circuitos SVG animados, transições e prévias dos projetos na interação. Layout adaptado para celular, com menu próprio e respeito à preferência de movimento reduzido.

## Funcionalidades

- Portfólio preserva 17 vídeos e 17 plantas; miniaturas extraídas dos próprios vídeos. Filtros: instalações (11), solar (2), SPDA (3), subestações (1).
- Modal com vídeo controlável, planta em PDF, link direto ao arquivo e abas operáveis por teclado. Escape fecha e restaura o foco.
- Galeria de oito registros com navegação circular; perguntas frequentes expansíveis; links de contato e retorno ao topo.
- Formulário valida e prepara pedido por WhatsApp, sem simular envio. O visitante revisa e envia no aplicativo. Email automático depende de RESEND_API_KEY, CONTACT_FROM_EMAIL e CONTACT_TO_EMAIL; essa opção só aparece com configuração completa.
- Removidos componentes antigos, Swiper e tsParticles. Next.js e configuração ESLint atualizados para 16.4.0.

## Verificação

Lint, sete testes de contato e compilação de produção concluídos. Navegador local: filtros com contagens corretas, modal de vídeo/PDF, Escape e foco, formulário com dados fictícios sem envio externo, galeria circular, FAQ, menu e layout a 390 px sem transbordamento horizontal. As 51 referências de mídia do portfólio existem no disco. Capturas em relatorio-evidencias/design.

Auditoria de dependências de produção sem vulnerabilidades reportadas. A auditoria completa ainda indica cinco alertas altos na cadeia de desenvolvimento do ESLint (braces/micromatch/fast-glob). A versão atual de braces não oferece correção; não foi aplicado o downgrade incompatível sugerido por npm audit fix --force. Evidência em relatorio-evidencias/audit-redesign.json.

O email real e a entrega pelo WhatsApp não foram testados: nenhuma mensagem externa foi enviada. Os PDFs incorporados dependem do visualizador do navegador; o link direto continua disponível. Conteúdo institucional e descrições técnicas precisam da validação editorial da empresa.
