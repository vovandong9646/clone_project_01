import React from 'react';
import LessonContent from './LessonContent';
import { ILesson } from '@/database/lesson.model';
import { fetchAllLectureByCourse } from '@/actions/lecture.action';
import LessonNavigation from './LessonNavigation';
import { fetchAllLessonByCourse } from '@/actions/lesson.action';

const LessonDetail = async ({ lessonDetail, courseSlug }: { lessonDetail: ILesson; courseSlug: string }) => {
  // fetch lecture for outline
  const lectures = await fetchAllLectureByCourse({ courseId: lessonDetail.course.toString() });

  const videoId = lessonDetail.video_url?.split('v=')[1];

  // next url and previous url
  const lessonList = (await fetchAllLessonByCourse({ course: lessonDetail.course.toString() })) || [];
  const currentLessonIndex = lessonList.findIndex((lesson) => lesson._id.toString() === lessonDetail._id.toString());
  const prevLessonIndex = currentLessonIndex - 1;
  const nextLessonIndex = currentLessonIndex + 1;
  const baseUrl = `/${courseSlug}/lesson/`;
  const nextUrl = baseUrl + lessonList[nextLessonIndex]?.slug || '';
  const prevUrl = baseUrl + lessonList[prevLessonIndex]?.slug || '';

  return (
    <div className='grid grid-cols-[minmax(0,2fr),minmax(0,1fr)] gap-3'>
      <div>
        <iframe
          className='w-full aspect-video rounded-md shadow-md'
          src={`https://www.youtube.com/embed/${videoId}`}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        ></iframe>
        <LessonNavigation nextUrl={nextUrl} prevUrl={prevUrl} />
        <h1 className='font-bold text-3xl mt-3 mb-3'>{lessonDetail.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: lessonDetail.content }}></div>
      </div>
      <div>
        <LessonContent isAccessLink={true} lectures={JSON.parse(JSON.stringify(lectures)) || []} />
      </div>
    </div>
  );
};

export default LessonDetail;
