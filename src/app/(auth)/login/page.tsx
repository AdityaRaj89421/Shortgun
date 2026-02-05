"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import styles from "../auth.module.css";

export default function LoginPage() {
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
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const json = await res.json();
                throw new Error(json.error || "Login failed");
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
                    <CardTitle className="text-center">Welcome Back</CardTitle>
                    <p className="text-center text-muted-foreground">Login to continue your journey</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        {error && <div className={styles.error}>{error}</div>}
                        <Input name="email" type="email" label="Email" placeholder="student@college.edu" required />
                        <Input name="password" type="password" label="Password" required />
                        <Button type="submit" className="w-full" isLoading={loading}>Login</Button>
                        <p className={styles.footer}>
                            Don't have an account? <Link href="/signup" className={styles.link}>Sign up</Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
