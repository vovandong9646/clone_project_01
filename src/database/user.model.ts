import { EUserRole, EUserStatus } from '@/types/enum';
import { Document, model, models, Schema } from 'mongoose';

interface IUser extends Document {
  clerkId: string;
  email: string;
  username: string;
  name: string;
  avatar: string;
  courses: Schema.Types.ObjectId[];
  created_at: Date;
  role: EUserRole;
  status: EUserStatus;
}

const userSchema = new Schema<IUser>({
  clerkId: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, default: '' },
  name: { type: String, default: '' },
  avatar: { type: String, default: '' },
  courses: { type: [{ type: Schema.Types.ObjectId, ref: 'Course' }], default: [] },
  created_at: { type: Date, default: Date.now },
  role: { type: String, enum: Object.values(EUserRole), default: EUserRole.USER },
  status: { type: String, enum: Object.values(EUserStatus), default: EUserStatus.INACTIVE }
});

const User = models.User || model<IUser>('User', userSchema);
export default User;
