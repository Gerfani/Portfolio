import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import type { Experience } from '@/types/portfolio';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon, FileTextIcon, ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const [enlargedImageAlt, setEnlargedImageAlt] = useState<string>('');
  const [openPdf, setOpenPdf] = useState<string | null>(null);
  const [pdfTitle, setPdfTitle] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Reset page count when opening a new PDF
  useEffect(() => {
    if (openPdf) {
      setCurrentPage(1);
    } else {
      setCurrentPage(1);
      setTotalPages(1);
    }
  }, [openPdf]);
  
  // Listen for messages from PDF viewer
  const handlePdfMessages = useCallback((event: MessageEvent) => {
    // Only process messages from our iframe
    if (!iframeRef.current || event.source !== iframeRef.current.contentWindow) {
      return;
    }
    
    const data = event.data;
    
    // Handle PDF.js or Adobe Reader messages
    if (data && typeof data === 'object') {
      // Handle PDF loaded event
      if (data.type === 'documentLoaded' || data.action === 'loaded') {
        // Adobe Reader sometimes provides total page count
        if (data.totalPages) {
          setTotalPages(data.totalPages);
        }
      }
      
      // Handle page change events
      if (data.type === 'pageChanged' || data.action === 'pageChanged') {
        if (data.page) {
          setCurrentPage(data.page);
        }
      }
    }
  }, []);
  
  // Add event listener for PDF viewer messages
  useEffect(() => {
    window.addEventListener('message', handlePdfMessages);
    return () => {
      window.removeEventListener('message', handlePdfMessages);
    };
  }, [handlePdfMessages]);
  
  // Function to navigate PDF pages
  const navigatePage = (direction: 'prev' | 'next') => {
    if (!iframeRef.current) return;
    
    const iframe = iframeRef.current;
    const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
    
    if (newPage < 1 || (totalPages > 0 && newPage > totalPages)) return;
    
    try {
      // Try to access the PDF viewer in the iframe
      const iframeWindow = iframe.contentWindow;
      if (iframeWindow) {
        // Set the new page number and update state
        setCurrentPage(newPage);
        
        // This will attempt to send a message to the PDF viewer inside the iframe
        iframeWindow.postMessage({
          action: 'navigateTo',
          page: newPage
        }, '*');
        
        // Update the iframe src as a fallback method
        iframe.src = `${openPdf}#page=${newPage}&toolbar=1&navpanes=1&scrollbar=1`;
      }
    } catch (error) {
      console.error('Error navigating PDF page:', error);
    }
  };
  
  const isCurrent = (date: string) => {
    const year = parseInt(date.split('-')[0]);
    return year >= 2025;
  };


  return (
    <div className="relative space-y-8">
      {/* Center line that connects all cards */}
      <div className="absolute left-1/2 top-8 bottom-0 w-0.5 bg-muted -translate-x-1/2" />
      
      {experiences.map((experience, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <div className="relative">
            <Card className={cn(
              "transition-all duration-300",
              isCurrent(experience.date) ? "shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]" : "hover:shadow-lg"
            )}>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">
                      {experience.title.includes('BlessOut') ? (
                        <a 
                          href="https://www.blessout.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-accent1 transition-colors"
                        >
                          {experience.title}
                        </a>
                      ) : experience.link ? (
                        <a 
                          href={experience.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-accent1 transition-colors"
                        >
                          {experience.title}
                        </a>
                      ) : (
                        experience.title
                      )}
                    </h3>
                    {isCurrent(experience.date) && (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-accent1/20 text-accent1 font-medium animate-pulse">
                        Current
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-muted-foreground font-mono">
                    {experience.date}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {experience.description}
                </p>
                
                {experience.videoUrl && (
                  <div className="relative w-full pt-[56.25%] my-4"> {/* 16:9 aspect ratio */}
                    <iframe 
                      className="absolute top-0 left-0 w-full h-full rounded-md"
                      src={experience.videoUrl}
                      title={`Video for ${experience.title}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                
                {experience.imageUrl && (
                  <div 
                    className="relative w-full h-80 my-4 cursor-pointer"
                    onClick={() => {
                      setEnlargedImage(experience.imageUrl!);
                      setEnlargedImageAlt(`Image for ${experience.title}`);
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 hover:opacity-100 transition-opacity bg-black/30 rounded-md">
                      <span className="text-white font-medium px-3 py-1 bg-black/50 rounded-md">Click to enlarge</span>
                    </div>
                    <Image
                      src={experience.imageUrl}
                      alt={`Image for ${experience.title}`}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                )}
                
                {experience.pdfUrl && (
                  <div className="mt-4 mb-2">
                  <div
                    className="border border-border rounded-md p-3 cursor-pointer hover:bg-accent/5 transition-colors"
                    onClick={() => {
                      setOpenPdf(experience.pdfUrl!);
                      setPdfTitle(experience.title);
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="shrink-0 w-16 h-20 bg-muted/30 rounded flex items-center justify-center">
                        <FileTextIcon className="h-8 w-8 text-accent1" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Research Paper</h4>
                        <p className="text-xs text-muted-foreground">Click to view full report</p>
                      </div>
                    </div>
                    </div>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2">
                  {experience.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 text-xs rounded-full bg-accent1/10 text-accent1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      ))}
      
      {/* Image Dialog */}
      <Dialog.Root open={enlargedImage !== null} onOpenChange={(open) => !open && setEnlargedImage(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm animate-in fade-in" />
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[90vw] max-h-[90vh] z-50 animate-in zoom-in-90">
            <Dialog.Title className="sr-only">Image Preview</Dialog.Title>
            <div className="relative">
              <div className="relative w-[90vw] h-[80vh]">
                {enlargedImage && (
                  <Image
                    src={enlargedImage}
                    alt={enlargedImageAlt}
                    fill
                    className="object-contain"
                  />
                )}
              </div>
              <Dialog.Close asChild>
                <button
                  className="absolute top-2 right-2 rounded-full w-8 h-8 flex items-center justify-center bg-black/70 hover:bg-black text-white"
                  aria-label="Close"
                >
                  <Cross2Icon />
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      
      {/* PDF Dialog */}
      <Dialog.Root open={openPdf !== null} onOpenChange={(open) => {
        if (!open) {
          setOpenPdf(null);
          setCurrentPage(1);
          setTotalPages(1);
        }
      }}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm animate-in fade-in" />
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] h-[90vh] max-w-6xl z-50 bg-white dark:bg-gray-900 rounded-lg shadow-xl animate-in zoom-in-90 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
              <Dialog.Title className="font-medium flex items-center gap-2">
                <FileTextIcon className="h-5 w-5 text-accent1" />
                <span>{pdfTitle}</span>
                <span className="text-xs px-2 py-0.5 bg-accent1/10 text-accent1 rounded-full">Research Paper</span>
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  className="rounded-full w-8 h-8 flex items-center justify-center hover:bg-muted/80 text-foreground transition-colors"
                  aria-label="Close"
                >
                  <Cross2Icon />
                </button>
              </Dialog.Close>
            </div>
            <div className="relative h-[calc(90vh-56px)]">
              {openPdf && (
                <iframe
                  ref={iframeRef}
                  src={`${openPdf}#page=${currentPage}&toolbar=1&navpanes=1&scrollbar=1`}
                  className="w-full h-full rounded-b-lg"
                  title={`PDF for ${pdfTitle}`}
                  onLoad={() => {
                    // Try to detect PDF.js or Adobe Reader and setup communication
                    const iframe = iframeRef.current;
                    if (iframe?.contentWindow) {
                      iframe.contentWindow.postMessage({ action: 'getPageCount' }, '*');
                    }
                  }}
                />
              )}
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-5 py-2.5 bg-black/80 rounded-full text-white shadow-lg backdrop-blur-sm">
              <button 
                className={cn(
                  "hover:bg-white/20 rounded-full p-1.5 transition-colors",
                  currentPage <= 1 && "opacity-50 cursor-not-allowed"
                )}
                aria-label="Previous Page"
                onClick={() => navigatePage('prev')}
                disabled={currentPage <= 1}
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <div className="min-w-[4rem] text-center">
                <div className="text-sm font-medium">
                  Page {currentPage}{totalPages > 1 ? ` of ${totalPages}` : ''}
                </div>
              </div>
              <button 
                className={cn(
                  "hover:bg-white/20 rounded-full p-1.5 transition-colors",
                  totalPages > 0 && currentPage >= totalPages && "opacity-50 cursor-not-allowed"
                )}
                aria-label="Next Page"
                onClick={() => navigatePage('next')}
                disabled={totalPages > 0 && currentPage >= totalPages}
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
} 