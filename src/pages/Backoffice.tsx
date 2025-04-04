
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  Book, 
  GraduationCap, 
  Users, 
  BarChart, 
  MessageSquare, 
  HelpCircle,
  LogOut 
} from 'lucide-react';
import Dashboard from '@/components/backoffice/Dashboard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Backoffice = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = React.useState('dashboard');

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  const handleLogout = async () => {
    await logout();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso",
    });
  };

  const renderContent = () => {
    switch(activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'courses':
        return <div className="p-6">Gerenciamento de Cursos</div>;
      case 'career-paths':
        return <div className="p-6">Gerenciamento de Trilhas de Carreira</div>;
      case 'testimonials':
        return <div className="p-6">Gerenciamento de Depoimentos</div>;
      case 'stats':
        return <div className="p-6">Gerenciamento de Estatísticas</div>;
      case 'study-reasons':
        return <div className="p-6">Gerenciamento de Razões para Estudar</div>;
      case 'faq':
        return <div className="p-6">Gerenciamento de FAQ</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader className="border-b border-border">
            <div className="flex items-center gap-2 px-2">
              <div className="p-2 rounded-md bg-primary text-primary-foreground">
                <LayoutDashboard size={20} />
              </div>
              <div className="font-semibold text-xl">Alura Admin</div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Módulos</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveSection('dashboard')}
                    isActive={activeSection === 'dashboard'}
                  >
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveSection('courses')}
                    isActive={activeSection === 'courses'}
                  >
                    <Book size={18} />
                    <span>Cursos</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveSection('career-paths')}
                    isActive={activeSection === 'career-paths'}
                  >
                    <GraduationCap size={18} />
                    <span>Trilhas de Carreira</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveSection('testimonials')}
                    isActive={activeSection === 'testimonials'}
                  >
                    <Users size={18} />
                    <span>Depoimentos</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveSection('stats')}
                    isActive={activeSection === 'stats'}
                  >
                    <BarChart size={18} />
                    <span>Estatísticas</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveSection('study-reasons')}
                    isActive={activeSection === 'study-reasons'}
                  >
                    <MessageSquare size={18} />
                    <span>Por que estudar conosco</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={() => setActiveSection('faq')}
                    isActive={activeSection === 'faq'}
                  >
                    <HelpCircle size={18} />
                    <span>FAQ</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="border-t border-border p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">{user.email}</p>
                <p className="text-xs text-muted-foreground">Administrador</p>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut size={18} />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <main className="flex-1 bg-background">
          <div className="h-full">
            {renderContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Backoffice;
