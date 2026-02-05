import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(request: Request) {
    try {
        const doubts = await prisma.doubt.findMany({
            include: {
                author: {
                    select: { name: true, college: true }
                },
                _count: {
                    select: { answers: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({ doubts });
    } catch (error) {
        console.error("Doubts API Error:", error);
        return NextResponse.json({ doubts: [] });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { title, description, subject, tags } = body;

        const doubt = await prisma.doubt.create({
            data: {
                title,
                description,
                subject,
                tags,
                authorId: session.userId as string
            }
        });

        return NextResponse.json({ doubt });
    } catch (error) {
        return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
}
