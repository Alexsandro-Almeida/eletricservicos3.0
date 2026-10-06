'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import AccessibleDialog from './AccessibleDialog';

const visits = [
  { image: '/assets/visitas/galary.jpg', title: 'Visita técnica — registro 1' },
  { image: '/assets/visitas/galary2.webp', title: 'Visita técnica — registro 2' },
  { image: '/assets/visitas/galary4.jpg', title: 'Visita técnica — registro 3' },
  { image: '/assets/visitas/galary15.jpg', title: 'Visita técnica — registro 4' },
  { image: '/assets/visitas/galary19.jpg', title: 'Visita técnica — registro 5' },
  { image: '/assets/visitas/galary16.jpg', title: 'Visita técnica — registro 6' },
  { image: '/assets/visitas/galary9.jpg', title: 'Visita técnica — registro 7' },
  { image: '/assets/visitas/galary20.jpeg', title: 'Visita técnica — registro 8' },
];

export default function TechnicalVisitsGallery() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const selected = currentIndex === null ? null : visits[currentIndex];
  const navigate = (direction: number) => setCurrentIndex((index) => index === null ? null : (index + direction + visits.length) % visits.length);
  return (
    <section id="visitas" className="relative bg-gradient-to-b from-dark via-navy/5 to-dark px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">Galeria de Visitas Técnicas</h2>
          <div className="mx-auto h-1 w-24 bg-navy" />
          <p className="mt-6 text-lg text-gray-300">Acompanhe nosso trabalho em campo</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {visits.map((visit, index) => (
            <button type="button" key={visit.image} onClick={() => setCurrentIndex(index)} aria-label={`Ampliar ${visit.title.toLowerCase()}`}
              className="group relative aspect-square overflow-hidden rounded-lg border border-navy">
              <Image src={visit.image} alt={visit.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-dark to-transparent p-4 text-left text-sm text-white">{visit.title}</span>
              <Camera aria-hidden="true" className="absolute right-3 top-3 rounded-full bg-dark/80 p-1 text-white" />
            </button>
          ))}
        </div>
      </div>
      <AccessibleDialog open={selected !== null} onClose={() => setCurrentIndex(null)} labelledBy="visit-title" className="w-[calc(100%-2rem)] max-w-5xl rounded-xl border border-navy bg-dark text-white">
        {selected && (
          <div className="p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 id="visit-title" className="text-lg font-semibold">{selected.title}</h3>
              <button type="button" onClick={() => setCurrentIndex(null)} aria-label="Fechar fotografia" className="rounded-full bg-navy p-2"><X /></button>
            </div>
            <div className="relative h-[60dvh]">
              <Image src={selected.image} alt={selected.title} fill sizes="90vw" className="object-contain" />
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <button type="button" onClick={() => navigate(-1)} aria-label="Fotografia anterior" className="rounded-full bg-navy p-3"><ChevronLeft /></button>
              <p role="status" aria-live="polite">Foto {(currentIndex ?? 0) + 1} de {visits.length}</p>
              <button type="button" onClick={() => navigate(1)} aria-label="Próxima fotografia" className="rounded-full bg-navy p-3"><ChevronRight /></button>
            </div>
          </div>
        )}
      </AccessibleDialog>
    </section>
  );
}
