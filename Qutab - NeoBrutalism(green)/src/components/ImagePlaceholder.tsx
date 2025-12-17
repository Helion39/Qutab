import React from 'react';
import { Image } from 'lucide-react';

interface ImagePlaceholderProps {
  text?: string;
  className?: string;
}

export default function ImagePlaceholder({ text = 'Image Placeholder', className = '' }: ImagePlaceholderProps) {
  return (
    <div 
      className={`flex flex-col items-center justify-center ${className}`}
      style={{ backgroundColor: '#e5e7eb' }}
    >
      <Image size={48} style={{ color: '#9ca3af' }} />
      <span className="mt-2 text-sm" style={{ color: '#6b7280' }}>
        {text}
      </span>
    </div>
  );
}
