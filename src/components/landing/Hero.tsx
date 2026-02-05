"use client";

import { motion } from "motion/react";
import { Sparkles, PlayCircle, GraduationCap, Code2, Globe, Brain } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">

                {/* Left Column: Content */}
                <div className="space-y-8 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect border-purple-500/30 text-purple-300 mx-auto md:mx-0"
                    >
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-medium">Next Generation Learning</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight"
                    >
                        Transform Your Future with <br />
                        <span className="text-gradient">AI Powered Education</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-gray-400 leading-relaxed max-w-xl mx-auto md:mx-0"
                    >
                        Shortgun provides immersive, 3D-assisted learning experiences tailored to your BTech journey. Master coding, ace exams, and build your career.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start"
                    >
                        <button className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300">
                            Start Learning Now
                        </button>
                        <button className="px-8 py-4 rounded-full glass-effect border border-white/10 text-white font-medium hover:bg-white/10 transition-all flex items-center gap-2 group">
                            <PlayCircle className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" />
                            Watch Demo
                        </button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="grid grid-cols-3 gap-8 border-t border-white/5 pt-8 mt-8"
                    >
                        <div>
                            <div className="text-3xl font-bold text-white">50K+</div>
                            <div className="text-sm text-gray-500 uppercase tracking-wider">Students</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white">1000+</div>
                            <div className="text-sm text-gray-500 uppercase tracking-wider">Courses</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-white">95%</div>
                            <div className="text-sm text-gray-500 uppercase tracking-wider">Success Rate</div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: 3D Visual */}
                <div className="relative h-[600px] flex items-center justify-center perspective-1000">
                    {/* Floating Background Elements */}
                    <div className="absolute top-10 right-10 w-32 h-32 bg-purple-600/20 blur-3xl rounded-full animate-pulse-slow" />
                    <div className="absolute bottom-10 left-10 w-40 h-40 bg-blue-600/20 blur-3xl rounded-full animate-float" />

                    {/* Main 3D Card */}
                    <motion.div
                        initial={{ rotateX: 10, rotateY: -10, opacity: 0 }}
                        animate={{ rotateX: 0, rotateY: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.4 }}
                        className="relative z-10 w-full max-w-md glass-effect rounded-3xl p-8 border border-white/10 shadow-2xl"
                    >
                        <div className="absolute top-4 right-4 animate-pulse">
                            <div className="w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                        </div>

                        <div className="flex flex-col items-center justify-center py-10">
                            <div className="w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mb-6 glow-purple border border-white/10">
                                <GraduationCap className="w-12 h-12 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">My Learning Path</h3>
                            <p className="text-gray-400 mb-8">Bachelor of Technology</p>

                            <div className="w-full space-y-6">
                                <SkillBar icon={Code2} name="Python Mastery" progress={85} color="text-yellow-400" barColor="bg-yellow-400" delay={0.6} />
                                <SkillBar icon={Globe} name="Web Development" progress={72} color="text-blue-400" barColor="bg-blue-400" delay={0.7} />
                                <SkillBar icon={Brain} name="AI & Machine Learning" progress={45} color="text-purple-400" barColor="bg-purple-400" delay={0.8} />
                            </div>
                        </div>

                        {/* Floating Badge */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute -bottom-6 -left-6 glass-effect p-4 rounded-xl border border-white/10 flex items-center gap-3 shadow-xl"
                        >
                            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                                <span className="text-green-400 text-xl font-bold">✓</span>
                            </div>
                            <div>
                                <div className="text-xs text-gray-400">Streak</div>
                                <div className="text-sm font-bold text-white">12 Days 🔥</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function SkillBar({ icon: Icon, name, progress, color, barColor, delay }: any) {
    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${color}`} />
                    <span className="text-sm font-medium text-gray-300">{name}</span>
                </div>
                <span className="text-sm font-bold text-white">{progress}%</span>
            </div>
            <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay, ease: "easeOut" }}
                    className={`h-full ${barColor}`}
                />
            </div>
        </div>
    )
}
