import { IconExplore, IconPlay, IconStudy } from '@/components/icons';
import { ICourse } from '@/database/course.model';
import Link from 'next/link';
import React from 'react';
import LessonContent from '../../[course]/lesson/[slug]/LessonContent';
import { ICourseWithLectures } from '@/types';

const CourseDetail = ({ courseDetail }: { courseDetail: ICourseWithLectures }) => {
  const lectures = courseDetail.lectures;
  return (
    <div className='grid grid-cols-[minmax(0,2fr),minmax(0,1fr)]'>
      <div className='w-full p-4'>
        <img src={courseDetail.image} alt='' className='w-full object-cover rounded-lg' />
        <h1 className='text-2xl font-bold mt-4'>{courseDetail.title}</h1>
        <div className='mt-4'>
          <h2 className='text-xl'>
            <span className='text-primary'>♚</span> Mô tả:
          </h2>
          <p className='text-sm text-slate-700'>{courseDetail.desc}</p>
        </div>
        <div className='mt-4'>
          <h2 className='text-xl'>
            <span className='text-primary'>♚</span> Nội dung khoá học:
          </h2>
          <p className='text-sm text-slate-700'>
            <LessonContent lectures={lectures} />
          </p>
        </div>
        <div className='mt-4'>
          <h2 className='text-xl'>
            <span className='text-primary'>♚</span> Yêu cầu:
          </h2>
          <ul className='text-sm text-slate-700 list-disc list-inside'>
            {courseDetail.info.requirements.map((requirement, index) => (
              <li>{requirement}</li>
            ))}
          </ul>
        </div>
        <div className='mt-4'>
          <h2 className='text-xl'>
            <span className='text-primary'>♚</span> Lợi ích:
          </h2>
          <ul className='text-sm text-slate-700 list-disc list-inside'>
            {courseDetail.info.benefits.map((item, index) => (
              <li>{item}</li>
            ))}
          </ul>
        </div>
        <div className='mt-4'>
          <h2 className='text-xl'>
            <span className='text-primary'>♚</span> Q&A:
          </h2>
          <p className='text-sm text-slate-700'>
            Với hơn 100 videos trong khoá học evondev sẽ dạy các bạn đi từ kiến thức cơ bản nhất cho đến nâng cao thông
          </p>
        </div>
      </div>
      <div className='p-4'>
        <div className='rounded-lg shadow-md bg-white p-4 sticky top-8'>
          <div className='flex justify-between items-center mb-3'>
            <p className='text-xl font-bold text-primary'>{courseDetail.price.toLocaleString('en-EN')}đ</p>
            <span className='bg-primary text-primary bg-opacity-30 font-semibold py-1 px-3 rounded-md'>
              -{Math.floor(100 - (courseDetail.price / courseDetail.price_sale) * 100)}%
            </span>
          </div>
          <ul className='mb-3'>
            <li className='flex items-center gap-2 text-sm text-slate-700'>
              <IconPlay className='size-4' />
              <span>Video quay full HD</span>
            </li>
            <li className='flex items-center gap-2 text-sm text-slate-700'>
              <IconStudy className='size-4' />
              <span>Hỗ trợ trong quá trình học</span>
            </li>
            <li className='flex items-center gap-2 text-sm text-slate-700'>
              <IconExplore className='size-4' />
              <span>Có tài liệu kèm theo</span>
            </li>
          </ul>
          <Link href='#' className='flex items-center justify-center bg-primary text-white py-2 rounded-lg h-10'>
            Mua ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
