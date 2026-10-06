'use client';

import { X, ExternalLink } from 'lucide-react';
import AccessibleDialog from './AccessibleDialog';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: { title: string; videoUrl: string; pdfUrl: string; description: string } | null;
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  if (!project) return null;
  return (
    <AccessibleDialog open={isOpen} onClose={onClose} labelledBy="project-title" className="w-[calc(100%-2rem)] max-w-7xl rounded-xl border border-navy bg-dark text-white">
      <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-navy bg-dark p-4 md:p-6">
        <h2 id="project-title" className="text-xl font-bold md:text-3xl">{project.title}</h2>
        <button type="button" onClick={onClose} aria-label="Fechar projeto" className="shrink-0 rounded-full bg-navy p-2"><X /></button>
      </div>
      <div className="grid gap-6 p-4 md:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,450px)]">
        <div className="min-w-0">
          <video key={project.videoUrl} src={project.videoUrl} controls playsInline preload="metadata"
            className="aspect-video w-full rounded-lg border border-navy bg-black object-contain">
            Seu navegador não reproduz este vídeo. <a href={project.videoUrl}>Abrir vídeo</a>
          </video>
          <p className="mt-4 leading-relaxed text-gray-300">{project.description}</p>
          <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-blue-300 underline">Abrir vídeo <ExternalLink size={16} /></a>
        </div>
        <div className="min-w-0">
          <h3 className="mb-3 text-lg font-semibold">Documento do projeto</h3>
          <a href={project.pdfUrl} target="_blank" rel="noopener noreferrer" className="mb-4 inline-flex items-center gap-2 text-blue-300 underline">Abrir PDF em nova aba <ExternalLink size={16} /></a>
          <iframe src={project.pdfUrl} title={`Documento: ${project.title}`} className="h-[55dvh] min-h-72 w-full rounded-lg border border-navy" />
        </div>
      </div>
    </AccessibleDialog>
  );
}
