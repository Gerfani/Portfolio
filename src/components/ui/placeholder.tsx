interface PlaceholderProps {
  width?: number;
  height?: number;
  className?: string;
}

export function Placeholder({ width = 100, height = 100, className = "" }: PlaceholderProps) {
  return (
    <div 
      className={`bg-white border border-gray-300 flex items-center justify-center ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <span className="text-gray-400 text-xs">@</span>
    </div>
  );
}
