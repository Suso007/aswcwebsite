import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// POST → Save new subscriber
export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Save to DB
    const subscriber = await prisma.subscribers.create({
      data: { email },
    });

    return NextResponse.json(
      { message: "Subscribed successfully", subscriber },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.code === "P2002") {
      // Prisma unique constraint violation
      return NextResponse.json(
        { error: "This email is already subscribed" },
        { status: 409 }
      );
    }
    console.error("❌ Newsletter POST error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// GET → Fetch all subscribers
export async function GET() {
  try {
    const subscribers = await prisma.subscribers.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(subscribers);
  } catch (error) {
    console.error("❌ Newsletter GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscribers" },
      { status: 500 }
    );
  }
}
