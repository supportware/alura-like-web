
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { OrderableList } from './OrderableList';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  BookOpen, Users, ThumbsUp, Trophy, GraduationCap, Award, 
  Briefcase, Heart, Clock, Star, Globe, Code, Laptop 
} from 'lucide-react';
import { Stat, fetchStats, createStat, updateStat, deleteStat, updateStatsOrder } from '@/services/supabase';

const icons = [
  { name: 'BookOpen', icon: BookOpen },
  { name: 'Users', icon: Users },
  { name: 'ThumbsUp', icon: ThumbsUp },
  { name: 'Trophy', icon: Trophy },
  { name: 'GraduationCap', icon: GraduationCap },
  { name: 'Award', icon: Award },
  { name: 'Briefcase', icon: Briefcase },
  { name: 'Heart', icon: Heart },
  { name: 'Clock', icon: Clock },
  { name: 'Star', icon: Star },
  { name: 'Globe', icon: Globe },
  { name: 'Code', icon: Code },
  { name: 'Laptop', icon: Laptop },
];

const StatsEditor = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentStat, setCurrentStat] = useState<Partial<Stat>>({
    title: '',
    value: '',
    icon: 'BookOpen',
  });
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

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

  const handleOpenAddDialog = () => {
    setCurrentStat({
      title: '',
      value: '',
      icon: 'BookOpen',
    });
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (stat: Stat) => {
    setCurrentStat({
      id: stat.id,
      title: stat.title,
      value: stat.value,
      icon: stat.icon
    });
    setIsEditing(true);
    setIsDialogOpen(true);
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
      }
      
      await loadStats();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Erro ao salvar estatística:', error);
      toast({
        title: 'Erro ao salvar',
        description: 'Ocorreu um erro ao salvar as alterações',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteStat = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este item?')) {
      try {
        const success = await deleteStat(id);
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
      }
    }
  };

  const renderStatItem = (stat: Stat) => {
    const IconComponent = icons.find(i => i.name === stat.icon)?.icon || BookOpen;
    
    return (
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-4">
          <IconComponent className="h-6 w-6" />
          <div>
            <p className="font-medium">{stat.title}</p>
            <p className="text-sm text-muted-foreground">{stat.value}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleOpenEditDialog(stat)}
          >
            Editar
          </Button>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={() => handleDeleteStat(stat.id)}
          >
            Excluir
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Alura em Números</h1>
        <Button onClick={handleOpenAddDialog}>
          <Plus className="mr-2 h-4 w-4" /> Adicionar Estatística
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <OrderableList 
          items={stats} 
          renderItem={renderStatItem}
          onOrderUpdate={updateStatsOrder}
        />
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Editar estatística' : 'Adicionar estatística'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Título</label>
              <Input
                id="title"
                value={currentStat.title || ''}
                onChange={(e) => setCurrentStat({ ...currentStat, title: e.target.value })}
                placeholder="Ex: Total de Alunos"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="value" className="text-sm font-medium">Valor</label>
              <Input
                id="value"
                value={currentStat.value || ''}
                onChange={(e) => setCurrentStat({ ...currentStat, value: e.target.value })}
                placeholder="Ex: 10.000+"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="icon" className="text-sm font-medium">Ícone</label>
              <Select
                value={currentStat.icon || 'BookOpen'}
                onValueChange={(value) => setCurrentStat({ ...currentStat, icon: value })}
              >
                <SelectTrigger id="icon">
                  <SelectValue placeholder="Selecione um ícone" />
                </SelectTrigger>
                <SelectContent>
                  {icons.map((icon) => (
                    <SelectItem key={icon.name} value={icon.name}>
                      <div className="flex items-center">
                        <icon.icon className="mr-2 h-4 w-4" />
                        <span>{icon.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSaveStat}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StatsEditor;
