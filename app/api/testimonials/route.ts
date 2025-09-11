import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Fetch all testimonials
export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(testimonials);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

// POST - Add a new testimonial (optional, if you want to add from frontend)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newTestimonial = await prisma.testimonial.create({
      data: body
    });
    return NextResponse.json(newTestimonial);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}
