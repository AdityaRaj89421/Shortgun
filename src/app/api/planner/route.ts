import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ subjects: [] });

        const subjects = await prisma.studySubject.findMany({
            where: { userId: session.userId as string },
            include: { sessions: true }
        });

        // Calculate completed hours
        const subjectsWithProgress = subjects.map(s => ({
            ...s,
            completedHours: s.sessions.reduce((acc, sess) => acc + (sess.durationMinutes / 60), 0)
        }));

        return NextResponse.json({ subjects: subjectsWithProgress });
    } catch (error) {
        return NextResponse.json({ subjects: [] });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await request.json();
        const subject = await prisma.studySubject.create({
            data: {
                name: body.name,
                targetHours: body.targetHours,
                userId: session.userId as string
            }
        });

        return NextResponse.json({ subject });
    } catch {
        return NextResponse.json({ error: "Failed" }, { status: 500 });
    }
}
