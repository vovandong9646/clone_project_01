import { menuItems } from '@/constant';
import React from 'react';
import ActiveLink from './ActiveLink';
import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { IconUser } from '../icons';

const SideBar = async () => {
  const { userId } = await auth();

  return (
    <div className='w-[300px] h-screen p-4 border-r shadow-sm fixed inset-y-0 left-0'>
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
      <div className='mt-auto flex justify-end items-center gap-2'>
        {userId ? (
          <div className='cursor-pointer text-primary bg-white flex flex-col text-sm items-center border p-2 rounded-md shadow-sm hover:bg-primary hover:text-white'>
            <UserButton />
          </div>
        ) : (
          <Link
            href='/sign-in'
            className='cursor-pointer text-primary bg-white flex flex-col text-sm items-center border p-2 rounded-md shadow-sm hover:bg-primary hover:text-white'
          >
            <IconUser className='size-6' />
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default SideBar;
