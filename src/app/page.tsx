import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import FloatingElements from "@/components/landing/FloatingElements";
import CursorFollower from "@/components/landing/CursorFollower";
import ThreeDModel from "@/components/landing/ThreeDModel";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gray-950 text-white overflow-x-hidden selection:bg-purple-500/30">
      {/* Background & Effects */}
      <FloatingElements />
      <CursorFollower />

      {/* Content z-index 10 to sit above background */}
      <div className="relative z-10 w-full flex flex-col">
        <Navbar />
        <Hero />
        <ThreeDModel />
        <Features />
        <Footer />
      </div>
    </main>
  );
}
