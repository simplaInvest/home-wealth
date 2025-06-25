import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface ExpandableCardProps {
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export default function ExpandableCard({ children, defaultExpanded = true }: ExpandableCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="relative">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute top-4 right-4 z-10 p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
      >
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-slate-300" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-300" />
        )}
      </button>
      
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
        isExpanded ? 'max-h-none opacity-100' : 'max-h-20 opacity-60'
      }`}>
        {children}
      </div>
    </div>
  );
}