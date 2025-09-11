import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // make sure you have prisma client setup

export async function GET() {
  try {
    const milestones = await prisma.milestone.findMany({
      orderBy: { year: "asc" }, // oldest to newest
    });
    return NextResponse.json(milestones);
  } catch (error) {
    console.error("Error fetching milestones:", error);
    return NextResponse.json({ error: "Failed to fetch milestones" }, { status: 500 });
  }
}
