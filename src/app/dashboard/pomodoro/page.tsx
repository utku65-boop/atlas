"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Play, Pause, RotateCcw, Coffee, Brain, AlertOctagon, ArrowLeft, Zap, Trophy, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function DeepFocusPage() {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState<'focus' | 'break'>('focus');
    const [sessions, setSessions] = useState(0);
    const [distractions, setDistractions] = useState(0);
    const [showWarning, setShowWarning] = useState(false);
    const [isDuel, setIsDuel] = useState(false);
    const [opponentProgress, setOpponentProgress] = useState<number | null>(null);
    const [opponentName, setOpponentName] = useState("Arkadaşın");
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const loadUser = async () => {
            if (!supabase) return;
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                setUser({
                    username: session.user.user_metadata?.username || session.user.email?.split('@')[0],
                    name: session.user.user_metadata?.name || session.user.email?.split('@')[0]
                });
            }
        };
        loadUser();
    }, []);

    // Marginal XP Logic
    const baseXP = 25;
    const calculateXP = (completedSessions: number) => {
        // Increases by 10 each session: 25, 35, 45...
        return baseXP + (completedSessions * 10);
    };

    useEffect(() => {
        let interval: any = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            handleSessionEnd();
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    // Anti-Distraction Detection
    useEffect(() => {
        const handleBlur = () => {
            if (isActive && mode === 'focus') {
                setDistractions(prev => prev + 1);
                setShowWarning(true);
            }
        };

        window.addEventListener('blur', handleBlur);
        return () => window.removeEventListener('blur', handleBlur);
    }, [isActive, mode]);

    // Duel Sync (Polling)
    useEffect(() => {
        let syncInterval: any = null;
        if (isActive && isDuel && user) {
            syncInterval = setInterval(async () => {
                // Update my progress
                fetch('/api/user/sync', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...user,
                        pomodoroStatus: {
                            progress: (25 * 60 - timeLeft) / (25 * 60) * 100,
                            isActive: true,
                            distractions
                        }
                    })
                }).catch(() => { });

                // Fetch friend's progress (Find a real online user for testing)
                try {
                    const res = await fetch('/api/user/sync');
                    const data = await res.json();

                    // Find first user who is not me and has pomodoroStatus
                    const friend = data.users.find((u: any) => u.username !== user.username && u.pomodoroStatus);
                    if (friend && friend.pomodoroStatus) {
                        setOpponentProgress(friend.pomodoroStatus.progress);
                        setOpponentName(friend.name || friend.username);
                    } else {
                        setOpponentName("Rakip Bekleniyor...");
                        setOpponentProgress(0);
                    }
                } catch { }
            }, 3000);
        }
        return () => clearInterval(syncInterval);
    }, [isActive, isDuel, timeLeft, distractions, user]);

    const handleSessionEnd = () => {
        setIsActive(false);
        if (mode === 'focus') {
            const nextSessions = sessions + 1;
            setSessions(nextSessions);

            const earnedXP = calculateXP(sessions);
            const currentXp = parseInt(localStorage.getItem("user_xp") || "0");
            const newXp = currentXp + earnedXP;
            localStorage.setItem("user_xp", newXp.toString());

            // Sync with backend
            if (user) {
                fetch('/api/user/sync', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...user, xp: newXp })
                }).catch(err => console.error("Sync error:", err));
            }

            setMode('break');
            setTimeLeft(5 * 60);

            alert(`Harika! Odağını bozmadın. +${earnedXP} XP kazandın! 🔥`);
        } else {
            setMode('focus');
            setTimeLeft(25 * 60);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = (mode === 'focus' ? (25 * 60 - timeLeft) / (25 * 60) : (5 * 60 - timeLeft) / (5 * 60)) * 100;

    return (
        <div className={`min-h-screen transition-colors duration-700 font-sans ${mode === 'focus' ? 'bg-slate-950 text-white' : 'bg-indigo-900 text-white'}`}>
            <Header />

            <main className="container max-w-2xl mx-auto px-6 py-12 flex flex-col items-center justify-center min-h-[80vh]">
                <Link href="/dashboard" className="self-start mb-8 text-slate-400 hover:text-white flex items-center gap-2 transition-colors group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold">Panele Dön</span>
                </Link>

                <AnimatePresence>
                    {showWarning && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-rose-500/20 border border-rose-500/50 p-4 rounded-2xl mb-8 flex items-center gap-4 w-full"
                        >
                            <AlertOctagon className="w-6 h-6 text-rose-500" />
                            <div className="flex-1">
                                <p className="text-sm font-bold text-rose-100">Dikkatin Dağıldı!</p>
                                <p className="text-xs text-rose-200/70">Sekmeden ayrıldığını fark ettik. Odaklanmaya devam et!</p>
                            </div>
                            <Button size="sm" variant="ghost" onClick={() => setShowWarning(false)} className="hover:bg-rose-500/20 text-rose-100">Anladım</Button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="text-center mb-12">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-4"
                    >
                        {mode === 'focus' ? <Brain className="w-4 h-4 text-indigo-400" /> : <Coffee className="w-4 h-4 text-emerald-400" />}
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                            {mode === 'focus' ? 'Derin Odaklanma Modu' : 'Yenilenme Zamanı'}
                        </span>
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-2">
                        {mode === 'focus' ? 'Sadece Çalış.' : 'Nefes Al.'}
                    </h1>
                    <p className="text-slate-400 text-sm md:text-base">Dikkat dağıtıcı her şeyi geride bırak.</p>
                </div>

                <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center mb-12">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="50%"
                            cy="50%"
                            r="45%"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="transparent"
                            className="text-white/5"
                        />
                        <motion.circle
                            cx="50%"
                            cy="50%"
                            r="45%"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray="100 100"
                            pathLength="100"
                            animate={{ strokeDashoffset: 100 - progress }}
                            className={`${mode === 'focus' ? 'text-indigo-500' : 'text-emerald-500'}`}
                            transition={{ duration: 1, ease: "linear" }}
                        />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                        <span className="text-6xl md:text-8xl font-black tracking-tighter tabular-nums">{formatTime(timeLeft)}</span>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-8 w-full max-w-md">
                    {/* Duel Mode Toggle (Mock) */}
                    {!isActive && !isDuel && (
                        <Button
                            variant="outline"
                            onClick={() => setIsDuel(true)}
                            className="w-full h-12 rounded-2xl border-white/10 bg-white/5 text-white hover:bg-indigo-600 transition-all gap-2 font-bold"
                        >
                            <Users className="w-4 h-4" /> Arkadaşınla Düello Yap
                        </Button>
                    )}

                    {isDuel && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full bg-white/10 border border-white/20 p-6 rounded-[2rem] backdrop-blur-md mb-4"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-purple-500 rounded-2xl flex items-center justify-center font-black">
                                        {opponentName[0]}
                                    </div>
                                    <div>
                                        <p className="text-xs font-black">{opponentName}</p>
                                        <p className="text-[10px] text-purple-300">
                                            {opponentProgress !== null ? 'Düello Devam Ediyor' : 'Bağlantı Bekleniyor...'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Trophy className="w-4 h-4 text-amber-500 animate-bounce" />
                                    <span className="text-[10px] font-bold text-amber-500 italic">VS</span>
                                </div>
                            </div>

                            {/* Opponent Progress */}
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-[10px] font-bold">
                                    <span>{opponentName}'in Odağı</span>
                                    <span>%{Math.min(100, opponentProgress || (isActive ? 4 : 0)).toFixed(0)}</span>
                                </div>
                                <div className="h-2 bg-black/20 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-purple-500"
                                        animate={{ width: `${Math.min(100, opponentProgress || (isActive ? 4 : 0))}%` }}
                                    />
                                </div>
                                <p className="text-[9px] text-center text-white/40 mt-2 font-medium italic">Sekme değiştiren XP penalaltısı alır!</p>
                            </div>
                        </motion.div>
                    )}

                    <div className="flex items-center gap-4 w-full">
                        <Button
                            onClick={() => setIsActive(!isActive)}
                            className={`flex-1 h-16 text-xl font-black rounded-3xl shadow-2xl transition-all active:scale-95
                                ${isActive
                                    ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/20'}`}
                        >
                            {isActive ? <Pause className="mr-3 fill-current" /> : <Play className="mr-3 fill-current" />}
                            {isActive ? 'DURDUR' : 'BAŞLAT'}
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => { setTimeLeft(25 * 60); setIsActive(false); setIsDuel(false); }}
                            className="h-16 w-16 rounded-3xl border border-white/10 bg-white/5 text-white hover:bg-white/10"
                        >
                            <RotateCcw className="w-6 h-6" />
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
