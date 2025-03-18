import { Card } from '@/components/ui/card';
import { pillarData } from '@/config/pillar-data';

export function DevRelPillars() {
  return (
    <div className="py-12 px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3">Core Expertise & Skills 🏆</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
        {pillarData.map((pillar) => (
          <Card 
            key={pillar.id}
            className={`p-6 border-0 bg-gradient-to-br ${pillar.color} shadow-lg`}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{pillar.icon}</span>
                <h3 className="text-xl font-semibold">{pillar.title}</h3>
              </div>
              <p className="text-sm opacity-90 flex-grow">{pillar.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 