
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReasonCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

const ReasonCard = ({ title, description, icon: Icon, className }: ReasonCardProps) => {
  return (
    <div className={cn("bg-alura-gray p-8 rounded-lg", className)}>
      <div className="text-alura-blue mb-4">
        <Icon className="h-10 w-10" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-alura-black">{title}</h3>
      <p className="text-alura-darkgray">{description}</p>
    </div>
  );
};

export default ReasonCard;
