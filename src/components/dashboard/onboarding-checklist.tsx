"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, ArrowRight, ClipboardCheck, Target, BarChart3, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface ChecklistItem {
    id: string;
    title: string;
    description: string;
    isCompleted: boolean;
    link: string;
    icon: any;
}

export function OnboardingChecklist() {
    const [items, setItems] = useState<ChecklistItem[]>([]);
    const [isAllCompleted, setIsAllCompleted] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        checkStatus();
    }, []);

    const checkStatus = async () => {
        // 1. Kariyer Testi
        const results = localStorage.getItem("riasecResults");
        const testDone = !!results;

        // 2. Hedef Belirle
        const targetDept = localStorage.getItem("targetDepartment");
        const targetDone = !!targetDept;

        // 3. İlk Deneme
        const nets = localStorage.getItem("netHistory");
        const netDone = !!nets && JSON.parse(nets).length > 0;

        // 4. Arkadaş Ekle (Supabase check)
        let friendsDone = false;
        const userStr = localStorage.getItem("user");
        if (userStr && supabase) {
            const user = JSON.parse(userStr);
            const { data } = await supabase
                .from('friendships')
                .select('*')
                .or(`user_id.eq.${user.username},friend_id.eq.${user.username}`);
            friendsDone = !!data && data.length >= 3;
        }

        const checklist: ChecklistItem[] = [
            {
                id: "test",
                title: "Kariyer Testini Çöz",
                description: "Sana en uygun meslekleri keşfetmek için ilk adımı at.",
                isCompleted: testDone,
                link: "/test",
                icon: ClipboardCheck
            },
            {
                id: "target",
                title: "Hedefini Belirle",
                description: "Hangi üniversite ve bölümü hayal ediyorsun?",
                isCompleted: targetDone,
                link: "/onboarding/target",
                icon: Target
            },
            {
                id: "net",
                title: "İlk Deneme Netini Gir",
                description: "Mevcut durumunu gör ve farkı kapatmaya başla.",
                isCompleted: netDone,
                link: "/dashboard/net-takip",
                icon: BarChart3
            },
            {
                id: "friends",
                title: "3 Arkadaşını Davet Et",
                description: "Rakiplerinle düello yap ve motivasyonunu artır.",
                isCompleted: friendsDone,
                link: "/dashboard/social",
                icon: Users
            }
        ];

        setItems(checklist);
        const completedCount = checklist.filter(i => i.isCompleted).length;
        setProgress((completedCount / checklist.length) * 100);
        setIsAllCompleted(completedCount === checklist.length);
    };

    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        if (isAllCompleted && items.length > 0) {
            setShowSuccess(true);
            const timer = setTimeout(() => {
                const hiddenChecklists = JSON.parse(localStorage.getItem("hidden_checklists") || "[]");
                localStorage.setItem("hidden_checklists", JSON.stringify([...hiddenChecklists, "main"]));
                setShowSuccess(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isAllCompleted]);

    const isHidden = typeof window !== 'undefined' && JSON.parse(localStorage.getItem("hidden_checklists") || "[]").includes("main");

    if (isHidden) return null;

    if (showSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-3xl bg-green-500 text-white text-center shadow-xl shadow-green-200 mb-6"
            >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Harika İş! 🎉</h3>
                <p className="text-sm opacity-90">Tüm hazırlık adımlarını tamamladın. Artık tam kapasiteyle çalışmaya hazırsın!</p>
            </motion.div>
        );
    }

    if (isAllCompleted && items.length > 0) return null;

    return (
        <Card className="border-none shadow-xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white overflow-hidden">
            <CardHeader className="pb-4">
                <div className="flex justify-between items-center mb-2">
                    <CardTitle className="text-xl font-bold">Hazırlık Listesi</CardTitle>
                    <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
                        %{Math.round(progress)} Tamamlandı
                    </span>
                </div>
                <CardDescription className="text-indigo-100">
                    Kariyer yolculuğuna başlamak için bu adımları tamamla.
                </CardDescription>
                <Progress value={progress} className="h-2 bg-white/20 mt-4 overflow-hidden" />
            </CardHeader>
            <CardContent className="space-y-3">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className={`flex items-center gap-4 p-3 rounded-xl transition-all ${item.isCompleted ? 'bg-white/10 opacity-70' : 'bg-white/5 hover:bg-white/10'
                            }`}
                    >
                        <div className={`p-2 rounded-lg ${item.isCompleted ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white'}`}>
                            <item.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className={`text-sm font-bold ${item.isCompleted ? 'line-through text-white/50' : 'text-white'}`}>
                                {item.title}
                            </h4>
                            <p className="text-xs text-indigo-100/70 truncate">{item.description}</p>
                        </div>
                        {item.isCompleted ? (
                            <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                        ) : (
                            <Link href={item.link}>
                                <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-white/20">
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
