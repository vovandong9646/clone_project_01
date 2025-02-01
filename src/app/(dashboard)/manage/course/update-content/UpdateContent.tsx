'use client';

import React, { useState } from 'react';
import { IconCancel, IconDelete, IconEdit } from '@/components/icons';
import IconCheck from '@/components/icons/IconCheck';
import { Input } from '@/components/ui/input';
import { commonCssClases } from '@/constant';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { createLectureAction, updateLecture } from '@/actions/lecture.action';
import { toast } from 'react-toastify';
import { ICourseWithLectures } from '@/types';
import slugify from 'slugify';

const UpdateContent = ({ course }: { course: ICourseWithLectures }) => {
  const [editLectureId, setEditLectureId] = useState<string | null>(null);
  const [editLectureTitle, setEditLectureTitle] = useState<string>('');

  const lectures = course.lectures;

  const handleAddNewLecture = async () => {
    const res = await createLectureAction({
      title: 'Chương học mới',
      course: course._id.toString(),
      path: `/manage/course/update-content?slug=${course.slug}`
    });
    if (res?.success) {
      toast.success('Thêm chương học thành công');
      return;
    }
    toast.error('Thêm chương học thất bại');
  };

  const handleDeleteLecture = async (e: React.MouseEvent<HTMLSpanElement>, lectureId: string) => {
    e.stopPropagation();
    if (window.confirm('Bạn có chắc chắn muốn xóa chương học này?')) {
      try {
        await updateLecture({
          lectureId,
          updateData: { _destroy: true },
          path: `/manage/course/update-content?slug=${course.slug}`
        });
        toast.success('Xóa chương học thành công');
      } catch (error) {
        toast.error('Xóa chương học thất bại');
      }
    }
  };

  const handleUpdateLecture = async (e: React.MouseEvent<HTMLSpanElement>, lectureId: string) => {
    e.stopPropagation();
    await updateLecture({
      lectureId,
      updateData: {
        title: editLectureTitle,
        slug: slugify(editLectureTitle, { lower: true, locale: 'vi', remove: /[^a-zA-Z0-9\s-]/g })
      },
      path: `/manage/course/update-content?slug=${course.slug}`
    });
    toast.success('Cập nhật chương học thành công');
    setEditLectureTitle('');
    setEditLectureId(null);
    try {
    } catch (error) {
      toast.error('Cập nhật chương học thất bại');
    }
  };

  return (
    <div>
      {lectures.map((lecture) => {
        return (
          <div key={lecture._id}>
            <Accordion type='single' collapsible>
              <AccordionItem value={lecture._id} className='flex flex-col'>
                <AccordionTrigger className='rounded-lg shadow-md bg-white mb-2 px-2'>
                  {editLectureId === lecture._id ? (
                    <div className='flex items-center justify-between gap-4 w-full mx-3'>
                      <Input
                        placeholder={lecture.title}
                        value={editLectureTitle}
                        onChange={(e) => setEditLectureTitle(e.target.value)}
                      />
                      <div className='flex gap-2'>
                        <span className={commonCssClases.btnIcon} onClick={(e) => handleUpdateLecture(e, lecture._id)}>
                          <IconCheck className='size-4' />
                        </span>
                        <span
                          className={commonCssClases.btnIcon}
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditLectureId(null);
                          }}
                        >
                          <IconCancel className='size-4' />
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className='flex items-center justify-between gap-4 w-full mx-3'>
                      <div>{lecture.title}</div>
                      <div className='flex gap-2'>
                        <span
                          className={commonCssClases.btnIcon}
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditLectureId(lecture._id);
                            setEditLectureTitle(lecture.title);
                          }}
                        >
                          <IconEdit className='size-4' />
                        </span>
                        <span className={commonCssClases.btnIcon} onClick={(e) => handleDeleteLecture(e, lecture._id)}>
                          <IconDelete className='size-4' />
                        </span>
                      </div>
                    </div>
                  )}
                </AccordionTrigger>
                <AccordionContent className='bg-white mb-2 px-2 rounded-md shadow-sm'>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        );
      })}

      <Button className='ml-auto flex' onClick={() => handleAddNewLecture()}>
        Thêm chương học
      </Button>
    </div>
  );
};

export default UpdateContent;
