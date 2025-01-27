'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createCourseAction } from '@/actions/course.action';
import slugify from 'slugify';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  title: z.string().nonempty('Tên khoá học không được để trống').min(10, 'Tên khoá học phải có ít nhất 10 ký tự'),
  slug: z.string().optional()
});

const CourseAddNew = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      slug: ''
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await createCourseAction({
        title: values.title,
        slug: values.slug || slugify(values.title, { lower: true, locale: 'vi' })
      });
      if (res?.success) {
        toast.success('Thêm khoá học thành công');
        router.push(`/manage/course/update?slug=${res?.course.slug}`);
        return;
      }
      toast.error('Thêm khoá học thất bại');
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='grid grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên khoá học (*):</FormLabel>
                <FormControl>
                  <Input placeholder='Tên khoá học' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='slug'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Đường dẫn khoá học:</FormLabel>
                <FormControl>
                  <Input placeholder='ten-khoa-hoc' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type='submit'>Thêm khoá học</Button>
      </form>
    </Form>
  );
};

export default CourseAddNew;
