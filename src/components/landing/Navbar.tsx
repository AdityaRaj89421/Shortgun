"use client";

import { useState, useEffect } from "react";
import { GraduationCap, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Courses", href: "#courses" },
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "#pricing" },
        { name: "About", href: "#about" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-black/60 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
                    }`}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    {/* Brand */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-purple-600/20 p-2 rounded-lg group-hover:bg-purple-600/40 transition-colors">
                            <GraduationCap className="text-purple-400 w-6 h-6" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">Shortgun</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Action */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/login" className="text-sm font-medium text-white hover:text-purple-300 transition-colors">
                            Log In
                        </Link>
                        <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-medium shadow-lg shadow-purple-900/20 hover:scale-105 hover:shadow-purple-900/40 transition-all">
                            Get Started
                        </button>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[60] bg-gray-950/90 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-8"
                    >
                        <button
                            className="absolute top-6 right-6 text-white p-2 bg-white/10 rounded-full"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <X />
                        </button>

                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-2xl font-bold text-white"
                            >
                                {link.name}
                            </Link>
                        ))}

                        <button className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg shadow-purple-900/20">
                            Get Started
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
