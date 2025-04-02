
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Search, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-alura-blue">
              Alura
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-alura-darkgray hover:text-alura-blue transition-colors">Cursos</a>
            <a href="#" className="text-alura-darkgray hover:text-alura-blue transition-colors">Formações</a>
            <a href="#" className="text-alura-darkgray hover:text-alura-blue transition-colors">Para Empresas</a>
            <a href="#" className="text-alura-darkgray hover:text-alura-blue transition-colors">Comunidade</a>
          </nav>

          {/* Search and Login Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5 text-alura-darkgray" />
            </Button>
            <Button variant="outline" className="text-alura-blue border-alura-blue hover:bg-alura-blue hover:text-white">
              Login
            </Button>
            <Button className="bg-alura-blue text-white hover:bg-blue-600">
              Matricule-se
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-alura-darkgray"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-alura-darkgray hover:text-alura-blue transition-colors">Cursos</a>
              <a href="#" className="text-alura-darkgray hover:text-alura-blue transition-colors">Formações</a>
              <a href="#" className="text-alura-darkgray hover:text-alura-blue transition-colors">Para Empresas</a>
              <a href="#" className="text-alura-darkgray hover:text-alura-blue transition-colors">Comunidade</a>
              <div className="flex space-x-4 pt-4">
                <Button variant="outline" className="flex-1 text-alura-blue border-alura-blue hover:bg-alura-blue hover:text-white">
                  Login
                </Button>
                <Button className="flex-1 bg-alura-blue text-white hover:bg-blue-600">
                  Matricule-se
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
