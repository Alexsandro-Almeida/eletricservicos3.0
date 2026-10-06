# Eletric Serviços Engenharia

Site institucional com Next.js 16.4, React 19, TypeScript, Tailwind CSS 4, Framer Motion e Lucide. Design de engenharia elétrica em grafite e verde elétrico, com circuitos animados, apresentação da empresa/fundador, 17 projetos com vídeos e PDFs, oito fotos de visitas técnicas, perguntas frequentes e contato.

## Executar

Requer Node.js >=22.18; CI usa Node 24.

```sh
npm ci
npm run dev
```

Produção:

```sh
npm run build
npm run start
```

## Contato por email

Copie `.env.example` para `.env.local` e configure no servidor:

- `RESEND_API_KEY`: chave privada do Resend.
- `CONTACT_FROM_EMAIL`: remetente de um domínio verificado no provedor.
- `CONTACT_TO_EMAIL`: destinatário da empresa.
- `CONTACT_TRUST_PROXY`: mantenha false, salvo se o proxy da hospedagem sobrescrever x-forwarded-for com um IP confiável.

Nunca use prefixo NEXT_PUBLIC para credenciais. Reinicie o servidor após configurar. Integração via [API oficial do Resend](https://resend.com/docs/api-reference/emails/send-email).

O formulário funciona por WhatsApp sem credenciais: valida os campos e prepara uma mensagem que o visitante revisa e envia no aplicativo. A opção de envio automático por email aparece apenas quando as três credenciais estão configuradas. Sucesso por email significa aceitação pelo provedor; entrega na caixa postal deve ser acompanhada no painel do serviço. A integração foi testada com um provedor simulado, sem enviar emails reais.

A API valida tipos, comprimentos, email e telefone; limita o corpo a 16 KiB, usa honeypot, verifica Origin quando presente e possui timeout de envio. Não registra dados pessoais no console. O limitador é **local à instância e volátil**: cinco tentativas/minuto por IP confiável ou 30/minuto globais sem proxy confiável. Para múltiplas instâncias, configure proteção compartilhada/limitação no gateway antes de produção com tráfego alto. Origin e honeypot não substituem proteção contra bots.

## Qualidade

```sh
npm run lint
npm test
npm run build
npm audit
```

Os sete testes da API cobrem validação, origem, tamanho, configuração ausente, confirmação de envio, falhas do provedor e limite de tentativas. O workflow `.github/workflows/checks.yml` executa lint, testes, build e auditoria de produção em pushes e pull requests.

## Interface e conteúdo

- Diálogos nativos com Escape, foco, bloqueio do fundo e rolagem interna.
- Cards e galeria operáveis por teclado, controles com nomes acessíveis.
- Imagens responsivas com next/image; vídeos de cards carregados apenas na interação.
- Filtros por especialidade, miniaturas reais dos 17 vídeos e apresentação de seis projetos em destaque.
- Galeria com navegação circular, menu móvel e perguntas frequentes expansíveis.
- Circuitos SVG animados, efeitos de entrada e de interação; animações respeitam movimento reduzido.
- Tema CSS do Tailwind 4 em app/globals.css; a configuração TypeScript antiga não é a fonte ativa do tema.
- SEO básico, Open Graph, canonical, robots.txt e sitemap.xml.

O domínio canônico é https://eletricservicosengenharia.com.br. Se a publicação usar outro domínio, ajuste layout.tsx, robots.ts e sitemap.ts. Hospede em ambiente compatível com o servidor Next.js; exportação estática pura não executa o formulário.

Projetos/visitas e textos institucionais são estáticos no código. Os títulos e descrições resumidas dos projetos se baseiam nos arquivos existentes; detalhes técnicos adicionais devem ser confirmados pela empresa. Rótulos numerados identificam as fotos sem inventar local/data. Os arquivos originais de vídeo/PDF foram preservados. Métricas não comprovadas foram retiradas.

Não há pontuação Lighthouse garantida. O volume de mídia requer medição e eventual transcodificação antes de metas de performance. O relatório inicial está em RELATORIO_TECNICO.md; correções anteriores estão em CORRECOES.md e a reformulação está em DESIGN.md.
