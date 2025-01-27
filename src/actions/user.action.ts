'use server';

import User from '@/database/user.model';
import { connectToDatabase } from '@/lib/mongoose';

export const createUserAction = async (params: {
  clerkId: string;
  email: string;
  username: string;
  name?: string;
  avatar?: string;
}) => {
  try {
    connectToDatabase();
    const res = await User.create(params);
    if (!res) return;
    return {
      success: true
    };
  } catch (error) {
    console.error(error);
  }
};
