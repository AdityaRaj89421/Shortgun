"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import styles from "../auth.module.css";

export default function SignupPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const json = await res.json();
                throw new Error(json.error || "Signup failed");
            }

            router.push("/dashboard");
            router.refresh();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.container}>
            <Card className={styles.card}>
                <CardHeader>
                    <CardTitle className="text-center">Create Account</CardTitle>
                    <p className="text-center text-muted-foreground">Join Shortgun Campus Hub</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        {error && <div className={styles.error}>{error}</div>}
                        <Input name="name" label="Full Name" placeholder="John Doe" required />
                        <Input name="email" type="email" label="Email" placeholder="student@college.edu" required />
                        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <Input name="college" label="College" placeholder="IIT Bombay" />
                            <Input name="branch" label="Branch" placeholder="CSE" />
                        </div>
                        <Input name="year" type="number" label="Year" min="1" max="4" defaultValue="1" />
                        <Input name="password" type="password" label="Password" required />
                        <Button type="submit" className="w-full" isLoading={loading}>Sign Up</Button>
                        <p className={styles.footer}>
                            Already have an account? <Link href="/login" className={styles.link}>Login</Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
