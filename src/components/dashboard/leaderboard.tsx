"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Crown, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const LEADERBOARD_DATA = [
    { rank: 1, name: "Merve Ay", xp: "12,450", streak: "42", avatar: "M", color: "bg-amber-100 text-amber-600", isFirst: true },
    { rank: 2, name: "Utku Arslan", xp: "11,800", streak: "15", avatar: "U", color: "bg-slate-100 text-slate-600", isYou: true },
    { rank: 3, name: "Ece Demir", xp: "10,200", streak: "28", avatar: "E", color: "bg-orange-100 text-orange-600" },
    { rank: 12, name: "Selin Kaya", xp: "8,900", streak: "7", avatar: "S", color: "bg-indigo-100 text-indigo-600" },
    { rank: 13, name: "Siz (Deniz)", xp: "8,850", streak: "5", avatar: "D", color: "bg-indigo-600 text-white", isUser: true },
];

export function Leaderboard() {
    return (
        <Card className="border-none shadow-md bg-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Trophy className="w-24 h-24" />
            </div>
            <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    <span>Haftalık Şampiyonlar</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="bg-amber-50/50 p-3 rounded-2xl border border-amber-100 mb-4">
                    <p className="text-[10px] font-bold text-amber-800 uppercase tracking-widest mb-1 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> Durumun
                    </p>
                    <p className="text-sm font-bold text-amber-900">12. sıradaki Selin'i geçmeye sadece <span className="text-indigo-600">50 XP</span> kaldı! 🚀</p>
                </div>

                <div className="space-y-2">
                    {LEADERBOARD_DATA.map((item, idx) => (
                        <motion.div
                            key={item.rank}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className={`flex items-center gap-3 p-3 rounded-2xl transition-all
                                ${item.isUser ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100 scale-[1.02]' :
                                    item.isYou ? 'bg-indigo-50 border border-indigo-100' : 'hover:bg-gray-50'}`}
                        >
                            <div className="w-6 text-center text-xs font-black italic">
                                {item.rank === 1 ? <Crown className="w-4 h-4 text-amber-500 mx-auto" /> :
                                    item.rank === 2 ? <Medal className="w-4 h-4 text-slate-400 mx-auto" /> :
                                        item.rank === 3 ? <Medal className="w-4 h-4 text-orange-400 mx-auto" /> :
                                            `#${item.rank}`}
                            </div>
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${item.color}`}>
                                {item.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className={`text-xs font-bold truncate ${item.isUser ? 'text-white' : 'text-gray-900'}`}>{item.name}</h4>
                                <div className={`flex items-center gap-2 text-[10px] ${item.isUser ? 'text-indigo-100' : 'text-gray-400'}`}>
                                    <span>{item.xp} XP</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-0.5">{item.streak} Gün🔥</span>
                                </div>
                            </div>
                            {item.isFirst && (
                                <Badge className="bg-amber-500 text-white border-none text-[8px] px-1.5 h-4">LİDER</Badge>
                            )}
                        </motion.div>
                    ))}
                </div>

                <Button variant="ghost" className="w-full text-xs text-indigo-600 hover:bg-indigo-50 font-bold group">
                    Tüm Sıralamayı Gör <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </Button>
            </CardContent>
        </Card>
    );
}

function ChevronRight({ className, ...props }: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    )
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-ring focus:ring-offset-2 border ${className}`}>
            {children}
        </span>
    );
}
