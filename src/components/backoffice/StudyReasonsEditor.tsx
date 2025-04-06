
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
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  School, 
  CheckCircle, 
  Monitor, 
  Shield, 
  PenTool, 
  Clock 
} from 'lucide-react';
import { 
  StudyReason, 
  fetchStudyReasons, 
  createStudyReason, 
  updateStudyReason, 
  deleteStudyReason,
  updateStudyReasonsOrder 
} from '@/services/supabase';

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
  const [currentReason, setCurrentReason] = useState<Partial<StudyReason>>({
    title: '',
    description: '',
    icon: 'School'
  });
  const [isEditing, setIsEditing] = useState(false);
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
      await loadReasons();
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
        await loadReasons();
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

  const renderReasonItem = (reason: StudyReason) => {
    const IconComponent = icons.find(i => i.name === reason.icon)?.icon || School;
    
    return (
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-4">
          <IconComponent className="h-6 w-6" />
          <div>
            <p className="font-medium">{reason.title}</p>
            <p className="text-sm text-muted-foreground line-clamp-2">{reason.description}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleOpenEditDialog(reason)}
          >
            Editar
          </Button>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={() => handleDeleteReason(reason.id)}
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
        <h1 className="text-2xl font-bold">Por que estudar conosco</h1>
        <Button onClick={handleOpenAddDialog}>
          <Plus className="mr-2 h-4 w-4" /> Adicionar
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <OrderableList<StudyReason>
          items={reasons}
          renderItem={renderReasonItem}
          onOrderUpdate={updateStudyReasonsOrder}
        />
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
