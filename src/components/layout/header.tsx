"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Rocket, TrendingUp, Bell, User, ShieldCheck, LayoutDashboard, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NotificationCenter } from "@/components/dashboard/notification-center";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState<{ name: string } | null>(null);
    const [isNotifOpen, setIsNotifOpen] = useState(false);

    const [mounted, setMounted] = useState(false);

    // Check for user login on mount
    useEffect(() => {
        setMounted(true);
        if (typeof window !== 'undefined') {
            const savedUser = localStorage.getItem("user");
            if (savedUser) {
                const parsedUser = JSON.parse(savedUser);
                setUser(parsedUser);

                // Sync with backend for social features
                fetch('/api/user/sync', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...parsedUser,
                        xp: parseInt(localStorage.getItem("user_xp") || "0")
                    })
                }).catch(err => console.error("Sync error:", err));
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    // Prevent hydration mismatch by not rendering user-dependent content until mounted
    if (!mounted) {
        return (
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Rocket className="h-6 w-6 text-indigo-600" />
                        <span className="font-bold text-xl tracking-tight">
                            Kariyer<span className="text-indigo-600">Rehberi</span>.ai
                        </span>
                    </div>
                </div>
            </header>
        );
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                    <Rocket className="h-6 w-6 text-indigo-600" />
                    <Link href={user ? "/dashboard" : "/"} className="font-bold text-xl tracking-tight">
                        Kariyer<span className="text-indigo-600">Rehberi</span>.ai
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link href="/dashboard" className="hover:text-indigo-600 transition-colors">Panelim</Link>
                    {user && (
                        <>
                            <Link href="/dashboard/social" className="text-sm font-bold hover:text-indigo-600 flex items-center gap-1">
                                <Users className="w-4 h-4" /> Sosyal Hub
                            </Link>
                            <Link href="/dashboard/profile" className="hover:text-indigo-600 transition-colors">Profilim</Link>
                            <Link href="/dashboard/net-takip" className="text-sm font-medium hover:text-indigo-600 flex items-center gap-1">
                                <TrendingUp className="w-4 h-4" /> Net Takip
                            </Link>
                            <Link href="/dashboard/mentor" className="text-sm font-medium hover:text-indigo-600">Mentor Bul</Link>
                        </>
                    )}
                    {!user && (
                        <>
                            <Link href="#features" className="hover:text-indigo-600 transition-colors">Özellikler</Link>
                            <Link href="#pricing" className="hover:text-indigo-600 transition-colors">Fiyatlandırma</Link>
                        </>
                    )}
                </nav>

                <div className="flex items-center gap-2">
                    {user && (
                        <button
                            onClick={() => setIsNotifOpen(true)}
                            className="relative w-9 h-9 bg-white rounded-full flex items-center justify-center border border-indigo-50 shadow-sm text-gray-400 hover:text-indigo-600 transition-colors"
                        >
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                        </button>
                    )}
                    <NotificationCenter isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />

                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-gray-700">Merhaba, {user.name} 👋</span>
                                <Button variant="ghost" onClick={handleLogout} className="text-red-500 hover:text-red-700 hover:bg-red-50">Çıkış Yap</Button>
                                <Link href="/dashboard">
                                    <Button className="bg-indigo-600 hover:bg-indigo-700">Panelime Git</Button>
                                </Link>
                            </div>
                        ) : (
                            <>
                                <Link href="/login">
                                    <Button variant="ghost">Giriş Yap</Button>
                                </Link>
                                <Link href="/test">
                                    <Button className="bg-indigo-600 hover:bg-indigo-700">Ücretsiz Analiz Et</Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden p-2 rounded-lg bg-gray-50 text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t bg-background"
                    >
                        <div className="container py-6 flex flex-col gap-2">
                            {user ? (
                                <>
                                    <div className="bg-indigo-50 p-4 rounded-2xl mb-4 flex items-center gap-3">
                                        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-indigo-900">{user.name}</p>
                                            <Link href="/dashboard/profile" className="text-[10px] text-indigo-500 font-bold hover:underline" onClick={() => setIsMenuOpen(false)}>Profilimi Düzenle</Link>
                                        </div>
                                    </div>
                                    <Link href="/dashboard" className="flex items-center gap-3 text-sm font-bold p-3 rounded-xl hover:bg-gray-50 text-gray-700" onClick={() => setIsMenuOpen(false)}>
                                        <LayoutDashboard className="w-5 h-5 text-indigo-600" /> Panelim
                                    </Link>
                                    <Link href="/dashboard/social" className="flex items-center gap-3 text-sm font-bold p-3 rounded-xl hover:bg-gray-50 text-gray-700" onClick={() => setIsMenuOpen(false)}>
                                        <Users className="w-5 h-5 text-indigo-600" /> Sosyal Hub
                                    </Link>
                                    <Link href="/dashboard/net-takip" className="flex items-center gap-3 text-sm font-bold p-3 rounded-xl hover:bg-gray-50 text-gray-700" onClick={() => setIsMenuOpen(false)}>
                                        <TrendingUp className="w-5 h-5 text-indigo-600" /> Net Takip
                                    </Link>
                                    <Link href="/dashboard/mentor" className="flex items-center gap-3 text-sm font-bold p-3 rounded-xl hover:bg-gray-50 text-gray-700" onClick={() => setIsMenuOpen(false)}>
                                        <ShieldCheck className="w-5 h-5 text-indigo-600" /> Mentor Bul
                                    </Link>
                                    <Link href="/dashboard/profile" className="flex items-center gap-3 text-sm font-bold p-3 rounded-xl hover:bg-gray-50 text-gray-700" onClick={() => setIsMenuOpen(false)}>
                                        <User className="w-5 h-5 text-indigo-600" /> Profilim & Ayarlar
                                    </Link>
                                    <hr className="my-2 border-gray-100" />
                                    <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50 font-bold" onClick={handleLogout}>
                                        Çıkış Yap
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                                        <Button variant="outline" className="w-full justify-start h-12 text-sm font-bold">Giriş Yap</Button>
                                    </Link>
                                    <Link href="/test" onClick={() => setIsMenuOpen(false)}>
                                        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 h-12 text-sm font-bold shadow-lg shadow-indigo-100">Ücretsiz Analiz Et</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
