import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

import { dbConnect } from '@/lib/db';
import Collection from '@/lib/models/Collection';

// GET explore public maps
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;

    const collections = await Collection.find({ isPublic: true })
      .populate('owner', 'name avatar username')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Collection.countDocuments({ isPublic: true });

    return NextResponse.json({
      success: true,
      data: collections,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error exploring maps:', error);
    return NextResponse.json({ error: 'Failed to explore maps' }, { status: 500 });
  }
}
