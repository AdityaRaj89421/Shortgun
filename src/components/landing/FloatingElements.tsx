"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function FloatingElements() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Blob 1: Top Left */}
            <motion.div
                animate={{
                    y: [0, -50, 0],
                    x: [0, 20, 0],
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.4, 0.3]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -top-32 -left-32 w-96 h-96 bg-purple-600/30 rounded-full blur-[100px]"
            />

            {/* Blob 2: Bottom Right */}
            <motion.div
                animate={{
                    y: [0, 60, 0],
                    x: [0, -30, 0],
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 2 }}
                className="absolute -bottom-40 -right-20 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]"
            />

            {/* Blob 3: Top Right */}
            <motion.div
                animate={{
                    y: [0, 40, 0],
                    scale: [1, 0.9, 1],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
                className="absolute top-20 -right-40 w-80 h-80 bg-pink-500/20 rounded-full blur-[90px]"
            />

            {/* Particles */}
            {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 0.5, 0],
                        scale: [0, 1.5, 0],
                        y: [0, -100]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 5,
                        repeat: Infinity,
                        delay: Math.random() * 5,
                        ease: "linear"
                    }}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                    }}
                />
            ))}
        </div>
    );
}
