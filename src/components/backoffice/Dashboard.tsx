
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Users, 
  BookOpen, 
  GraduationCap, 
  Clock 
} from 'lucide-react';

const stats = [
  {
    title: 'Total de Alunos',
    value: '4,356',
    description: '+11% no último mês',
    icon: Users,
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-100'
  },
  {
    title: 'Cursos Disponíveis',
    value: '287',
    description: '+5 cursos adicionados',
    icon: BookOpen,
    iconColor: 'text-green-500',
    iconBg: 'bg-green-100'
  },
  {
    title: 'Trilhas de Carreira',
    value: '36',
    description: '12 trilhas em destaque',
    icon: GraduationCap,
    iconColor: 'text-purple-500',
    iconBg: 'bg-purple-100'
  },
  {
    title: 'Horas de Conteúdo',
    value: '2,493',
    description: '+87 horas este mês',
    icon: Clock,
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-100'
  }
];

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`${stat.iconBg} p-2 rounded-full`}>
                <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Atividade recente</CardTitle>
            <CardDescription>Últimas atualizações na plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <BookOpen className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Novo curso de React adicionado</p>
                  <p className="text-xs text-muted-foreground">Há 2 horas</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <Users className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">156 novos alunos registrados</p>
                  <p className="text-xs text-muted-foreground">Hoje</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-2 rounded-full">
                  <GraduationCap className="h-4 w-4 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Nova trilha de Data Science</p>
                  <p className="text-xs text-muted-foreground">Ontem</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Visão geral</CardTitle>
            <CardDescription>Resumo da plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Categorias</p>
                  <p className="text-lg font-medium">12</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Professores</p>
                  <p className="text-lg font-medium">47</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Depoimentos</p>
                  <p className="text-lg font-medium">128</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">FAQ</p>
                  <p className="text-lg font-medium">24</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
