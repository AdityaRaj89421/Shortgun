"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import styles from "../doubts.module.css"; // Reuse styles

export default function NewDoubtPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        try {
            const res = await fetch("/api/doubts", {
                method: "POST",
                body: JSON.stringify(data),
            });

            if (res.ok) {
                router.push("/doubts");
                router.refresh();
            } else {
                alert("Failed to post doubt");
            }
        } catch {
            alert("Error posting doubt");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container" style={{ padding: "2rem 1rem", maxWidth: "800px" }}>
            <Card>
                <CardHeader>
                    <CardTitle>Ask a Doubt</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <Input name="title" label="Question Title" placeholder="e.g. How does Dijkstra's algorithm work?" required />

                        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <Input name="subject" label="Subject" placeholder="DSA" required />
                            <Input name="tags" label="Tags" placeholder="graphs, algorithms" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Description</label>
                            <textarea
                                name="description"
                                rows={6}
                                className="w-full p-2 border rounded resize-y"
                                required
                                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
                            />
                        </div>

                        <Button type="submit" isLoading={loading}>Post Doubt</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
