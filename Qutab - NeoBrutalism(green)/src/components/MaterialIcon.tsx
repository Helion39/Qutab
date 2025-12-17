import React from 'react';

interface MaterialIconProps {
  icon: string;
  className?: string;
}

export default function MaterialIcon({ icon, className = '' }: MaterialIconProps) {
  // Material Symbols uses font-variation-settings to control fill
  // The 'filled' class sets font-variation-settings: 'FILL' 1
  // We always use material-symbols-outlined class since the font supports both variants
  return <span className={`material-symbols-outlined ${className}`}>{icon}</span>;
}
