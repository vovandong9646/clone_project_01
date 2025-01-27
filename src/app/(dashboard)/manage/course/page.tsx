import React from 'react';
import CourseManage from './CourseManage';
import { getAllCoursesAction } from '@/actions/course.action';
import Link from 'next/link';

const page = async () => {
  const courseList = await getAllCoursesAction();
  if (!courseList) {
    return;
  }
  return (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold mb-4'>Quản lý khoá học</h1>
        <Link
          href={`/manage/course/new`}
          className='bg-primary text-white px-3 py-1 h-10  rounded-md flex items-center justify-center'
        >
          Thêm khoá học
        </Link>
      </div>
      <div>
        <CourseManage courseList={JSON.parse(JSON.stringify(courseList))} />
      </div>
    </div>
  );
};

export default page;
