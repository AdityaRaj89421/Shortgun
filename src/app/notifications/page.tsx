"use client";

import { Card, CardContent } from "@/components/ui/Card";
import { Bell } from "lucide-react";

export default function NotificationsPage() {
    const notifications = [
        { id: 1, content: "Someone answered your doubt regarding AVL Trees.", time: "2 mins ago" },
        { id: 2, content: "New Hackathon 'CodeWars' added in Mumbai.", time: "1 hour ago" },
        { id: 3, content: "Dr. Sharma posted a new insight on GATE.", time: "4 hours ago" },
    ];

    return (
        <div className="container" style={{ padding: "2rem 1rem" }}>
            <h1 className="text-3xl font-bold mb-8">Notifications</h1>
            <div className="grid gap-4">
                {notifications.map(n => (
                    <Card key={n.id}>
                        <CardContent className="p-4 flex items-start gap-4">
                            <div className="p-2 bg-yellow-100 text-yellow-600 rounded-full">
                                <Bell className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="font-medium">{n.content}</p>
                                <p className="text-sm text-muted-foreground">{n.time}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
