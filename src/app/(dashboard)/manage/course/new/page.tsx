import React from 'react';
import CourseAddNew from './CourseAddNew';

const page = () => {
  return (
    <div>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold'>Thêm mới khoá học</h1>
      </div>
      <CourseAddNew />
    </div>
  );
};

export default page;
