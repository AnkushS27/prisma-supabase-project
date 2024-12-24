import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, cohortName, courses } = body;

  // Validate the request body
  if (!name || !email || !cohortName || !Array.isArray(courses)) {
    return NextResponse.json(
      { error: 'Invalid request payload' },
      { status: 400 }
    );
  }

  try {
    // Check if the cohortName exists, if not create it
    let cohortData = await prisma.cohort.findUnique({
      where: { name: cohortName },
    });

    if (!cohortData) {
      // Create the cohort if it doesn't exist
      cohortData = await prisma.cohort.create({
        data: {
          name: cohortName,
          startDate: new Date(),
          endDate: new Date(
            new Date().setFullYear(new Date().getFullYear() + 1)
          ),
        },
      });
    }

    // Ensure courses exist or create them if they do not
    courses.map(async (courseName: string) => {
      let course = await prisma.course.findUnique({
        where: { name: courseName },
      });

      if (!course) {
        console.error(`Course not found: ${courseName}. Creating course...`);
        // Create the course if it doesn't exist
        course = await prisma.course.create({
          data: {
            name: courseName,
            credits: 3, // Default value, you can adjust this as needed
          },
        });
      }

      return course;
    });

    // Insert the student and directly store the course names
    const student = await prisma.student.create({
      data: {
        name,
        email,
        cohortName, // Use cohortName directly in the student model
        courses: courses, // Directly store the array of course names
      },
    });

    return NextResponse.json({ success: true, student }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error adding student:', error.message);
      return NextResponse.json(
        { error: error.message || 'Failed to add student' },
        { status: 500 }
      );
    } else {
      console.error('Unexpected error:', error);
      return NextResponse.json(
        { error: 'Failed to add student' },
        { status: 500 }
      );
    }
  }
}
