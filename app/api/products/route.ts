// app/api/products/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const products = await prisma.product.findMany({ include: { category: true }, orderBy: { id: 'desc' } });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();

  // basic validation
  if (!body.name || typeof body.price !== 'number' || !body.image) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const created = await prisma.product.create({
    data: {
      name: body.name,
      price: body.price,
      originalPrice: body.originalPrice ?? null,
      description: body.description ?? '',
      image: body.image ?? '',
      tags: Array.isArray(body.tags) ? body.tags : [],
      badges: body.badges ?? null,
      featured: !!body.featured,
      bestseller: !!body.bestseller,
      rating: typeof body.rating === 'number' ? body.rating : null,
      size: body.size ?? null,
      type: body.type ?? 'classic',
      categoryId: typeof body.categoryId === 'number' ? body.categoryId : (body.categoryId ? Number(body.categoryId) : null)
    },
    include: { 
      category: true
    },
  });

  return NextResponse.json(created, { status: 201 });
}
