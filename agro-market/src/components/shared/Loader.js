import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Loader component
 * @param {boolean} fullScreen – centers in the full viewport
 * @param {string}  size       – 'sm' | 'md' | 'lg'
 * @param {string}  text       – optional text beneath the spinner
 */
const Loader = ({ fullScreen = false, size = 'md', text = 'Yuklanmoqda...' }) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <Loader2 className={`${sizeClasses[size]} text-primary-600 animate-spin`} />
      {text && <p className="text-sm text-gray-500">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
        {spinner}
      </div>
    );
  }

  return <div className="flex items-center justify-center py-8">{spinner}</div>;
};

export default Loader;
