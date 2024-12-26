import { Button } from '@/components/ui/button';

const navItems = [
  { id: 'personas', label: 'Personas' },
  { id: 'pillars', label: 'DevRel Pillars' },
  { id: 'contact', label: 'Contact' }
];

interface NavigationProps {
  className?: string;
}

export function Navigation({ className }: NavigationProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={className}>
      <ul className="hidden md:flex items-center gap-6">
        {navItems.map((item) => (
          <li key={item.id}>
            <Button
              variant="ghost"
              className="text-sm font-medium transition-transform hover:scale-105"
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
} 