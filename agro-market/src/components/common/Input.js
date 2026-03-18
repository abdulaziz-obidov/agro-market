import React from 'react';

/**
 * Reusable Input field with label and error message support.
 * Designed to integrate with React Hook Form via `register`.
 */
const Input = React.forwardRef(({
  label,
  id,
  error,
  hint,
  className = '',
  ...props
}, ref) => (
  <div className="w-full">
    {label && (
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
    )}
    <input
      id={id}
      ref={ref}
      className={`
        w-full px-3 py-2 border rounded-lg text-sm
        focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all duration-200
        ${error
          ? 'border-red-400 focus:ring-red-400 bg-red-50'
          : 'border-gray-300 focus:ring-primary-500 focus:border-transparent bg-white'
        }
        ${className}
      `}
      {...props}
    />
    {hint  && !error && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
  </div>
));

Input.displayName = 'Input';
export default Input;
