import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const doubt = await prisma.doubt.findUnique({
            where: { id: params.id },
            include: { author: { select: { name: true } } }
        });

        const answers = await prisma.answer.findMany({
            where: { doubtId: params.id },
            include: { author: { select: { name: true } } },
            orderBy: { upvotes: 'desc' }
        });

        return NextResponse.json({ doubt, answers });
    } catch (error) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
    // This is for fetching doubt? No this file is route.ts.
    // Wait, POST here should be for specialized actions on doubt? 
    // Actually, Answers usually go to /api/doubts/[id]/answers.
    // I'll create a separate route for answers.
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
