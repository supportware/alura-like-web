
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, Loader2 } from 'lucide-react';
import { fetchTestimonials, Testimonial } from '@/services/supabase';

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const data = await fetchTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error('Error loading testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTestimonials();
  }, []);

  const defaultTestimonials = [
    {
      id: '1',
      name: 'Carlos Silva',
      role: 'Desenvolvedor Front-end',
      company: 'TechCorp',
      content: 'Os cursos da Alura transformaram minha carreira. Consegui migrar de área e hoje trabalho com o que amo.',
      image_url: '',
      created_at: '',
      updated_at: ''
    },
    {
      id: '2',
      name: 'Marina Oliveira',
      role: 'UX Designer',
      company: 'Design Studio',
      content: 'A metodologia e a qualidade dos instrutores são excepcionais. Aplico o que aprendi todos os dias.',
      image_url: '',
      created_at: '',
      updated_at: ''
    },
    {
      id: '3',
      name: 'Rafael Mendes',
      role: 'Cientista de Dados',
      company: 'DataInsight',
      content: 'A forma prática como os cursos são estruturados me ajudou a evoluir rapidamente em Data Science.',
      image_url: '',
      created_at: '',
      updated_at: ''
    }
  ];

  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-alura-black">
          O que dizem nossos alunos
        </h2>
        
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-none shadow-md">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-alura-blue mb-4 opacity-50" />
                  <p className="text-alura-darkgray mb-6">{testimonial.content}</p>
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={testimonial.image_url || ""} alt={testimonial.name} />
                      <AvatarFallback className="bg-alura-blue text-white">
                        {getInitials(testimonial.name)}
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
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
