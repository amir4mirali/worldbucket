import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { dbConnect } from '@/lib/db';
import Place from '@/lib/models/Place';
import Collection from '@/lib/models/Collection';

// GET all places for a collection
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const collectionId = params.id;
    const status = searchParams.get('status');

    let query: any = { collection: collectionId };

    if (status) {
      query.status = status;
    }

    const places = await Place.find(query).populate('createdBy', 'name avatar');

    return NextResponse.json({
      success: true,
      data: places,
    });
  } catch (error) {
    console.error('Error fetching places:', error);
    return NextResponse.json({ error: 'Failed to fetch places' }, { status: 500 });
  }
}

// POST new place
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const body = await req.json();
    const collectionId = params.id;

    // Verify collection exists and user has permission
    const collection = await Collection.findById(collectionId);
    if (!collection) {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
    }

    // Check permissions
    const isOwner = collection.owner.toString() === (session.user as any).id;
    const collaborator = collection.collaborators.find(
      (c: any) => c.user.toString() === (session.user as any).id,
    );
    const canEdit =
      isOwner ||
      (collaborator && (collaborator.role === 'editor' || collaborator.role === 'admin'));

    if (!canEdit) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const place = new Place({
      ...body,
      collection: collectionId,
      createdBy: (session.user as any).id,
    });

    await place.save();

    // Update collection stats
    const placeCount = await Place.countDocuments({ collection: collectionId });
    await Collection.findByIdAndUpdate(collectionId, {
      'stats.totalPlaces': placeCount,
    });

    return NextResponse.json(
      {
        success: true,
        data: place,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error creating place:', error);
    return NextResponse.json({ error: 'Failed to create place' }, { status: 500 });
  }
}
