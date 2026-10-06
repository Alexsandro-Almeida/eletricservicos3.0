'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const projectsData = [
  {
    id: 1,
    title: 'QUADRO DE CARGA 3D',
    thumbnail: '/assets/videos/Thumbnail.png',
    videoUrl: '/assets/videos/BLOCOQUADRO3D-Model.mp4',
    pdfUrl: '/assets/projects/pdf/BLOCOQUADRO3D-Model.pdf',
    description: 'Apresentação do projeto e documento técnico disponíveis abaixo.',
  },
  {
    id: 2,
    title: 'SPDA PROTEÇÃO EXTERNO GALPÃO',
    thumbnail: '/assets/videos/Thumbnail.png',
    videoUrl: '/assets/videos/PROJETOELETRICODESPDAEXTERNOGALPAO.mp4',
    pdfUrl: '/assets/projects/pdf/PROJETOELETRICODESPDAEXTERNOGALPAO.pdf',
    description: 'Apresentação do projeto e documento técnico disponíveis abaixo.',
  },
  {
    id: 3,
    title: 'STUDIO BALLET',
    thumbnail: '/assets/videos/Thumbnail.png',
    videoUrl: '/assets/videos/PROJETOELETRICOSTUDIOBALLET.mp4',
    pdfUrl: '/assets/projects/pdf/PROJETOELETRICOSTUDIOBALLET.pdf',
    description: 'Apresentação do projeto e documento técnico disponíveis abaixo.',
  },
  {
    id: 4,
    title: 'PROJETO ELETRICO PRAÇA COBERTA',
    thumbnail: '/assets/videos/Thumbnail.png',
    videoUrl: '/assets/videos/PROJETOELETRICOPRACACOBERTA.mp4',
    pdfUrl: '/assets/projects/pdf/PROJETOELETRICOPRACACOBERTA.pdf',
    description: 'Apresentação do projeto e documento técnico disponíveis abaixo.',
  },
  
  {
    id: 5,
    title: 'PROJETO ELETRICO PRÉDIO APARTAMENTO',
    thumbnail: '/assets/videos/Thumbnail.png',
    videoUrl: '/assets/videos/PROJETOELETRICOPAV01.mp4',
    pdfUrl: '/assets/projects/pdf/PROJETOELETRICOPAV01.pdf',
    description: 'Apresentação do projeto e documento técnico disponíveis abaixo.',
  },
  {
    id: 6,
    title: 'PROJETO ELETRICO SPDA ESTRUTURAL',
    thumbnail: '/assets/videos/Thumbnail.png',
    videoUrl: '/assets/videos/PROJETODESPDA.mp4',
    pdfUrl: '/assets/projects/pdf/PROJETODESPDA.pdf',
    description: 'Apresentação do projeto e documento técnico disponíveis abaixo.',
  },
  {
    id: 7,
    title: 'PROJETO SISTEMA SOLAR OFF GRID',
    thumbnail: '/assets/videos/Thumbnail.png',
    videoUrl: '/assets/videos/DIAGRAMAUNIFILARUFTOFFGRID.mp4',
    pdfUrl: '/assets/projects/pdf/DIAGRAMAUNIFILARUFTOFFGRID.pdf',
    description: 'Apresentação do projeto e documento técnico disponíveis abaixo.',
  },
  {
    id: 8,
    title: ' PROJETO SISTEMA SOLAR ON GRID',
    thumbnail: '/assets/videos/Thumbnail.png',
    videoUrl: '/assets/videos/PROJETOSISTEMASOLARONGRID.mp4',
    pdfUrl: '/assets/projects/pdf/PROJETOSISTEMASOLARONGRID.pdf',
    description: 'Apresentação do projeto e documento técnico disponíveis abaixo.',
  },
  {
    id: 9,
    title: 'PROJETO SPDA MASTRO ESFERA ROLANTE',
    thumbnail: '/assets/videos/Thumbnail.png',
    videoUrl: '/assets/videos/PROJETOELETRICOALDEIAMURATU-SPDA.mp4',
    pdfUrl: '/assets/projects/pdf/PROJETOELETRICOALDEIAMURATU-SPDA.pdf',
    description: 'Apresentação do projeto e documento técnico disponíveis abaixo.',
  },

  {
    id: 10,
    title: 'PROJETO SUBESTAÇÃO 225KVA 3D',
    thumbnail: '/assets/videos/Thumbnail.png',
    videoUrl: '/assets/videos/PROJETOELETRICOSUBESTACAOAEREA225KVA.mp4',
    pdfUrl: '/assets/projects/pdf/PROJETOELETRICOSUBESTACAOAEREA225KVA.pdf',
    description: 'Apresentação do projeto e documento técnico disponíveis abaixo.',
  },

  {
    id: 11,
    title: 'PROJETO ELETRICO CIRCUITOS UBS',
    thumbnail: '/assets/videos/Thumbnail.png',
    videoUrl: '/assets/videos/PROJETOELETRICOALDEIAMURATU-DIMENSIONAMENTODECIRCUITOSBT.mp4',
    pdfUrl: '/assets/projects/pdf/PROJETOELETRICOALDEIAMURATU-DIMENSIONAMENTODECIRCUITOSBT.pdf',
    description: 'Apresentação do projeto e documento técnico disponíveis abaixo.',
  },

  {
    id: 12,
    title: 'PROJETO ELETRICO ESCRITORIO DE ADVOCACIA',
    thumbnail: '/assets/videos/Thumbnail.png',
    videoUrl: '/assets/videos/PROJETOELETRICO-TERREO.mp4',
    pdfUrl: '/assets/projects/pdf/PROJETOELETRICO-TERREO.pdf',
    description: 'Apresentação do projeto e documento técnico disponíveis abaixo.',
  },

  {
    id: 13,
    title: 'PROJETO ELETRICO GARAGEM SUBSOLO PRÉDIO COMERCIAL',
    thumbnail: '/assets/videos/Thumbnail.png',
    videoUrl: '/assets/videos/PROJETOELETRICO-SUBSOLO.mp4',
    pdfUrl: '/assets/projects/pdf/PROJETOELETRICO-SUBSOLO.pdf',
    description: 'Apresentação do projeto e documento técnico disponíveis abaixo.',
  },

  {
    id: 14,
    title: 'PROJETO ELETRICO GEORREFERENCIA CROQUI',
    thumbnail: '/assets/videos/Thumbnail.png',
    videoUrl: '/assets/videos/PROJETOELETRICOCROQUIGEOREFERENCIA.mp4',
    pdfUrl: '/assets/projects/pdf/PROJETOELETRICOCROQUIGEOREFERENCIA.pdf',
    description: 'Apresentação do projeto e documento técnico disponíveis abaixo.',
  },

  {
    id: 15,
    title: 'PROJETO ELETRICO PRAÇA AR LIVRE',
    thumbnail: '/assets/videos/Thumbnail.png',
    videoUrl: '/assets/videos/PROJETOELETRICOPRACAARLIVRE.mp4',
    pdfUrl: '/assets/projects/pdf/PROJETOELETRICOPRACAARLIVRE.pdf',
    description: 'Apresentação do projeto e documento técnico disponíveis abaixo.',
  },

  {
    id: 16,
    title: 'PROJETO ELETRICO PRAIA ARTIFICIAL',
    thumbnail: '/assets/videos/Thumbnail.png',
    videoUrl: '/assets/videos/PROJETOELETRICOPRAINHAARTIFICIAL.mp4',
    pdfUrl: '/assets/projects/pdf/PROJETOELETRICOPRAINHAARTIFICIAL.pdf',
    description: 'Apresentação do projeto e documento técnico disponíveis abaixo.',
  },

  {
    id: 17,
    title: 'PROJETO ELETRICO CHAVE DE TRANSFERENCIA',
    thumbnail: '/assets/videos/Thumbnail.png',
    videoUrl: '/assets/videos/PROJETOELETRICOALDEIAMURATU-CHAVEDETRANSFERENCIA.mp4',
    pdfUrl: '/assets/projects/pdf/PROJETOELETRICOALDEIAMURATU-CHAVEDETRANSFERENCIA.pdf',
    description: 'Apresentação do projeto e documento técnico disponíveis abaixo.',
  },
  
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (project: typeof projectsData[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <>
      <section id="projetos" className="relative px-4 py-24">
        <div className="mx-auto max-w-[1600px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
              Nossos Projetos
            </h2>
            <div className="mx-auto h-1 w-24 bg-navy"></div>
            <p className="mt-6 text-lg text-gray-300">
              Conheça nossos projetos executados com excelência
            </p>
          </motion.div>

          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={40}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            a11y={{ prevSlideMessage: 'Projeto anterior', nextSlideMessage: 'Próximo projeto', paginationBulletMessage: 'Ir para projeto {{index}}', slideLabelMessage: 'Projeto {{index}} de {{slidesLength}}' }}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 30,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 35,
              },
              1024: {
                slidesPerView: 2.5,
                spaceBetween: 40,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1536: {
                slidesPerView: 3.5,
                spaceBetween: 40,
              },
            }}
            className="projects-swiper"
          >
            {projectsData.map((project) => (
              <SwiperSlide key={project.id}>
                <ProjectCard
                  title={project.title}
                  thumbnail={project.thumbnail}
                  videoUrl={project.videoUrl}
                  onClick={() => handleCardClick(project)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />
    </>
  );
}
