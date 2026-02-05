import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function POST(request: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await request.json();
        const answer = await prisma.answer.create({
            data: {
                content: body.content,
                doubtId: params.id,
                authorId: session.userId as string
            },
            include: { author: { select: { name: true } } }
        });

        return NextResponse.json({ answer });
    } catch (error) {
        return NextResponse.json({ error: "Error posting answer" }, { status: 500 });
    }
}
