import { Card } from '@/components/ui/card';
import type { PersonaId } from '@/types/portfolio';

interface MainBubbleBioProps {
  onSelectPersona?: (id: PersonaId) => void;
}

export function MainBubbleBio({ onSelectPersona }: MainBubbleBioProps) {
  const scrollToPersonas = () => {
    document.getElementById('personas')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePersonaClick = (id: PersonaId) => {
    if (onSelectPersona) {
      onSelectPersona(id);
    }
  };

  return (
    <div 
      id="persona-details"
      className="mt-12"
    >
      <Card className="p-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
        <div className="flex flex-col items-center text-center space-y-6">
          <h2 className="text-3xl font-bold">👋 @, @&apos;@ @</h2>
          <div className="text-lg text-muted-foreground max-w-2xl space-y-4">
            <p>
              @&apos;@ @ @ @ @{' '}
              <button
                onClick={() => handlePersonaClick('engineer')}
                className="text-[#6366F1] bg-[#6366F1]/10 px-1 rounded hover:bg-[#6366F1]/20 transition-colors"
              >
                1
              </button>,{' '}
              <button
                onClick={() => handlePersonaClick('educator')}
                className="text-[#8B5CF6] bg-[#8B5CF6]/10 px-1 rounded hover:bg-[#8B5CF6]/20 transition-colors"
              >
                2
              </button>, @{' '}
              <button
                onClick={() => handlePersonaClick('movement-builder')}
                className="text-[#EC4899] bg-[#EC4899]/10 px-1 rounded hover:bg-[#EC4899]/20 transition-colors"
              >
                3
              </button>{' '}
              - @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @.
            </p>
            <p>
            @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @.            </p>
            <p>
            @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @.            </p>
            <p>
              <strong>@ <span className="animate-shimmer bg-[linear-gradient(110deg,#fff,15%,#6366F1,35%,#8B5CF6,50%,#EC4899,65%,#fff,85%,#fff)] bg-[length:200%_100%] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">@</span> @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @.</strong>
            </p>
          </div>
          <button
            onClick={scrollToPersonas}
            className="text-muted-foreground text-base hover:text-accent1 transition-colors cursor-pointer animate-pulse mt-4"
          >
            ✨ @ @ @ 1, 2, @ 3 @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @
          </button>
        </div>
      </Card>
    </div>
  );
} 