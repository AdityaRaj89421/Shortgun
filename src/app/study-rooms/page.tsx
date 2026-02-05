"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Users, Plus } from "lucide-react";

export default function StudyRoomsPage() {
    const [rooms, setRooms] = useState<any[]>([]);

    useEffect(() => {
        fetch("/api/rooms")
            .then(res => res.json())
            .then(data => setRooms(data.rooms || []));
    }, []);

    return (
        <div className="container" style={{ padding: "2rem 1rem" }}>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Group Study Rooms</h1>
                <Button><Plus className="w-4 h-4 mr-2" /> Create Room</Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rooms.length === 0 ? (
                    <div className="col-span-full text-center text-muted-foreground py-12">
                        No active study rooms. Start one to study with peers!
                    </div>
                ) : (
                    rooms.map(room => (
                        <Link href={`/study-rooms/${room.id}`} key={room.id}>
                            <Card className="hover:border-primary transition-colors cursor-pointer">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">
                                            {room.topic || 'General'}
                                        </div>
                                        <div className="flex items-center text-muted-foreground text-sm">
                                            <Users className="w-4 h-4 mr-1" /> {room.activeUsers || 0}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{room.name}</h3>
                                    <p className="text-muted-foreground text-sm">Join this room to study together.</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))
                )}

                {/* Mock Room for Demo if empty */}
                {rooms.length === 0 && (
                    <Link href="/study-rooms/demo-room">
                        <Card className="hover:border-primary transition-colors cursor-pointer border-dashed">
                            <CardContent className="p-6 flex flex-col items-center justify-center h-full min-h-[200px] text-muted-foreground">
                                <div className="mb-2 font-medium">Demo Room: DSA Grind</div>
                                <div className="text-sm">Click to join mock session</div>
                            </CardContent>
                        </Card>
                    </Link>
                )}
            </div>
        </div>
    );
}
