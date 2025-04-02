
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Carlos Silva',
    role: 'Desenvolvedor Front-end',
    company: 'TechCorp',
    text: 'Os cursos da Alura transformaram minha carreira. Consegui migrar de área e hoje trabalho com o que amo.',
    avatar: 'CS'
  },
  {
    id: 2,
    name: 'Marina Oliveira',
    role: 'UX Designer',
    company: 'Design Studio',
    text: 'A metodologia e a qualidade dos instrutores são excepcionais. Aplico o que aprendi todos os dias.',
    avatar: 'MO'
  },
  {
    id: 3,
    name: 'Rafael Mendes',
    role: 'Cientista de Dados',
    company: 'DataInsight',
    text: 'A forma prática como os cursos são estruturados me ajudou a evoluir rapidamente em Data Science.',
    avatar: 'RM'
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-alura-black">
          O que dizem nossos alunos
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-none shadow-md">
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-alura-blue mb-4 opacity-50" />
                <p className="text-alura-darkgray mb-6">{testimonial.text}</p>
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src="" alt={testimonial.name} />
                    <AvatarFallback className="bg-alura-blue text-white">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-alura-darkgray">
                      {testimonial.role} · {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
