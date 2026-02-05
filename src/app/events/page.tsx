"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Calendar, MapPin, Tag } from "lucide-react";
import styles from "./events.module.css";
import clsx from "clsx";

export default function EventsPage() {
    const [events, setEvents] = useState<any[]>([]);
    const [filter, setFilter] = useState("ALL"); // ALL, HACKATHON, FEST, WORKSHOP

    useEffect(() => {
        fetch("/api/events")
            .then(res => res.json())
            .then(data => setEvents(data.events || []));
    }, []);

    const filteredEvents = filter === "ALL" ? events : events.filter(e => e.category === filter);

    return (
        <div className="container" style={{ padding: "2rem 1rem" }}>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Campus Events</h1>
                <Link href="/events/new">
                    <Button>Submit Event</Button>
                </Link>
            </div>

            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {["ALL", "HACKATHON", "FEST", "WORKSHOP"].map(cat => (
                    <Button
                        key={cat}
                        variant={filter === cat ? "primary" : "outline"}
                        onClick={() => setFilter(cat)}
                        size="sm"
                    >
                        {cat}
                    </Button>
                ))}
            </div>

            <div className="grid gap-6">
                {filteredEvents.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">No upcoming events found.</div>
                ) : (
                    filteredEvents.map(event => (
                        <Card key={event.id} className={styles.eventCard}>
                            <CardContent className="p-0 flex flex-col md:flex-row">
                                <div className={styles.dateBadge}>
                                    <div className="text-2xl font-bold">{new Date(event.date).getDate()}</div>
                                    <div className="text-sm uppercase">{new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</div>
                                </div>
                                <div className="p-6 flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={clsx(styles.categoryPill, styles[event.category])}>{event.category}</span>
                                        <span className="text-sm text-muted-foreground">{event.status}</span>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                                    <p className="text-muted-foreground mb-4 line-clamp-2">{event.description}</p>

                                    <div className="flex gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {event.location}</div>
                                        {event.link && <div className="flex items-center gap-1 text-primary"><a href={event.link} target="_blank" rel="noreferrer">Register Now</a></div>}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
