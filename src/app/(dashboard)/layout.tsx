import SideBar from '@/components/commons/SideBar';
import React from 'react';

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='grid grid-cols-[300px,minmax(0,2fr)]'>
      <SideBar />
      <div></div>
      <div className='p-5'>{children}</div>
    </div>
  );
};

export default DashBoardLayout;
