"use client";

import { GraduationCap, Github, Twitter, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-xl pt-20 pb-10 mt-20">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="bg-purple-600/20 p-2 rounded-lg">
                                <GraduationCap className="text-purple-400 w-6 h-6" />
                            </div>
                            <span className="text-xl font-bold text-white">Shortgun</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Empowering the next generation of learners with AI-driven tools, immersive 3D content, and a global community.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Product</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link href="#" className="hover:text-purple-400 transition-colors">Courses</Link></li>
                            <li><Link href="#" className="hover:text-purple-400 transition-colors">Mentorship</Link></li>
                            <li><Link href="#" className="hover:text-purple-400 transition-colors">Pricing</Link></li>
                            <li><Link href="#" className="hover:text-purple-400 transition-colors">For Teams</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link href="#" className="hover:text-purple-400 transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-purple-400 transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-purple-400 transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Connect</h4>
                        <div className="flex gap-4">
                            {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full glass-effect flex items-center justify-center text-gray-400 hover:text-white hover:bg-purple-600 transition-all">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Shortgun Inc. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
