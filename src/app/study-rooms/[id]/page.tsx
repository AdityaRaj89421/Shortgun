"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Send, Clock } from "lucide-react";
import styles from "./room.module.css";
import clsx from "clsx";

export default function RoomPage({ params }: { params: { id: string } }) {
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    // Mock initial load
    useEffect(() => {
        // In real app, fetch initial messages
        setMessages([
            { id: 1, user: "System", content: "Welcome to the study room!", type: 'system' }
        ]);
    }, []);

    // Polling for "real-time" updates
    useEffect(() => {
        const interval = setInterval(() => {
            // Mock incoming message occasionally
            if (Math.random() > 0.8) {
                setMessages(prev => [...prev, {
                    id: Date.now(),
                    user: "Peer " + Math.floor(Math.random() * 10),
                    content: "Is anyone solving the Graph problem?",
                    type: 'message'
                }]);
            }
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = () => {
        if (!input.trim()) return;
        setMessages(prev => [...prev, { id: Date.now(), user: "You", content: input, type: "message" }]);
        setInput("");
        // In real app, POST to API
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.sidebar}>
                <div className="p-4 border-b font-bold text-lg">Participants</div>
                <div className="p-4 text-sm text-muted-foreground">
                    <div>• You</div>
                    <div>• Peer 1</div>
                    <div>• Peer 2</div>
                </div>
            </div>

            <div className={styles.main}>
                <div className={styles.header}>
                    <h2 className="font-bold text-lg">DSA Grind Room</h2>
                    <Button size="sm" variant="outline"><Clock className="w-4 h-4 mr-2" /> 25:00</Button>
                </div>

                <div className={styles.chatArea} ref={scrollRef}>
                    {messages.map((msg) => (
                        <div key={msg.id} className={clsx(styles.messageLine, msg.user === "You" ? "text-right" : "")}>
                            <div className="text-xs text-muted-foreground mb-1">{msg.user}</div>
                            <div className={clsx(
                                "inline-block px-4 py-2 rounded mb-2",
                                msg.user === "You" ? "bg-primary text-primary-foreground" : "bg-muted"
                            )}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.inputArea}>
                    <Input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Type a message..."
                        onKeyDown={e => e.key === 'Enter' && sendMessage()}
                    />
                    <Button onClick={sendMessage}><Send className="w-4 h-4" /></Button>
                </div>
            </div>
        </div>
    );
}
