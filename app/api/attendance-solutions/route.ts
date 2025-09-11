import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    console.log('🔍 API: Fetching attendance solutions from database...');

    const solutions = await prisma.attendanceSolution.findMany({
      orderBy: { id: 'asc' },
    });

    // Normalize if your DB stores features as a comma-separated string
    const normalized = solutions.map((solution) => ({
      id: solution.id,
      title: solution.title,
      description: solution.description,
      icon: solution.icon,
      features: solution.features
        ? solution.features.split(',').map((f) => f.trim()).filter(Boolean)
        : [],
      pricing: solution.pricing,
      image: solution.image,
    }));

    return NextResponse.json(normalized);
  } catch (error) {
    console.error('❌ API Error fetching attendance solutions:', error);
    return NextResponse.json({ error: 'Failed to fetch attendance solutions' }, { status: 500 });
  }
}
