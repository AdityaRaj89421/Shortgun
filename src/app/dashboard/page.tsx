"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button"; // Assuming this exists based on usage in Navbar
import styles from "./dashboard.module.css";
import {
    BookOpen,
    MessageSquare,
    Calendar,
    BrainCircuit,
    Zap,
    Trophy,
    Clock,
    ArrowRight
} from "lucide-react";
import clsx from "clsx";

export default function DashboardPage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/auth/me")
            .then(res => res.json())
            .then(data => {
                setUser(data.user);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading dashboard...</div>;
    }

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center h-screen gap-4">
                <h2 className="text-xl font-bold">Please log in to view dashboard</h2>
                <Link href="/login"><Button>Login</Button></Link>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.welcomeText}>
                    <h1>Welcome back, {user.name.split(" ")[0]}!</h1>
                    <p>Ready to crush your goals today?</p>
                </div>
                <div className="text-right">
                    <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                </div>
            </header>

            {/* Stats Row */}
            <div className={styles.statsGrid}>
                <Card className={styles.statCard}>
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className={styles.statLabel}>Doubts Solved</p>
                                <h3 className={styles.statValue}>12</h3>
                            </div>
                            <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
                                <MessageSquare className="w-6 h-6" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className={styles.statCard}>
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className={styles.statLabel}>Study Hours</p>
                                <h3 className={styles.statValue}>24h</h3>
                            </div>
                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                                <Clock className="w-6 h-6" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className={styles.statCard}>
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className={styles.statLabel}>Reputation</p>
                                <h3 className={styles.statValue}>{user.reputation || 0}</h3>
                            </div>
                            <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500">
                                <Trophy className="w-6 h-6" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <h2 className={styles.sectionTitle}><Zap className="w-5 h-5 text-primary" /> Quick Actions</h2>

            {/* Quick Actions Grid */}
            <div className={styles.quickActions}>
                <Link href="/doubts/new">
                    <Card className={styles.actionCard}>
                        <CardContent className="p-6">
                            <div className={styles.iconWrapper}>
                                <MessageSquare className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold mb-1">Ask a Doubt</h3>
                            <p className="text-xs text-muted-foreground">Get help from peers</p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/study-rooms">
                    <Card className={styles.actionCard}>
                        <CardContent className="p-6">
                            <div className={styles.iconWrapper}>
                                <BookOpen className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold mb-1">Study Rooms</h3>
                            <p className="text-xs text-muted-foreground">Join active sessions</p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/ai">
                    <Card className={styles.actionCard}>
                        <CardContent className="p-6">
                            <div className={styles.iconWrapper}>
                                <BrainCircuit className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold mb-1">AI Tutor</h3>
                            <p className="text-xs text-muted-foreground">Explain concepts</p>
                        </CardContent>
                    </Card>
                </Link>

                <Link href="/events">
                    <Card className={styles.actionCard}>
                        <CardContent className="p-6">
                            <div className={styles.iconWrapper}>
                                <Calendar className="w-8 h-8" />
                            </div>
                            <h3 className="font-bold mb-1">Events</h3>
                            <p className="text-xs text-muted-foreground">Explore campus life</p>
                        </CardContent>
                    </Card>
                </Link>
            </div>

            <h2 className={styles.sectionTitle}>Recent Activity</h2>
            <Card className="border-l-4 border-l-primary mb-6">
                <CardContent className="p-4 flex items-center justify-between">
                    <div>
                        <h4 className="font-bold">Joined "DSA Grind" Study Room</h4>
                        <p className="text-sm text-muted-foreground">2 hours ago</p>
                    </div>
                    <Button variant="ghost" size="sm">View <ArrowRight className="w-4 h-4 ml-1" /></Button>
                </CardContent>
            </Card>
        </div>
    );
}
