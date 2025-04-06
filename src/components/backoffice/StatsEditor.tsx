
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
  ArrowUp, 
  ArrowDown, 
  UserCheck, 
  Award, 
  Star, 
  Bell,
  BookOpen,
  Calendar,
  // Certificate was not found in lucide-react, replacing with Award as a fallback
  Award as Certificate,
  Pencil
} from 'lucide-react';
import { 
  Stat, 
  fetchStats, 
  createStat, 
  updateStat, 
  deleteStat,
  updateStatsOrder 
} from '@/services/supabase';

// Same icon set as before
const icons = [
  { name: 'ArrowUp', icon: ArrowUp },
  { name: 'ArrowDown', icon: ArrowDown },
  { name: 'UserCheck', icon: UserCheck },
  { name: 'Award', icon: Award },
  { name: 'Star', icon: Star },
  { name: 'Bell', icon: Bell },
  { name: 'BookOpen', icon: BookOpen },
  { name: 'Calendar', icon: Calendar },
  { name: 'Certificate', icon: Certificate },
  { name: 'Pencil', icon: Pencil },
];

const StatsEditor = () => {
  const [stats, setStats] = useState<Stat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentStat, setCurrentStat] = useState<Partial<Stat>>({
    label: '',
    value: '',
    icon: 'Star'
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
      console.error('Error loading stats:', error);
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
      label: '',
      value: '',
      icon: 'Star'
    });
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (stat: Stat) => {
    setCurrentStat({
      id: stat.id,
      label: stat.label,
      value: stat.value,
      icon: stat.icon || 'Star'
    });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleSaveStat = async () => {
    if (!currentStat.label || !currentStat.value) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor preencha todos os campos',
        variant: 'destructive',
      });
      return;
    }

    try {
      if (isEditing && currentStat.id) {
        await updateStat(currentStat.id, {
          label: currentStat.label,
          value: currentStat.value,
          icon: currentStat.icon
        });
        toast({
          title: 'Atualizado com sucesso',
          description: 'As alterações foram salvas',
        });
      } else {
        await createStat({
          label: currentStat.label!,
          value: currentStat.value!,
          icon: currentStat.icon || null
        });
        toast({
          title: 'Criado com sucesso',
          description: 'Nova estatística adicionada',
        });
      }
      setIsDialogOpen(false);
      await loadStats();
    } catch (error) {
      console.error('Error saving stat:', error);
      toast({
        title: 'Erro ao salvar',
        description: 'Não foi possível salvar as alterações',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteStat = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este item?')) {
      try {
        await deleteStat(id);
        toast({
          title: 'Excluído com sucesso',
          description: 'O item foi removido',
        });
        await loadStats();
      } catch (error) {
        console.error('Error deleting stat:', error);
        toast({
          title: 'Erro ao excluir',
          description: 'Não foi possível excluir o item',
          variant: 'destructive',
        });
      }
    }
  };

  const renderStatItem = (stat: Stat) => {
    const IconComponent = icons.find(i => i.name === stat.icon)?.icon;
    
    return (
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-4">
          {IconComponent && <IconComponent className="h-6 w-6" />}
          <div>
            <p className="font-medium">{stat.label}</p>
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
        <h1 className="text-2xl font-bold">Estatísticas</h1>
        <Button onClick={handleOpenAddDialog}>
          <Plus className="mr-2 h-4 w-4" /> Adicionar
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <OrderableList<Stat>
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
              <label htmlFor="label" className="text-sm font-medium">Título</label>
              <Input
                id="label"
                value={currentStat.label || ''}
                onChange={(e) => setCurrentStat({ ...currentStat, label: e.target.value })}
                placeholder="Ex: Alunos formados"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="value" className="text-sm font-medium">Valor</label>
              <Input
                id="value"
                value={currentStat.value || ''}
                onChange={(e) => setCurrentStat({ ...currentStat, value: e.target.value })}
                placeholder="Ex: 18.000+"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="icon" className="text-sm font-medium">Ícone</label>
              <Select
                value={currentStat.icon || 'Star'}
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
