import { Card } from '@/components/ui/card';
import { Placeholder } from '@/components/ui/placeholder';
import type { PersonaInspiration } from '@/types/portfolio';

interface InspirationCardProps {
  inspiration: PersonaInspiration;
  className?: string;
}

export function InspirationCard({ inspiration, className }: InspirationCardProps) {
  return (
    <Card className={`p-6 dark:bg-black/60 dark:backdrop-blur-sm ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="h-12 w-12 rounded-full overflow-hidden">
          <Placeholder width={48} height={48} className="rounded-full" />
        </div>
        <div>
          <h4 className="text-base font-semibold">{inspiration.name}</h4>
          <p className="text-sm text-muted-foreground">{inspiration.role}</p>
        </div>
      </div>
      <div className="space-y-3">
      <h4 className="text-sm font-medium text-accent1 italic">@ @ @:</h4>
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          {inspiration.lessons.map((lesson, index) => (
            <li key={index} className="flex items-center">
              <span className="text-accent1 mr-2 text-lg">•</span>
              <span className="text-muted-foreground text-sm">{lesson}</span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
} 