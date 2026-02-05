import { NextResponse } from "next/server";

export async function GET() {
    // Mock Response
    return NextResponse.json({
        rooms: [
            { id: '1', name: 'DSA Grind', topic: 'Algorithms', activeUsers: 5 },
            { id: '2', name: 'Exam Prep', topic: 'Maths', activeUsers: 12 },
        ]
    });
}
