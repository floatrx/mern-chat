import { cn } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';

interface HeadingProps {
  className?: string;
  text: string | React.ReactNode;
  level?: 1 | 2 | 3;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  count?: number;
}

export const Heading = ({ level = 2, text, children, actions, count, className }: HeadingProps) => {
  const HeadingTag = `h${level}` as React.ElementType;
  const variants = { 1: 'text-4xl', 2: 'text-3xl', 3: 'text-2xl' };
  return (
    <HeadingTag
      initial={{ opacity: 0, translateX: -10 }}
      animate={{ opacity: 1, translateX: 0 }}
      className={cn(variants[level], 'mb-4 flex items-center gap-4', className)}
    >
      {text}
      {count && <Badge variant="outline">{count}</Badge>}
      {actions && <div className="flex items-center gap-2">{actions}</div>}
      {children}
    </HeadingTag>
  );
};
