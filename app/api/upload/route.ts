import prisma from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const productId = formData.get('productId') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Only JPEG, PNG and WebP images are allowed' },
        { status: 400 }
      );
    }

    // Get file extension from original filename
    const originalName = file.name;
    const fileExtension = path.extname(originalName); // Gets the extension with the dot
    const fileName = `${productId}${fileExtension}`; // Use productId as the file name
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Define the path where the file will be saved
    const publicPath = path.join(process.cwd(), 'public', 'assets');
    const filePath = path.join(publicPath, fileName);

    // Write the file to the assets directory
    await writeFile(filePath, buffer);

    const defaultImagePath = `/assets/${fileName}`;
      try {
        const id = Number(productId);
        await prisma.product.update({
          where: { id },
          data: { image: defaultImagePath },
        });
      } catch (error) {
        console.error("Error updating product:", error);
        return NextResponse.json(
          { error: "Failed to update product" },
          { status: 500 }
        );
      }
    
    // Return the URL that can be used to access the image
    return NextResponse.json({
      success: true,
      fileName: fileName,
      url: `/assets/${fileName}`
    });
    
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
}
