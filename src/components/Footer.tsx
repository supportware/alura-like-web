
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  const footerLinks = [
    {
      title: 'A Excel',
      links: ['Sobre a Excel', 'Carreiras', 'Imprensa', 'Blog', 'Parceiros']
    },
    {
      title: 'Cursos',
      links: ['Programação', 'Front-end', 'Data Science', 'DevOps', 'UX & Design', 'Mobile', 'Inovação & Gestão']
    },
    {
      title: 'Para Empresas',
      links: ['Educação Corporativa', 'Planos', 'Conheça Soluções', 'Clientes']
    },
    {
      title: 'Comunidade',
      links: ['Fórum', 'Artigos', 'Eventos', 'Podcast', 'Discord']
    }
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook' },
    { icon: Twitter, label: 'Twitter' },
    { icon: Instagram, label: 'Instagram' },
    { icon: Linkedin, label: 'LinkedIn' },
    { icon: Youtube, label: 'YouTube' }
  ];

  return (
    <footer className="bg-Excel-darkblue text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-6">Excel</h3>
            <p className="text-gray-300 mb-6">
              Uma plataforma completa de cursos online para você desenvolver suas habilidades em tecnologia.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((column, index) => (
            <div key={index}>
              <h4 className="font-bold mb-4 text-lg">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-300 text-sm">
          <p>© {new Date().getFullYear()} Excel. Todos os direitos reservados.</p>
          <div className="mt-4 space-x-4">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
