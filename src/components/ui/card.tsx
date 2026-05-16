'use client';

import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    className={`rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950 ${className || ''}`}
    ref={ref}
    {...props}
  />
));

Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div className={`p-6 border-b border-slate-200 dark:border-slate-800 ${className || ''}`} ref={ref} {...props} />
  ),
);

CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 className={`text-lg font-semibold text-slate-900 dark:text-white ${className || ''}`} ref={ref} {...props} />
  ),
);

CardTitle.displayName = 'CardTitle';

export const CardContent = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div className={`p-6 ${className || ''}`} ref={ref} {...props} />
  ),
);

CardContent.displayName = 'CardContent';
