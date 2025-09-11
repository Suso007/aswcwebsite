import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Handle form submission (POST)
export async function POST(req: Request) {
  try {
    const { name, email, phone, Productypes, modelno, message } = await req.json();

    // Simple validation
    if (!name || !email || !Productypes || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save to database
    const newMessage = await prisma.serviceFormMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        productType: Productypes,
        modelNo: modelno || null,
        message,
      },
    });

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error('❌ Error saving service form message:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Handle fetching all form messages (GET)
export async function GET() {
  try {
    const messages = await prisma.serviceFormMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(messages);
  } catch (error) {
    console.error('❌ Error fetching service form messages:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
