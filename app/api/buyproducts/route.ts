import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Helper to format price in INR
    const formatPrice = (price: number) =>
      new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(price);

    // Fetch products by category
    const watches = await prisma.product.findMany({
      where: { category: { title: "Luxury Watches" } },
      include: { category: true },
    });

    const clocks = await prisma.product.findMany({
      where: { category: { title: "Wall Clocks" } },
      include: { category: true },
    });

    const systems = await prisma.product.findMany({
      where: { category: { title: "Smart Devices" } },
      include: { category: true },
    });

    // Format prices to ₹
    const formatProducts = (arr: any[]) =>
      arr.map((p) => ({
        ...p,
        price: formatPrice(p.price),
      }));

    return NextResponse.json({
      watches: formatProducts(watches),
      clocks: formatProducts(clocks),
      systems: formatProducts(systems),
    });
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
