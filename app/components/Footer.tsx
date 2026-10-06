import { Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-navy bg-dark/50 px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-2xl font-bold text-white">
              ELETRIC
            </h3>
            <p className="text-sm text-gray-400">
              Serviços Engenharia - Excelência em projetos elétricos desde 2019
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Navegação</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#sobre" className="break-all hover:text-blue-300 transition-colors">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#projetos" className="break-all hover:text-blue-300 transition-colors">
                  Projetos
                </a>
              </li>
              <li>
                <a href="#contato" className="break-all hover:text-blue-300 transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Contato</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-navy" />
                <a
                  href="mailto:eletricservicosengenharia1946@gmail.com"
                  className="break-all hover:text-blue-300 transition-colors"
                >
                  eletricservicosengenharia1946@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-navy" />
                <a
                  href="https://wa.me/5593992200097"
                  className="break-all hover:text-blue-300 transition-colors"
                >
                  +55 93 9220-0097
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-navy pt-8 text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Eletric Serviços Engenharia. Todos os direitos reservados. 58.165.764/0001-17
          </p>
          <p>
            &copy; DESENVOLVIDO POR EXPRESS TEHCNOLOGY
          </p>
        </div>
        
      </div>
    </footer>
  );
}
