import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: { products: true },
    });

    return NextResponse.json(categories);
  } catch (error: any) {
    // Log full error for debugging
    console.error('🚨 Error fetching categories:', {
      message: error.message,
      stack: error.stack,
      meta: error.meta || null,
    });

    return NextResponse.json(
      { error: 'Failed to fetch categories. Check server logs for details.' },
      { status: 500 }
    );
  }
}


