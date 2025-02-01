import { Document, model, models, Schema } from 'mongoose';

export interface ILecture extends Document {
  _id: string;
  title: string;
  slug: string;

  _destroy: boolean;
  createdAt: Date;

  course: Schema.Types.ObjectId;
  lessons: Schema.Types.ObjectId[];
}

const lectureSchema = new Schema<ILecture>({
  title: { type: String, required: true },
  slug: { type: String, required: true },

  _destroy: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },

  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }]
});

const Lecture = models.Lecture || model<ILecture>('Lecture', lectureSchema);
export default Lecture;
