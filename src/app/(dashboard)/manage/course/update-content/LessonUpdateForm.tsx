'use client';

import { ILesson } from '@/database/lesson.model';
import React, { useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { updateLesson } from '@/actions/lesson.action';
import slugify from 'slugify';
import { toast } from 'react-toastify';
import { Editor } from '@tinymce/tinymce-react';

const formSchema = z.object({
  title: z.string().nonempty('Tiêu đề không được để trống'),
  slug: z.string().nonempty('Đường dẫn không được để trống'),
  video_url: z.string().optional(),
  duration: z.number().int().optional(),
  content: z.string().optional()
});

const LessonUpdateForm = ({ lesson }: { lesson: ILesson }) => {
  const editorRef = useRef(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: lesson.title,
      slug: lesson.slug,
      video_url: lesson.video_url,
      duration: lesson.duration,
      content: lesson.content
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await updateLesson({
        lessonId: lesson._id.toString(),
        updateData: {
          title: values.title,
          slug: values.slug || slugify(values.title, { lower: true, locale: 'vi', remove: /[^a-zA-Z0-9\s-]/g }),
          video_url: values.video_url,
          duration: values.duration,
          content: values.content
        }
      });
      if (res?.success) {
        toast.success('Cập nhật bài học thành công');
        return;
      }
      toast.error('Cập nhật bài học thất bại');
    } catch (error) {
      toast.error('Có lỗi hệ thống, vui lòng thử lại sau');
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='grid grid-cols-2 gap-3'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tiêu đề bài học:</FormLabel>
                <FormControl>
                  <Input placeholder='Bài học mới' {...field} />
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
                <FormLabel>Đường dẫn:</FormLabel>
                <FormControl>
                  <Input placeholder='bai-hoc-moi' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='video_url'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Đường dẫn video:</FormLabel>
                <FormControl>
                  <Input placeholder='https://youtube.com/xxx' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='duration'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thời lượng video:</FormLabel>
                <FormControl>
                  <Input placeholder='10' {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name='content'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nội dung:</FormLabel>
                <FormControl>
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
                    onInit={(_evt: any, editor: any) => (editorRef.current = editor)}
                    initialValue={lesson.content}
                    onEditorChange={(content) => field.onChange(content)}
                    init={{
                      height: 500,
                      menubar: false,
                      plugins: [
                        'advlist',
                        'autolink',
                        'lists',
                        'link',
                        'image',
                        'charmap',
                        'preview',
                        'anchor',
                        'searchreplace',
                        'visualblocks',
                        'code',
                        'fullscreen',
                        'insertdatetime',
                        'media',
                        'table',
                        'code',
                        'help',
                        'wordcount'
                      ],
                      toolbar:
                        'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat | help',
                      content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type='submit'>Cập nhật bài học</Button>
      </form>
    </Form>
  );
};

export default LessonUpdateForm;
