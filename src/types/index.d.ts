import { ILecture } from './../database/lecture.model';
import { ICourse } from '@/database/course.model';
import { ILecture } from '@/database/lecture.model';
import { ILesson } from '@/database/lesson.model';

export type TMenuItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
};

export type TCreateCourse = {
  title: string;
  slug: string;
};

export type TUpdatecourse = {
  slug: string;
  // updateData: {
  //   title?: string;
  //   slug?: string;
  //   price?: number;
  //   price_sale?: number;
  //   desc?: string;
  //   image?: string;
  //   intro_url?: string;
  //   views?: number;
  //   status?: string;
  //   level?: string;
  // };
  updateData: Partial<ICourse>;
};

export type TCreateLecture = {
  title: string;
  slug?: string;
  course: string;
  path: string;
};

export interface ICourseWithLectures extends Omit<ICourse, 'lectures'> {
  lectures: ILectureWithLessons[];
}

export interface ILectureWithLessons extends Omit<ILecture, 'lessons'> {
  lessons: ILesson[];
}

export type TUpdateLecture = {
  lectureId: string;
  updateData: Partial<TLecture>;
  path: string;
};

export type TCreateLesson = {
  title: string;
  slug?: string;
  course: string;
  lecture: string;
  path: string;
};

export type TUpdateLesson = {
  lessonId: string;
  updateData: Partial<ILesson>;
  path?: string;
};
