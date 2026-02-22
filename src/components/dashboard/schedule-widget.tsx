"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle2, Flame, Trophy, ChevronDown, ChevronUp, BookOpen, PenTool, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { NetCounts } from "@/lib/score-calculator";

interface ScheduleWidgetProps {
    activeGoals: NetCounts | null;
    currentNets: NetCounts | null;
}

interface Task {
    id: string;
    subject: string;
    gap: number;
    completed: boolean;
    expanded?: boolean;
}

export function ScheduleWidget({ activeGoals, currentNets }: ScheduleWidgetProps) {
    const [xp, setXp] = useState(0);
    const [streak, setStreak] = useState(1);
    const [tasks, setTasks] = useState<Task[]>([]);

    // Load XP and generate tasks on mount/update
    useEffect(() => {
        // Load XP
        const savedXP = localStorage.getItem("userXP");
        if (savedXP) setXp(parseInt(savedXP));

        // Generate Tasks based on gaps
        if (activeGoals && currentNets) {
            const gaps: { subject: string, gap: number, key: string }[] = [];

            // Helper to add gap
            const checkGap = (key: keyof NetCounts, label: string) => {
                const target = activeGoals[key] || 0;
                const current = currentNets[key] || 0;
                if (target > current) {
                    gaps.push({ subject: label, gap: target - current, key });
                }
            };

            checkGap('tyt_turkce', 'Türkçe');
            checkGap('tyt_matematik', 'Matematik');
            checkGap('tyt_fen', 'Fen Bilimleri');
            checkGap('tyt_sosyal', 'Sosyal Bilimler');
            checkGap('ayt_matematik', 'AYT Matematik');
            checkGap('ayt_fizik', 'Fizik');
            checkGap('ayt_kimya', 'Kimya');
            checkGap('ayt_biyoloji', 'Biyoloji');
            checkGap('ayt_edebiyat', 'Edebiyat');
            checkGap('ayt_tarih1', 'Tarih-1');
            checkGap('ayt_cografya1', 'Coğrafya-1');
            checkGap('ydt', 'Yabancı Dil');

            // Sort by gap desc and take top 3
            const topGaps = gaps.sort((a, b) => b.gap - a.gap).slice(0, 3);

            // Map to tasks
            // We want to persist completion state if possible, but for now let's reset or just check if they differ
            // A simple way is to use the subject name as ID.
            const newTasks = topGaps.map(g => ({
                id: g.key,
                subject: g.subject,
                gap: g.gap,
                completed: false
            }));

            setTasks(newTasks);
        }
    }, [activeGoals, currentNets]);

    const addXp = (amount: number) => {
        const newXp = xp + amount;
        setXp(newXp);
        localStorage.setItem("userXP", newXp.toString());
    };

    const toggleTaskExpand = (id: string) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, expanded: !t.expanded } : t));
    };

    const completeSubTask = (id: string, type: 'question' | 'topic') => {
        // Just add XP, don't remove the main task yet unless all subtasks done?
        // Let's keep it simple: Clicking these gives XP immediately.
        addXp(type === 'question' ? 50 : 100);
        // Maybe show a checkmark or toast?
    };

    const level = Math.floor(xp / 1000) + 1;
    const nextLevelXp = level * 1000;
    const progressPercent = ((xp - (level - 1) * 1000) / 1000) * 100;

    return (
        <Card className="border-none shadow-md bg-white overflow-hidden">
            {/* Header with Gamification */}
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-4 text-white">
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-yellow-300" />
                        <span className="font-bold text-sm">Seviye {level}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                        <Flame className="w-4 h-4 text-orange-300 fill-orange-300" />
                        <span className="font-bold text-xs">{streak} Gün Seri!</span>
                    </div>
                </div>
                <div className="flex justify-between items-end mb-1">
                    <span className="text-2xl font-bold">{xp} XP</span>
                    <span className="text-xs text-indigo-200">{nextLevelXp - xp} XP sonra sonraki seviye</span>
                </div>

                <Progress value={progressPercent} className="h-2 mt-1 bg-white/20 [&>div]:bg-yellow-400" />
            </div>

            <CardContent className="p-0">
                <div className="p-3 bg-indigo-50/50 border-b border-indigo-100">
                    <h3 className="text-xs font-bold text-indigo-900 uppercase tracking-wider">🎯 Bugünün Odak Noktaları</h3>
                </div>
                <div className="divide-y divide-gray-100">
                    {tasks.length === 0 ? (
                        <div className="p-6 text-center text-gray-500 text-sm">
                            Harika! Şu an belirgin bir eksiğin görünmüyor.
                            <br />Genel tekrarlara devam et! 🌟
                        </div>
                    ) : (
                        tasks.map((task) => (
                            <div key={task.id} className="group">
                                <div
                                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                                    onClick={() => toggleTaskExpand(task.id)}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${task.gap > 5 ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                                            <Target className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 text-sm">{task.subject}'e Yoğunlaş</h4>
                                            <p className="text-xs text-gray-500">{task.gap.toFixed(1)} net eksiğin var</p>
                                        </div>
                                    </div>
                                    {task.expanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                                </div>

                                {task.expanded && (
                                    <div className="bg-gray-50 px-4 pb-4 pt-0 space-y-2 animate-in slide-in-from-top-2 duration-200">
                                        <div className="pl-11 space-y-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-full justify-start text-xs border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800 bg-white"
                                                onClick={(e) => { e.stopPropagation(); completeSubTask(task.id, 'topic'); }}
                                            >
                                                <BookOpen className="w-3 h-3 mr-2" />
                                                Konu Tekrarı Yap (+100 XP)
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-full justify-start text-xs border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800 bg-white"
                                                onClick={(e) => { e.stopPropagation(); completeSubTask(task.id, 'question'); }}
                                            >
                                                <PenTool className="w-3 h-3 mr-2" />
                                                20 Soru Çöz (+50 XP)
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
                <div className="p-3 bg-gray-50 text-center border-t">
                    <p className="text-xs text-gray-400">
                        Görevleri tamamlayarak XP kazan ve seviye atla!
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
