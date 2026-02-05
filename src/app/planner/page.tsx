"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { CheckCircle, Circle, Clock, Trash2 } from "lucide-react";
import styles from "./planner.module.css";
import clsx from "clsx";

export default function PlannerPage() {
    const [subjects, setSubjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [newSubject, setNewSubject] = useState("");
    const [targetHours, setTargetHours] = useState(5);

    useEffect(() => {
        fetch("/api/planner")
            .then(res => res.json())
            .then(data => {
                setSubjects(data.subjects || []);
                setLoading(false);
            });
    }, []);

    const addSubject = async () => {
        if (!newSubject.trim()) return;

        const res = await fetch("/api/planner", {
            method: "POST",
            body: JSON.stringify({ name: newSubject, targetHours }),
        });

        if (res.ok) {
            const data = await res.json();
            setSubjects([...subjects, data.subject]);
            setNewSubject("");
        }
    };

    return (
        <div className="container" style={{ padding: "2rem 1rem" }}>
            <h1 className="text-3xl font-bold mb-8">Study Planner</h1>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Planner Input and Stats */}
                <div className="md:col-span-1 flex flex-col gap-6">
                    <Card>
                        <CardHeader><CardTitle>Add Subject</CardTitle></CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <Input
                                label="Subject Name"
                                placeholder="e.g. Operating Systems"
                                value={newSubject}
                                onChange={(e) => setNewSubject(e.target.value)}
                            />
                            <Input
                                label="Weekly Target (Hours)"
                                type="number"
                                min="1"
                                value={targetHours}
                                onChange={(e) => setTargetHours(Number(e.target.value))}
                            />
                            <Button onClick={addSubject} disabled={!newSubject}>Add to Plan</Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Weekly Progress</CardTitle></CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-primary mb-2">
                                {subjects.reduce((acc, s) => acc + (s.completedHours || 0), 0)} / {subjects.reduce((acc, s) => acc + s.targetHours, 0)}
                            </div>
                            <div className="text-muted-foreground text-sm">Hours Completed</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Schedule Grid */}
                <div className="md:col-span-2">
                    <Card className="h-full">
                        <CardHeader><CardTitle>Your Subjects</CardTitle></CardHeader>
                        <CardContent>
                            {loading ? <div>Loading...</div> : (
                                <div className="flex flex-col gap-4">
                                    {subjects.map(subject => (
                                        <div key={subject.id} className={styles.subjectRow}>
                                            <div className="flex-1">
                                                <div className="font-bold text-lg">{subject.name}</div>
                                                <div className="text-sm text-muted-foreground">Target: {subject.targetHours}h / week</div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className={styles.progressBar}>
                                                    <div
                                                        className={styles.progressFill}
                                                        style={{ width: `${Math.min(100, ((subject.completedHours || 0) / subject.targetHours) * 100)}%` }}
                                                    />
                                                </div>
                                                <Button size="sm" variant="outline"><Clock className="w-4 h-4" /></Button>
                                            </div>
                                        </div>
                                    ))}
                                    {subjects.length === 0 && <div className="text-muted-foreground">No subjects added yet.</div>}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
