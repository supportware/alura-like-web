
import React, { useState, useEffect } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
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
import { School, CheckCircle, Monitor, Shield, PenTool, Clock, Plus, Pencil, Trash2 } from 'lucide-react';
import { IconMap } from '@/lib/utils';
import { fetchStudyReasons, createStudyReason, updateStudyReason, deleteStudyReason, StudyReason } from '@/services/supabase';

const icons = [
  { name: 'School', icon: School },
  { name: 'CheckCircle', icon: CheckCircle },
  { name: 'Monitor', icon: Monitor },
  { name: 'Shield', icon: Shield },
  { name: 'PenTool', icon: PenTool },
  { name: 'Clock', icon: Clock },
];

const StudyReasonsEditor = () => {
  const [reasons, setReasons] = useState<StudyReason[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentReason, setCurrentReason] = useState<Partial<StudyReason>>({
    title: '',
    description: '',
    icon: 'School'
  });
  const { toast } = useToast();

  useEffect(() => {
    loadReasons();
  }, []);

  const loadReasons = async () => {
    setIsLoading(true);
    try {
      const data = await fetchStudyReasons();
      setReasons(data);
    } catch (error) {
      console.error('Error loading reasons:', error);
      toast({
        title: 'Erro ao carregar dados',
        description: 'Não foi possível carregar as razões para estudar',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenAddDialog = () => {
    setCurrentReason({
      title: '',
      description: '',
      icon: 'School'
    });
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (reason: StudyReason) => {
    setCurrentReason({
      id: reason.id,
      title: reason.title,
      description: reason.description,
      icon: reason.icon
    });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleSaveReason = async () => {
    if (!currentReason.title || !currentReason.description || !currentReason.icon) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor preencha todos os campos',
        variant: 'destructive',
      });
      return;
    }

    try {
      if (isEditing && currentReason.id) {
        await updateStudyReason(currentReason.id, {
          title: currentReason.title,
          description: currentReason.description,
          icon: currentReason.icon
        });
        toast({
          title: 'Atualizado com sucesso',
          description: 'As alterações foram salvas',
        });
      } else {
        await createStudyReason({
          title: currentReason.title!,
          description: currentReason.description!,
          icon: currentReason.icon!
        });
        toast({
          title: 'Criado com sucesso',
          description: 'Nova razão para estudar adicionada',
        });
      }
      setIsDialogOpen(false);
      loadReasons();
    } catch (error) {
      console.error('Error saving reason:', error);
      toast({
        title: 'Erro ao salvar',
        description: 'Não foi possível salvar as alterações',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteReason = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este item?')) {
      try {
        await deleteStudyReason(id);
        toast({
          title: 'Excluído com sucesso',
          description: 'O item foi removido',
        });
        loadReasons();
      } catch (error) {
        console.error('Error deleting reason:', error);
        toast({
          title: 'Erro ao excluir',
          description: 'Não foi possível excluir o item',
          variant: 'destructive',
        });
      }
    }
  };

  const renderIconComponent = (iconName: string) => {
    const IconComponent = IconMap[iconName as keyof typeof IconMap] || School;
    return <IconComponent className="h-5 w-5" />;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Por que estudar conosco</h1>
        <Button onClick={handleOpenAddDialog}>
          <Plus className="mr-2 h-4 w-4" /> Adicionar
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-Excel-blue"></div>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ícone</TableHead>
              <TableHead>Título</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reasons.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  Nenhum item encontrado
                </TableCell>
              </TableRow>
            ) : (
              reasons.map((reason) => (
                <TableRow key={reason.id}>
                  <TableCell>
                    <div className="flex items-center justify-center">
                      {renderIconComponent(reason.icon)}
                    </div>
                  </TableCell>
                  <TableCell>{reason.title}</TableCell>
                  <TableCell className="max-w-xs truncate">{reason.description}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenEditDialog(reason)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteReason(reason.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
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
              {isEditing ? 'Editar razão para estudar' : 'Adicionar razão para estudar'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Título</label>
              <Input
                id="title"
                value={currentReason.title || ''}
                onChange={(e) => setCurrentReason({ ...currentReason, title: e.target.value })}
                placeholder="Ex: Treinamento individualizado"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Descrição</label>
              <Textarea
                id="description"
                value={currentReason.description || ''}
                onChange={(e) => setCurrentReason({ ...currentReason, description: e.target.value })}
                placeholder="Descreva brevemente esta razão"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="icon" className="text-sm font-medium">Ícone</label>
              <Select
                value={currentReason.icon || 'School'}
                onValueChange={(value) => setCurrentReason({ ...currentReason, icon: value })}
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
            <Button onClick={handleSaveReason}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudyReasonsEditor;
