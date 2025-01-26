import { menuItems } from '@/constant';
import Link from 'next/link';
import React from 'react';
import ActiveLink from './ActiveLink';

const SideBar = () => {
  return (
    <div className='w-[300px] h-screen p-4 border-r shadow-sm'>
      <h2 className='font-bold text-3xl mb-5'>
        <span className='text-primary'>U</span>
        cademy
      </h2>
      <ul className='flex flex-col gap-4'>
        {menuItems.map((item, index) => (
          <ActiveLink key={index} url={item.path}>
            {item.icon}
            <span>{item.title}</span>
          </ActiveLink>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
