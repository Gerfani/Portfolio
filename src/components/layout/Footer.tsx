import Image from 'next/image';
import { Placeholder } from '@/components/ui/placeholder';

const socialLinks = [
  {
    label: '@',
    href: '#',
    icon: ''
  }
];

export function Footer() {
  return (
    <footer className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-0">@</h3>
            <div className="space-y-0">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-accent1 transition-colors"
              >
                @ - @ @ @ @ @ @
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-accent1 transition-colors"
              >
                @ - @ @ @ @ @ @
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-accent1 transition-colors"
              >
                @.@. @, @ @ @ @ @
              </a>
            </div>
          </div>
          <div id="contact">
            <h3 className="text-lg font-semibold mb-4">@</h3>
            <p className="text-muted-foreground">
              @ @ @ @ @ @ @{' '}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent1 hover:text-accent2 transition-colors"
              >
                @
              </a>
              {' '}@ @&apos;@ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @ @!
            </p>
          </div>
        </div>
        <div className="mt-8 flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <Placeholder width={24} height={24} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
} 
