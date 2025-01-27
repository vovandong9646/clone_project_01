'use server';

import mongoose from 'mongoose';

let databaseConnected: boolean = false;

/**
 * Connects to the MongoDB database using the connection string provided in the environment variable `MONGODB_URL`.
 *
 * - If `MONGODB_URL` is not set, logs an informational message and returns without attempting to connect.
 * - If the database is already connected, logs an informational message and returns without attempting to connect.
 * - If the connection is successful, logs a message indicating a new database connection is being used and sets the connection status to true.
 * - If there is an error during the connection attempt, logs an error message with the error details.
 *
 * @returns {Promise<void>} A promise that resolves when the connection attempt is complete.
 */
export const connectToDatabase = async (): Promise<void> => {
  if (!process.env.MONGODB_URL) {
    console.info('MONGODB_URL is not set');
    return;
  }

  if (databaseConnected) {
    console.info('MONGODB_URL is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.info('Using new database connection');
    databaseConnected = true;
  } catch (error) {
    console.error('Error connecting to database', error);
  }
};
