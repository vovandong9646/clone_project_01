import { ELessonType } from '@/types/enum';
import { Document, model, models, Schema } from 'mongoose';

export interface ILesson extends Document {
  _id: string;
  title: string;
  slug: string;
  video_url: string;
  duration: number;
  order: number;
  content: string;

  _destroy: boolean;
  createdAt: Date;

  lecture: Schema.Types.ObjectId;
  course: Schema.Types.ObjectId;

  type: ELessonType; //video, text
}

const lessonSchema = new Schema<ILesson>({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  video_url: { type: String, default: '' },
  duration: { type: Number, default: 0 },
  order: { type: Number },
  content: { type: String, default: '' },
  _destroy: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  lecture: { type: Schema.Types.ObjectId, ref: 'Lecture' },
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  type: { type: String, enum: Object.values(ELessonType), default: ELessonType.VIDEO }
});

const Lesson = models.Lesson || model<ILesson>('Lesson', lessonSchema);
export default Lesson;
