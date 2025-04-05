
import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fetchFAQs, FAQ } from '@/services/supabase';
import { Loader2 } from 'lucide-react';

const FAQSection = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFAQs = async () => {
      try {
        const data = await fetchFAQs();
        console.log('FAQs loaded:', data);
        setFaqs(data);
        setError(null);
      } catch (err) {
        console.error('Error loading FAQs:', err);
        setError('Não foi possível carregar as perguntas frequentes. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    loadFAQs();
  }, []);

  // Fallback data if no FAQs from database
  const defaultFaqs = [
    {
      id: '1',
      question: "Como funcionam os cursos da Alura?",
      answer: "Os cursos da Alura são 100% online e você pode assistir quantas vezes quiser, quando e onde quiser. Após se matricular, você tem acesso a todas as aulas, exercícios e projetos práticos.",
      created_at: '',
      updated_at: ''
    },
    {
      id: '2',
      question: "Quanto tempo tenho para concluir um curso?",
      answer: "Não há prazo para concluir os cursos. Você pode estudar no seu próprio ritmo, e o acesso permanece disponível enquanto sua assinatura estiver ativa.",
      created_at: '',
      updated_at: ''
    },
    {
      id: '3',
      question: "Os certificados são reconhecidos pelo mercado?",
      answer: "Sim, os certificados da Alura são reconhecidos pelo mercado de trabalho. Eles comprovam as habilidades e conhecimentos adquiridos, sendo um diferencial para o seu currículo.",
      created_at: '',
      updated_at: ''
    }
  ];

  const displayFaqs = faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <section className="py-16 bg-alura-gray">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-alura-black">
          Perguntas Frequentes
        </h2>
        
        <div className="max-w-3xl mx-auto bg-white rounded-lg p-6">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center p-6 text-red-500">
              <p>{error}</p>
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {displayFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                  <AccordionTrigger className="text-lg font-medium text-left py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-alura-darkgray">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
