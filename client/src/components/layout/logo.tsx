import { Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';

import { SITE_NAME } from '@/config/const';
import { cn } from '@/lib/utils';

interface IProps {
  className?: string;
}

export const Logo = ({ className }: IProps) => (
  <Link to="/" className={cn('text-xl sm:text-2xl font-bold', className)}>
    <span className="flex items-center gap-2">
      <Leaf />
      <span className="hidden xs:inline-flex">{SITE_NAME}</span>
    </span>
  </Link>
);
