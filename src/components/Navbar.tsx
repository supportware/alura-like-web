
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Search, Menu, X, User, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-Excel-blue">
              Excel
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/courses" className="text-Excel-darkgray hover:text-Excel-blue transition-colors">Cursos</Link>
            <a href="#" className="text-Excel-darkgray hover:text-Excel-blue transition-colors">Formações</a>
            <a href="#" className="text-Excel-darkgray hover:text-Excel-blue transition-colors">Para Empresas</a>
            <Link to="/blog" className="text-Excel-darkgray hover:text-Excel-blue transition-colors">Blog</Link>
          </nav>

          {/* Search and Login Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5 text-Excel-darkgray" />
            </Button>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/backoffice" className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-Excel-blue flex items-center justify-center">
                    <Settings className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-medium">Backoffice</span>
                </Link>
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-Excel-blue flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm">{user.email}</span>
                </div>
                <Button 
                  variant="outline" 
                  className="text-Excel-blue border-Excel-blue hover:bg-Excel-blue hover:text-white"
                  onClick={handleLogout}
                >
                  Sair
                </Button>
              </div>
            ) : (
              <>
                <Link to="/sign-in">
                  <Button variant="outline" className="text-Excel-blue border-Excel-blue hover:bg-Excel-blue hover:text-white">
                    Login
                  </Button>
                </Link>
                <Link to="/sign-up">
                  <Button className="bg-Excel-blue text-white hover:bg-blue-600">
                    Matricule-se
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-Excel-darkgray"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link to="/courses" className="text-Excel-darkgray hover:text-Excel-blue transition-colors">Cursos</Link>
              <a href="#" className="text-Excel-darkgray hover:text-Excel-blue transition-colors">Formações</a>
              <a href="#" className="text-Excel-darkgray hover:text-Excel-blue transition-colors">Para Empresas</a>
              <Link to="/blog" className="text-Excel-darkgray hover:text-Excel-blue transition-colors">Blog</Link>
              
              {user ? (
                <div className="pt-4">
                  <Link to="/backoffice" className="flex items-center space-x-2 mb-4">
                    <div className="h-8 w-8 rounded-full bg-Excel-blue flex items-center justify-center">
                      <Settings className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium">Backoffice</span>
                  </Link>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="h-8 w-8 rounded-full bg-Excel-blue flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full text-Excel-blue border-Excel-blue hover:bg-Excel-blue hover:text-white"
                    onClick={handleLogout}
                  >
                    Sair
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-4 pt-4">
                  <Link to="/sign-in" className="w-full">
                    <Button 
                      variant="outline" 
                      className="w-full text-Excel-blue border-Excel-blue hover:bg-Excel-blue hover:text-white"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/sign-up" className="w-full">
                    <Button className="w-full bg-Excel-blue text-white hover:bg-blue-600">
                      Matricule-se
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
