1. setup nextjs, mongodb, tailwincss, shadcn, clerk, sass, lodash
2. import font
3. dựng layout (sidebar và content)
   1. sidebar gồm có menu -> page.tsx
   2. content thì sẽ là page -> page.tsx
4. login với clerk
5. làm theme dark/light mode
6. Tạo khoá học (CUD)
7. Làm trang khám phá (explore)
   1. List các course (model course)
   2. Detail của course (courseDetail)
8. Làm trang quản lý course
   1. CRUD cho course
   2. Làm trang lectures (chương học)
      1. CRUD cho lectures
   3. Làm trang lesson (bài học)
      1. CRUD cho chương học
9. làm trang học /course-slug/lesson/lesson-slug

roadmap
làm trang CRUD khoá học
  - CourseManage (/manage/course)           -> Done
  - CRUD cho course                         -> Done
  - Làm trang lecture -> CRUD               -> DONE
  - làm trang lesson -> CRUD                -> DONE
  - render lại data của lecture và lesson vào trang courseDetail
  - Tạo trang học để user vào học `[course]/lesson/[lessonId]` hoặc nếu lỗi thì là `[course]/lesson?slug=lessonSlug`