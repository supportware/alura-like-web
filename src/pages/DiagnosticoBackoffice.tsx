import React, { useState } from 'react';
import FAQEditor from '@/components/backoffice/FAQEditor';
import StatsEditor from '@/components/backoffice/StatsEditor';
import { Button } from '@/components/ui/button';

const DiagnosticoBackoffice = () => {
  const [activeComponent, setActiveComponent] = useState<'faq' | 'stats'>('faq');

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Diagnóstico de Componentes do Backoffice</h1>
      <p className="text-gray-600 mb-4">
        Esta página permite testar os componentes FAQEditor e StatsEditor diretamente, 
        sem passar pelo roteamento do Backoffice.
      </p>
      
      <div className="flex gap-4 mb-8">
        <Button 
          onClick={() => setActiveComponent('faq')}
          variant={activeComponent === 'faq' ? 'default' : 'outline'}
        >
          Mostrar FAQEditor
        </Button>
        <Button 
          onClick={() => setActiveComponent('stats')}
          variant={activeComponent === 'stats' ? 'default' : 'outline'}
        >
          Mostrar StatsEditor
        </Button>
      </div>
      
      <div className="border rounded-lg shadow-sm">
        {activeComponent === 'faq' ? (
          <>
            <div className="bg-gray-50 p-4 border-b">
              <h2 className="text-xl font-semibold">Componente FAQEditor</h2>
            </div>
            <FAQEditor />
          </>
        ) : (
          <>
            <div className="bg-gray-50 p-4 border-b">
              <h2 className="text-xl font-semibold">Componente StatsEditor</h2>
            </div>
            <StatsEditor />
          </>
        )}
      </div>
    </div>
  );
};

export default DiagnosticoBackoffice;
