import { ICourse } from '@/database/course.model';

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
  lectures: TLecture[];
}

export type TUpdateLecture = {
  lectureId: string;
  updateData: Partial<TLecture>;
  path: string;
};
