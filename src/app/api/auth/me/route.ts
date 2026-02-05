import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const session = await getSession();
        if (!session || !session.userId) {
            return NextResponse.json({ user: null });
        }

        const user = await prisma.user.findUnique({
            where: { id: session.userId as string },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                college: true,
                branch: true,
                year: true,
                reputation: true,
            },
        });

        return NextResponse.json({ user });
    } catch (error) {
        console.error("Auth Check Error:", error);
        return NextResponse.json({ user: null, error: "Internal Error" }, { status: 500 });
    }
}
