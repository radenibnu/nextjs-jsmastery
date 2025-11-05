import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validasi minimal
    const requiredFields = ["title", "description", "overview", "venue", "date", "time", "mode"];
    const missing = requiredFields.filter((field) => !body[field]);
    if (missing.length > 0) {
      return NextResponse.json(
        { message: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    // Buat slug otomatis
    const slug = body.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    // Insert ke DB
    const event = await prisma.event.create({
      data: {
        ...body,
        slug,
        // Prisma bisa simpan JSON langsung
        agenda: body.agenda || [],
        tags: body.tags || [],
        date: new Date(body.date),
      },
    });

    return NextResponse.json(
      { message: "✅ Event created successfully", event },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Error creating event:", error);
    return NextResponse.json(
      { message: "Event creation failed", error: error.message },
      { status: 500 }
    );
  } finally {
    // Tutup koneksi Prisma biar gak bocor
    await prisma.$disconnect();
  }
}
