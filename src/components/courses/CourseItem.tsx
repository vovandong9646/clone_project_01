import React from 'react';
import { IconEye, IconStar } from '../icons';
import Link from 'next/link';
import { ICourse } from '@/database/course.model';

const CourseItem = ({ course }: { course: ICourse }) => {
  return (
    <div className='border shadow-md p-2 rounded-md bgDarkMode borderDarkMode'>
      <img src={course.image} alt='' className='w-full object-cover h-[200px]' />
      <div className='mt-3'>
        <h3 className='font-bold text-xl'>{course.title}</h3>
        <div className='flex justify-between items-center mt-3 mb-3'>
          <div className='flex items-center gap-4'>
            <p className='flex items-center gap-1'>
              <IconStar className='size-4' />
              <span>4.5</span>
            </p>
            <p className='flex items-center gap-1'>
              <IconEye className='size-4' />
              <span>{course.views}</span>
            </p>
          </div>
          <p className='text-primary text-xl font-semibold'>{course.price.toLocaleString('en-En')} đ</p>
        </div>
      </div>
      <div className='mt-3'>
        <Link
          href={`/course/${course.slug}`}
          className='bg-primary text-white px-3 py-1 h-10  rounded-md w-full flex items-center justify-center'
        >
          Xem chi tiết
        </Link>
      </div>
    </div>
  );
};

export default CourseItem;
