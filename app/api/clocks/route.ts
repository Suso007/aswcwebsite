import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

function deriveType(badges: string, name: string): 'digital' | 'analog' | 'modern' {
  const s = `${name} ${badges}`.toLowerCase();
  if (s.includes('digital') || s.includes('led')) return 'digital';
  if (s.includes('analog') || s.includes('roman')) return 'analog';
  return 'modern';
}

function deriveFeatures(badges: string): string[] {
  return (badges || '')
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !/\d+\s*inches/i.test(s));
}

export async function GET() {
  console.log('🔍 API /api/clocks called');
  
  const clocks = await prisma.product.findMany({
    where: { category: { title: 'Wall Clocks' } },
    orderBy: { id: 'asc' },
  });

  console.log('📊 Found clocks:', clocks.length);

  const data = clocks.map((p) => ({
    id: p.id,
    name: p.name,
    price: `₹${p.price}`,
    originalPrice: `₹${p.originalPrice}`,
    type: deriveType(p.badges || '', p.name),
    description: p.description,
    image: p.image,
    features: (p.badges || '').split(',').map((s) => s.trim()).filter(Boolean),
    size: p.size || null,
  }));

  console.log('✅ Returning data:', data.length, 'clocks');
  return NextResponse.json(data);
}