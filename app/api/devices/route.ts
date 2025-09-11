import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

function deriveType(badges: string): 'biometric' | 'facial' | 'smart' {
  const b = (badges || '').toLowerCase();
  if (b.includes('facial')) return 'facial';
  if (b.includes('biometric') || b.includes('fingerprint')) return 'biometric';
  return 'smart';
}

function deriveFeatures(badges: string): string[] {
  return (badges || '')
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && !/\d[\d,]*\s*users/i.test(s));
}

function deriveCapacity(badges: string): string | null {
  const m = (badges || '').match(/(\d[\d,]*)\s*users/i);
  return m ? `${m[1]} Users` : null;
}

export async function GET() {
  console.log('🔍 API /api/devices called');
  
  const devices = await prisma.product.findMany({
    where: { category: { title: 'Smart Devices' } },
    orderBy: { id: 'asc' },
    // include: { category: true },
  });

  console.log('📊 Found devices:', devices.length);

  const data = devices.map((p) => ({
    id: p.id,
    name: p.name,
    price: `₹${p.price}`,
    originalPrice: `₹${p.originalPrice}`,
    type: deriveType(p.badges || ''),
    description: p.description,
    image: p.image,
   features: (p.badges || '').split(',').map((s) => s.trim()).filter(Boolean),
    capacity: deriveCapacity(p.badges || ''),
  }));

  console.log('✅ Returning data:', data.length, 'devices');
  return NextResponse.json(data);
}