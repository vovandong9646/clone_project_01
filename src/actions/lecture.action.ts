'use server';

import Course from '@/database/course.model';
import Lecture from '@/database/lecture.model';
import { connectToDatabase } from '@/lib/mongoose';
import { TCreateLecture, TUpdateLecture } from '@/types';
import { revalidatePath } from 'next/cache';
import slugify from 'slugify';

export const createLectureAction = async (params: TCreateLecture) => {
  try {
    connectToDatabase();

    const currentCourse = await Course.findById(params.course);
    if (!currentCourse) {
      throw new Error('Create lecture failed - course not found');
    }

    const lectureCreated = await Lecture.create({
      title: params.title,
      slug: params.slug || slugify(params.title, { lower: true, locale: 'vi' }),
      course: params.course
    });

    if (!lectureCreated) {
      throw new Error('Create lecture failed');
    }

    // push lecture to course
    currentCourse.lectures.push(lectureCreated._id);
    currentCourse.save();

    revalidatePath(params.path || '/');

    return {
      success: true
    };
  } catch (error) {
    console.log(error);
  }
};

export const updateLecture = async (params: TUpdateLecture) => {
  try {
    connectToDatabase();
    const lecture = await Lecture.findByIdAndUpdate(params.lectureId, params.updateData, { new: true });
    if (!lecture) {
      throw new Error('Update lecture failed');
    }
    revalidatePath(params.path || '/');
    return {
      success: true
    };
  } catch (error) {
    console.log(error);
  }
};
