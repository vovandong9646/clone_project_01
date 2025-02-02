'use server';

import Course, { ICourse } from '@/database/course.model';
import Lecture from '@/database/lecture.model';
import Lesson from '@/database/lesson.model';
import { connectToDatabase } from '@/lib/mongoose';
import { ICourseWithLectures, TCreateCourse, TUpdatecourse } from '@/types';
import { revalidatePath } from 'next/cache';

export const createCourseAction = async (params: TCreateCourse) => {
  try {
    connectToDatabase();
    const res = await Course.create(params);
    if (!res) return;
    return {
      success: true,
      course: JSON.parse(JSON.stringify(res))
    };
  } catch (error) {
    console.error(error);
  }
};

export const getCourseBySlugAction = async ({ slug }: { slug: string }): Promise<ICourseWithLectures | undefined> => {
  try {
    connectToDatabase();

    const course = await Course.findOne({ slug: slug, _destroy: false }).populate({
      path: 'lectures',
      model: Lecture,
      match: { _destroy: false },
      populate: {
        path: 'lessons',
        model: Lesson,
        match: { _destroy: false }
      }
    });
    if (!course) return;
    return course;
  } catch (error) {
    console.error(error);
  }
};

export const updateCourseAction = async (params: TUpdatecourse) => {
  try {
    connectToDatabase();
    const res = await Course.findOneAndUpdate({ slug: params.slug }, params.updateData, { new: true });
    if (!res) return;
    revalidatePath('/');
    return {
      success: true
    };
  } catch (error) {
    console.error(error);
  }
};

export const getAllCoursesAction = async (): Promise<ICourse[] | undefined> => {
  try {
    connectToDatabase();

    const courseList = await Course.find({ _destroy: false });
    if (!courseList) return;
    return courseList;
  } catch (error) {
    console.error(error);
  }
};
