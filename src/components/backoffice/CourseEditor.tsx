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
import { PlusCircle, Edit, Trash2, Loader2, FileImage } from 'lucide-react';
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

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
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
  };

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
      if (isEditing && currentCourse.id) {
        await updateCourse(currentCourse.id, {
          title: currentCourse.title,
          instructor: currentCourse.instructor,
          level: currentCourse.level,
          hours: typeof currentCourse.hours === 'string' 
            ? parseFloat(currentCourse.hours) 
            : currentCourse.hours || 0,
          image_url: currentCourse.image_url,
          category: currentCourse.category,
          badge_color: currentCourse.badge_color,
        });

        toast({
          title: 'Curso atualizado',
          description: 'O curso foi atualizado com sucesso.',
        });
      } else {
        await createCourse({
          title: currentCourse.title || '',
          instructor: currentCourse.instructor || '',
          level: currentCourse.level || 'iniciante',
          hours: typeof currentCourse.hours === 'string' 
            ? parseFloat(currentCourse.hours) 
            : currentCourse.hours || 0,
          image_url: currentCourse.image_url || '',
          category: currentCourse.category || 'desenvolvimento',
          badge_color: currentCourse.badge_color || 'blue',
        });

        toast({
          title: 'Curso adicionado',
          description: 'O curso foi adicionado com sucesso.',
        });
      }

      setIsDialogOpen(false);
      loadCourses();
    } catch (error) {
      console.error('Error saving course:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar o curso.',
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
        title: 'Curso excluído',
        description: 'O curso foi excluído com sucesso.',
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
              <Label htmlFor="image_url">URL da Imagem</Label>
              <Input
                id="image_url"
                value={currentCourse.image_url || ''}
                onChange={(e) => setCurrentCourse({ ...currentCourse, image_url: e.target.value })}
                placeholder="https://exemplo.com/imagem.jpg"
              />
              <p className="text-xs text-muted-foreground">
                URL da imagem do curso. Recomendamos usar uma imagem quadrada.
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
