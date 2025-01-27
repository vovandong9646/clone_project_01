'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { updateCourseAction } from '@/actions/course.action';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { ECourseLevel, ECourseStatus } from '@/types/enum';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { courseLevel, courseStatus } from '@/constant';
import { ICourse } from '@/database/course.model';
import { IconAdd } from '@/components/icons';
import { useImmer } from 'use-immer';

const formSchema = z.object({
  title: z.string().nonempty('Tên khoá học không được để trống').min(10, 'Tên khoá học phải có ít nhất 10 ký tự'),
  slug: z.string().optional(),
  desc: z.string().optional(),
  image: z.string().optional(),
  intro_url: z.string().optional(),
  views: z.number().int().optional(),
  price: z.number().int().positive().optional(),
  price_sale: z.number().int().positive().optional(),
  level: z.enum([ECourseLevel.ADVANCED, ECourseLevel.BEGINNER, ECourseLevel.INTERMEDIATE]).optional(),
  status: z.enum([ECourseStatus.APPROVED, ECourseStatus.PENDING, ECourseStatus.REJECTED]).optional(),
  info: z
    .object({
      requirements: z.array(z.string()).optional(),
      benefits: z.array(z.string()).optional(),
      qas: z.array(z.object({ question: z.string(), answer: z.string() })).optional()
    })
    .optional()
});

const CourseUpdate = ({ course }: { course: ICourse }) => {
  const router = useRouter();

  const [courseInfo, setCourseInfo] = useImmer({
    requirements: course.info.requirements,
    benefits: course.info.benefits,
    qas: course.info.qas
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: course.title,
      slug: course.slug,
      desc: course.desc,
      image: course.image,
      intro_url: course.intro_url,
      views: course.views,
      price: course.price,
      price_sale: course.price_sale,
      level: course.level,
      status: course.status,
      info: {
        requirements: course.info.requirements,
        benefits: course.info.benefits,
        qas: course.info.qas
      }
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await updateCourseAction({
        slug: course.slug,
        updateData: {
          title: values.title,
          slug: values.slug,
          price: values.price,
          price_sale: values.price_sale,
          desc: values.desc,
          image: values.image,
          intro_url: values.intro_url,
          views: values.views,
          status: values.status,
          level: values.level,
          info: {
            requirements: courseInfo.requirements,
            benefits: courseInfo.benefits,
            qas: courseInfo.qas
          }
        }
      });
      if (res?.success) {
        toast.success('Cập nhật khoá học thành công');

        if (course.slug !== values.slug) {
          router.push(`/manage/course/update?slug=${values.slug}`);
        }

        return;
      }
      toast.error('Cập nhật khoá học thất bại');
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
          <FormField
            control={form.control}
            name='price_sale'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá gốc:</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='900,000đ'
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá khuyến mãi:</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='400,000đ'
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='desc'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả khoá học:</FormLabel>
                <FormControl>
                  <Textarea placeholder='Nhập mô tả...' {...field} className='h-[250px]' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='image'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ảnh đại diện:</FormLabel>
                <FormControl></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='intro_url'
            render={({ field }) => (
              <FormItem>
                <FormLabel>video intro:</FormLabel>
                <FormControl>
                  <Input placeholder='https://youtube.com/xxx' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='views'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lượt xem:</FormLabel>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='100'
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='status'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trạng thái:</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Chọn trạng thái' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {courseStatus.map((el) => (
                        <SelectItem key={el.value} value={el.value}>
                          {el.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='level'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trình độ:</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Chọn trình độ' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {courseLevel.map((el) => (
                        <SelectItem key={el.value} value={el.value}>
                          {el.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='info.requirements'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <div className='flex justify-between items-center'>
                    <span>Yêu cầu:</span>
                    <button
                      type='button'
                      className='text-primary'
                      onClick={() => {
                        setCourseInfo((draft) => {
                          draft.requirements.push('');
                        });
                      }}
                    >
                      <IconAdd className='size-5' />
                    </button>
                  </div>
                </FormLabel>
                <FormControl>
                  <div className='flex flex-col gap-2'>
                    {courseInfo.requirements.map((el, index) => (
                      <Input
                        key={index}
                        placeholder={`Yêu cầu ${index + 1}`}
                        {...field}
                        value={el}
                        onChange={(e) => {
                          setCourseInfo((draft) => {
                            draft.requirements[index] = e.target.value;
                          });
                        }}
                      />
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='info.benefits'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <div className='flex justify-between items-center'>
                    <span>Lợi ích:</span>
                    <button
                      type='button'
                      className='text-primary'
                      onClick={() => {
                        setCourseInfo((draft) => {
                          draft.benefits.push('');
                        });
                      }}
                    >
                      <IconAdd className='size-5' />
                    </button>
                  </div>
                </FormLabel>
                <FormControl>
                  <div className='flex flex-col gap-2'>
                    {courseInfo.benefits.map((el, index) => (
                      <Input
                        key={index}
                        placeholder={`Lợi ích ${index + 1}`}
                        {...field}
                        value={el}
                        onChange={(e) => {
                          setCourseInfo((draft) => {
                            draft.benefits[index] = e.target.value;
                          });
                        }}
                      />
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='w-full'>
          <FormField
            control={form.control}
            name='info.benefits'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <div className='flex justify-between items-center'>
                    <span>Q&A:</span>
                    <button
                      type='button'
                      className='text-primary'
                      onClick={() => {
                        setCourseInfo((draft) => {
                          draft.qas.push({
                            question: '',
                            answer: ''
                          });
                        });
                      }}
                    >
                      <IconAdd className='size-5' />
                    </button>
                  </div>
                </FormLabel>
                <FormControl>
                  <div className='flex flex-col gap-2'>
                    {courseInfo.qas.map((el, index) => (
                      <div className='flex gap-2' key={index}>
                        <Input
                          placeholder={`Câu hỏi ${index + 1}`}
                          {...field}
                          value={el.question}
                          onChange={(e) => {
                            setCourseInfo((draft) => {
                              draft.qas[index].question = e.target.value;
                            });
                          }}
                        />
                        <Input
                          placeholder={`Câu trả lời ${index + 1}`}
                          {...field}
                          value={el.answer}
                          onChange={(e) => {
                            setCourseInfo((draft) => {
                              draft.qas[index].answer = e.target.value;
                            });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type='submit'>Cập nhật khoá học</Button>
      </form>
    </Form>
  );
};

export default CourseUpdate;
