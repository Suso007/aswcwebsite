import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  console.log('🔍 API /api/services called');
  
  try {
    const services = await prisma.service.findMany({
      orderBy: { id: 'asc' },
    });

    console.log('📊 Found services:', services.length);

    const data = services.map((service) => ({
      id: service.id,
      title: service.title,
      description: service.description,
      icon: service.icon,
      image: service.image,
      features: service.features.split(',').map((s) => s.trim()).filter(Boolean),
      price: service.price,
      duration: service.duration,
      category: service.category,
    }));

    console.log('✅ Returning data:', data.length, 'services');
    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}
