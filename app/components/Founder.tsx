'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Award, Briefcase, GraduationCap } from 'lucide-react';

export default function Founder() {
  return (
    <section className="relative px-4 py-24 bg-gradient-to-b from-dark via-navy/5 to-dark">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            CEO & Fundador
          </h2>
          <div className="mx-auto h-1 w-24 bg-navy"></div>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-navy to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative">
                <Image
                  src="/assets/founder/foto-fundador.png"
                  alt="Fundador da Eletric Serviços Engenharia"
                  className="relative rounded-lg border-4 border-navy w-full max-w-md h-auto object-cover shadow-2xl"
                  width={600}
                  height={600}
                  sizes="(max-width: 1024px) 90vw, 448px"
                />
                <div className="absolute -bottom-6 -right-6 bg-navy text-white p-4 rounded-lg shadow-xl border-2 border-white">
                  <p className="text-sm font-semibold">Desde 2019</p>
                  <p className="text-2xl font-bold">6+ anos</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h3 className="mb-2 text-3xl font-bold text-white">
                Eng. Ruan Lastrine
              </h3>
              <p className="text-xl text-navy font-semibold">
                Fundador e Engenheiro Eletricista
              </p>
            </div>

            <p className="text-lg leading-relaxed text-gray-300">
              Com mais de <strong className="text-white">6 anos de experiência</strong> em 
              engenharia elétrica, nosso fundador construiu a Eletric Serviços Engenharia com 
              base em três pilares fundamentais: <strong className="text-navy">excelência técnica</strong>, 
              <strong className="text-navy"> segurança absoluta</strong> e{' '}
              <strong className="text-navy">compromisso com o cliente</strong>.
            </p>

            <p className="text-lg leading-relaxed text-gray-300">
              Sua visão é sempre manter 
              os mais altos padrões de qualidade e conformidade com as normas brasileiras.
            </p>

            <div className="grid gap-4 sm:grid-cols-3 pt-4">
              <div className="flex flex-col items-center p-4 rounded-lg bg-navy/10 border border-navy/30 hover:bg-navy/20 transition-all">
                <GraduationCap className="h-8 w-8 text-navy mb-2" />
                <p className="text-sm font-semibold text-white">CREA Ativo</p>
                <p className="text-xs text-gray-400">Engenheiro</p>
              </div>

              <div className="flex flex-col items-center p-4 rounded-lg bg-navy/10 border border-navy/30 hover:bg-navy/20 transition-all">
                <Award className="h-8 w-8 text-green-400 mb-2" />
                <p className="text-sm font-semibold text-white">6+ Anos</p>
                <p className="text-xs text-gray-400">Experiência</p>
              </div>

              <div className="flex flex-col items-center p-4 rounded-lg bg-navy/10 border border-navy/30 hover:bg-navy/20 transition-all">
                <Briefcase className="h-8 w-8 text-blue-400 mb-2" />
                <p className="text-sm font-semibold text-white">200+ Projetos</p>
                <p className="text-xs text-gray-400">Concluídos</p>
              </div>
            </div>

            <div className="mt-8 p-6 rounded-lg bg-gradient-to-r from-navy/20 to-transparent border-l-4 border-navy">
              <p className="text-lg italic text-gray-300">
                &ldquo;A engenharia elétrica não é apenas sobre cabos e circuitos.
                É sobre iluminar vidas, dar poder aos sonhos e construir um futuro mais seguro.&rdquo;

                <br />
                <br />
                &ldquo;Onde há eletricidade, haverá luz no futuro.&rdquo;
              </p>
              <p className="mt-3 text-sm font-semibold text-navy">
                - Ruan Lastrine
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
