import React from 'react';
import LessonDetail from './LessonDetail';
import { fetchLessonBySlugAndCourse } from '@/actions/lesson.action';

type IParamsProps = Promise<{ course: string; slug: string }>;
const page = async ({ params }: { params: IParamsProps }) => {
  const { course, slug: lessonSlug } = await params;

  const lessonDetail = await fetchLessonBySlugAndCourse({ slug: lessonSlug, course });
  if (!lessonDetail) return;

  return (
    <div>
      <LessonDetail courseSlug={course} lessonDetail={JSON.parse(JSON.stringify(lessonDetail))} />
    </div>
  );
};

export default page;
