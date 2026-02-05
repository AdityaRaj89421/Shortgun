"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { Plus, Search, Filter } from "lucide-react";
import styles from "./doubts.module.css";

export default function DoubtsPage() {
    const [doubts, setDoubts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("/api/doubts")
            .then((res) => res.json())
            .then((data) => {
                setDoubts(data.doubts || []);
                setLoading(false);
            });
    }, []);

    const filteredDoubts = doubts.filter(d =>
        d.title.toLowerCase().includes(search.toLowerCase()) ||
        d.subject.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container" style={{ padding: "2rem 1rem" }}>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Doubt Room</h1>
                    <p className="text-muted-foreground">Ask questions, get answers, and master your subjects.</p>
                </div>
                <Link href="/doubts/new">
                    <Button><Plus className="w-4 h-4 mr-2" /> Ask Doubt</Button>
                </Link>
            </div>

            <div className={styles.filters}>
                <div className={styles.searchWrapper}>
                    <Search className={styles.searchIcon} />
                    <Input
                        placeholder="Search doubts..."
                        className={styles.searchInput}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <Button variant="outline"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
            </div>

            <div className="grid gap-4">
                {loading ? (
                    <div>Loading doubts...</div>
                ) : filteredDoubts.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">No doubts found. Be the first to ask!</div>
                ) : (
                    filteredDoubts.map((doubt) => (
                        <DoubtCard key={doubt.id} doubt={doubt} />
                    ))
                )}
            </div>
        </div>
    );
}

function DoubtCard({ doubt }: any) {
    return (
        <Link href={`/doubts/${doubt.id}`}>
            <Card className={styles.doubtCard}>
                <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                        <span className={styles.subjectBadge}>{doubt.subject}</span>
                        <span className="text-xs text-muted-foreground">
                            {new Date(doubt.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{doubt.title}</h3>
                    <p className="text-muted-foreground line-clamp-2 mb-4">{doubt.description}</p>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <span>By {doubt.author?.name || 'Anonymous'}</span>
                        <span>{doubt._count?.answers || 0} Answers</span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
