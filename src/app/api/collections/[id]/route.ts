import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { dbConnect } from '@/lib/db';
import Collection from '@/lib/models/Collection';
import Place from '@/lib/models/Place';

// GET collection details
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();

    const collection = await Collection.findById(params.id)
      .populate('owner', 'name avatar username')
      .populate('collaborators.user', 'name avatar username')
      .populate('places');

    if (!collection) {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: collection,
    });
  } catch (error) {
    console.error('Error fetching collection:', error);
    return NextResponse.json({ error: 'Failed to fetch collection' }, { status: 500 });
  }
}

// PUT update collection
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const collection = await Collection.findById(params.id);

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

    const body = await req.json();

    const updatedCollection = await Collection.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    return NextResponse.json({
      success: true,
      data: updatedCollection,
    });
  } catch (error) {
    console.error('Error updating collection:', error);
    return NextResponse.json({ error: 'Failed to update collection' }, { status: 500 });
  }
}

// DELETE collection
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const collection = await Collection.findById(params.id);

    if (!collection) {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
    }

    // Only owner can delete
    if (collection.owner.toString() !== (session.user as any).id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Delete all places in collection
    await Place.deleteMany({ collectionId: params.id });

    await Collection.findByIdAndDelete(params.id);

    return NextResponse.json({
      success: true,
      message: 'Collection deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting collection:', error);
    return NextResponse.json({ error: 'Failed to delete collection' }, { status: 500 });
  }
}
