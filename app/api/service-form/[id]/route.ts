import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// DELETE /api/service-form/:id
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const numericId = Number(id);
    if (Number.isNaN(numericId)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    await prisma.serviceFormMessage.delete({ where: { id: numericId } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error deleting service request:", error);
    return NextResponse.json({ error: "Failed to delete request" }, { status: 500 });
  }
}
