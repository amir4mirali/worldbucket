import { connectDB } from '@/lib/db/connection';

// Cached connection to MongoDB
let cached = global as any;

if (!cached.mongo) {
  cached.mongo = {
    conn: null,
    promise: null,
  };
}

export async function dbConnect() {
  if (cached.mongo.conn) {
    return cached.mongo.conn;
  }

  if (!cached.mongo.promise) {
    cached.mongo.promise = connectDB().then((conn) => {
      return conn;
    });
  }

  cached.mongo.conn = await cached.mongo.promise;
  return cached.mongo.conn;
}
