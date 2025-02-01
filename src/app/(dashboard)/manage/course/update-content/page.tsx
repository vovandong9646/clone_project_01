import React from 'react';
import UpdateContent from './UpdateContent';
import { getCourseBySlugAction } from '@/actions/course.action';

type IParamProps = Promise<{ slug: string }>;
const page = async ({ searchParams }: { searchParams: IParamProps }) => {
  const { slug } = await searchParams;

  const courseDb = await getCourseBySlugAction({ slug });
  if (!courseDb) return null;

  return <UpdateContent course={JSON.parse(JSON.stringify(courseDb))} />;
};

export default page;
