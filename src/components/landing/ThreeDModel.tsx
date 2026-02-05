"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";

export default function ThreeDModel() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = canvas.width;
        let height = canvas.height;

        // Cube geometry
        const points = [
            { x: -1, y: -1, z: -1 }, { x: 1, y: -1, z: -1 },
            { x: 1, y: 1, z: -1 }, { x: -1, y: 1, z: -1 },
            { x: -1, y: -1, z: 1 }, { x: 1, y: -1, z: 1 },
            { x: 1, y: 1, z: 1 }, { x: -1, y: 1, z: 1 },
        ];
        const edges = [
            [0, 1], [1, 2], [2, 3], [3, 0],
            [4, 5], [5, 6], [6, 7], [7, 4],
            [0, 4], [1, 5], [2, 6], [3, 7]
        ];

        let angleX = 0;
        let angleY = 0;
        let hue = 0;
        let animationId: number;

        const project = (p: { x: number, y: number, z: number }) => {
            // Rotation logic
            let x = p.x * Math.cos(angleY) - p.z * Math.sin(angleY);
            let z = p.x * Math.sin(angleY) + p.z * Math.cos(angleY);
            let y = p.y * Math.cos(angleX) - z * Math.sin(angleX);
            z = p.y * Math.sin(angleX) + z * Math.cos(angleX);

            // Perspective projection
            const fov = 400;
            const scale = fov / (fov + z + 4);
            return {
                x: x * scale * 150 + width / 2,
                y: y * scale * 150 + height / 2,
            };
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Update state
            angleX += 0.005;
            angleY += 0.01;
            hue = (hue + 0.5) % 360;

            // Style
            ctx.lineWidth = 4;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.strokeStyle = `hsl(${hue}, 80%, 60%)`;
            ctx.shadowBlur = 15;
            ctx.shadowColor = `hsl(${hue}, 80%, 60%)`;

            // Render
            const projected = points.map(project);

            ctx.beginPath();
            edges.forEach(([i, j]) => {
                ctx.moveTo(projected[i].x, projected[i].y);
                ctx.lineTo(projected[j].x, projected[j].y);
            });
            ctx.stroke();

            animationId = requestAnimationFrame(draw);
        };

        draw();
        return () => cancelAnimationFrame(animationId);
    }, []);

    return (
        <section className="relative py-32 overflow-hidden flex flex-col items-center justify-center">
            <div className="container relative z-10 text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
                    Experience <span className="text-gradient">Immersive 3D Learning</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Manipulate complex structures in real-time right from your browser.
                </p>
            </div>

            <div className="relative w-full max-w-4xl h-[600px] flex items-center justify-center">
                <canvas ref={canvasRef} width={800} height={800} className="w-full h-full object-contain z-10" />

                {/* Floating Info Cards Overlay */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    className="absolute left-10 top-1/3 glass-effect p-6 rounded-xl border-l-4 border-purple-500 hidden md:block"
                >
                    <h4 className="font-bold text-lg mb-1">Vector Physics</h4>
                    <p className="text-sm text-gray-400">Real-time rendering</p>
                    <div className="mt-2 text-xs text-purple-400 font-mono">fps: 60 stable</div>
                </motion.div>

                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    className="absolute right-10 bottom-1/3 glass-effect p-6 rounded-xl border-r-4 border-blue-500 text-right hidden md:block"
                >
                    <h4 className="font-bold text-lg mb-1">Interactive Geometry</h4>
                    <p className="text-sm text-gray-400">Pure Canvas API</p>
                    <div className="mt-2 text-xs text-blue-400 font-mono">render: webgl-fallback</div>
                </motion.div>
            </div>
        </section>
    );
}
