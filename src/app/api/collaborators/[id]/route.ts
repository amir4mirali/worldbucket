import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { dbConnect } from '@/lib/db';
import Collection from '@/lib/models/Collection';
import Notification from '@/lib/models/Notification';

// POST add collaborator
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
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

    // Only owner can add collaborators
    if (collection.owner.toString() !== (session.user as any).id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { userId, role } = await req.json();

    // Check if already collaborator
    const existing = collection.collaborators.find((c: any) => c.user.toString() === userId);
    if (existing) {
      return NextResponse.json({ error: 'Already a collaborator' }, { status: 400 });
    }

    collection.collaborators.push({
      user: userId,
      role: role || 'editor',
    });

    await collection.save();

    // Create notification
    const notification = new Notification({
      user: userId,
      type: 'collaboration_invite',
      title: `You've been invited to collaborate`,
      message: `${session.user.name} invited you to ${collection.name}`,
      data: { collectionId: collection._id },
    });

    await notification.save();

    return NextResponse.json({
      success: true,
      data: collection,
    });
  } catch (error) {
    console.error('Error adding collaborator:', error);
    return NextResponse.json({ error: 'Failed to add collaborator' }, { status: 500 });
  }
}

// DELETE remove collaborator
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const { userId } = await req.json();
    const collection = await Collection.findById(params.id);

    if (!collection) {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
    }

    // Only owner can remove collaborators
    if (collection.owner.toString() !== (session.user as any).id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    collection.collaborators = collection.collaborators.filter(
      (c: any) => c.user.toString() !== userId,
    );

    await collection.save();

    return NextResponse.json({
      success: true,
      data: collection,
    });
  } catch (error) {
    console.error('Error removing collaborator:', error);
    return NextResponse.json({ error: 'Failed to remove collaborator' }, { status: 500 });
  }
}
