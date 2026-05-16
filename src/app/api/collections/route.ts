import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { dbConnect } from '@/lib/db';
import Collection from '@/lib/models/Collection';

// GET user's collections
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const isPublic = searchParams.get('public') === 'true';

    let query: any = {};

    if (isPublic) {
      query.isPublic = true;
    } else if (session?.user) {
      query.$or = [
        { owner: (session.user as any).id },
        { 'collaborators.user': (session.user as any).id },
      ];
    } else if (userId) {
      query.owner = userId;
      query.isPublic = true;
    } else {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const collections = await Collection.find(query)
      .populate('owner', 'name avatar username')
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: collections,
    });
  } catch (error) {
    console.error('Error fetching collections:', error);
    return NextResponse.json({ error: 'Failed to fetch collections' }, { status: 500 });
  }
}

// POST create collection
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const body = await req.json();

    const collection = new Collection({
      ...body,
      owner: (session.user as any).id,
      stats: {
        totalPlaces: 0,
        visited: 0,
        planned: 0,
        wantToVisit: 0,
      },
    });

    await collection.save();

    return NextResponse.json(
      {
        success: true,
        data: collection,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error creating collection:', error);
    return NextResponse.json({ error: 'Failed to create collection' }, { status: 500 });
  }
}
