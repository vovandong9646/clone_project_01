'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const ActiveLink = ({ children, url }: { children: React.ReactNode; url: string }) => {
  const pathname = usePathname();
  const isActive = pathname === url;

  return (
    <Link
      href={url}
      className={cn(
        'flex gap-2 p-3 hover:bg-primary hover:text-white text-base rounded-lg',
        isActive && 'bg-primary text-white svg-animate'
      )}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
