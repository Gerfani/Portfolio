import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { cn } from '@/lib/utils';
import type { PersonaId } from '@/types/portfolio';
import { portfolioData } from '@/config/portfolio-data';

interface BubbleChartProps {
  className?: string;
  selectedPersona: PersonaId | null;
  onSelectPersona: (id: PersonaId) => void;
  onSelectMain: () => void;
  isMainSelected: boolean;
}

interface Node extends d3.SimulationNodeDatum {
  id: string;
  label: string[];
  emoji: string;
  size: number;
  type: 'main' | 'persona';
  fx?: number;
  fy?: number;
}

interface Link {
  source: Node;
  target: Node;
  index?: number;
}

const MAIN_NODE: Node = {
  id: 'ali',
  label: ['@ @ @'],
  emoji: '',
  size: 200,
  type: 'main'
};

const PERSONA_NODES: Node[] = [
  {
    id: 'engineer',
    label: ['1', '@'],
    emoji: portfolioData.engineer.emoji,
    size: 160,
    type: 'persona'
  },
  {
    id: 'educator',
    label: ['2', '@'],
    emoji: portfolioData.educator.emoji,
    size: 160,
    type: 'persona'
  },
  {
    id: 'movement-builder',
    label: ['3', '@'],
    emoji: portfolioData['movement-builder'].emoji,
    size: 160,
    type: 'persona'
  }
];

// Add helper function for positioning
function updateNodePositions(
  width: number,
  height: number,
  mainNode: Node,
  engineerNode: Node | undefined,
  educatorNode: Node | undefined,
  movementBuilderNode: Node | undefined
) {
  const isMobile = width < 450; // Tighter mobile breakpoint
  
  // Mobile position multipliers - easy to tweak
  const mobileMultipliers = {
    engineer: { x: 0.20, y: 0.4 },
    educator: { x: 0.40, y: 0.67 },
    movementBuilder: { x: 0.80, y: 0.88 },
    main: { x: 0.70, y: 0.15 }
  };

  // Desktop position multipliers - unchanged from original
  const desktopMultipliers = {
    engineer: { x: 0.27, y: 0.2 },
    educator: { x: 0.20, y: 0.49 },
    movementBuilder: { x: 0.35, y: 0.75 },
    main: { x: 0.75, y: 0.15 }
  };

  // Use appropriate multipliers based on screen size
  const multipliers = isMobile ? mobileMultipliers : desktopMultipliers;

  // Main node position
  mainNode.fx = width * multipliers.main.x;
  mainNode.fy = height * multipliers.main.y;

  // Engineer node position
  if (engineerNode) {
    engineerNode.fx = width * multipliers.engineer.x;
    engineerNode.fy = height * multipliers.engineer.y;
  }

  // Educator node position
  if (educatorNode) {
    educatorNode.fx = width * multipliers.educator.x;
    educatorNode.fy = height * multipliers.educator.y;
  }

  // Movement Builder node position
  if (movementBuilderNode) {
    movementBuilderNode.fx = width * multipliers.movementBuilder.x;
    movementBuilderNode.fy = height * multipliers.movementBuilder.y;
  }
}

export function BubbleChart({ className, selectedPersona, onSelectPersona, onSelectMain, isMainSelected }: BubbleChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToPersonas = () => {
    document.getElementById('personas')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 600;

    // Clear previous simulation
    d3.select(svgRef.current).selectAll('*').remove();

    // Create nodes array with all nodes
    const nodes = [MAIN_NODE, ...PERSONA_NODES];

    // Create links with actual node references
    const links = PERSONA_NODES.map(node => ({
      source: nodes[0], // MAIN_NODE
      target: node
    }));

    // Create the simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink<Node, Link>(links)
        .distance(width < 768 ? 200 : 300))
      .force('charge', d3.forceManyBody().strength(-2000))
      .force('collide', d3.forceCollide<Node>().radius(d => d.size / 1.2))
      .force('x', d3.forceX(width * 0.5))
      .force('y', d3.forceY(height * 0.5));

    // Fix positions for persona nodes with more spacing
    const engineerNode = nodes.find(n => n.id === 'engineer');
    const educatorNode = nodes.find(n => n.id === 'educator');
    const movementBuilderNode = nodes.find(n => n.id === 'movement-builder');

    // Use helper function for initial positioning
    updateNodePositions(width, height, MAIN_NODE, engineerNode, educatorNode, movementBuilderNode);

    const svg = d3.select(svgRef.current);

    // Create all defs
    const defs = svg.append('defs');

    // Create circular clip path
    defs.append('clipPath')
      .attr('id', 'circle-clip')
      .append('circle')
      .attr('r', MAIN_NODE.size / 2)
      .attr('cx', 0)
      .attr('cy', 0);

    // Create gradient
    const gradient = defs.append('linearGradient')
      .attr('id', 'gradient')
      .attr('gradientTransform', 'rotate(45)');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#3B82F6'); // Brighter blue

    gradient.append('stop')
      .attr('offset', '40%')
      .attr('stop-color', '#60A5FA'); // Light blue

    gradient.append('stop')
      .attr('offset', '60%')
      .attr('stop-color', '#8B5CF6'); // Purple

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#EC4899'); // Pink

    // Create glow filter
    const filter = defs.append('filter')
      .attr('id', 'glow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');

    filter.append('feGaussianBlur')
      .attr('stdDeviation', '4')
      .attr('result', 'coloredBlur');

    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode')
      .attr('in', 'coloredBlur');
    feMerge.append('feMergeNode')
      .attr('in', 'SourceGraphic');

    // Create stronger glow for main bubble
    const mainGlow = defs.append('filter')
      .attr('id', 'main-glow')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');

    mainGlow.append('feGaussianBlur')
      .attr('stdDeviation', '5')
      .attr('result', 'coloredBlur');

    const mainFeMerge = mainGlow.append('feMerge');
    mainFeMerge.append('feMergeNode')
      .attr('in', 'coloredBlur');
    mainFeMerge.append('feMergeNode')
      .attr('in', 'SourceGraphic');

    // Create the links
    const linkElements = svg.append('g')
      .selectAll('line')
      .data(links)
      .join('line')
      .style('stroke', 'currentColor')
      .style('stroke-opacity', (d) => 
        selectedPersona === (d.target as Node).id ? 0.6 : 0.1
      )
      .style('stroke-width', (d) =>
        selectedPersona === (d.target as Node).id ? 3 : 1
      )
      .style('filter', (d) =>
        selectedPersona === (d.target as Node).id ? 'url(#glow)' : 'none'
      );

    // Create the nodes
    const nodeElements = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .attr('cursor', 'pointer')
      .on('click', (_event: MouseEvent, d: Node) => {
        if (d.type === 'persona') {
          onSelectPersona(d.id as PersonaId);
        } else if (d.type === 'main') {
          onSelectMain();
        }
      });

    // Add stroke circles (for hover effect)
    nodeElements.append('circle')
      .attr('r', d => d.size / 2 + 1.5) // Slightly larger than the main circle
      .attr('fill', 'none')
      .attr('stroke', 'white')
      .attr('stroke-width', '3')
      .attr('class', d => {
        if (d.type === 'main' && isMainSelected) {
          return 'opacity-100 transition-opacity duration-300';
        }
        if (d.type === 'persona' && selectedPersona === d.id) {
          return 'opacity-100 transition-opacity duration-300';
        }
        return 'opacity-0 transition-opacity duration-300 group-hover:opacity-100';
      });

    // Add main circles to nodes
    nodeElements.append('circle')
      .attr('r', d => d.size / 2)
      .attr('fill', d => {
        if (d.type === 'main') return 'url(#gradient)';
        const persona = portfolioData[d.id as PersonaId];
        if (selectedPersona === d.id) {
          return persona.color;
        }
        // Darker version for unselected state
        return persona.color.replace('1)', '0.3)');
      })
      .style('filter', d => {
        if (d.type === 'main') return 'url(#main-glow)';
        if (d.type === 'persona' && selectedPersona === d.id) {
          return 'url(#glow)';
        }
        return 'none';
      })
      .attr('class', 'transition-all duration-300');

    // Add group class for hover effect
    nodeElements.attr('class', 'group cursor-pointer');

    // Add white placeholder for main node
    nodeElements.filter(d => d.type === 'main')
      .append('rect')
      .attr('width', MAIN_NODE.size)
      .attr('height', MAIN_NODE.size)
      .attr('x', -MAIN_NODE.size / 2)
      .attr('y', -MAIN_NODE.size / 2)
      .attr('fill', 'white')
      .attr('stroke', '#d1d5db')
      .attr('stroke-width', 2)
      .attr('clip-path', 'url(#circle-clip)')
      .attr('class', 'pointer-events-none');

    // Add @ symbol to main node placeholder
    nodeElements.filter(d => d.type === 'main')
      .append('text')
      .text('@')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('fill', '#9ca3af')
      .attr('font-size', '24px')
      .attr('class', 'pointer-events-none');

    // Add emojis to persona nodes only
    nodeElements.filter(d => d.type === 'persona')
      .append('text')
      .text(d => d.emoji)
      .attr('text-anchor', 'middle')
      .attr('dy', '-1.2em')
      .attr('class', 'text-2xl pointer-events-none');

    // Add labels to nodes with line wrapping
    nodeElements.selectAll('.label')
      .data(d => d.type === 'main' ? [] : d.label.map((line, i) => ({ line, i, total: d.label.length })))
      .join('text')
      .attr('class', 'label')
      .text(d => d.line)
      .attr('text-anchor', 'middle')
      .attr('dy', d => {
        // For single line, use standard centering
        if (d.total === 1) return '1em';
        // For two lines, offset from center based on line number
        // First line is shifted up by half line height, second line down by half
        const lineHeight = 24;
        const totalHeight = (d.total - 1) * lineHeight;
        const centerOffset = -totalHeight / 2;
        return `${centerOffset + (d.i * lineHeight) + 24}px`;
      })
      .attr('fill', 'currentColor')
      .attr('class', 'text-lg font-medium pointer-events-none');

    // Update positions on simulation tick
    simulation.on('tick', () => {
      linkElements
        .attr('x1', d => d.source.x!)
        .attr('y1', d => d.source.y!)
        .attr('x2', d => d.target.x!)
        .attr('y2', d => d.target.y!);

      nodeElements
        .attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      const newHeight = 600;
      
      // Use same helper function for resize positioning
      updateNodePositions(newWidth, newHeight, MAIN_NODE, engineerNode, educatorNode, movementBuilderNode);
      
      simulation.alpha(0.3).restart();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedPersona, onSelectPersona, onSelectMain, isMainSelected]);

  return (
    <div ref={containerRef} className={cn('relative w-full h-[600px]', className)}>
      <svg
        ref={svgRef}
        className="w-full h-full"
        style={{ overflow: 'visible' }}
      />
      {!selectedPersona && !isMainSelected && (
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <button 
            onClick={scrollToPersonas}
            className="text-gray-500 text-sm hover:text-accent1 transition-colors cursor-pointer animate-pulse"
          >
            ☝️ Click a bubble to explore each persona that makes up my healthcare innovation journey
          </button>
        </div>
      )}
    </div>
  );
} 