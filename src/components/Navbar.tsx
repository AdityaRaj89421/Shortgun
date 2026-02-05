"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "lucide-react";
import styles from "./Navbar.module.css";

// Basic Button Component for reuse (inline for now)
function Button({ children, onClick, variant = "primary" }: any) {
    return (
        <button className={`btn ${variant === "outline" ? "btn-outline" : "btn-primary"}`} onClick={onClick}>
            {children}
        </button>
    );
}

export default function Navbar() {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        fetch("/api/auth/me")
            .then((res) => res.json())
            .then((data) => setUser(data.user));
    }, [pathname]);

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        setUser(null);
        router.push("/login");
    };

    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.navContainer}`}>
                <Link href="/" className={styles.logo}>
                    Shortgun
                </Link>
                <div className={styles.links}>
                    {user ? (
                        <>
                            <Link href="/dashboard" className={styles.link}>Dashboard</Link>
                            <Link href="/doubts" className={styles.link}>Doubts</Link>
                            <Link href="/events" className={styles.link}>Events</Link>
                            <div className={styles.userMenu}>
                                <span className={styles.userName}>{user.name}</span>
                                <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className={styles.link}>Login</Link>
                            <Link href="/signup" className={styles.cta}>Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
