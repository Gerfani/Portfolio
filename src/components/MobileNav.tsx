import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

import type { PersonaId } from '@/types/portfolio';

const navItems = [
  { id: 'personas', label: 'Personas' },
  { id: 'pillars', label: 'Core Expertise' },
  { id: 'contact', label: 'Contact' }
];

interface MobileNavProps {
  className?: string;
  onSelectPersona?: (id: PersonaId) => void;
}

export function MobileNav({ className, onSelectPersona }: MobileNavProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={`md:hidden ${className}`}>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <SheetTitle>Navigation</SheetTitle>
          <nav className="flex flex-col gap-4 mt-6">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className="justify-start text-lg"
                onClick={() => {
                  scrollToSection(item.id);
                  // Close sheet after clicking - assuming first button is the close button
                  const closeButton = document.querySelector('[data-radix-collection-item]');
                  if (closeButton instanceof HTMLElement) {
                    closeButton.click();
                  }
                }}
              >
                {item.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
} 