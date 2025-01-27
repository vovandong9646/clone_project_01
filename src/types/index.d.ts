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
