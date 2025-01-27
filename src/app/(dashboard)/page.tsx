import { getAllCoursesAction } from '@/actions/course.action';
import CourseItem from '@/components/courses/CourseItem';
import React from 'react';

const page = async () => {
  const courseList = await getAllCoursesAction();
  if (!courseList || courseList.length === 0) return null;

  return (
    <div>
      <h1 className='font-bold text-2xl mb-5'>Khu vực khám phá</h1>
      <div className='grid grid-cols-4 gap-2'>
        {courseList.map((course) => (
          <CourseItem course={JSON.parse(JSON.stringify(course))} />
        ))}
      </div>
    </div>
  );
};

export default page;
