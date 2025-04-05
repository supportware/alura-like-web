
import React from 'react';
import { Loader2, Edit, Trash2, BookOpen, Users, ThumbsUp, Trophy, GraduationCap, Award, 
  Briefcase, Heart, Clock, Star, Globe, Code, Laptop } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Stat } from '@/services/supabase';

interface StatsListProps {
  stats: Stat[];
  loading: boolean;
  onEditClick: (stat: Stat) => void;
  onDeleteClick: (id: string) => void;
}

const StatsList = ({
  stats,
  loading,
  onEditClick,
  onDeleteClick,
}: StatsListProps) => {
  const iconMap: Record<string, React.FC<any>> = {
    BookOpen,
    Users,
    ThumbsUp,
    Trophy,
    GraduationCap,
    Award,
    Briefcase,
    Heart,
    Clock,
    Star,
    Globe,
    Code,
    Laptop
  };

  const getIconComponent = (iconName: string) => {
    const IconComponent = iconMap[iconName] || BookOpen;
    return <IconComponent className="h-4 w-4" />;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (stats.length === 0) {
    return (
      <div className="text-center p-6 text-muted-foreground">
        Nenhuma estatística cadastrada. Clique em "Adicionar Nova" para começar.
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Ícone</TableHead>
          <TableHead>Título</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead className="w-[100px]">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stats.map((stat) => (
          <TableRow key={stat.id}>
            <TableCell>
              <div className="p-2 bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center text-primary">
                {getIconComponent(stat.icon)}
              </div>
            </TableCell>
            <TableCell className="font-medium">{stat.title}</TableCell>
            <TableCell>{stat.value}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => onEditClick(stat)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => onDeleteClick(stat.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default StatsList;
