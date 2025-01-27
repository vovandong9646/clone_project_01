import React from 'react';
import CourseDetail from './CourseDetail';
import { getCourseBySlugAction } from '@/actions/course.action';

type IPramsProps = Promise<{ slug: string }>;
const page = async ({ params }: { params: IPramsProps }) => {
  const { slug } = await params;

  const courseDetail = await getCourseBySlugAction({ slug });
  if (!courseDetail) return null;

  return (
    <div>
      <CourseDetail courseDetail={JSON.parse(JSON.stringify(courseDetail))} />
    </div>
  );
};

export default page;
