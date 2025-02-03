'use client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { ILectureWithLessons } from '@/types';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';

const LessonContent = ({
  lectures,
  isAccessLink = false
}: {
  lectures: ILectureWithLessons[];
  isAccessLink?: boolean;
}) => {
  const { course: courseSlug, slug: lessonSlug } = useParams<{ course: string; slug: string }>();

  return (
    <div>
      {lectures.map((lecture) => {
        return (
          <Accordion type='single' collapsible key={lecture._id}>
            <AccordionItem value={lecture._id} className='flex flex-col'>
              <AccordionTrigger className='rounded-lg shadow-md bg-white mb-2 px-2'>{lecture.title}</AccordionTrigger>
              <AccordionContent className='mb-2 px-2 rounded-md shadow-sm'>
                <div className='flex flex-col gap-2 border-none'>
                  {lecture.lessons.map((lesson) => {
                    return (
                      <div key={lesson._id} className='bg-white p-2 rounded-md'>
                        {isAccessLink ? (
                          <Link
                            href={`/${courseSlug}/lesson/${lesson.slug}`}
                            className={cn(' text-primary', lessonSlug === lesson.slug ? 'font-bold' : '')}
                          >
                            {lesson.title}
                          </Link>
                        ) : (
                          <div>{lesson.title}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      })}
    </div>
  );
};

export default LessonContent;
