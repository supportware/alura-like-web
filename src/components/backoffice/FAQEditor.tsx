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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { FAQ, fetchFAQs, createFAQ, updateFAQ, deleteFAQ } from '@/services/supabase';
import { Edit, Trash2, Plus, Loader2 } from 'lucide-react';

const FAQEditor = () => {
  const { toast } = useToast();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentFAQ, setCurrentFAQ] = useState<Partial<FAQ>>({
    question: '',
    answer: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    setIsLoading(true);
    try {
      const data = await fetchFAQs();
      console.log('FAQs carregadas:', data);
      setFaqs(data);
    } catch (error) {
      console.error('Error loading FAQs:', error);
      toast({
        title: 'Erro ao carregar dados',
        description: 'Não foi possível carregar as perguntas frequentes',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenAddDialog = () => {
    setCurrentFAQ({
      question: '',
      answer: '',
    });
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (faq: FAQ) => {
    setCurrentFAQ({
      id: faq.id,
      question: faq.question,
      answer: faq.answer,
    });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleSaveFAQ = async () => {
    if (!currentFAQ.question || !currentFAQ.answer) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor preencha todos os campos',
        variant: 'destructive',
      });
      return;
    }

    try {
      if (isEditing && currentFAQ.id) {
        await updateFAQ(currentFAQ.id, {
          question: currentFAQ.question,
          answer: currentFAQ.answer,
        });
        toast({
          title: 'Atualizado com sucesso',
          description: 'As alterações foram salvas',
        });
      } else {
        await createFAQ({
          question: currentFAQ.question!,
          answer: currentFAQ.answer!,
        });
        toast({
          title: 'Criado com sucesso',
          description: 'Nova pergunta frequente adicionada',
        });
      }
      setIsDialogOpen(false);
      loadFAQs();
    } catch (error) {
      console.error('Error saving FAQ:', error);
      toast({
        title: 'Erro ao salvar',
        description: 'Não foi possível salvar as alterações',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteFAQ = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este item?')) {
      try {
        await deleteFAQ(id);
        toast({
          title: 'Excluído com sucesso',
          description: 'A pergunta frequente foi removida',
        });
        loadFAQs();
      } catch (error) {
        console.error('Error deleting FAQ:', error);
        toast({
          title: 'Erro ao excluir',
          description: 'Não foi possível excluir a pergunta frequente',
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciamento de Perguntas Frequentes</h1>
        <Button onClick={handleOpenAddDialog}>
          <Plus className="mr-2 h-4 w-4" /> Adicionar
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pergunta</TableHead>
              <TableHead>Resposta</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {faqs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                  Nenhuma pergunta frequente encontrada
                </TableCell>
              </TableRow>
            ) : (
              faqs.map((faq) => (
                <TableRow key={faq.id}>
                  <TableCell className="font-medium">{faq.question}</TableCell>
                  <TableCell className="max-w-md truncate">{faq.answer}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenEditDialog(faq)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteFAQ(faq.id)}>
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
              {isEditing ? 'Editar pergunta frequente' : 'Adicionar pergunta frequente'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="question" className="text-sm font-medium">Pergunta</label>
              <Input
                id="question"
                value={currentFAQ.question || ''}
                onChange={(e) => setCurrentFAQ({ ...currentFAQ, question: e.target.value })}
                placeholder="Ex: Como funciona o curso?"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="answer" className="text-sm font-medium">Resposta</label>
              <Textarea
                id="answer"
                value={currentFAQ.answer || ''}
                onChange={(e) => setCurrentFAQ({ ...currentFAQ, answer: e.target.value })}
                placeholder="Descreva a resposta para esta pergunta"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSaveFAQ}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FAQEditor;
