"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Coffee, Brain, Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function PomodoroTimer() {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState<'focus' | 'break'>('focus');
    const [sessions, setSessions] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

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

    const handleSessionEnd = () => {
        setIsActive(false);
        if (mode === 'focus') {
            const nextSessions = sessions + 1;
            setSessions(nextSessions);
            setMode('break');
            setTimeLeft(5 * 60);

            // Gamification: Earn XP for focus session
            const currentXp = parseInt(localStorage.getItem("user_xp") || "0");
            localStorage.setItem("user_xp", (currentXp + 25).toString());

            // Notify user (simple alert for now, will replace with notification system)
            alert("Harika! Bir odaklanma seansı bitti. +25 XP kazandın! 🔥");
        } else {
            setMode('focus');
            setTimeLeft(25 * 60);
            alert("Mola bitti! Haydi odaklanmaya geri dönelim. 💪");
        }
    };

    const toggleTimer = () => setIsActive(!isActive);
    const resetTimer = () => {
        setIsActive(false);
        setMode('focus');
        setTimeLeft(25 * 60);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = (mode === 'focus' ? (25 * 60 - timeLeft) / (25 * 60) : (5 * 60 - timeLeft) / (5 * 60)) * 100;

    return (
        <Card className="border-none shadow-lg bg-white overflow-hidden relative">
            <div className={`absolute top-0 left-0 w-full h-1 ${mode === 'focus' ? 'bg-indigo-500' : 'bg-green-500'} transition-all`} style={{ width: `${progress}%` }} />
            <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {mode === 'focus' ? <Brain className="w-5 h-5 text-indigo-600" /> : <Coffee className="w-5 h-5 text-green-600" />}
                        <span>{mode === 'focus' ? 'Odaklanma Zamanı' : 'Mola Zamanı'}</span>
                    </div>
                    <span className="text-xs font-bold text-gray-400"># seans: {sessions}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center py-6">
                <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="96"
                            cy="96"
                            r="88"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-gray-100"
                        />
                        <motion.circle
                            cx="96"
                            cy="96"
                            r="88"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={2 * Math.PI * 88}
                            initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
                            animate={{ strokeDashoffset: 2 * Math.PI * 88 * (1 - progress / 100) }}
                            className={`${mode === 'focus' ? 'text-indigo-600' : 'text-green-600'}`}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-black text-gray-900 tabular-nums">{formatTime(timeLeft)}</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{mode === 'focus' ? 'ÇALIŞIYORSUN' : 'DİNLENİYORSUN'}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full">
                    <Button
                        onClick={toggleTimer}
                        className={`flex-1 h-12 text-lg font-bold shadow-lg ${isActive ? 'bg-gray-100 text-gray-900 hover:bg-gray-200' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                    >
                        {isActive ? <Pause className="mr-2" /> : <Play className="mr-2" />}
                        {isActive ? 'Durdur' : 'Başlat'}
                    </Button>
                    <Button variant="outline" size="icon" onClick={resetTimer} className="h-12 w-12 border-gray-200">
                        <RotateCcw className="w-5 h-5 text-gray-400" />
                    </Button>
                </div>

                <p className="mt-4 text-[10px] text-gray-400 text-center leading-relaxed italic">
                    Focus seansını tamamladığında <b>+25 XP</b> kazanacaksın.
                    Konsantrasyonunu bozma!
                </p>
            </CardContent>
        </Card>
    );
}
