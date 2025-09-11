import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Fetch all watch testimonials
export async function GET() {
  try {
    const testimonials = await prisma.watchTestimonial.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch watch testimonials' },
      { status: 500 }
    );
  }
}

// POST - Add a new watch testimonial
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newTestimonial = await prisma.watchTestimonial.create({
      data: body,
    });
    return NextResponse.json(newTestimonial);
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json(
      { error: 'Failed to create watch testimonial' },
      { status: 500 }
    );
  }
}
