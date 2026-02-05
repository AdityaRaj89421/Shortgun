"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { Send, Bot, User as UserIcon } from "lucide-react";
import styles from "./ai.module.css";
import clsx from "clsx";

export default function AIPage() {
    const [messages, setMessages] = useState<any[]>([
        { role: "assistant", content: "Hello! I am Shortgun AI. Ask me anything about your BTech curriculum, from DSA to Circuits!" }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { role: "user", content: input };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        try {
            const res = await fetch("/api/ai", {
                method: "POST",
                body: JSON.stringify({ message: input, context: "BTech" }),
            });
            const data = await res.json();

            setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
        } catch {
            setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I encountered an error. Please try again." }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleQuickAsk = (topic: string) => {
        setInput(`Explain ${topic} in detail.`);
    };

    return (
        <div className="container" style={{ padding: "2rem 1rem", height: "calc(100vh - 4rem)", display: "flex", flexDirection: "column" }}>
            <header className="mb-4">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Bot className="text-primary" /> Shortgun AI
                </h1>
                <p className="text-muted-foreground">Your personal BTech tutor.</p>
            </header>

            <div className={styles.chatContainer}>
                <div className={styles.messagesArea} ref={scrollRef}>
                    {messages.map((msg, idx) => (
                        <div key={idx} className={clsx(styles.messageRow, msg.role === "user" ? styles.userRow : styles.botRow)}>
                            <div className={clsx(styles.bubble, msg.role === "user" ? styles.userBubble : styles.botBubble)}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isTyping && <div className="text-sm text-muted-foreground ml-4">Shortgun AI is thinking...</div>}
                </div>

                <div className={styles.inputArea}>
                    <div className="flex gap-2 mb-2 overflow-x-auto pb-2">
                        {["Binary Search", "Thermodynamics", "React Hooks", "KCL/KVL"].map(topic => (
                            <Button key={topic} variant="outline" size="sm" onClick={() => handleQuickAsk(topic)} type="button">
                                {topic}
                            </Button>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask a doubt..."
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        />
                        <Button onClick={handleSend} disabled={isTyping}><Send className="w-4 h-4" /></Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
