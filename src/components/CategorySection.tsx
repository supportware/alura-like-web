
import React from 'react';
import { BookOpen, Code, MonitorSmartphone, Figma, FileText, Database } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    title: 'Tecnologia',
    description: 'Lógica, Python, PHP, Java, .NET e muito mais',
    icon: Code,
    color: 'bg-blue-100'
  },
  {
    title: 'Reforço escolar',
    description: 'Matemática, Português, Ciências, História',
    icon: MonitorSmartphone,
    color: 'bg-green-100'
  },
  {
    title: 'UX & Design',
    description: 'Figma, Adobe XD, UI Design, UX Research',
    icon: Figma,
    color: 'bg-purple-100'
  },
  {
    title: 'Vendas',
    description: 'Técnicas de vendas, Negociação, Marketing',
    icon: Database,
    color: 'bg-yellow-100'
  },
  {
    title: 'Marketing',
    description: 'Marketing Digital, SEO, Redes Sociais',
    icon: FileText,
    color: 'bg-red-100'
  },
  {
    title: 'Concursos públicos',
    description: 'Prepare-se para concursos e provas públicas',
    icon: BookOpen,
    color: 'bg-indigo-100'
  }
];

const CategorySection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-Excel-black">
          Explore por área de conhecimento
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Card key={index} className="category-card border hover:cursor-pointer">
              <CardContent className="p-6 flex items-start">
                <div className={`${category.color} p-3 rounded-full mr-4`}>
                  <category.icon className="h-6 w-6 text-Excel-blue" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">{category.title}</h3>
                  <p className="text-Excel-darkgray">{category.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
