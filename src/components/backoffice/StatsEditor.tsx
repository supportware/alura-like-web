
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Stat, fetchStats, createStat, updateStat, deleteStat } from '@/services/supabase';
import { PlusCircle } from 'lucide-react';
import StatsList from './stats/StatsList';
import StatForm from './stats/StatForm';
import DeleteStatDialog from './stats/DeleteStatDialog';

const StatsEditor = () => {
  const { toast } = useToast();
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentStat, setCurrentStat] = useState<Partial<Stat>>({
    title: '',
    value: '',
    icon: 'BookOpen',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [statToDelete, setStatToDelete] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    try {
      const data = await fetchStats();
      console.log('Stats loaded in editor:', data);
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar as estatísticas.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewClick = () => {
    setCurrentStat({
      title: '',
      value: '',
      icon: 'BookOpen',
    });
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleEditClick = (stat: Stat) => {
    setCurrentStat(stat);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!currentStat.title || !currentStat.value || !currentStat.icon) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      if (isEditing && currentStat.id) {
        await updateStat(currentStat.id, {
          title: currentStat.title,
          value: currentStat.value,
          icon: currentStat.icon,
        });
        toast({
          title: 'Sucesso',
          description: 'Estatística atualizada com sucesso!',
        });
      } else {
        await createStat({
          title: currentStat.title || '',
          value: currentStat.value || '',
          icon: currentStat.icon || 'BookOpen',
        });
        toast({
          title: 'Sucesso',
          description: 'Nova estatística adicionada com sucesso!',
        });
      }
      setIsDialogOpen(false);
      loadStats();
    } catch (error) {
      console.error('Error saving stat:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar a estatística.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDelete = (id: string) => {
    setStatToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!statToDelete) return;
    
    setIsSubmitting(true);
    try {
      await deleteStat(statToDelete);
      toast({
        title: 'Sucesso',
        description: 'Estatística excluída com sucesso!',
      });
      loadStats();
      setIsDeleteDialogOpen(false);
      setStatToDelete(null);
    } catch (error) {
      console.error('Error deleting stat:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir a estatística.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciamento de Estatísticas</h1>
        <Button onClick={handleAddNewClick}>
          <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Nova
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Estatísticas</CardTitle>
          <CardDescription>
            Gerencie as estatísticas exibidas na seção "Alura em números" do site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StatsList 
            stats={stats} 
            loading={loading} 
            onEditClick={handleEditClick} 
            onDeleteClick={confirmDelete} 
          />
        </CardContent>
      </Card>

      <StatForm 
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        currentStat={currentStat}
        setCurrentStat={setCurrentStat}
        isEditing={isEditing}
        isSubmitting={isSubmitting}
        onSave={handleSave}
      />

      <DeleteStatDialog 
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        isSubmitting={isSubmitting}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default StatsEditor;
