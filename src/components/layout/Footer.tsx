import Image from 'next/image';

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/aysf',
    icon: '/social/linkedin.svg'
  },
  {
    label: 'GitHub',
    href: 'https://github.com',
    icon: '/social/github.svg'
  }
];

export function Footer() {
  return (
    <footer className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-0">Education</h3>
            <div className="space-y-0">
              <a 
                href="https://tuck.dartmouth.edu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-accent1 transition-colors"
              >
                MBA Candidate @ Tuck School of Business at Dartmouth
              </a>
              <a 
                href="https://geiselmed.dartmouth.edu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-accent1 transition-colors"
              >
                MPH Candidate @ Geisel School of Medicine at Dartmouth
              </a>
              <a 
                href="https://www.umanitoba.ca/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-accent1 transition-colors"
              >
                B.Sc. Biology, Chemistry @ University of Manitoba
              </a>
            </div>
          </div>
          <div id="contact">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-muted-foreground">
              Feel free to connect with me on{' '}
              <a 
                href="https://linkedin.com/in/aysf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-accent1 hover:text-accent2 transition-colors"
              >
                LinkedIn
              </a>
              {' '}if you&apos;d like to discuss healthcare innovation or AI applications!
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
              <Image
                src={link.icon}
                alt={link.label}
                width={24}
                height={24}
                className="dark:invert"
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
} 