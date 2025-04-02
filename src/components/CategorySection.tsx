
import React from 'react';
import { BookOpen, Code, MonitorSmartphone, Figma, FileText, Database } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    title: 'Programação',
    description: 'Lógica, Python, PHP, Java, .NET e muito mais',
    icon: Code,
    color: 'bg-blue-100'
  },
  {
    title: 'Front-end',
    description: 'HTML, CSS, JavaScript, React, Angular',
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
    title: 'DevOps',
    description: 'AWS, Azure, Docker, Kubernetes, CI/CD',
    icon: Database,
    color: 'bg-yellow-100'
  },
  {
    title: 'Inovação & Gestão',
    description: 'Agile, Lean, Liderança, Gestão de Produtos',
    icon: FileText,
    color: 'bg-red-100'
  },
  {
    title: 'Certificação',
    description: 'Prepare-se para certificações do mercado',
    icon: BookOpen,
    color: 'bg-indigo-100'
  }
];

const CategorySection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-alura-black">
          Explore por área de conhecimento
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Card key={index} className="category-card border hover:cursor-pointer">
              <CardContent className="p-6 flex items-start">
                <div className={`${category.color} p-3 rounded-full mr-4`}>
                  <category.icon className="h-6 w-6 text-alura-blue" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">{category.title}</h3>
                  <p className="text-alura-darkgray">{category.description}</p>
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
