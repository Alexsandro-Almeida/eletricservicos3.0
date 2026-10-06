# Relatório técnico — Eletric Serviços Engenharia

> Este documento registra o diagnóstico inicial. As correções posteriores estão em [CORRECOES.md](CORRECOES.md); as falhas descritas abaixo não representam necessariamente o estado atual do código.

Data: 30/09/2026. Escopo: código e configurações deste repositório, dependências travadas no package-lock.json, arquivos públicos e verificações em servidor local de produção.

## 1. Parecer geral

O projeto é um site institucional de página única para divulgar a Eletric Serviços Engenharia, apresentar seu fundador, demonstrar projetos elétricos e direcionar visitantes para contato. A estrutura é pequena, organizada em componentes e compila para produção.

**A principal falha funcional é o formulário de contato:** a interface anuncia envio bem-sucedido, mas o servidor apenas escreve os dados no console. Não existe envio de email, persistência ou integração com CRM. Assim, esse canal não entrega o contato à empresa como o visitante espera.

Há também alertas de dependências, falhas de lint, estilos ausentes no CSS final e lacunas de acessibilidade e conteúdo. A aprovação do build não equivale à aprovação funcional, visual ou de segurança. Recomendo resolver os itens críticos antes de considerar o site pronto para captar clientes em produção.

## 2. Linguagens e tecnologias

Versões abaixo são as efetivamente registradas no lockfile, não necessariamente as versões mais recentes disponíveis.

| Tecnologia | Versão | Papel no projeto |
|---|---|---|
| TypeScript | 5.9.3 | Código da aplicação, tipos de propriedades e configurações |
| TSX/JSX e HTML | — | Componentes React e estrutura semântica das páginas |
| CSS | — | Estilos globais, tema e customizações do carrossel |
| JavaScript ESM | — | Configuração do ESLint e PostCSS em arquivos .mjs |
| JSON | — | Manifesto, lockfile e configuração TypeScript |
| Next.js | 16.1.2 | App Router, prerenderização, servidor e endpoint de contato |
| React / React DOM | 19.2.3 | Interface e gerenciamento de estado |
| Tailwind CSS / plugin PostCSS | 4.1.18 | Classes utilitárias e geração de CSS |
| Framer Motion | 12.26.2 | Animações de entrada, hover e modais |
| Lucide React | 0.562.0 | Ícones |
| Swiper | 12.0.3 | Carrossel responsivo dos projetos |
| @tsparticles/react | 3.0.0 | Integração React das partículas |
| @tsparticles/slim / tsparticles | 3.9.1 | Motor de partículas e pacote completo instalado |
| react-pdf | 10.3.0 | Instalado, mas não utilizado no código analisado |
| ESLint | 9.39.2 | Verificação estática de qualidade |
| eslint-config-next | 16.1.2 | Regras Next.js, TypeScript e indicadores web |

O PDF é exibido por `iframe`, não por react-pdf. O fundo usa loadSlim; o pacote completo tsparticles não é importado diretamente. São candidatos à revisão de dependências. Uma dependência instalada e não importada não implica automaticamente aumento do bundle entregue ao visitante.

Ambiente de verificação: Windows/PowerShell, Node.js 24.14.0 e npm 11.9.0. Não há versão de Node fixada por engines ou arquivo de versão no repositório.

## 3. Arquitetura e organização

```text
app/
  layout.tsx                 HTML pt-BR, metadados e fontes
  page.tsx                   Composição da página inicial
  globals.css                Tema e estilos globais
  api/contact/route.ts       POST de contato
  components/               14 componentes da interface
public/assets/
  founder/                  Foto do fundador
  logos/                    Logo
  projects/pdf/             17 PDFs
  videos/                   17 vídeos e thumbnail comum
  visitas/                  20 fotos disponíveis
```

Rotas encontradas: `/`, `POST /api/contact` e a página de erro padrão do Next.js. O build identifica a página inicial como estática/prerenderizada e a API como dinâmica. O uso de `'use client'` não impede que o Next.js prerenderize HTML, mas exige JavaScript no navegador para as interações.

Toda a página e os 14 componentes usam `'use client'`. Conteúdo institucional estático poderia ser separado de partes interativas para reduzir a abrangência da hidratação. Não foram encontrados banco de dados, autenticação, painel administrativo, CMS, pagamentos, upload, contas de usuário ou integrações de email.

Projetos, visitas, contatos e indicadores são cadastrados diretamente no código. Para alterar o conteúdo, é necessário editar arquivos e publicar uma nova versão.

## 4. Funcionalidades existentes

| Área | Comportamento implementado | Limitações |
|---|---|---|
| Navegação | Menu fixo, mudança de aparência após rolagem e menu mobile | Botão mobile sem nome acessível e sem aria-expanded |
| Apresentação | Nome da empresa, mensagem institucional e atalhos para projetos/contato | Animações dependem de JavaScript |
| Sobre | Texto institucional e quatro diferenciais | Conteúdo estático |
| Fundador | Foto, nome, experiência, indicadores e citações | Foto de banco externo usada como fallback; dados declarativos |
| Projetos | 17 entradas em carrossel, autoplay a cada 5 segundos, setas e paginação | Todas as descrições estão vazias; mesma thumbnail para todos |
| Cards | Inclinação, zoom e vídeo silencioso no hover | Abertura não é acessível por teclado; hover não se aplica da mesma forma ao toque |
| Modal de projeto | Vídeo com controles/autoplay, PDF em iframe e selo NBR | Sem Escape/foco controlado; provável corte de conteúdo no mobile |
| Visitas técnicas | Oito fotos exibidas, ampliação e navegação circular | Títulos, descrições e datas vazios; 12 fotos disponíveis não são exibidas |
| Indicadores | Contadores animados: 200+, 100% NBR e 100% satisfação | Valores fixos; não há fonte de dados ou comprovação no código |
| Formulário | Nome, email, telefone, mensagem, estados de envio/sucesso/erro | Backend não envia nem armazena o contato |
| WhatsApp | Botão flutuante abre wa.me com mensagem preenchida | Número precisa ser validado pela empresa; link não foi acionado na análise |
| Rodapé | Navegação, contatos, CNPJ, créditos e ano corrente | Contatos duplicados em vários componentes |
| Fundo | Grid decorativo e partículas animadas | Não há estratégia explícita para movimento reduzido |

O portfólio abrange quadro de cargas 3D, SPDA, studio de ballet, praças, apartamentos, sistemas solares on-grid/off-grid, subestação 225 kVA, circuitos de UBS, escritório, garagem, croqui georreferenciado, praia artificial e chave de transferência.

As referências de mídia analisadas existem no disco. A primeira foto da galeria usa caminho relativo, que funciona na raiz atual, mas fica mais frágil caso a galeria seja reutilizada em outra rota.

## 5. Testes e verificações executadas

As verificações foram executadas sem alterar o código funcional ou atualizar versões. `npm ci` instalou 421 pacotes usando o lockfile.

| Verificação | Resultado |
|---|---|
| Instalação com npm ci | Passou |
| npm run build | Passou: compilação Turbopack, TypeScript e geração das páginas |
| npm run lint | Falhou: quatro erros e sete avisos |
| Inicialização com npm run start -- --port 3100 | Passou |
| GET / | HTTP 200, título esperado no HTML |
| POST /api/contact com dados de teste | HTTP 200 e mensagem de sucesso; sem mecanismo de envio |
| POST /api/contact com objeto vazio `{}` | HTTP 200 e mensagem de sucesso: ausência de validação comprovada |
| POST /api/contact com JSON malformado | HTTP 500; deveria distinguir erro de entrada de erro interno |
| GET /api/contact | HTTP 405, método não permitido |
| HEAD dos vídeos e PDFs dos projetos | 34 de 34 responderam HTTP 200 |
| CSS compilado | bg-dark, text-dark, token color-dark e bg-gradient-radial ausentes |
| Cabeçalho X-Powered-By na página inicial | Ausente, conforme configuração |
| npm audit | 15 pacotes sinalizados: um baixo, três moderados, nove altos, dois críticos |
| npm audit --omit=dev | Seis pacotes sinalizados: um moderado, três altos, dois críticos |

Erros de lint: quatro ocorrências de aspas não escapadas em `app/components/Founder.tsx`, linhas 101, 102 e 106. Avisos: variável error não usada em Contact, import hover não usado em Navbar e cinco usos de img onde o ESLint recomenda next/image.

**Não existe suíte automatizada no projeto:** não há script test, testes unitários, integração, end-to-end, configuração de runner ou pipeline CI versionado encontrado. O build inclui checagem TypeScript; isso não verifica o funcionamento completo da interface.

Não foram executados testes visuais em navegador, Lighthouse, leitor de tela, entrega real de email, reprodução/decodificação completa dos vídeos ou inspeção técnica dos PDFs. Responder HTTP 200 confirma disponibilidade, não validade audiovisual ou qualidade do conteúdo. Não foi testado o domínio público.

## 6. Problemas e prioridades

### P0 — Contato com sucesso fictício

Evidência: `app/api/contact/route.ts:19` registra emailContent no console e retorna sucesso. Não há biblioteca de email, chamada a provedor ou gravação em banco.

Impacto: visitantes podem acreditar que fizeram contato, enquanto a empresa não recebe a solicitação pelo canal anunciado. Corrigir integrando um serviço de email ou persistência e só confirmar após entrega/aceitação real. Criar testes de sucesso e falha dessa integração.

### P0 — Dependências com alertas críticos

O npm audit sinalizou Next.js 16.1.2 e Swiper 12.0.3 como críticos. A auditoria também sinalizou sharp, postcss e nanoid como altos e baseline-browser-mapping como moderado no recorte sem devDependencies.

A sugestão retornada pelo registro para Next.js foi 16.3.8; para Swiper há correção disponível dentro da faixa declarada. Essas são sugestões da consulta, não versões homologadas neste projeto. Atualizar em alteração controlada, conferir compatibilidade, repetir build/lint e testar navegação, modais e mídias. Não executei npm audit fix.

O resultado conta pacotes sinalizados, não ataques comprovados ou necessariamente 15 falhas independentes. Alguns avisos dependem de funcionalidades/configurações que o site pode não usar. Os JSONs completos foram preservados para avaliação dos avisos e condições de exploração.

### P1 — API sem validação e registro de dados pessoais

`POST {}` retorna sucesso. Não há checagem de tipos, email, tamanho de campos ou rejeição de valores vazios no servidor. A validação HTML required/type=email pode ser contornada por uma chamada direta.

Nome, email, telefone e mensagem são registrados em logs. Não foi encontrada política de privacidade ou definição de retenção no projeto. Rever os registros, validar payload no servidor, limitar entradas e retornar 400 para dados inválidos. Não foram encontrados rate limiting ou proteção antispam; considerar antes de ativar envio real.

### P1 — Tema Tailwind incompleto

`tailwind.config.ts` define dark e navy, mas `globals.css` usa Tailwind 4 sem referência `@config` ao arquivo. O tema CSS define navy como #0869ca e não define dark. A verificação do CSS gerado confirmou ausência de bg-dark/text-dark e do gradiente radial customizado.

Impacto: várias classes usadas por fundo, overlays e modais não produzem o efeito esperado. Corrigir o tema pela configuração efetivamente consumida e definir o gradiente. Padronizar a paleta: README/configuração antiga usam #001F3F, enquanto o tema ativo usa #0869ca e o fundo/carrossel mantêm cores fixas antigas.

### P1 — Modal com risco de corte no mobile

`ProjectModal.tsx:47` usa contêiner de 90vh com overflow-hidden. Em tela pequena, vídeo de 50vh e PDF de 40vh são empilhados, além de título, descrição, selo, padding e espaçamento. A soma ultrapassa a altura disponível, indicando corte de conteúdo sem rolagem interna.

Esse risco foi identificado no código, não por teste visual. Validar em telas de 360/390 px e habilitar rolagem adequada. Oferecer link para abrir/baixar PDF quando o iframe não funcionar bem no dispositivo.

### P1 — Acessibilidade incompleta

Cards e fotos clicáveis são divs sem tabIndex ou eventos de teclado. Botões apenas com ícones — menu, WhatsApp, fechar e setas da galeria — não possuem nomes acessíveis. Modais não declaram role=dialog/aria-modal, não tratam Escape nem controlam/restauram foco. A galeria não bloqueia a rolagem do fundo. As fotos das visitas têm alt vazio porque o título está vazio.

Usar elementos interativos semânticos, rótulos de controles, foco adequado e anúncios acessíveis para retorno do formulário. Considerar prefers-reduced-motion, pausar autoplay quando apropriado e avaliar navegação completa por teclado.

### P2 — Performance e mídia

Os 57 arquivos em public/assets somam aproximadamente **548,77 MiB**. Vídeos: 17 arquivos, **509,15 MiB**, cerca de 93% do total. O maior vídeo tem aproximadamente 44,19 MiB. PDFs: 9,60 MiB; fotografias JPG/JPEG: 28,40 MiB; PNGs: 1,35 MiB; WebP: 0,27 MiB.

Esse é o tamanho dos arquivos no repositório, não o volume baixado automaticamente por cada visitante. Entretanto, os cards montam vídeos com src e sem preload explicitamente limitado. Imagens usam img sem carregamento lazy explícito ou otimização next/image; portanto, configurar AVIF/WebP no Next.js não otimiza automaticamente essas tags.

Recomendações: comprimir/transcodificar vídeos, usar miniaturas específicas, limitar preload, carregar mídia conforme interação/visibilidade e adotar imagens responsivas. Avaliar lazy loading dos componentes pesados. As partículas são configuradas para 80 elementos e até 60 FPS: medir em dispositivos modestos antes de estimar custo.

A declaração de Lighthouse 90+ no README não possui medição anexada. Não há next/dynamic ou React.lazy no código analisado para sustentar a declaração de lazy loading de componentes. Existe divisão de código do framework, mas isso não substitui uma estratégia explícita e uma medição.

### P2 — Conteúdo e documentação

Os 17 projetos têm description vazia e compartilham uma thumbnail. As oito visitas exibidas não têm título, descrição ou data. O README cita projetos em execução com barra de progresso, mas essa funcionalidade não foi encontrada na implementação atual.

Os textos afirmam CREA ativo, 200+ projetos, 100% satisfação e conformidade NBR; o repositório não comprova essas afirmações. Este relatório avalia software, não credenciais profissionais ou conformidade dos projetos de engenharia. Conferir esses dados com a empresa e documentar fontes. Atualizar também experiência profissional fixa de 6+ anos conforme a informação real.

O fallback da foto do fundador usa uma imagem genérica do Unsplash, podendo apresentar outra pessoa como fundador se o arquivo local falhar. Preferir placeholder neutro e tratamento de erro que não repita indefinidamente.

### P2 — SEO, manutenção e operação

Há idioma pt-BR, título e descrição básicos. Não foram encontrados sitemap, robots, canonical, Open Graph, metadados específicos de compartilhamento ou dados estruturados de empresa.

Não há pipeline CI, configuração explícita de hospedagem, guia de implantação ou modelo de variáveis de ambiente. O domínio citado no README não prova que o site esteja publicado. A API exige um runtime servidor compatível; exportação puramente estática não executa esse endpoint.

Contatos e cores estão repetidos. Centralizar dados institucionais, tipar modelos de conteúdo e separar dados dos componentes facilita manutenção. Remover logs de diagnóstico, imports não usados e dependências sem uso após verificar suas relações.

## 7. Plano recomendado de testes

1. **API:** dados válidos, campos ausentes, tipos incorretos, strings vazias, email inválido, payload longo, JSON inválido e falhas do provedor. Confirmar que sucesso implica entrega/aceitação real.
2. **Formulário:** obrigatoriedade, estado de envio, prevenção de envio duplicado, mensagem de erro, recuperação após falha e limpeza somente após sucesso.
3. **Portfólio:** abrir cada projeto, conferir vínculo vídeo/PDF, fechar por botão/Escape, foco e retomada da rolagem; simular mídia indisponível.
4. **Galeria:** abrir foto, avançar/voltar nas extremidades, fechar, navegação por teclado e descrições acessíveis.
5. **Responsividade:** validar página e modal em 360, 390, 768, 1024 e 1440 px; verificar corte, rolagem e sobreposição do WhatsApp.
6. **Acessibilidade:** teclado, nomes de controles, foco, contraste, leitor de tela e movimento reduzido.
7. **Performance:** medir Lighthouse/Core Web Vitals em cenário mobile, registrar resultados e tráfego de vídeos/imagens.
8. **CI:** executar instalação reproduzível, lint, tipagem/build e testes em cada alteração; revisar alertas de dependências.

Vitest/React Testing Library e Playwright são opções para avaliar ao implementar esse plano; nenhuma dessas ferramentas está atualmente instalada/configurada no projeto.

## 8. Como executar

```sh
npm ci
npm run dev
```

Produção e checagem:

```sh
npm run lint
npm run build
npm run start
npm audit
```

O projeto não exige variáveis de ambiente para o comportamento atual. Uma integração real de contato deverá introduzir configuração segura de provedor, remetente e destinatário. Nenhuma credencial deve ficar em código público ou em variáveis expostas ao cliente.

## 9. Ordem prática de correção

1. Atualizar e homologar dependências sinalizadas como críticas.
2. Implementar contato real, validação de servidor e tratamento correto de erros.
3. Corrigir tema Tailwind e os quatro erros de lint.
4. Corrigir rolagem mobile e acessibilidade dos modais/controles.
5. Completar conteúdo e revisar alegações/documentação.
6. Otimizar mídias com base em medições.
7. Adicionar testes úteis e pipeline de verificação.

## 10. Evidências e limites

Arquivos centrais: package.json, package-lock.json, next.config.ts, tailwind.config.ts, tsconfig.json, eslint.config.mjs, postcss.config.mjs, README.md, app/page.tsx, app/layout.tsx, app/globals.css, app/api/contact/route.ts e todos os 14 componentes em app/components.

Auditorias completas: `relatorio-evidencias/audit-local.json` e `relatorio-evidencias/audit-producao.json`. Os resultados representam a consulta executada nesta análise e podem mudar com atualizações do registro.

Foram usados apenas dados fictícios na API local. O código funcional permaneceu inalterado. Build, instalação de dependências e arquivos ignorados do Next.js foram gerados para permitir as verificações. Este relatório e os JSONs de evidência são as entregas adicionadas ao repositório.
