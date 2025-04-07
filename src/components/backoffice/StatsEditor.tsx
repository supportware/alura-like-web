
import React, { useState, useEffect } from 'react';
import { Loader2, Plus, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Stat, fetchStats, createStat, updateStat, deleteStat } from '@/services/supabase';
import StatForm from './stats/StatForm';
import DeleteStatDialog from './stats/DeleteStatDialog';

const StatsEditor = () => {
  const { toast } = useToast();
  const [stats, setStats] = useState<Stat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentStat, setCurrentStat] = useState<Partial<Stat>>({
    title: '',
    value: '',
    icon: 'BookOpen',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statToDelete, setStatToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setIsLoading(true);
    try {
      const data = await fetchStats();
      setStats(data);
    } catch (error) {
      toast({
        title: 'Erro ao carregar dados',
        description: 'Não foi possível carregar as estatísticas',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenAddForm = () => {
    setCurrentStat({
      title: '',
      value: '',
      icon: 'BookOpen',
    });
    setIsEditing(false);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (stat: Stat) => {
    setCurrentStat({
      id: stat.id,
      title: stat.title,
      value: stat.value,
      icon: stat.icon
    });
    setIsEditing(true);
    setIsFormOpen(true);
  };

  const handleOpenDeleteDialog = (id: string) => {
    setStatToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleSaveStat = async () => {
    if (!currentStat.title || !currentStat.value || !currentStat.icon) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor preencha todos os campos',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      if (isEditing && currentStat.id) {
        const updated = await updateStat(currentStat.id, {
          title: currentStat.title,
          value: currentStat.value,
          icon: currentStat.icon
        });
        
        if (!updated) {
          toast({
            title: 'Erro ao atualizar',
            description: 'Verifique sua conexão e permissões',
            variant: 'destructive',
          });
          return;
        }
        
        toast({
          title: 'Atualizado com sucesso',
          description: 'As alterações foram salvas',
        });
      } else {
        const created = await createStat({
          title: currentStat.title!,
          value: currentStat.value!,
          icon: currentStat.icon!
        });
        
        if (!created) {
          toast({
            title: 'Erro ao criar estatística',
            description: 'Problema com permissões de acesso ao banco de dados',
            variant: 'destructive',
          });
          return;
        }
        
        toast({
          title: 'Criado com sucesso',
          description: 'A nova estatística foi adicionada',
        });
      }
      
      await loadStats();
      setIsFormOpen(false);
    } catch (error) {
      console.error('Erro ao salvar estatística:', error);
      toast({
        title: 'Erro ao salvar',
        description: 'Ocorreu um erro ao salvar as alterações',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteStat = async () => {
    if (!statToDelete) return;
    
    setIsSubmitting(true);
    try {
      const success = await deleteStat(statToDelete);
      if (success) {
        toast({
          title: 'Excluído com sucesso',
          description: 'A estatística foi removida',
        });
        await loadStats();
      } else {
        toast({
          title: 'Erro ao excluir',
          description: 'Problema de permissão ao tentar excluir a estatística',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Erro ao excluir estatística:', error);
      toast({
        title: 'Erro ao excluir',
        description: 'Não foi possível excluir a estatística',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
      setIsDeleteDialogOpen(false);
      setStatToDelete(null);
    }
  };

  // Map icon names to components for display
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Excel em Números</h2>
        <Button onClick={handleOpenAddForm}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Estatística
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Carregando estatísticas...</span>
        </div>
      ) : (
        <Table>
          <TableHeader className="bg-secondary">
            <TableRow>
              <TableHead className="w-[100px]">Ícone</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stats.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  <div className="flex flex-col items-center text-muted-foreground">
                    <BarChart className="h-10 w-10 mb-2" />
                    Nenhuma estatística cadastrada
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              stats.map((stat) => (
                <TableRow key={stat.id}>
                  <TableCell>
                    <div className="flex items-center justify-center">
                      {renderIconComponent(stat.icon)}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{stat.title}</TableCell>
                  <TableCell>{stat.value}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleOpenEditForm(stat)}
                      className="inline-flex items-center justify-center mr-2"
                    >
                      Editar
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleOpenDeleteDialog(stat.id)}
                      className="text-red-500 hover:text-red-600 inline-flex items-center justify-center"
                    >
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}

      {/* Stat Form Dialog */}
      <StatForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        currentStat={currentStat}
        setCurrentStat={setCurrentStat}
        isEditing={isEditing}
        isSubmitting={isSubmitting}
        onSave={handleSaveStat}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteStatDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        isSubmitting={isSubmitting}
        onDelete={handleDeleteStat}
      />
    </div>
  );
};

export default StatsEditor;
