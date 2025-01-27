'use server';

import Course, { ICourse } from '@/database/course.model';
import { connectToDatabase } from '@/lib/mongoose';
import { TCreateCourse, TUpdatecourse } from '@/types';
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

export const getCourseBySlugAction = async ({ slug }: { slug: string }): Promise<ICourse | undefined> => {
  try {
    connectToDatabase();

    const course = await Course.findOne({ slug });
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
