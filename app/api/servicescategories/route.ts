import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    console.log('🔍 API: Fetching services from database...');

    const services = await prisma.service.findMany({
      orderBy: { id: 'asc' },
    });

    console.log('📊 API: Found', services.length, 'services');

    const normalized = services.map((service) => ({
      id: service.id,
      title: service.title,
      description: service.description,
      icon: service.icon,
      image: service.image,
      features: service.features
        ? service.features.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
      price: service.price,
      duration: service.duration,
      category: service.category,
    }));

    console.log('✅ API: Returning normalized data');
    return NextResponse.json(normalized);
  } catch (error) {
    console.error('❌ API Error fetching services:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}
