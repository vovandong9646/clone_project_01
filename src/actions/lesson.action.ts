'use server';

import Course from '@/database/course.model';
import Lecture from '@/database/lecture.model';
import Lesson, { ILesson } from '@/database/lesson.model';
import { connectToDatabase } from '@/lib/mongoose';
import { TCreateLesson, TUpdateLesson } from '@/types';
import { revalidatePath } from 'next/cache';
import slugify from 'slugify';

export const createLessonAction = async (params: TCreateLesson) => {
  try {
    connectToDatabase();

    const currentCourse = await Course.findById(params.course);
    if (!currentCourse) {
      throw new Error('Create lesson failed - course not found');
    }

    const currentLecture = await Lecture.findById(params.lecture);
    if (!currentLecture) {
      throw new Error('Create lesson failed -  lecture not found');
    }

    const lessonCreated = await Lesson.create({
      title: params.title,
      slug: params.slug || slugify(params.title, { lower: true, locale: 'vi' }),
      course: params.course,
      lecture: params.lecture
    });

    if (!lessonCreated) {
      throw new Error('Create lesson failed');
    }

    // push lesson to lecture
    currentLecture.lessons.push(lessonCreated._id);
    currentLecture.save();

    revalidatePath(params.path || '/');

    return {
      success: true
    };
  } catch (error) {
    console.log(error);
  }
};

export const updateLesson = async (params: TUpdateLesson) => {
  try {
    connectToDatabase();
    const lessonUpdated = await Lesson.findByIdAndUpdate(params.lessonId, params.updateData, { new: true });
    if (!lessonUpdated) {
      throw new Error('Update lesson failed');
    }
    revalidatePath(params.path || '/');
    return {
      success: true
    };
  } catch (error) {
    console.log(error);
  }
};

export const fetchLessonBySlugAndCourse = async (params: {
  slug: string;
  course: string;
}): Promise<ILesson | undefined> => {
  try {
    connectToDatabase();
    const currentCourse = await Course.findOne({ slug: params.course, _destroy: false }).select('_id');
    if (!currentCourse) return;

    const lesson = await Lesson.findOne({ slug: params.slug, course: currentCourse._id, _destroy: false });
    if (!lesson) return;
    return lesson;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllLessonByCourse = async (params: { course: string }): Promise<ILesson[] | undefined> => {
  try {
    connectToDatabase();

    const lessonList = await Lesson.find({ course: params.course, _destroy: false }).sort({ lecture: 1 });
    if (!lessonList) return;
    return lessonList;
  } catch (error) {
    console.log(error);
  }
};
