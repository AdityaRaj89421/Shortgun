import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const { message } = body;

    // Mock Logic for Shortgun AI
    let reply = "That's an interesting question! To understand this in BTech terms, let's break it down...";

    if (message.toLowerCase().includes("binary search")) {
        reply = "Binary Search is an O(log n) algorithm. It works by repeatedly dividing the search interval in half. 1. Start with the whole array. 2. If the target value is equal to the middle element, great! 3. If less, narrow to the lower half. 4. If greater, narrow to upper half.";
    } else if (message.toLowerCase().includes("react")) {
        reply = "React is a JS library for building UIs. Hooks like useState and useEffect allow you to use state and other React features without writing a class.";
    } else if (message.toLowerCase().includes("thermodynamics")) {
        reply = "Thermodynamics deals with heat and work. The first law is conservation of energy: Energy cannot be created or destroyed, only transferred.";
    }

    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ reply });
}
