"use client";

import { motion } from "motion/react";
import { Brain, Rocket, Users, Zap, BookOpen, GraduationCap, ArrowRight, MessageSquare, Calendar, BrainCircuit } from "lucide-react";
import Link from "next/link";

const features = [
    {
        icon: MessageSquare,
        title: "Doubt Room",
        desc: "Ask questions, get answers from peers, and clear your concepts.",
        color: "bg-purple-500",
        href: "/doubts"
    },
    {
        icon: BrainCircuit,
        title: "Shortgun AI",
        desc: "Your personal AI tutor for curriculum-specific explanations.",
        color: "bg-pink-500",
        href: "/ai"
    },
    {
        icon: Calendar,
        title: "Campus Events",
        desc: "Discover hackathons, fests, and workshops across colleges.",
        color: "bg-blue-500",
        href: "/events"
    },
    {
        icon: BookOpen,
        title: "Syllabus Viewer",
        desc: "Access structured syllabus PDFs for your branch and college.",
        color: "bg-green-500",
        href: "/syllabus"
    },
    {
        icon: Users,
        title: "Group Study",
        desc: "Join virtual study rooms with focus timers and chat.",
        color: "bg-yellow-500",
        href: "/study-rooms"
    },
    {
        icon: GraduationCap,
        title: "Educators' Insight",
        desc: "Expert advice and strategies to master your subjects.",
        color: "bg-red-500",
        href: "/insights"
    },
];

export default function Features() {
    return (
        <section id="features" className="py-32 relative z-10">
            <div className="container mx-auto px-6">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-6"
                    >
                        Powerful Features for <span className="text-gradient">Modern Learners</span>
                    </motion.h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Everything you need to master your subjects, from AI assistance to peer collaboration.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <Link key={idx} href={feature.href}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="h-full glass-effect p-8 rounded-3xl group cursor-pointer border border-white/5 hover:border-white/20 transition-colors"
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white ${feature.color} bg-opacity-20 group-hover:bg-opacity-40 transition-all`}>
                                    <feature.icon className="w-7 h-7" />
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed mb-6">{feature.desc}</p>

                                <div className="w-full bg-gray-800 rounded-full h-1 overflow-hidden mt-auto">
                                    <motion.div
                                        initial={{ width: "30%" }}
                                        whileHover={{ width: "100%" }}
                                        transition={{ duration: 0.5 }}
                                        className={`h-full ${feature.color}`}
                                    />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-32 relative overflow-hidden glass-effect rounded-[3rem] p-12 text-center border border-white/10"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-blue-900/40 blur-3xl -z-10" />

                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
                    <p className="text-gray-300 mb-8 text-lg max-w-xl mx-auto">Join thousands of students transforming their careers with Shortgun.</p>

                    <Link href="/signup">
                        <button className="px-10 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-gray-200 transition-colors flex items-center gap-2 mx-auto">
                            Get Started Free <ArrowRight className="w-5 h-5" />
                        </button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
