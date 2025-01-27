import { ECourseLevel, ECourseStatus, EUserRole, EUserStatus } from '@/types/enum';
import { Document, model, models, Schema } from 'mongoose';

export interface ICourse extends Document {
  _id: string;
  title: string;
  slug: string;
  desc: string;
  image: string;
  intro_url: string;
  price: number;
  price_sale: number;
  created_at: Date;
  _destroy: boolean;
  status: ECourseStatus;
  author: Schema.Types.ObjectId;
  level: ECourseLevel;
  views: number;
  rating: number[];

  lectures: Schema.Types.ObjectId[];
  info: {
    requirements: string[];
    benefits: string[];
    qas: {
      question: string;
      answer: string;
    }[];
  };
}

const courseSchema = new Schema<ICourse>({
  title: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  desc: { type: String, default: '' },
  image: { type: String, default: '' },
  intro_url: { type: String, default: '' },
  price: { type: Number, default: 0 },
  price_sale: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  _destroy: { type: Boolean, default: false },
  status: { type: String, enum: Object.values(ECourseStatus), default: ECourseStatus.PENDING },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  level: { type: String, enum: Object.values(ECourseLevel), default: ECourseLevel.BEGINNER },
  views: { type: Number, default: 0 },
  rating: { type: [Number], default: [] },
  lectures: [{ type: Schema.Types.ObjectId, ref: 'Lecture' }],
  info: {
    requirements: { type: [String], default: [] },
    benefits: { type: [String], default: [] },
    qas: [
      {
        question: { type: String },
        answer: { type: String }
      }
    ],
    default: []
  }
});

const Course = models.Course || model<ICourse>('Course', courseSchema);
export default Course;
