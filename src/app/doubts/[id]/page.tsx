"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ArrowLeft, CheckCircle, ThumbsUp } from "lucide-react";
import Link from "next/link";
import styles from "../doubts.module.css";
// import ReactMarkdown from "react-markdown"; // Optional: Add later

export default function DoubtDetailPage({ params }: { params: { id: string } }) {
    const [doubt, setDoubt] = useState<any>(null);
    const [answers, setAnswers] = useState<any[]>([]);
    const [newAnswer, setNewAnswer] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/doubts/${params.id}`)
            .then((res) => res.json())
            .then((data) => {
                setDoubt(data.doubt);
                setAnswers(data.answers || []);
                setLoading(false);
            });
    }, [params.id]);

    const handlePostAnswer = async () => {
        if (!newAnswer.trim()) return;

        const res = await fetch(`/api/doubts/${params.id}/answers`, {
            method: "POST",
            body: JSON.stringify({ content: newAnswer }),
        });

        if (res.ok) {
            const data = await res.json();
            setAnswers([...answers, data.answer]);
            setNewAnswer("");
        }
    };

    if (loading) return <div className="container py-8">Loading...</div>;
    if (!doubt) return <div className="container py-8">Doubt not found</div>;

    return (
        <div className="container" style={{ padding: "2rem 1rem" }}>
            <Link href="/doubts">
                <Button variant="ghost" className="mb-4 pl-0"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Doubts</Button>
            </Link>

            <Card className="mb-8 border-primary">
                <CardHeader>
                    <div className="flex justify-between">
                        <div className={styles.subjectBadge}>{doubt.subject}</div>
                        <span className="text-sm text-muted-foreground">{new Date(doubt.createdAt).toLocaleDateString()}</span>
                    </div>
                    <CardTitle className="text-2xl mt-2">{doubt.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">Asked by {doubt.author?.name}</p>
                </CardHeader>
                <CardContent>
                    <p className="whitespace-pre-wrap leading-relaxed">{doubt.description}</p>
                </CardContent>
            </Card>

            <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">{answers.length} Answers</h3>
                <div className="flex flex-col gap-4">
                    {answers.map((answer) => (
                        <Card key={answer.id} className={answer.isAccepted ? "border-green-500 bg-green-50/10" : ""}>
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="font-medium text-sm">{answer.author?.name}</div>
                                    {answer.isAccepted && <div className="flex items-center text-green-600 text-sm font-bold"><CheckCircle className="w-4 h-4 mr-1" /> Accepted</div>}
                                </div>
                                <p className="whitespace-pre-wrap mb-4">{answer.content}</p>
                                <div className="flex items-center gap-4">
                                    <Button variant="ghost" size="sm" className="text-muted-foreground"><ThumbsUp className="w-4 h-4 mr-1" /> {answer.upvotes}</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <Card>
                <CardHeader><CardTitle className="text-lg">Your Answer</CardTitle></CardHeader>
                <CardContent>
                    <textarea
                        className="w-full p-4 border rounded-md mb-4 bg-background text-foreground"
                        rows={4}
                        placeholder="Write your solution here..."
                        value={newAnswer}
                        onChange={(e) => setNewAnswer(e.target.value)}
                    />
                    <Button onClick={handlePostAnswer} disabled={!newAnswer.trim()}>Post Answer</Button>
                </CardContent>
            </Card>
        </div>
    );
}
