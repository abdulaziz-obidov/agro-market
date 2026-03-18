import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Reusable Button component
 * @param {string}  variant  – 'primary' | 'secondary' | 'danger' | 'ghost'
 * @param {string}  size     – 'sm' | 'md' | 'lg'
 * @param {boolean} loading
 * @param {boolean} fullWidth
 */
const variantClasses = {
  primary:   'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500',
  secondary: 'bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 focus:ring-primary-500',
  danger:    'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
  ghost:     'bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-400',
};

const sizeClasses = {
  sm: 'text-xs px-3 py-1.5',
  md: 'text-sm px-4 py-2',
  lg: 'text-base px-6 py-3',
};

const Button = React.forwardRef(({
  children,
  variant  = 'primary',
  size     = 'md',
  loading  = false,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}, ref) => (
  <button
    ref={ref}
    disabled={disabled || loading}
    className={`
      inline-flex items-center justify-center gap-2 font-medium rounded-lg
      transition-colors duration-200
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-60 disabled:cursor-not-allowed
      ${variantClasses[variant]}
      ${sizeClasses[size]}
      ${fullWidth ? 'w-full' : ''}
      ${className}
    `}
    {...props}
  >
    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
    {children}
  </button>
));

Button.displayName = 'Button';
export default Button;
