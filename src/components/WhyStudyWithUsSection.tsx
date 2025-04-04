
import React from 'react';
import { studyReasons } from '@/data/studyReasons';
import ReasonCard from './ReasonCard';

const WhyStudyWithUsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-alura-black">
          Por que estudar conosco
        </h2>
        <p className="text-alura-darkgray text-lg text-center max-w-3xl mx-auto mb-12">
          Descubra como a Alura pode ajudar você a alcançar seus objetivos 
          de carreira e desenvolvimento profissional
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {studyReasons.map((reason, index) => (
            <ReasonCard 
              key={index}
              title={reason.title}
              description={reason.description}
              icon={reason.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyStudyWithUsSection;
