import { IconLeftArrow, IconRightArrow } from '@/components/icons';
import { commonCssClases } from '@/constant';
import Link from 'next/link';
import React from 'react';

const LessonNavigation = ({ prevUrl = '/', nextUrl = '/' }: { prevUrl: string; nextUrl: string }) => {
  return (
    <div className='flex gap-3 my-3'>
      <Link href={prevUrl} className={commonCssClases.btnIcon}>
        <IconLeftArrow className='size-8' />
      </Link>
      <Link href={nextUrl} className={commonCssClases.btnIcon}>
        <IconRightArrow className='size-8' />
      </Link>
    </div>
  );
};

export default LessonNavigation;
