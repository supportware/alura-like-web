
import React, { useState, useEffect } from 'react';
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
  X,
  Loader2
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
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
import { 
  fetchStudyReasons, 
  StudyReason, 
  saveStudyReason, 
  updateStudyReason, 
  deleteStudyReason 
} from '@/services/supabase';

const formSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório'),
  description: z.string().min(1, 'A descrição é obrigatória'),
  icon: z.string().min(1, 'O ícone é obrigatório')
});

type FormValues = z.infer<typeof formSchema>;

const StudyReasonsEditor = () => {
  const { toast } = useToast();
  const [reasons, setReasons] = useState<StudyReason[]>([]);
  const [editingReason, setEditingReason] = useState<StudyReason | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      icon: 'School'
    }
  });

  // Carregar dados iniciais
  useEffect(() => {
    loadReasons();
  }, []);

  const loadReasons = async () => {
    setIsInitialLoading(true);
    const data = await fetchStudyReasons();
    setReasons(data);
    setIsInitialLoading(false);
  };

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      if (editingReason) {
        // Atualizar razão existente
        const updated = await updateStudyReason(editingReason.id, values);
        if (updated) {
          setReasons(prev => prev.map(r => r.id === editingReason.id ? updated : r));
          toast({
            title: "Razão atualizada",
            description: "Suas alterações foram salvas com sucesso.",
          });
        }
      } else {
        // Adicionar nova razão
        const newReason = await saveStudyReason(values);
        if (newReason) {
          setReasons(prev => [...prev, newReason]);
          toast({
            title: "Nova razão adicionada",
            description: "A razão foi adicionada com sucesso.",
          });
        }
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar as alterações.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      setIsDialogOpen(false);
      setEditingReason(null);
      form.reset();
    }
  };

  const handleEditReason = (reason: StudyReason) => {
    setEditingReason(reason);
    form.setValue('title', reason.title);
    form.setValue('description', reason.description);
    form.setValue('icon', reason.icon);
    setIsDialogOpen(true);
  };

  const handleDeleteReason = async (reasonToDelete: StudyReason) => {
    const success = await deleteStudyReason(reasonToDelete.id);
    if (success) {
      setReasons(reasons.filter(reason => reason.id !== reasonToDelete.id));
      toast({
        title: "Razão removida",
        description: "A razão foi removida com sucesso.",
      });
    }
  };

  const handleAddNewReason = () => {
    setEditingReason(null);
    form.reset();
    setIsDialogOpen(true);
  };

  if (isInitialLoading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-alura-blue" />
      </div>
    );
  }

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
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Ícone</TableHead>
            <TableHead className="w-[100px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reasons.map((reason) => (
            <TableRow key={reason.id}>
              <TableCell className="font-medium">{reason.title}</TableCell>
              <TableCell>{reason.description}</TableCell>
              <TableCell>{reason.icon}</TableCell>
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
                      Ícones disponíveis: School, CheckCircle, Monitor, Shield, PenTool, Clock
                    </p>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                  disabled={loading}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancelar
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
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
