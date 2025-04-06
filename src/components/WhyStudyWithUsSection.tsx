
import React, { useState, useEffect } from 'react';
import ReasonCard from './ReasonCard';
import { fetchStudyReasons, StudyReason } from '@/services/supabase';
import { School, CheckCircle, Monitor, Shield, PenTool, Clock } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

// Mapeamento de nomes de ícones para componentes
const iconMap: Record<string, LucideIcon> = {
  'School': School,
  'CheckCircle': CheckCircle,
  'Monitor': Monitor,
  'Shield': Shield,
  'PenTool': PenTool,
  'Clock': Clock
};

const WhyStudyWithUsSection = () => {
  const [reasons, setReasons] = useState<StudyReason[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReasons = async () => {
      setLoading(true);
      const data = await fetchStudyReasons();
      setReasons(data);
      setLoading(false);
    };

    loadReasons();
  }, []);

  // Função para obter o componente de ícone com base no nome do ícone
  const getIconComponent = (iconName: string): LucideIcon => {
    return iconMap[iconName] || School; // Fallback para School se o ícone não for encontrado
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-Excel-black">
          Por que estudar conosco
        </h2>
        <p className="text-Excel-darkgray text-lg text-center max-w-3xl mx-auto mb-12">
          Descubra como a Excel pode ajudar você a alcançar seus objetivos 
          de carreira e desenvolvimento profissional
        </p>
        
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-Excel-blue"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason) => {
              const IconComponent = getIconComponent(reason.icon);
              return (
                <ReasonCard 
                  key={reason.id}
                  title={reason.title}
                  description={reason.description}
                  icon={IconComponent}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default WhyStudyWithUsSection;
