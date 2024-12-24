import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { email } = body;

  // Validate the request body
  if (!email) {
    return NextResponse.json(
      { error: 'Student email is required' },
      { status: 400 }
    );
  }

  try {
    // Check if the student exists
    const student = await prisma.student.findUnique({
      where: { email },
    });

    if (!student) {
      console.error('Student not found');
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    // Delete the student
    await prisma.student.delete({
      where: { email },
    });

    return NextResponse.json(
      { success: true, message: 'Student deleted successfully' },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error deleting student:', error.message);
      return NextResponse.json(
        { error: error.message || 'Failed to delete student' },
        { status: 500 }
      );
    } else {
      console.error('Unexpected error:', error);
      return NextResponse.json(
        { error: 'Failed to delete student' },
        { status: 500 }
      );
    }
  }
}
