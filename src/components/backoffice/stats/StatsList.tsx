
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Stat } from '@/services/supabase';

interface StatsListProps {
  stats: Stat[];
  isLoading: boolean;
  onEdit: (stat: Stat) => void;
  onDelete: (id: string) => void;
}

const StatsList: React.FC<StatsListProps> = ({ 
  stats, 
  isLoading, 
  onEdit, 
  onDelete 
}) => {
  // Map icon names to components
  const renderIconComponent = (iconName: string) => {
    const icons = {
      BookOpen: '📚',
      Users: '👥',
      ThumbsUp: '👍',
      Trophy: '🏆',
      GraduationCap: '🎓',
      Award: '🏅',
      Briefcase: '💼',
      Heart: '❤️',
      Clock: '⏰',
      Star: '⭐',
      Globe: '🌎',
      Code: '💻',
      Laptop: '💻',
    };
    
    return icons[iconName as keyof typeof icons] || '📊';
  };

  if (stats.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {isLoading ? 'Carregando estatísticas...' : 'Nenhuma estatística encontrada.'}
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-20">Ícone</TableHead>
          <TableHead>Título</TableHead>
          <TableHead>Valor</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stats.map((stat) => (
          <TableRow key={stat.id}>
            <TableCell className="text-center text-xl">
              {renderIconComponent(stat.icon)}
            </TableCell>
            <TableCell className="font-medium">{stat.title}</TableCell>
            <TableCell>{stat.value}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(stat)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => onDelete(stat.id)}
                >
                  <Trash2 className="h-4 w-4" />
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
