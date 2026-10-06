'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-screen items-center justify-center px-4">
      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="mb-4 text-6xl font-bold tracking-tight text-white md:text-8xl">
            ELETRIC
          </h1>
          <h2 className="text-3xl font-light tracking-widest text-navy md:text-5xl">
            SERVIÇOS ENGENHARIA
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mx-auto mb-8 max-w-2xl text-lg text-gray-300 md:text-xl"
        >
          Excelência em projetos elétricos com conformidade total às normas NBR.
          Transformando energia em soluções inteligentes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="#projetos"
            className="group relative overflow-hidden rounded-full border-2 border-navy bg-navy px-8 py-4 font-semibold text-white transition-all hover:bg-transparent"
          >
            <span className="relative z-10">Ver Projetos</span>
          </a>
          <a
            href="#contato"
            className="rounded-full border-2 border-white px-8 py-4 font-semibold text-white transition-all hover:bg-white hover:text-dark"
          >
            Fale Conosco
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.2, duration: 0.8 },
          y: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown size={40} className="text-navy" />
      </motion.div>
    </section>
  );
}
