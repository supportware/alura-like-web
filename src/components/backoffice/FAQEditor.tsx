
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FAQ, fetchFAQs, createFAQ, updateFAQ, deleteFAQ } from '@/services/supabase';
import { PlusCircle } from 'lucide-react';
import FAQForm from './faq/FAQForm';
import FAQList from './faq/FAQList';
import DeleteFAQDialog from './faq/DeleteFAQDialog';

const FAQEditor = () => {
  const { toast } = useToast();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentFAQ, setCurrentFAQ] = useState<Partial<FAQ>>({ question: '', answer: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleUpdateField = (field: string, value: string) => {
    setCurrentFAQ((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSubmitting(true);
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
      setIsSubmitting(false);
    }
  };

  const confirmDelete = (id: string) => {
    setFaqToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!faqToDelete) return;
    
    setIsSubmitting(true);
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
      setIsSubmitting(false);
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
          <FAQList 
            faqs={faqs} 
            loading={loading} 
            onEdit={handleEditClick} 
            onDelete={confirmDelete} 
          />
        </CardContent>
      </Card>

      <FAQForm 
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        currentFAQ={currentFAQ}
        isEditing={isEditing}
        isSubmitting={isSubmitting}
        onSave={handleSave}
        onUpdateField={handleUpdateField}
      />

      <DeleteFAQDialog 
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        isSubmitting={isSubmitting}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default FAQEditor;
