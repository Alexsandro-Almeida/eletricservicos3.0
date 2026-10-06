'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, CircuitBoard, FileText, Menu, MessageCircle, Play, ShieldCheck, Sun, UtilityPole, X, Zap } from 'lucide-react';
import { projects, type Project } from '../../lib/projects';
import AccessibleDialog from './AccessibleDialog';
import EngineeringContact from './EngineeringContact';

const whatsapp = 'https://wa.me/5593992200097?text=Ol%C3%A1!%20Gostaria%20de%20conversar%20sobre%20um%20projeto%20el%C3%A9trico.';
const specialties = [
  { icon: CircuitBoard, number: '01', title: 'Instalações elétricas', detail: 'Da planta ao último circuito.', text: 'Projetos residenciais, comerciais e industriais. Dimensionamento de circuitos, quadros de carga e distribuição.', category: 'Instalações' },
  { icon: Sun, number: '02', title: 'Energia solar', detail: 'O futuro já tem energia.', text: 'Projetos fotovoltaicos on-grid e off-grid, com diagramas e documentação para cada solução.', category: 'Energia solar' },
  { icon: ShieldCheck, number: '03', title: 'Proteção SPDA', detail: 'Segurança em cada detalhe.', text: 'Projetos de proteção contra descargas atmosféricas, aterramento e análise das estruturas.', category: 'Proteção SPDA' },
  { icon: UtilityPole, number: '04', title: 'Subestações', detail: 'Estrutura para ir mais longe.', text: 'Projetos de subestações e distribuição de energia, com representação técnica e visualização em 3D.', category: 'Subestações' },
];
const visits = [
  { image: '/assets/visitas/galary15.jpg', title: 'Conexões e barramentos de distribuição' },
  { image: '/assets/visitas/galary19.jpg', title: 'Sistema de armazenamento de energia' },
  { image: '/assets/visitas/galary.jpg', title: 'Registro de visita técnica 03' },
  { image: '/assets/visitas/galary2.webp', title: 'Registro de visita técnica 04' },
  { image: '/assets/visitas/galary4.jpg', title: 'Registro de visita técnica 05' },
  { image: '/assets/visitas/galary16.jpg', title: 'Registro de visita técnica 06' },
  { image: '/assets/visitas/galary9.jpg', title: 'Registro de visita técnica 07' },
  { image: '/assets/visitas/galary20.jpeg', title: 'Registro de visita técnica 08' },
];

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6, delay }} className={className}>{children}</motion.div>;
}

function CircuitDrawing() {
  return <svg className="circuit-drawing" viewBox="0 0 520 500" fill="none" aria-hidden="true">
    <g stroke="currentColor" strokeWidth="1">
      <path d="M0 70H110L160 120H310V210H520M0 300H90V210H160M280 500V370L350 300H520M30 500V420H160V300H250V210M350 0V60H440V140H520M160 0V60" />
      <path className="current-line" d="M0 70H110L160 120H310V210H520" />
      <path className="current-line reverse" d="M280 500V370L350 300H520" />
      {[ [160,120], [310,210], [90,300], [160,210], [250,300], [350,60], [160,60] ].map(([x,y]) => <g key={`${x}-${y}`}><circle cx={x} cy={y} r="6" /><circle cx={x} cy={y} r="2" fill="currentColor" /></g>)}
    </g>
  </svg>;
}

function PortfolioCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const [preview, setPreview] = useState(false);
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => { if (preview && ref.current) void ref.current.play().catch(() => {}); }, [preview]);
  return <button type="button" className="portfolio-card" onClick={onOpen} aria-label={`Ver projeto: ${project.title}`}
    onMouseEnter={() => { if (!reduced) setPreview(true); }} onMouseLeave={() => setPreview(false)} onFocus={() => { if (!reduced) setPreview(true); }} onBlur={() => setPreview(false)}>
    <div className="portfolio-image">
      <Image src={project.thumbnail} alt={`Prévia do projeto ${project.title}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw" />
      {preview && !failed && <video ref={ref} src={project.videoUrl} loop muted playsInline preload="none" onError={() => setFailed(true)} aria-hidden="true" />}
      <span className="project-number">ES / {String(project.id).padStart(2, '0')}</span>
      <span className="play-project"><Play size={17} fill="currentColor" /></span>
      <span className="project-files"><FileText size={13} /> PDF + VÍDEO</span>
    </div>
    <div className="portfolio-caption"><div><span className="small-label">{project.category}</span><h3>{project.title}</h3></div><ArrowUpRight size={23} /></div>
  </button>;
}

function ProjectViewer({ project, close }: { project: Project | null; close: () => void }) {
  const [tab, setTab] = useState<'video' | 'pdf'>('video');
  const [failed, setFailed] = useState(false);
  if (!project) return null;
  return <AccessibleDialog open onClose={close} labelledBy="project-title" className="engineering-dialog project-dialog">
    <div className="dialog-heading"><div><span className="eyebrow">{project.category} / PROJETO {String(project.id).padStart(2,'0')}</span><h2 id="project-title">{project.title}</h2></div><button type="button" className="icon-button" onClick={close} aria-label="Fechar projeto"><X /></button></div>
    <div className="viewer-toolbar"><div className="viewer-tabs" role="tablist" aria-label="Formato do projeto" onKeyDown={event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 'video' : event.key === 'End' ? 'pdf' : tab === 'video' ? 'pdf' : 'video';
      setTab(next);
      (event.currentTarget.querySelector(`#${next}-tab`) as HTMLButtonElement | null)?.focus();
    }}>
      <button type="button" id="video-tab" role="tab" tabIndex={tab === 'video' ? 0 : -1} aria-selected={tab === 'video'} aria-controls="project-panel" onClick={() => setTab('video')}><Play size={15} /> Apresentação</button>
      <button type="button" id="pdf-tab" role="tab" tabIndex={tab === 'pdf' ? 0 : -1} aria-selected={tab === 'pdf'} aria-controls="project-panel" onClick={() => setTab('pdf')}><FileText size={15} /> Planta em PDF</button>
    </div><a href={tab === 'video' ? project.videoUrl : project.pdfUrl} target="_blank" rel="noopener noreferrer">Abrir arquivo <ArrowUpRight size={16} /></a></div>
    <div id="project-panel" role="tabpanel" aria-labelledby={tab === 'video' ? 'video-tab' : 'pdf-tab'} className="project-panel">
      {tab === 'video' ? <><video src={project.videoUrl} poster={project.thumbnail} controls playsInline preload="metadata" onError={() => setFailed(true)} />{failed && <p className="media-warning">Seu navegador não conseguiu reproduzir o vídeo. Use “Abrir arquivo” para acessá-lo.</p>}</> : <><iframe src={project.pdfUrl} title={`Planta elétrica: ${project.title}`} /><p className="pdf-hint">Se a planta não aparecer neste dispositivo, use “Abrir arquivo” acima.</p></>}
    </div><div className="dialog-description"><p>{project.description}</p><a className="text-link" href="#contato" onClick={close}>Quero um projeto como este <ArrowRight size={17} /></a></div>
  </AccessibleDialog>;
}

export default function EngineeringSite({ emailEnabled }: { emailEnabled: boolean }) {
  const [menu, setMenu] = useState(false);
  const [category, setCategory] = useState('Todos');
  const [allProjects, setAllProjects] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const [photo, setPhoto] = useState<number | null>(null);
  const [faq, setFaq] = useState<number | null>(0);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const filtered = projects.filter(p => category === 'Todos' || p.category === category);
  const displayed = category !== 'Todos' || allProjects ? filtered : [projects[7], projects[9], projects[8], projects[0], projects[2], projects[6]];
  const showCategory = (value: string) => { setCategory(value); setAllProjects(true); };
  const links = [{ title: 'Sobre', href: '#sobre' }, { title: 'Soluções', href: '#solucoes' }, { title: 'Projetos', href: '#projetos' }, { title: 'Em campo', href: '#visitas' }];
  const faqs = [
    { title: 'Que tipos de projetos vocês desenvolvem?', text: 'Projetos de instalações elétricas residenciais, comerciais e industriais, sistemas fotovoltaicos, proteção contra descargas atmosféricas e subestações. Conte-nos o que você precisa para avaliarmos o escopo.' },
    { title: 'Como solicitar um orçamento?', text: 'Use o formulário abaixo para organizar seu pedido e encaminhá-lo pelo WhatsApp. Se possível, informe o tipo de imóvel, a localização e os serviços desejados. Você também pode entrar em contato diretamente por email.' },
    { title: 'Posso consultar as plantas dos projetos?', text: 'Sim. Abra um projeto do portfólio e selecione “Planta em PDF”. Você pode consultar o arquivo na página ou abri-lo em uma nova aba. Os arquivos são referências de portfólio e não substituem um projeto específico para sua instalação.' },
  ];

  return <>
    <motion.div className="scroll-progress" style={{ scaleX: progress }} />
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className="site-header"><div className="site-container header-content">
      <a href="#inicio" className="wordmark" aria-label="Eletric Serviços Engenharia — início"><Image src="/assets/logos/logo1.jpg" alt="Logo original da Eletric Serviços Engenharia" width={602} height={648} className="original-brand-logo" /><span>ELETRIC<span className="brand-subtitle">SERVIÇOS ENGENHARIA</span></span></a>
      <nav className="desktop-nav" aria-label="Navegação principal">{links.map(link => <a key={link.href} href={link.href}>{link.title}</a>)}</nav>
      <a href="#contato" className="button button-lime header-cta">Vamos conversar <ArrowUpRight size={17} /></a>
      <button type="button" className="menu-toggle icon-button" aria-label={menu ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menu} aria-controls="mobile-navigation" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
    </div>{menu && <nav id="mobile-navigation" className="mobile-nav" aria-label="Navegação móvel">{[...links,{title:'Contato',href:'#contato'}].map(link => <a href={link.href} key={link.href} onClick={() => setMenu(false)}>{link.title}<ArrowUpRight size={18} /></a>)}</nav>}</header>

    <main id="conteudo">
      <section id="inicio" className="hero-section"><div className="hero-grid" aria-hidden="true" /><div className="site-container hero-layout">
        <div className="hero-copy"><Reveal><span className="eyebrow"><span className="signal-dot" /> ENGENHARIA ELÉTRICA, NA PRÁTICA.</span><h1>Precisão que<br />transforma<br /><span>energia.</span><span className="title-spark">↗</span></h1><p>Do primeiro traço à última conexão.<br />Projetos inteligentes para energizar o seu futuro com segurança e eficiência.</p>
          <div className="hero-actions"><a className="button button-lime" href="#projetos">Explore nossos projetos <ArrowUpRight size={20} /></a><a href="#contato" className="hero-secondary">Fale com um especialista <ArrowRight size={17} /></a></div>
          <div className="hero-proof"><span><ShieldCheck size={18} /> COMPROMISSO TÉCNICO</span><span><CircuitBoard size={18} /> PROJETO AO CAMPO</span></div>
        </Reveal></div>
        <Reveal className="hero-visual" delay={0.15}><div className="visual-topline"><span>ELETRIC / FIELD NOTES</span><span>01 — DISTRIBUIÇÃO</span></div>
          <div className="hero-photo"><Image src="/assets/visitas/galary15.jpg" alt="Barramentos e conexões de um quadro de distribuição elétrica" fill sizes="(max-width: 850px) 100vw, 50vw" loading="eager" fetchPriority="high" className="hero-field-image" /><div className="photo-tint" /><CircuitDrawing /><span className="technical-cross cross-top">+</span><span className="technical-cross cross-bottom">+</span><div className="photo-caption"><span className="signal-dot" /><span>ENERGIA EM CADA CONEXÃO</span></div></div>
          <div className="hero-tech-card"><div className="tech-card-icon"><Zap size={24} /></div><div><span>PROJETAR. CONECTAR. TRANSFORMAR.</span><strong>Engenharia que acontece.</strong></div><ArrowUpRight size={25} /></div>
        </Reveal>
      </div><div className="site-container hero-bottom"><a href="#solucoes"><ArrowDown size={16} /> ROLE PARA EXPLORAR</a><span>INSTALAÇÕES / SOLAR / SPDA / SUBESTAÇÕES</span><span className="hero-coordinates">DESDE 2019 — BRASIL</span></div></section>

      <div className="energy-band" aria-hidden="true"><div>{Array.from({length:4},(_,i)=><span key={i}>ENERGIA COM PROPÓSITO <Zap size={25} fill="currentColor" /> ENGENHARIA COM PRECISÃO <Zap size={25} fill="currentColor" /></span>)}</div></div>

      <section id="solucoes" className="light-section section-space"><div className="site-container">
        <Reveal className="section-heading"><div><span className="eyebrow">01 / NOSSA ESPECIALIDADE</span><h2>Uma solução para<br />cada <span className="serif-word">desafio.</span></h2></div><p>Conectamos conhecimento técnico e visão prática para desenvolver projetos que fazem a diferença.</p></Reveal>
        <div className="services-grid">{specialties.map((service,i)=><Reveal key={service.number} delay={i*0.07}><a href="#projetos" onClick={()=>showCategory(service.category)} className="service-card"><div className="service-top"><service.icon size={31} strokeWidth={1.4} /><span>{service.number}</span></div><h3>{service.title}</h3><strong>{service.detail}</strong><p>{service.text}</p><span className="service-link">Explorar projetos <ArrowUpRight size={19} /></span></a></Reveal>)}</div>
        <Reveal className="standards-note"><ShieldCheck size={22} /><p>Segurança como princípio. Precisão como método.</p><span>ATENÇÃO ÀS NORMAS TÉCNICAS BRASILEIRAS</span></Reveal>
      </div></section>

      <section id="sobre" className="about-section section-space"><div className="site-container about-layout"><Reveal className="about-visual"><div className="about-photo"><Image src="/assets/visitas/galary19.jpg" alt="Sistema de armazenamento de energia com banco de baterias" fill sizes="(max-width: 850px) 100vw, 45vw" /><span className="photo-index">ES.02 / ENERGIA EM CAMPO</span></div><div className="experience-stamp"><Zap size={26} /><strong>Desde<br />2019</strong><span>TRANSFORMANDO ENERGIA</span></div></Reveal><Reveal className="about-copy"><span className="eyebrow">02 / QUEM SOMOS</span><h2>Mais do que<br />projetos.<br /><span className="serif-word">Conexões.</span></h2><p>Somos a Eletric Serviços Engenharia. Unimos experiência, tecnologia e atenção aos detalhes para transformar necessidades em soluções elétricas.</p><p>Do residencial ao industrial, acreditamos que um bom projeto começa ouvindo você — e se constrói com responsabilidade em cada etapa.</p><div className="about-values">{['Planejamento técnico','Segurança e eficiência','Acompanhamento próximo'].map(value=><span key={value}><Check size={17} />{value}</span>)}</div><a className="text-link" href="#contato">Vamos construir seu próximo projeto <ArrowUpRight size={20} /></a></Reveal></div></section>

      <section id="projetos" className="portfolio-section section-space"><div className="site-container"><Reveal className="section-heading"><div><span className="eyebrow">03 / PORTFÓLIO TÉCNICO</span><h2>Ideias que ganham<br /><span className="serif-word">forma. E energia.</span></h2></div><div className="portfolio-intro"><p>Explore nossos projetos em movimento.<br />Veja os detalhes. Conheça as soluções.</p><span><span className="signal-dot" /> {projects.length} PROJETOS PARA EXPLORAR</span></div></Reveal>
        <div className="portfolio-filters" aria-label="Filtrar projetos por especialidade">{['Todos',...specialties.map(s=>s.category)].map(item=><button type="button" key={item} aria-pressed={category===item} onClick={()=>showCategory(item)}>{item}{item==='Todos'&&<span>{projects.length}</span>}</button>)}</div>
        <p className="visually-hidden" role="status">{displayed.length} projetos exibidos para {category}.</p>
        <div className="portfolio-grid">{displayed.map(project=><Reveal key={project.id}><PortfolioCard project={project} onOpen={()=>setSelected(project)} /></Reveal>)}</div>
        {category==='Todos' && !allProjects && <div className="portfolio-more"><button type="button" className="button button-outline" onClick={()=>setAllProjects(true)}>Ver todos os {projects.length} projetos <ArrowDownRight size={20} /></button></div>}
      </div></section>

      <section className="process-section light-section section-space"><div className="site-container"><Reveal className="section-heading"><div><span className="eyebrow">04 / NOSSO PROCESSO</span><h2>Da sua ideia<br />à <span className="serif-word">solução certa.</span></h2></div><p>Clareza no caminho. Cuidado em cada etapa.<br />É assim que construímos boas conexões.</p></Reveal><div className="process-grid">{[
        ['01','Entendemos','Conversamos sobre a sua necessidade, o espaço e os objetivos do projeto.'],['02','Planejamos','Definimos o escopo e desenvolvemos a solução técnica para a sua instalação.'],['03','Projetamos','Transformamos o planejamento em plantas, diagramas e documentação.'],['04','Acompanhamos','Orientamos os próximos passos e esclarecemos as dúvidas do seu projeto.'],
      ].map(([number,title,text])=><Reveal key={number}><div className="process-step"><span className="step-number">{number}</span><ArrowRight className="process-arrow" size={20} /><h3>{title}</h3><p>{text}</p></div></Reveal>)}</div></div></section>

      <section id="visitas" className="field-section section-space"><div className="site-container"><Reveal className="section-heading"><div><span className="eyebrow">05 / NOSSO TRABALHO EM CAMPO</span><h2>A engenharia<br />além da <span className="serif-word">prancheta.</span></h2></div><p>Registros reais das nossas visitas técnicas.<br />Porque os detalhes também vivem no campo.</p></Reveal><div className="field-grid">{visits.slice(0,4).map((visit,i)=><Reveal key={visit.image}><button type="button" onClick={()=>setPhoto(i)} className="field-photo" aria-label={`Ampliar fotografia: ${visit.title}`}><Image src={visit.image} alt={visit.title} fill sizes="(max-width: 640px) 50vw, 25vw" /><span className="field-photo-number">{String(i+1).padStart(2,'0')}</span><span className="field-photo-open"><ArrowUpRight size={24} /></span></button></Reveal>)}</div><div className="field-footer"><span>REGISTROS DO NOSSO ACERVO / {visits.length} FOTOGRAFIAS</span><button type="button" className="text-link" onClick={()=>setPhoto(0)}>Abrir galeria completa <ArrowUpRight size={19} /></button></div></div></section>

      <section id="fundador" className="founder-section"><div className="site-container founder-layout">
        <Reveal className="founder-visual"><div className="founder-blueprint" aria-hidden="true"><span>ES / ENGENHARIA ELÉTRICA</span><CircuitDrawing /><div className="future-orbit" /><div className="future-scan" /><div className="future-coordinate">PROJETAR<br />CONECTAR<br />TRANSFORMAR</div></div><div className="founder-portrait"><Image src="/assets/founder/foto-fundador-transparente.png" alt="Ruan Lastrine, fundador da Eletric Serviços Engenharia" fill sizes="(max-width: 640px) 90vw, 40vw" /></div><div className="founder-photo-label"><span className="founder-label-icon"><Zap size={22} /></span><div><strong>Ruan Lastrine</strong><span>Fundador · Engenheiro eletricista</span></div><ArrowUpRight size={22} /></div></Reveal>
        <Reveal className="founder-copy"><span className="eyebrow">PESSOAS QUE CONECTAM IDEIAS</span><h2>A engenharia tem<br />um lado <span>humano.</span></h2><p className="founder-intro">Por trás de cada projeto, alguém que escuta, planeja e cuida dos detalhes. Conheça Ruan Lastrine, fundador da Eletric Serviços Engenharia.</p><blockquote><span className="founder-quote-mark" aria-hidden="true">“</span>Onde há eletricidade,<br />haverá luz no futuro.</blockquote><div className="founder-principles"><span><CircuitBoard size={17} />Precisão técnica</span><span><MessageCircle size={17} />Conversa próxima</span></div><a href="#contato" className="button button-lime founder-cta">Converse com a Eletric <ArrowUpRight size={19} /></a></Reveal>
      </div></section>

      <section className="faq-section light-section section-space"><div className="site-container faq-layout"><Reveal><span className="eyebrow">ANTES DE COMEÇAR</span><h2>Vamos esclarecer<br />suas <span className="serif-word">dúvidas.</span></h2></Reveal><div className="faq-list">{faqs.map((item,i)=><div className="faq-item" key={item.title}><h3><button type="button" aria-expanded={faq===i} aria-controls={`faq-${i}`} onClick={()=>setFaq(faq===i?null:i)}>{item.title}<span>{faq===i?'−':'+'}</span></button></h3><div id={`faq-${i}`} hidden={faq!==i}><p>{item.text}</p></div></div>)}</div></div></section>

      <EngineeringContact emailEnabled={emailEnabled} />
    </main>

    <footer className="engineering-footer"><div className="site-container"><div className="footer-top"><a href="#inicio" className="wordmark"><Image src="/assets/logos/logo1.jpg" alt="Logo original da Eletric Serviços Engenharia" width={602} height={648} className="original-brand-logo" /><span>ELETRIC<span className="brand-subtitle">SERVIÇOS ENGENHARIA</span></span></a><p>Conectando ideias.<br />Transformando energia.</p><a href="#inicio" className="back-top">Voltar ao topo <ArrowUpRight size={19} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Eletric Serviços Engenharia</span><span>CNPJ 58.165.764/0001-17</span><span>Desenvolvido por Express Technology</span></div></div></footer>
    <a className="floating-contact" href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Conversar pelo WhatsApp"><MessageCircle size={24} /><span>Vamos conversar</span></a>
    <ProjectViewer key={selected?.id ?? 'closed'} project={selected} close={()=>setSelected(null)} />
    <AccessibleDialog open={photo!==null} onClose={()=>setPhoto(null)} labelledBy="field-title" className="engineering-dialog gallery-dialog">{photo!==null&&<><div className="dialog-heading"><div><span className="eyebrow">REGISTROS EM CAMPO</span><h2 id="field-title">{visits[photo].title}</h2></div><button type="button" className="icon-button" aria-label="Fechar fotografia" onClick={()=>setPhoto(null)}><X /></button></div><div className="gallery-view"><Image src={visits[photo].image} alt={visits[photo].title} fill sizes="90vw" /></div><div className="gallery-controls"><button className="icon-button" type="button" aria-label="Fotografia anterior" onClick={()=>setPhoto((photo-1+visits.length)%visits.length)}><ChevronLeft /></button><span role="status">{String(photo+1).padStart(2,'0')} / {String(visits.length).padStart(2,'0')}</span><button type="button" className="icon-button" aria-label="Próxima fotografia" onClick={()=>setPhoto((photo+1)%visits.length)}><ChevronRight /></button></div></>}</AccessibleDialog>
  </>;
}
