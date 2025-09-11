// app/api/admin/verify-reset/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const key = body?.key;
    const secret = process.env.ADMIN_RESET_KEY;

    if (!secret) {
      console.error("ADMIN_RESET_KEY not configured on server");
      return NextResponse.json({ error: "Server not configured" }, { status: 500 });
    }

    if (typeof key !== "string" || key.trim() === "") {
      return NextResponse.json({ error: "Missing reset key" }, { status: 400 });
    }

    if (key === secret) {
      return NextResponse.json({ ok: true });
    } else {
      return NextResponse.json({ error: "Invalid reset key" }, { status: 401 });
    }
  } catch (err) {
    console.error("Error in verify-reset:", err);
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
