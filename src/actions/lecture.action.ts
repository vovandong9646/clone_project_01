'use server';

import Course from '@/database/course.model';
import Lecture from '@/database/lecture.model';
import Lesson from '@/database/lesson.model';
import { connectToDatabase } from '@/lib/mongoose';
import { ILectureWithLessons, TCreateLecture, TUpdateLecture } from '@/types';
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

export const fetchAllLectureByCourse = async ({
  courseId
}: {
  courseId: string;
}): Promise<ILectureWithLessons[] | undefined> => {
  try {
    connectToDatabase();
    const lectures = await Lecture.find({ course: courseId, _destroy: false }).populate({
      path: 'lessons',
      model: Lesson,
      match: { _destroy: false }
    });
    if (!lectures) return;
    return lectures;
  } catch (error) {
    console.log(error);
  }
};
