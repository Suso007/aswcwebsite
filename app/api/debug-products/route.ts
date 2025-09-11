// app/api/debug-products/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { id: 'asc' },
  });
  console.log('DEBUG products:', products.length);
  return NextResponse.json(products);
}
