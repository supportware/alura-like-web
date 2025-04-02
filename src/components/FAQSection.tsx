
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Como funcionam os cursos da Alura?",
    answer: "Os cursos da Alura são 100% online e você pode assistir quantas vezes quiser, quando e onde quiser. Após se matricular, você tem acesso a todas as aulas, exercícios e projetos práticos."
  },
  {
    question: "Quanto tempo tenho para concluir um curso?",
    answer: "Não há prazo para concluir os cursos. Você pode estudar no seu próprio ritmo, e o acesso permanece disponível enquanto sua assinatura estiver ativa."
  },
  {
    question: "Os certificados são reconhecidos pelo mercado?",
    answer: "Sim, os certificados da Alura são reconhecidos pelo mercado de trabalho. Eles comprovam as habilidades e conhecimentos adquiridos, sendo um diferencial para o seu currículo."
  },
  {
    question: "Posso cancelar minha assinatura a qualquer momento?",
    answer: "Sim, você pode cancelar sua assinatura a qualquer momento. Após o cancelamento, você ainda terá acesso até o final do período pago."
  },
  {
    question: "Existe algum pré-requisito para fazer os cursos?",
    answer: "Alguns cursos possuem pré-requisitos, que são mencionados na descrição do curso. Mas também oferecemos diversos cursos para iniciantes, sem necessidade de conhecimento prévio."
  },
  {
    question: "Como funciona o suporte aos alunos?",
    answer: "Oferecemos suporte através do fórum de dúvidas em cada curso, onde professores e outros alunos podem ajudar. Além disso, temos uma comunidade ativa nas redes sociais."
  }
];

const FAQSection = () => {
  return (
    <section className="py-16 bg-alura-gray">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-alura-black">
          Perguntas Frequentes
        </h2>
        
        <div className="max-w-3xl mx-auto bg-white rounded-lg p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium text-left py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-alura-darkgray">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
