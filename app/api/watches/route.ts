import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

// Helper: derive type from name + badges
function deriveType(name: string, badges?: string): 'classic' | 'sports' | 'limited' {
  const n = (name || '').toLowerCase();
  const b = (badges || '').toLowerCase();

  if (n.includes('sport') || b.includes('sport')) return 'sports';
  if (n.includes('limited') || b.includes('limited')) return 'limited';
  return 'classic';
}

// Helper: turn badges string into array
function deriveFeatures(badges?: string): string[] {
  return (badges || '')
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export async function GET() {
  const watches = await prisma.product.findMany({
    where: { category: { title: 'Luxury Watches' } },
    orderBy: { id: 'asc' },
    include: { category: true },
  });
  console.log('📊 Found clocks:', watches.length);

  const data = watches.map((p) => ({
    id: p.id,
    name: p.name,
    price: `₹${p.price}`,
    originalPrice: p.originalPrice ? `₹${p.originalPrice}` : '',
    type: p.type as 'classic' | 'sports' | 'limited',
    description: p.description,
    image: p.image,
    features: (p.badges || '')
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0),
    limited: p.type === 'limited',
  }));

  return NextResponse.json(data);
}
