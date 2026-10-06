import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MotionProvider from './components/MotionProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://eletricservicosengenharia.com.br'),
  title: "Eletric Serviços Engenharia",
  description: "Soluções em engenharia elétrica com excelência e conformidade NBR",
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Eletric Serviços Engenharia',
    description: 'Conheça nossos projetos e soluções em engenharia elétrica.',
    url: '/',
    locale: 'pt_BR',
    type: 'website',
    images: [{ url: '/assets/logos/logo1.jpg', alt: 'Eletric Serviços Engenharia' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
