import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    let steps;

    try {
      // Try ordering by 'order' first
      steps = await prisma.howItWorksStep.findMany({
        orderBy: [{ order: 'asc' }, { id: 'asc' }],
      });
    } catch (error) {
      // Fallback if 'order' column doesn't exist
      steps = await prisma.howItWorksStep.findMany({
        orderBy: [{ id: 'asc' }],
      });
    }

    // Normalize the structure
    const normalized = steps.map((s) => ({
      id: s.id,
      icon: s.icon,
      title: s.title,
      description: s.description,
      image: s.image,
      order: (s as any).order ?? null,
    }));

    // Ensure consistent order when 'order' is null
    normalized.sort((a, b) => (a.order ?? a.id) - (b.order ?? b.id));

    return NextResponse.json(normalized);
  } catch (error) {
    console.error('Error fetching steps:', error);
    return NextResponse.json({ error: 'Failed to fetch steps' }, { status: 500 });
  }
}
