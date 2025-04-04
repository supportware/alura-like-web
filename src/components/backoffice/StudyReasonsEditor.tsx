
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Edit, 
  Trash, 
  Plus,
  Save,
  X
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { studyReasons, StudyReason } from '@/data/studyReasons';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// This is a mock function that would save to your actual data store
const saveReasons = async (reasons: StudyReason[]) => {
  // In a real app, this would update your database
  console.log('Saving reasons:', reasons);
  return new Promise(resolve => setTimeout(resolve, 1000));
};

const formSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório'),
  description: z.string().min(1, 'A descrição é obrigatória'),
  icon: z.string().min(1, 'O ícone é obrigatório')
});

type FormValues = z.infer<typeof formSchema>;

const StudyReasonsEditor = () => {
  const { toast } = useToast();
  const [reasons, setReasons] = useState<StudyReason[]>(studyReasons);
  const [editingReason, setEditingReason] = useState<StudyReason | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      icon: 'School'
    }
  });

  const onSubmit = async (values: FormValues) => {
    // In a real implementation, you would handle icon selection properly
    // This is just a mock implementation using the first icon from studyReasons as a placeholder
    
    if (editingReason) {
      // Update existing reason - ensure we maintain the required properties
      const updatedReasons = reasons.map(reason => 
        reason === editingReason 
          ? { 
              ...reason,
              title: values.title, 
              description: values.description 
            } 
          : reason
      );
      setReasons(updatedReasons);
    } else {
      // Add new reason - ensure we create a proper StudyReason object with all required properties
      const newReason: StudyReason = { 
        title: values.title, 
        description: values.description, 
        icon: studyReasons[0].icon // Just using the first icon as a placeholder
      };
      setReasons([...reasons, newReason]);
    }
    
    setIsDialogOpen(false);
    setEditingReason(null);
    form.reset();
    
    toast({
      title: editingReason ? "Razão atualizada" : "Nova razão adicionada",
      description: "Suas alterações foram salvas com sucesso.",
    });
  };

  const handleEditReason = (reason: StudyReason) => {
    setEditingReason(reason);
    form.setValue('title', reason.title);
    form.setValue('description', reason.description);
    form.setValue('icon', 'School'); // Just a placeholder, would be dynamic in real app
    setIsDialogOpen(true);
  };

  const handleDeleteReason = (reasonToDelete: StudyReason) => {
    setReasons(reasons.filter(reason => reason !== reasonToDelete));
    toast({
      title: "Razão removida",
      description: "A razão foi removida com sucesso.",
    });
  };

  const handleAddNewReason = () => {
    setEditingReason(null);
    form.reset();
    setIsDialogOpen(true);
  };

  const handleSaveAllReasons = async () => {
    setLoading(true);
    try {
      await saveReasons(reasons);
      toast({
        title: "Todas as alterações salvas",
        description: "As razões para estudar foram atualizadas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar as alterações.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Por que estudar conosco</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleAddNewReason}
          >
            <Plus className="mr-2 h-4 w-4" />
            Adicionar
          </Button>
          <Button
            onClick={handleSaveAllReasons}
            disabled={loading}
          >
            <Save className="mr-2 h-4 w-4" />
            Salvar todas alterações
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead className="w-[100px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reasons.map((reason, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{reason.title}</TableCell>
              <TableCell>{reason.description}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditReason(reason)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteReason(reason)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingReason ? 'Editar Razão' : 'Adicionar Nova Razão'}
            </DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Título da razão" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input placeholder="Descrição detalhada" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ícone</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do ícone" {...field} />
                    </FormControl>
                    <FormMessage />
                    <p className="text-xs text-muted-foreground">
                      Em uma implementação real, seria um seletor de ícones
                    </p>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancelar
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Salvar
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudyReasonsEditor;
