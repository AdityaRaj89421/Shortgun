"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "lucide-react";

export default function InsightsPage() {
    // Mock Data
    const posts = [
        { id: 1, title: "How to ace GATE 2026", author: "Dr. Sharma", content: "Focus on Engineering Maths and Aptitude first...", category: "GATE" },
        { id: 2, title: "Mastering Linked Lists", author: "Prof. Gupta", content: "Visualizing pointers is key to understanding linked lists...", category: "DSA" },
        { id: 3, title: "Campus Placements Guide", author: "Placement Cell", content: "Resume building starts in 2nd year...", category: "Career" },
    ];

    return (
        <div className="container" style={{ padding: "2rem 1rem" }}>
            <h1 className="text-3xl font-bold mb-8">Educators' Insight</h1>

            <div className="grid md:grid-cols-2 gap-6">
                {posts.map(post => (
                    <Card key={post.id} className="cursor-pointer hover:border-primary transition-colors">
                        <CardHeader>
                            <div className="flex justify-between mb-2">
                                <span className="text-xs font-bold bg-gray-100 px-2 py-1 rounded">{post.category}</span>
                                <span className="text-xs text-muted-foreground">{post.author}</span>
                            </div>
                            <CardTitle>{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground line-clamp-3">{post.content}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
