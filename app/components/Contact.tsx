'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    website: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '', website: '' });
      } else {
        const result = await response.json().catch(() => null);
        setErrorMessage(result?.error || 'Não foi possível enviar. Tente novamente ou use o WhatsApp.');
        setSubmitStatus('error');
      }
    } catch {
      setErrorMessage('Falha de conexão. Tente novamente ou use o WhatsApp.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);

    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contato" className="relative px-4 py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Entre em Contato
          </h2>
          <div className="mx-auto h-1 w-24 bg-navy"></div>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="mb-8 text-2xl font-bold text-white">
              Vamos conversar sobre seu projeto
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-navy/20 p-3">
                  <Mail className="h-6 w-6 text-navy" />
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-white">Email</h4>
                  <a
                    href="mailto:eletricservicosengenharia1946@gmail.com"
                    className="break-all text-gray-300 hover:text-blue-300"
                  >
                    eletricservicosengenharia1946@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-navy/20 p-3">
                  <Phone className="h-6 w-6 text-navy" />
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-white">WhatsApp</h4>
                  <a
                    href="https://wa.me/5593992200097"
                    className="break-all text-gray-300 hover:text-blue-300"
                  >
                    +55 93 9220-0097
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-full bg-navy/20 p-3">
                  <MapPin className="h-6 w-6 text-navy" />
                </div>
                <div>
                  <h4 className="mb-1 font-semibold text-white">Atendimento</h4>
                  <p className="text-gray-300">
                    Atendemos em todo o Brasil
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-6"
            aria-busy={isSubmitting}
          >
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" value={formData.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
            </div>
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-semibold text-white">
                Nome
              </label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name" minLength={2} maxLength={120}
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-navy bg-dark/50 px-4 py-3 text-white placeholder-gray-500 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy"
                placeholder="Seu nome completo"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email" maxLength={254}
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-navy bg-dark/50 px-4 py-3 text-white placeholder-gray-500 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-white">
                Telefone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                autoComplete="tel" maxLength={30} pattern="[+0-9 ().-]{8,30}"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-navy bg-dark/50 px-4 py-3 text-white placeholder-gray-500 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy"
                placeholder="(00) 00000-0000"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-semibold text-white">
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                minLength={10} maxLength={5000}
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full rounded-lg border border-navy bg-dark/50 px-4 py-3 text-white placeholder-gray-500 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy"
                placeholder="Conte-nos sobre seu projeto..."
              />
            </div>

            <p className="text-sm text-gray-400">Usaremos seus dados para responder à sua solicitação. Evite enviar informações sensíveis.</p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-6 py-4 font-semibold text-white transition-all hover:bg-navy/80 disabled:opacity-50"
            >
              {isSubmitting ? (
                'Enviando...'
              ) : (
                <>
                  Enviar Mensagem
                  <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>

            {submitStatus === 'success' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                role="status"
                className="text-center text-green-400"
              >
                Mensagem aceita para envio! Entraremos em contato em breve.
              </motion.p>
            )}

            {submitStatus === 'error' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                role="alert"
                className="text-center text-red-400"
              >
                {errorMessage}
              </motion.p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
