// Add this temporary debug route to check your categories
// File: app/api/debug-categories/route.ts

import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        select: { id: true, name: true }
      }
    }
  });

  console.log('All categories with products:', JSON.stringify(categories, null, 2));
  
  return NextResponse.json(categories);
}