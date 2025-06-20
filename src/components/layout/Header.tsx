import { cn } from '@/lib/utils';
import { Navigation } from '@/components/Navigation';
import { MobileNav } from '@/components/MobileNav';
import { ThemeToggle } from '@/components/ThemeToggle';
import type { PersonaId } from '@/types/portfolio';

interface HeaderProps {
  className?: string;
  onSelectPersona?: (id: PersonaId) => void;
}

export function Header({ className, onSelectPersona }: HeaderProps) {
  const handlePersonaClick = (id: PersonaId) => {
    if (onSelectPersona) {
      onSelectPersona(id);
    }
  };

  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 py-4 px-6',
      'bg-gradient-to-b from-black/80 to-black/0 backdrop-blur-sm',
      className
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight relative">
            <span className="animate-shimmer bg-[linear-gradient(110deg,#fff,15%,#6366F1,35%,#8B5CF6,50%,#EC4899,65%,#fff,85%,#fff)] bg-[length:200%_100%] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
              Amirali (Ali) Yousefli
            </span>
          </h1>
          <p className="text-sm text-muted-foreground">
            <button 
              onClick={() => handlePersonaClick('engineer')}
              className="transition-colors hover:text-[#6366F1] cursor-pointer"
            >
              Healthcare AI Scientist
            </button>
            {' • '}
            <button 
              onClick={() => handlePersonaClick('educator')}
              className="transition-colors hover:text-[#8B5CF6] cursor-pointer"
            >
              Business Strategist
            </button>
            {' • '}
            <button 
              onClick={() => handlePersonaClick('movement-builder')}
              className="transition-colors hover:text-[#EC4899] cursor-pointer"
            >
              Healthcare Innovator
            </button>
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <div className="md:hidden">
              <MobileNav onSelectPersona={onSelectPersona} />
            </div>
          </div>
          <Navigation className="ml-auto" onSelectPersona={onSelectPersona} />
        </div>
      </div>
    </header>
  );
}