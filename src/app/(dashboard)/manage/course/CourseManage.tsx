'use client';

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import { IconDelete, IconEdit, IconEye, IconStudy } from '@/components/icons';
import { ICourse } from '@/database/course.model';
import { courseStatus } from '@/constant';
import { cn } from '@/lib/utils';
import { updateCourseAction } from '@/actions/course.action';
import { ECourseStatus } from '@/types/enum';
import { toast } from 'react-toastify';

const CourseManage = ({ courseList }: { courseList: ICourse[] }) => {
  const handleChangeStatus = async (courseSlug: string, courseStatus: string) => {
    try {
      const res = await updateCourseAction({
        slug: courseSlug,
        updateData: {
          status: courseStatus === ECourseStatus.PENDING ? ECourseStatus.APPROVED : ECourseStatus.PENDING
        }
      });
      if (res?.success) {
        toast.success('Cập nhật trạng thái thành công');
        return;
      }
      toast.error('Cập nhật trạng thái thất bại');
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCourse = async (courseSlug: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xoá khoá học này?')) {
      return;
    }
    try {
      // delete course
      const res = await updateCourseAction({ slug: courseSlug, updateData: { _destroy: true } });
      if (res?.success) {
        toast.success('Xoá thành công');
        return;
      }
      toast.error('Xoá thất bại');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Thông tin</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courseList.map((course) => {
            const status = courseStatus.find((item) => item.value === course.status);
            const statusName = status?.label || '';
            const statusClassName = status?.className || '';
            return (
              <TableRow key={course._id}>
                <TableCell>
                  <div className='flex items-start space-x-4'>
                    <img src={course.image} alt='' className='w-[150px] object-cover rounded-lg' />
                    <div className='flex flex-col gap-2'>
                      <h2 className='font-bold text-lg'>{course.title}</h2>
                      <span className='text-sm text-slate-600'>
                        {new Date(course.created_at).toLocaleDateString('en-ZA')}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{course.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</TableCell>
                <TableCell>
                  <span
                    onClick={() => handleChangeStatus(course.slug, course.status)}
                    className={cn('py-1 px-2 bg-opacity-30 rounded-lg cursor-pointer', statusClassName)}
                  >
                    {statusName}
                  </span>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-2'>
                    {/* start redirect to outline lectures and lessons */}
                    <Link
                      href={`/manage/course/update-content?slug=${course.slug}`}
                      className='border border-primary text-primary p-1 rounded-md'
                    >
                      <IconStudy className='size-4' />
                    </Link>
                    {/* end redirect to outline lectures and lessons */}

                    {/* link redirect to detail course */}
                    <Link
                      href={`/course/${course.slug}`}
                      target='_blank'
                      className='border border-primary text-primary p-1 rounded-md'
                    >
                      <IconEye className='size-4' />
                    </Link>
                    {/* end redirect detail course */}

                    {/* start edit course */}
                    <Link
                      href={`/manage/course/update?slug=${course.slug}`}
                      className='border border-primary text-primary p-1 rounded-md'
                    >
                      <IconEdit className='size-4' />
                    </Link>
                    {/* end edit course */}

                    {/* start delete course */}
                    <button
                      onClick={() => handleDeleteCourse(course.slug)}
                      className='border border-primary text-primary p-1 rounded-md'
                    >
                      <IconDelete className='size-4' />
                    </button>
                    {/* end delete course */}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseManage;
