import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
    try {
        const events = await prisma.event.findMany({
            orderBy: { date: 'asc' }
        });
        return NextResponse.json({ events });
    } catch {
        return NextResponse.json({ events: [] });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await request.json();
        const event = await prisma.event.create({
            data: {
                ...body,
                date: new Date(body.date), // Ensure date conversion
                authorId: session.userId as string
            }
        });

        return NextResponse.json({ event });
    } catch (error) {
        return NextResponse.json({ error: "Error creating event" }, { status: 500 });
    }
}
