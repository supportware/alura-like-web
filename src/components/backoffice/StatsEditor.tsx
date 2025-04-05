
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Stat, fetchStats, createStat, updateStat, deleteStat } from '@/services/supabase';
import { PlusCircle, Edit, Trash2, Loader2 } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  BookOpen, Users, ThumbsUp, Trophy, GraduationCap, Award, 
  Briefcase, Heart, Clock, Star, Globe, Code, Laptop
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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

  const iconOptions = [
    { value: 'BookOpen', label: 'Livro', icon: BookOpen },
    { value: 'Users', label: 'Usuários', icon: Users },
    { value: 'ThumbsUp', label: 'Like', icon: ThumbsUp },
    { value: 'Trophy', label: 'Troféu', icon: Trophy },
    { value: 'GraduationCap', label: 'Formatura', icon: GraduationCap },
    { value: 'Award', label: 'Prêmio', icon: Award },
    { value: 'Briefcase', label: 'Trabalho', icon: Briefcase },
    { value: 'Heart', label: 'Coração', icon: Heart },
    { value: 'Clock', label: 'Relógio', icon: Clock },
    { value: 'Star', label: 'Estrela', icon: Star },
    { value: 'Globe', label: 'Globo', icon: Globe },
    { value: 'Code', label: 'Código', icon: Code },
    { value: 'Laptop', label: 'Laptop', icon: Laptop },
  ];

  const getIconComponent = (iconName: string) => {
    const icon = iconOptions.find(i => i.value === iconName);
    if (icon) {
      const IconComponent = icon.icon;
      return <IconComponent className="h-4 w-4" />;
    }
    return <BookOpen className="h-4 w-4" />;
  };

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
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : stats.length > 0 ? (
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
                          onClick={() => handleEditClick(stat)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => confirmDelete(stat.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center p-6 text-muted-foreground">
              Nenhuma estatística cadastrada. Clique em "Adicionar Nova" para começar.
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Editar Estatística' : 'Nova Estatística'}</DialogTitle>
            <DialogDescription>
              {isEditing
                ? 'Edite os detalhes da estatística.'
                : 'Adicione uma nova estatística ao site.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={currentStat.title || ''}
                onChange={(e) => setCurrentStat({ ...currentStat, title: e.target.value })}
                placeholder="Ex: Cursos"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="value">Valor *</Label>
              <Input
                id="value"
                value={currentStat.value || ''}
                onChange={(e) => setCurrentStat({ ...currentStat, value: e.target.value })}
                placeholder="Ex: 1.500+"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="icon">Ícone *</Label>
              <Select
                value={currentStat.icon}
                onValueChange={(value) => setCurrentStat({ ...currentStat, icon: value })}
              >
                <SelectTrigger id="icon">
                  <SelectValue placeholder="Selecione um ícone" />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        {option.icon && <option.icon className="h-4 w-4" />}
                        <span>{option.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? 'Atualizar' : 'Adicionar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta estatística? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default StatsEditor;
