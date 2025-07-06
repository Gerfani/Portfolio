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
          <h2 className="text-3xl font-bold">👋 Hi, I&apos;m Ghazal Erfani</h2>
          <div className="text-lg text-muted-foreground max-w-2xl space-y-4">
            <p>
              I&apos;m a multi-faceted professional who embodies three key personas:{' '}
              <button
                onClick={() => handlePersonaClick('engineer')}
                className="text-[#6366F1] bg-[#6366F1]/10 px-1 rounded hover:bg-[#6366F1]/20 transition-colors"
              >
                Engineer
              </button>,{' '}
              <button
                onClick={() => handlePersonaClick('educator')}
                className="text-[#8B5CF6] bg-[#8B5CF6]/10 px-1 rounded hover:bg-[#8B5CF6]/20 transition-colors"
              >
                Educator
              </button>, and{' '}
              <button
                onClick={() => handlePersonaClick('movement-builder')}
                className="text-[#EC4899] bg-[#EC4899]/10 px-1 rounded hover:bg-[#EC4899]/20 transition-colors"
              >
                Movement Builder
              </button>{' '}
              - each representing a unique aspect of my professional journey.
            </p>
            <p>
              Currently pursuing my IT Operations Diploma at Red River College, I bring technical expertise combined with real-world experience from my role as a Store Associate at Marshalls/Home Sense. My educational background from Iran, along with various certifications, has shaped my approach to continuous learning and knowledge sharing.
            </p>
            <p>
              Beyond technical skills, I&apos;m passionate about community building and have volunteer experience in graphic design and promotions coordination. I believe in the power of technology to create positive change and am dedicated to building bridges between technical innovation and meaningful community impact.
            </p>
            <p>
              <strong>Welcome to <span className="animate-shimmer bg-[linear-gradient(110deg,#fff,15%,#6366F1,35%,#8B5CF6,50%,#EC4899,65%,#fff,85%,#fff)] bg-[length:200%_100%] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">my</span> portfolio - where engineering excellence meets educational passion and community-driven innovation.</strong>
            </p>
          </div>
          <button
            onClick={scrollToPersonas}
            className="text-muted-foreground text-base hover:text-accent1 transition-colors cursor-pointer animate-pulse mt-4"
          >
            ✨ Click on Engineer, Educator, or Movement Builder bubbles above to explore each facet of my professional journey and discover the unique value I bring to every project and collaboration
          </button>
        </div>
      </Card>
    </div>
  );
} 