import React from 'react';

/**
 * Badge component
 * @param {'green'|'yellow'|'red'|'blue'|'gray'} color
 * @param {node} children
 */
const colorClasses = {
  green:  'bg-primary-100 text-primary-800',
  yellow: 'bg-earth-100   text-earth-800',
  red:    'bg-red-100     text-red-800',
  blue:   'bg-blue-100    text-blue-800',
  gray:   'bg-gray-100    text-gray-700',
};

const Badge = ({ children, color = 'gray', className = '' }) => (
  <span
    className={`
      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
      ${colorClasses[color]}
      ${className}
    `}
  >
    {children}
  </span>
);

export default Badge;
