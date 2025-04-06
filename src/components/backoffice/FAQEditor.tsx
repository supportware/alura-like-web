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
import { FAQ, fetchFAQs, createFAQ, updateFAQ, deleteFAQ, updateFAQsOrder } from '@/services/supabase';
import { Edit, Trash2, Plus, Loader2, GripVertical } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Componente para linha arrastável
const SortableFAQRow = ({ id, faq, onEdit, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
    opacity: isDragging ? 0.7 : 1,
  };

  return (
    <TableRow ref={setNodeRef} style={style} className={isDragging ? 'bg-muted' : ''}>
      <TableCell className="w-[40px] cursor-grab" {...attributes} {...listeners}>
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </TableCell>
      <TableCell className="font-medium">{faq.question}</TableCell>
      <TableCell className="max-w-md truncate">{faq.answer}</TableCell>
      <TableCell className="text-right space-x-2">
        <Button variant="ghost" size="icon" onClick={() => onEdit(faq)}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onDelete(faq.id)}>
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

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
  const [isImporting, setIsImporting] = useState(false);
  const [isSavingOrder, setIsSavingOrder] = useState(false);
  
  // Configuração dos sensores para drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 }, // Ativa o arrasto após mover 5px
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  
  // FAQs padrão para importar quando o banco estiver vazio
  const defaultFaqs = [
    {
      question: "Como funcionam os cursos da Excel?",
      answer: "Os cursos da Excel são 100% online e você pode assistir quantas vezes quiser, quando e onde quiser. Após se matricular, você tem acesso a todas as aulas, exercícios e projetos práticos.",
    },
    {
      question: "Quanto tempo tenho para concluir um curso?",
      answer: "Não há prazo para concluir os cursos. Você pode estudar no seu próprio ritmo, e o acesso permanece disponível enquanto sua assinatura estiver ativa.",
    },
    {
      question: "Os certificados são reconhecidos pelo mercado?",
      answer: "Sim, os certificados da Excel são reconhecidos pelo mercado de trabalho. Eles comprovam as habilidades e conhecimentos adquiridos, sendo um diferencial para o seu currículo.",
    }
  ];

  // Carregar FAQs uma vez na montagem do componente
  useEffect(() => {
    const loadAndCheckForImport = async () => {
      await loadFAQs();
      
      // Verificar após o carregamento se precisamos importar FAQs padrão
      setTimeout(() => {
        if (faqs.length === 0 && !isLoading) {
          importDefaultFAQs();
        }
      }, 2000);
    };
    
    loadAndCheckForImport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Executar apenas na montagem do componente

  const loadFAQs = async () => {
    setIsLoading(true);
    try {
      const data = await fetchFAQs();
      console.log('FAQs carregadas:', data);
      
      // Remover possíveis duplicatas pelo texto da pergunta
      const uniqueFaqs = data.reduce((acc, current) => {
        const isDuplicate = acc.find(item => item.question === current.question);
        if (!isDuplicate) {
          acc.push(current);
        }
        return acc;
      }, [] as FAQ[]);
      
      setFaqs(uniqueFaqs);
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
  
  // Função para lidar com o fim do arrasto (reordenação)
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setFaqs((items) => {
        // Encontrar as posições dos itens
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        
        // Reordenar a lista
        const newItems = arrayMove(items, oldIndex, newIndex);
        
        // Salvar a nova ordem no banco
        saveNewOrder(newItems);
        
        return newItems;
      });
    }
  };
  
  // Salvar a nova ordem no banco de dados
  const saveNewOrder = async (items: FAQ[]) => {
    if (isSavingOrder) return;
    
    setIsSavingOrder(true);
    try {
      const orderedIds = items.map(item => item.id);
      const success = await updateFAQsOrder(orderedIds);
      
      if (!success) {
        toast({
          title: 'Erro ao salvar ordem',
          description: 'Não foi possível atualizar a ordem das perguntas',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Erro ao salvar ordem:', error);
      toast({
        title: 'Erro ao salvar ordem',
        description: 'Erro inesperado ao atualizar a ordem',
        variant: 'destructive',
      });
    } finally {
      setIsSavingOrder(false);
    }
  };

  const importDefaultFAQs = async () => {
    if (isImporting) return;
    
    setIsImporting(true);
    try {
      toast({
        title: 'Importando perguntas padrão',
        description: 'Adicionando perguntas frequentes básicas...',
      });

      const results = await Promise.all(
        defaultFaqs.map(faq => createFAQ(faq))
      );

      const successCount = results.filter(Boolean).length;
      
      if (successCount > 0) {
        toast({
          title: 'Perguntas importadas',
          description: `${successCount} perguntas foram adicionadas com sucesso`,
        });
        loadFAQs();
      } else {
        toast({
          title: 'Falha na importação',
          description: 'Não foi possível importar as perguntas. Verifique suas permissões.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Erro ao importar perguntas padrão:', error);
      toast({
        title: 'Erro na importação',
        description: 'Ocorreu um erro ao importar as perguntas padrão',
        variant: 'destructive',
      });
    } finally {
      setIsImporting(false);
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
        const updated = await updateFAQ(currentFAQ.id, {
          question: currentFAQ.question,
          answer: currentFAQ.answer,
        });
        
        if (updated) {
          toast({
            title: 'Atualizado com sucesso',
            description: 'As alterações foram salvas',
          });
          setIsDialogOpen(false);
          await loadFAQs();
        } else {
          toast({
            title: 'Erro ao atualizar',
            description: 'Problema de permissão no banco de dados',
            variant: 'destructive',
          });
        }
      } else {
        const created = await createFAQ({
          question: currentFAQ.question!,
          answer: currentFAQ.answer!,
        });
        
        if (created) {
          toast({
            title: 'Criado com sucesso',
            description: 'Nova pergunta frequente adicionada',
          });
          setIsDialogOpen(false);
          await loadFAQs();
        } else {
          toast({
            title: 'Erro ao criar',
            description: 'Problema de permissão no banco de dados',
            variant: 'destructive',
          });
        }
      }
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
      setIsLoading(true);
      try {
        const success = await deleteFAQ(id);
        if (success) {
          toast({
            title: 'Excluído com sucesso',
            description: 'A pergunta frequente foi removida',
          });
          await loadFAQs();
        } else {
          toast({
            title: 'Erro ao excluir',
            description: 'Problema de permissão ao tentar excluir',
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error('Error deleting FAQ:', error);
        toast({
          title: 'Erro ao excluir',
          description: 'Não foi possível excluir a pergunta frequente',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciamento de Perguntas Frequentes</h1>
        <div className="flex gap-2">
          {faqs.length === 0 && (
            <Button variant="outline" onClick={importDefaultFAQs} disabled={isImporting}>
              {isImporting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Importando...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  Importar Padrões
                </>
              )}
            </Button>
          )}
          <Button onClick={handleOpenAddDialog}>
            <Plus className="mr-2 h-4 w-4" /> Adicionar
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"></TableHead>
              <TableHead>Pergunta</TableHead>
              <TableHead>Resposta</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {faqs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  Nenhuma pergunta frequente encontrada
                </TableCell>
              </TableRow>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext 
                  items={faqs.map(faq => faq.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {faqs.map((faq) => (
                    <SortableFAQRow 
                      key={faq.id}
                      id={faq.id}
                      faq={faq}
                      onEdit={handleOpenEditDialog}
                      onDelete={handleDeleteFAQ}
                    />
                  ))}
                </SortableContext>
              </DndContext>
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
