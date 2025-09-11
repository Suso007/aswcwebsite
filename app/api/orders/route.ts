import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // make sure you have prisma client in lib/prisma.ts

// GET all orders
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

// POST new order
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newOrder = await prisma.order.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        company: body.company,
        product: body.product,
        quantity: body.quantity,
        installation: body.installation,
        message: body.message,
      },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
