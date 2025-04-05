
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FAQ, fetchFAQs, createFAQ, updateFAQ, deleteFAQ } from '@/services/supabase';
import { PlusCircle, Edit, Trash2, Loader2 } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
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

const FAQEditor = () => {
  const { toast } = useToast();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentFAQ, setCurrentFAQ] = useState<Partial<FAQ>>({ question: '', answer: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    setLoading(true);
    try {
      const data = await fetchFAQs();
      console.log('FAQs loaded in editor:', data);
      setFaqs(data);
    } catch (error) {
      console.error('Error loading FAQs:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar as perguntas frequentes.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddNewClick = () => {
    setCurrentFAQ({ question: '', answer: '' });
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleEditClick = (faq: FAQ) => {
    setCurrentFAQ(faq);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!currentFAQ.question || !currentFAQ.answer) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      if (isEditing && currentFAQ.id) {
        await updateFAQ(currentFAQ.id, {
          question: currentFAQ.question,
          answer: currentFAQ.answer,
        });
        toast({
          title: 'Sucesso',
          description: 'FAQ atualizado com sucesso!',
        });
      } else {
        await createFAQ({
          question: currentFAQ.question || '',
          answer: currentFAQ.answer || '',
        });
        toast({
          title: 'Sucesso',
          description: 'Nova FAQ adicionada com sucesso!',
        });
      }
      setIsDialogOpen(false);
      loadFAQs();
    } catch (error) {
      console.error('Error saving FAQ:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar o FAQ.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id: string) => {
    setFaqToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!faqToDelete) return;
    
    setLoading(true);
    try {
      await deleteFAQ(faqToDelete);
      toast({
        title: 'Sucesso',
        description: 'FAQ excluída com sucesso!',
      });
      loadFAQs();
      setIsDeleteDialogOpen(false);
      setFaqToDelete(null);
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir o FAQ.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciamento de Perguntas Frequentes</h1>
        <Button onClick={handleAddNewClick}>
          <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Nova
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Perguntas Frequentes</CardTitle>
          <CardDescription>
            Gerencie as perguntas frequentes exibidas no site.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading && faqs.length === 0 ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : faqs.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pergunta</TableHead>
                  <TableHead>Resposta</TableHead>
                  <TableHead className="w-[100px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {faqs.map((faq) => (
                  <TableRow key={faq.id}>
                    <TableCell className="font-medium">{faq.question}</TableCell>
                    <TableCell className="max-w-md truncate">{faq.answer}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={() => handleEditClick(faq)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => confirmDelete(faq.id)}
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
              Nenhum FAQ cadastrado. Clique em "Adicionar Nova" para começar.
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Editar FAQ' : 'Nova Pergunta Frequente'}</DialogTitle>
            <DialogDescription>
              {isEditing
                ? 'Edite os detalhes da pergunta frequente.'
                : 'Adicione uma nova pergunta frequente ao site.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="question">Pergunta *</Label>
              <Input
                id="question"
                value={currentFAQ.question || ''}
                onChange={(e) => setCurrentFAQ({ ...currentFAQ, question: e.target.value })}
                placeholder="Digite a pergunta"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="answer">Resposta *</Label>
              <Textarea
                id="answer"
                value={currentFAQ.answer || ''}
                onChange={(e) => setCurrentFAQ({ ...currentFAQ, answer: e.target.value })}
                placeholder="Digite a resposta"
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
              Tem certeza que deseja excluir esta FAQ? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FAQEditor;
