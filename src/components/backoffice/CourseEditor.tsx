import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Course, 
  fetchCourses, 
  createCourse, 
  updateCourse, 
  deleteCourse 
} from '@/services/supabase';
import { supabase } from '@/integrations/supabase/client';
import { PlusCircle, Edit, Trash2, Loader2, FileImage, Upload, X, Image as ImageIcon } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const colorOptions = [
  { value: 'blue', label: 'Azul' },
  { value: 'green', label: 'Verde' },
  { value: 'purple', label: 'Roxo' },
  { value: 'red', label: 'Vermelho' },
  { value: 'orange', label: 'Laranja' },
  { value: 'yellow', label: 'Amarelo' },
  { value: 'pink', label: 'Rosa' },
  { value: 'indigo', label: 'Índigo' },
  { value: 'cyan', label: 'Ciano' },
  { value: 'teal', label: 'Turquesa' },
];

const levelOptions = [
  { value: 'iniciante', label: 'Iniciante' },
  { value: 'intermediario', label: 'Intermediário' },
  { value: 'avancado', label: 'Avançado' },
];

const categoryOptions = [
  { value: 'desenvolvimento', label: 'Desenvolvimento' },
  { value: 'design', label: 'Design' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'dados', label: 'Dados' },
  { value: 'produto', label: 'Produto' },
  { value: 'negocios', label: 'Negócios' },
  { value: 'ux', label: 'UX/UI' },
];

const CourseEditor = () => {
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Partial<Course>>({
    title: '',
    instructor: '',
    level: 'iniciante',
    hours: 0,
    image_url: '',
    category: 'desenvolvimento',
    badge_color: 'blue',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadCourses = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchCourses();
      setCourses(data);
    } catch (error) {
      console.error('Error loading courses:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível carregar os cursos.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  const handleAddNewClick = () => {
    setCurrentCourse({
      title: '',
      instructor: '',
      level: 'iniciante',
      hours: 0,
      image_url: '',
      category: 'desenvolvimento',
      badge_color: 'blue',
    });
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleEditClick = (course: Course) => {
    setCurrentCourse(course);
    setIsEditing(true);
    setIsDialogOpen(true);
    
    // Se o curso já tiver uma imagem, mostra o preview
    if (course.image_url) {
      setImagePreview(course.image_url);
    } else {
      setImagePreview(null);
    }
    setImageFile(null);
  };

  const handleSave = async () => {
    if (!currentCourse.title || !currentCourse.instructor || 
        !currentCourse.category || !currentCourse.level) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Preencha todos os campos obrigatórios.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      // Se tiver um arquivo de imagem selecionado, faz o processamento
      let imageUrl = currentCourse.image_url;
      
      if (imageFile) {
        setIsUploading(true);
        try {
          // Cria um elemento de canvas para redimensionar a imagem
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const img = new Image();
          
          // Aguarda o carregamento da imagem
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = URL.createObjectURL(imageFile);
          });
          
          // Define o tamanho do canvas para 300x180
          canvas.width = 300;
          canvas.height = 180;
          
          // Desenha a imagem redimensionada no canvas
          ctx?.drawImage(img, 0, 0, 300, 180);
          
          // Converte o canvas para uma URL de dados base64
          const base64Image = canvas.toDataURL('image/webp', 0.9);
          console.log('Imagem convertida para Base64:', base64Image.substring(0, 50) + '...');
          
          // Usa a URL de dados diretamente
          imageUrl = base64Image;
          console.log('Usando URL de dados base64 em vez de fazer upload para o Storage');
        } catch (error) {
          console.error('Erro ao processar a imagem:', error);
          toast({
            title: 'Erro no processamento',
            description: 'Não foi possível processar a imagem. Por favor, tente novamente.',
            variant: 'destructive',
          });
          setLoading(false);
          return; // Sai da função se o processamento falhar
        } finally {
          setIsUploading(false);
        }
      }

      // Converte horas para número
      const hoursValue = typeof currentCourse.hours === 'string' 
        ? parseFloat(currentCourse.hours) 
        : currentCourse.hours || 0;

      // Preparar objeto de dados para salvar
      const courseData = {
        title: currentCourse.title || '',
        instructor: currentCourse.instructor || '',
        level: currentCourse.level || 'iniciante',
        hours: hoursValue,
        image_url: imageUrl || '',
        category: currentCourse.category || 'desenvolvimento',
        badge_color: currentCourse.badge_color || 'blue',
      };

      console.log('Dados a serem salvos:', courseData);

      let success = false;

      if (isEditing && currentCourse.id) {
        // Atualizar curso existente
        console.log(`Atualizando curso com ID: ${currentCourse.id}`);
        
        try {
          // Usar as funções auxiliares em vez do cliente Supabase direto
          const result = await updateCourse(currentCourse.id, courseData);
          console.log('Resultado da atualização:', result);
          
          if (result) {
            success = true;
            toast({
              title: 'Sucesso',
              description: 'Curso atualizado com sucesso.',
            });
          } else {
            throw new Error('Não foi possível atualizar o curso');
          }
        } catch (updateError) {
          console.error('Erro específico na atualização:', updateError);
          throw updateError;
        }
      } else {
        // Criar novo curso
        console.log('Criando novo curso');
        
        try {
          const result = await createCourse(courseData);
          console.log('Resultado da criação:', result);
          
          if (result) {
            success = true;
            toast({
              title: 'Sucesso',
              description: 'Curso adicionado com sucesso.',
            });
          } else {
            throw new Error('Não foi possível criar o curso');
          }
        } catch (createError) {
          console.error('Erro específico na criação:', createError);
          throw createError;
        }
      }
      
      if (success) {
        // Recarregar a lista de cursos
        console.log('Recarregando lista de cursos...');
        try {
          await loadCourses();
          console.log('Lista de cursos atualizada com sucesso');
          
          // Fechar o diálogo e redefinir os estados
          setIsDialogOpen(false);
          setImageFile(null);
          setImagePreview(null);
        } catch (loadError) {
          console.error('Erro ao recarregar cursos:', loadError);
          // Continua mesmo se falhar ao recarregar
        }
      }
    } catch (error) {
      console.error('Erro completo:', error);
      toast({
        title: 'Erro',
        description: isEditing 
          ? 'Não foi possível atualizar o curso.' 
          : 'Não foi possível adicionar o curso.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir este curso?')) {
      return;
    }

    setLoading(true);
    try {
      await deleteCourse(id);
      toast({
        title: 'Sucesso',
        description: 'Curso excluído com sucesso.',
      });
      loadCourses();
    } catch (error) {
      console.error('Error deleting course:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível excluir o curso.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getBadgeStyle = (color: string) => {
    return `bg-${color}-100 text-${color}-800 dark:bg-${color}-900 dark:text-${color}-300`;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Verifica o tipo do arquivo
    if (!file.type.includes('image/')) {
      toast({
        title: 'Tipo de arquivo inválido',
        description: 'Por favor, selecione uma imagem.',
        variant: 'destructive',
      });
      return;
    }
    
    // Tamanho máximo: 2MB
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: 'Arquivo muito grande',
        description: 'O tamanho máximo permitido é 2MB.',
        variant: 'destructive',
      });
      return;
    }
    
    // Atualiza o estado com o arquivo selecionado
    setImageFile(file);
    
    // Cria uma URL para preview da imagem
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };
  
  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Gerenciamento de Cursos</CardTitle>
              <CardDescription>
                Adicione, edite e remova cursos da plataforma
              </CardDescription>
            </div>
            <Button onClick={handleAddNewClick}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Novo Curso
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading && courses.length === 0 ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Instrutor</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Nível</TableHead>
                  <TableHead>Duração (h)</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      Nenhum curso encontrado. Clique em "Novo Curso" para adicionar.
                    </TableCell>
                  </TableRow>
                ) : (
                  courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {course.image_url ? (
                            <img 
                              src={course.image_url} 
                              alt={course.title} 
                              className="h-8 w-8 object-cover rounded"
                            />
                          ) : (
                            <div className="h-8 w-8 bg-muted rounded flex items-center justify-center">
                              <FileImage className="h-4 w-4 text-muted-foreground" />
                            </div>
                          )}
                          {course.title}
                        </div>
                      </TableCell>
                      <TableCell>{course.instructor}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={getBadgeStyle(course.badge_color)}
                        >
                          {categoryOptions.find(c => c.value === course.category)?.label || course.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {levelOptions.find(l => l.value === course.level)?.label || course.level}
                      </TableCell>
                      <TableCell>{course.hours} horas</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEditClick(course)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDelete(course.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Editar Curso' : 'Adicionar Novo Curso'}</DialogTitle>
            <DialogDescription>
              {isEditing 
                ? 'Edite as informações do curso abaixo.' 
                : 'Preencha as informações do novo curso.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título do Curso *</Label>
              <Input
                id="title"
                value={currentCourse.title || ''}
                onChange={(e) => setCurrentCourse({ ...currentCourse, title: e.target.value })}
                placeholder="Introdução ao React"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="instructor">Instrutor *</Label>
              <Input
                id="instructor"
                value={currentCourse.instructor || ''}
                onChange={(e) => setCurrentCourse({ ...currentCourse, instructor: e.target.value })}
                placeholder="Nome do instrutor"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Categoria *</Label>
                <Select
                  value={currentCourse.category || 'desenvolvimento'}
                  onValueChange={(value) => setCurrentCourse({ ...currentCourse, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="level">Nível *</Label>
                <Select
                  value={currentCourse.level || 'iniciante'}
                  onValueChange={(value) => setCurrentCourse({ ...currentCourse, level: value })}
                >
                  <SelectTrigger id="level">
                    <SelectValue placeholder="Selecione um nível" />
                  </SelectTrigger>
                  <SelectContent>
                    {levelOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="hours">Duração (horas) *</Label>
                <Input
                  id="hours"
                  type="number"
                  min="0"
                  step="0.5"
                  value={currentCourse.hours || 0}
                  onChange={(e) => setCurrentCourse({ 
                    ...currentCourse, 
                    hours: e.target.value === '' ? 0 : parseFloat(e.target.value) 
                  })}
                  placeholder="10"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="badge_color">Cor do Badge *</Label>
                <Select
                  value={currentCourse.badge_color || 'blue'}
                  onValueChange={(value) => setCurrentCourse({ ...currentCourse, badge_color: value })}
                >
                  <SelectTrigger id="badge_color">
                    <SelectValue placeholder="Selecione uma cor" />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image_upload">Imagem do Curso (300x180 WebP)</Label>
              <div className="flex gap-2 items-center">
                <Input
                  id="image_upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {imageFile ? 'Alterar imagem' : 'Selecionar imagem'}
                </Button>
                
                {imagePreview && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleRemoveImage}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              {imagePreview ? (
                <div className="mt-2 border rounded-md overflow-hidden">
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-auto"
                      style={{ maxHeight: '180px', objectFit: 'cover' }}
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="text-white border-white"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Alterar
                      </Button>
                    </div>
                  </div>
                </div>
              ) : currentCourse.image_url ? (
                <div className="mt-2 border rounded-md overflow-hidden">
                  <div className="relative">
                    <img 
                      src={currentCourse.image_url} 
                      alt="Imagem atual" 
                      className="w-full h-auto"
                      style={{ maxHeight: '180px', objectFit: 'cover' }}
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="text-white border-white"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Alterar
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-2 border rounded-md p-8 flex flex-col items-center justify-center text-muted-foreground bg-muted/30">
                  <ImageIcon className="h-8 w-8 mb-2" />
                  <p className="text-sm">Nenhuma imagem selecionada</p>
                  <p className="text-xs">A imagem será redimensionada para 300x180 pixels e convertida para WebP</p>
                </div>
              )}
              
              <p className="text-xs text-muted-foreground">
                Selecione uma imagem para o curso. A imagem será redimensionada para 300x180 pixels e convertida para o formato WebP.
              </p>
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
    </div>
  );
};

export default CourseEditor;
