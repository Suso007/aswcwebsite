import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const team = await prisma.teamMember.findMany({
      orderBy: { id: 'asc' },
    });
    return NextResponse.json(team);
  } catch (error) {
    console.error("❌ Error fetching team members:", error);
    return NextResponse.json({ error: "Failed to fetch team" }, { status: 500 });
  }
}
