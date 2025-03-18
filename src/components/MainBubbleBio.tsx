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
          <h2 className="text-3xl font-bold">👋 Hi, I&apos;m Ali</h2>
          <div className="text-lg text-gray-300 max-w-2xl space-y-4">
            <p>
              I&apos;m a unique blend of{' '}
              <button 
                onClick={() => handlePersonaClick('engineer')}
                className="text-[#6366F1] bg-[#6366F1]/10 px-1 rounded hover:bg-[#6366F1]/20 transition-colors"
              >
                AI scientist
              </button>,{' '}
              <button 
                onClick={() => handlePersonaClick('educator')}
                className="text-[#8B5CF6] bg-[#8B5CF6]/10 px-1 rounded hover:bg-[#8B5CF6]/20 transition-colors"
              >
                business strategist
              </button>, and{' '}
              <button 
                onClick={() => handlePersonaClick('movement-builder')}
                className="text-[#EC4899] bg-[#EC4899]/10 px-1 rounded hover:bg-[#EC4899]/20 transition-colors"
              >
                healthcare innovator
              </button>{' '}
              - three personas that combine to create an ideal skillset for transforming healthcare through technology and business innovation.
            </p>
            <p>
            My technical background in AI development with dual MBA/MPH training gives me deep multidisciplinary expertise, while my experience in business strategy helps me bridge innovation with practical implementation.            </p>
            <p>
            As a healthcare innovator, I understand how to navigate complex healthcare ecosystems and translate cutting-edge technology into meaningful patient outcomes.            </p>
            <p>
              <strong>This <span className="animate-shimmer bg-[linear-gradient(110deg,#fff,15%,#6366F1,35%,#8B5CF6,50%,#EC4899,65%,#fff,85%,#fff)] bg-[length:200%_100%] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">combination</span> allows me to not just develop advanced AI solutions, but to create viable business models and implement them successfully within healthcare contexts.</strong>
            </p>
          </div>
          <button 
            onClick={scrollToPersonas}
            className="text-gray-400 text-base hover:text-accent1 transition-colors cursor-pointer animate-pulse mt-4"
          >
            ✨ Click on the AI Scientist, Business Strategist, or Healthcare Innovator bubbles to explore how each persona contributes to my healthcare innovation approach
          </button>
        </div>
      </Card>
    </div>
  );
} 