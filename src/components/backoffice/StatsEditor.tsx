import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { BookOpen, Users, ThumbsUp, Trophy, GraduationCap, Award, Briefcase, 
  Heart, Clock, Star, Globe, Code, Laptop, Edit, Trash2, Plus, Loader2, BarChart } from 'lucide-react';
import { Stat, fetchStats, createStat, updateStat, deleteStat } from '@/services/supabase';

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
  const { toast } = useToast();
  const [stats, setStats] = useState<Stat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentStat, setCurrentStat] = useState<Partial<Stat>>({
    title: '',
    value: '',
    icon: 'BookOpen',
  });
  const [isEditing, setIsEditing] = useState(false);
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
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    }
  };

  const renderIconComponent = (iconName: string) => {
    const iconObj = icons.find(i => i.name === iconName);
    const IconComponent = iconObj?.icon || BookOpen;
    return <IconComponent className="h-5 w-5" />;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Excel em Números</h2>
        <Button onClick={handleOpenAddDialog}>
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
                      onClick={() => handleOpenEditDialog(stat)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDeleteStat(stat.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
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
