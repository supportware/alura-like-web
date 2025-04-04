
import { School, CheckCircle, Monitor, Shield, PenTool, Clock } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface StudyReason {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const studyReasons: StudyReason[] = [
  {
    title: 'Escola com 28 anos de experiência',
    description: 'Mais de 28 anos de atuação no mercado educacional, com expertise comprovada.',
    icon: School
  },
  {
    title: 'Treinamento Individualizado',
    description: 'Conteúdo forjado por pedagogos e especialistas em cada área, com atenção personalizada.',
    icon: CheckCircle
  },
  {
    title: 'Acesso multiplataforma',
    description: 'Assista às aulas em qualquer dispositivo, quantas vezes quiser',
    icon: Monitor
  },
  {
    title: 'Certificados válidos',
    description: 'Certificados reconhecidos pelo mercado de trabalho para impulsionar sua carreira',
    icon: Shield
  },
  {
    title: 'Professores especialistas',
    description: 'Aprenda com profissionais que atuam no mercado e conhecem as demandas reais',
    icon: PenTool
  },
  {
    title: 'Garantia de Aprendizado',
    description: 'Aulas e exercícios interativos, NÃO SÃO VÍDEO-AULAS. Metodologia prática e eficiente.',
    icon: Clock
  }
];
