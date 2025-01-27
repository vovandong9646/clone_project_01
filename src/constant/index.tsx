import { TMenuItem } from '@/types';

import { IconExplore, IconStudy, IconPlay, IconUser, IconOrder, IconComment } from '@/components/icons';
import { ECourseLevel, ECourseStatus } from '@/types/enum';

export const menuItems: TMenuItem[] = [
  {
    title: 'Khu vực khám phá',
    path: '/',
    icon: <IconExplore className='size-5' />
  },
  {
    title: 'Khu vực học tập',
    path: '/study',
    icon: <IconStudy className='size-5' />
  },
  {
    title: 'Quản lý khoá học',
    path: '/manage/course',
    icon: <IconPlay className='size-5' />
  },
  {
    title: 'Quản lý người dùng',
    path: '/manage/user',
    icon: <IconUser className='size-5' />
  },
  {
    title: 'Quản lý đơn hàng',
    path: '/manage/order',
    icon: <IconOrder className='size-5' />
  },
  {
    title: 'Quản lý bình luận',
    path: '/manage/comment',
    icon: <IconComment className='size-5' />
  }
];

export const courseStatus = [
  {
    value: ECourseStatus.PENDING,
    label: 'Chờ duyệt',
    className: 'text-yellow-800 bg-yellow-400'
  },
  {
    value: ECourseStatus.APPROVED,
    label: 'Đã duyệt',
    className: 'text-green-800 bg-green-400'
  },
  {
    value: ECourseStatus.REJECTED,
    label: 'Từ chối',
    className: 'text-red-800 bg-red-400'
  }
];

export const courseLevel = [
  {
    value: ECourseLevel.BEGINNER,
    label: 'Sơ cấp'
  },
  {
    value: ECourseLevel.INTERMEDIATE,
    label: 'Trung cấp'
  },
  {
    value: ECourseLevel.ADVANCED,
    label: 'Cao cấp'
  }
];
