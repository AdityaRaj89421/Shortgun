"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useAnimationFrame } from "motion/react";

interface Particle {
    id: number;
    angleOffset: number;
    radiusBase: number;
    speed: number;
    color: string;
    shape: "circle" | "square" | "triangle";
}

const COLORS = ["#a855f7", "#ec4899", "#06b6d4", "#f97316"];
const SHAPES = ["circle", "square", "triangle"] as const;

export default function CursorFollower() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics for the central attractor
    const springConfig = { damping: 25, stiffness: 200 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    const containerRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement[]>([]);

    // Create 16 particles
    const particles = useRef<Particle[]>(
        Array.from({ length: 16 }).map((_, i) => ({
            id: i,
            angleOffset: (Math.PI * 2 * i) / 16,
            radiusBase: 40 + Math.random() * 40,
            speed: 0.002 + Math.random() * 0.003 * (i % 2 === 0 ? 1 : -1),
            color: COLORS[i % COLORS.length],
            shape: SHAPES[i % SHAPES.length],
        }))
    ).current;

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, [mouseX, mouseY]);

    useAnimationFrame((time) => {
        const cx = smoothX.get();
        const cy = smoothY.get();

        particlesRef.current.forEach((el, i) => {
            if (!el) return;
            const p = particles[i];

            // Calculate orbital position
            const currentAngle = p.angleOffset + time * p.speed;

            // 3D effect: Simulate Z-axis with scale and sine wave overlap
            // We tilt the plane slightly
            const radius = p.radiusBase + Math.sin(time * 0.001 + p.id) * 10;

            const offsetX = Math.cos(currentAngle) * radius;
            const offsetY = Math.sin(currentAngle) * radius * 0.6; // Flatten ellipse for 3D perspective

            // Z-index simulation based on "y" position relative to rotation anchor
            const zScale = Math.sin(currentAngle) * 0.5 + 1; // 0.5 to 1.5 scale
            const opacity = (Math.sin(currentAngle) + 1) / 2 * 0.6 + 0.4; // 0.4 to 1.0

            const x = cx + offsetX;
            const y = cy + offsetY;

            el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${zScale})`;
            el.style.opacity = opacity.toString();
            el.style.zIndex = Math.sin(currentAngle) > 0 ? "40" : "20"; // Behind or in front
        });
    });

    return (
        <div ref={containerRef} className="fixed inset-0 pointer-events-none z-40 overflow-hidden hidden md:block">
            {/* Central Guide (optional, hidden or subtle) */}
            <motion.div
                style={{ x: smoothX, y: smoothY }}
                className="absolute w-2 h-2 bg-white rounded-full blur-[2px] opacity-20 -translate-x-1/2 -translate-y-1/2"
            />

            {particles.map((p, i) => (
                <div
                    key={p.id}
                    ref={(el) => { if (el) particlesRef.current[i] = el; }}
                    className={`absolute w-3 h-3 shadow-[0_0_10px_currentColor] mix-blend-screen -translate-x-1/2 -translate-y-1/2 will-change-transform ${p.shape === "circle" ? "rounded-full" :
                            p.shape === "square" ? "rounded-none" :
                                "clip-triangle"
                        }`}
                    style={{
                        backgroundColor: p.color,
                        color: p.color,
                        clipPath: p.shape === "triangle" ? "polygon(50% 0%, 0% 100%, 100% 100%)" : undefined
                    }}
                />
            ))}
        </div>
    );
}
