import React from 'react';
import CourseUpdate from './CourseUpdate';
import { getCourseBySlugAction } from '@/actions/course.action';

type IParams = Promise<{ slug: string }>;
const page = async ({ searchParams }: { searchParams: IParams }) => {
  const { slug } = await searchParams;

  const courseDetail = await getCourseBySlugAction({ slug });
  if (!courseDetail) return null;

  return (
    <div>
      <CourseUpdate course={JSON.parse(JSON.stringify(courseDetail))} />
    </div>
  );
};

export default page;
