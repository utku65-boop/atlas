"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { PaymentModal } from "@/components/payment-modal";
import { ScheduleWidget } from "@/components/dashboard/schedule-widget";
import { SmartCalendar } from "@/components/dashboard/smart-calendar";
import { TargetComparisonCard } from "@/components/dashboard/net-comparison";
import { PomodoroTimer } from "@/components/dashboard/pomodoro-timer";
import { Leaderboard } from "@/components/dashboard/leaderboard";
import { OnboardingChecklist } from "@/components/dashboard/onboarding-checklist";
import { NotificationCenter } from "@/components/dashboard/notification-center";
import { TrendingUp, Lock, Unlock, AlertTriangle, BookOpen, ChevronRight, Check, X, ArrowUpRight, ArrowRight, User, Award, PlusCircle, CalendarClock, Target, Zap, Coffee, Lightbulb, Clock, Bell, Brain } from "lucide-react";
import { Department } from "@/lib/data/departments";
import { NetCounts } from "@/lib/score-calculator";
import { supabase } from "@/lib/supabase";

// Countdown Component
function CountdownTimer() {
    const [daysLeft, setDaysLeft] = useState(0);

    useEffect(() => {
        // YKS 2026 Date (Estimate: June 20, 2026)
        const yksDate = new Date("2026-06-20T10:00:00").getTime();

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const diff = Math.max(0, Math.ceil((yksDate - now) / (1000 * 60 * 60 * 24)));
            setDaysLeft(diff);
        }, 1000 * 60); // Update every minute is enough

        // Initial set
        setDaysLeft(Math.max(0, Math.ceil((yksDate - new Date().getTime()) / (1000 * 60 * 60 * 24))));

        return () => clearInterval(timer);
    }, []);

    return (
        <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-none shadow-md overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <CardContent className="p-6 flex items-center justify-between relative z-10">
                <div>
                    <p className="text-indigo-100 text-sm font-medium mb-1">YKS 2026'ya Kalan</p>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-4xl font-black tracking-tight">{daysLeft}</h3>
                        <span className="text-lg font-medium text-indigo-200">Gün</span>
                    </div>
                </div>
                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                    <CalendarClock className="w-8 h-8 text-white" />
                </div>
            </CardContent>
        </Card>
    );
}

// Helper to estimate required nets based on score and type (Copied to avoid refactoring risk for now)
const estimateRequiredNets = (targetScore: number, type: 'SAY' | 'EA' | 'SOZ' | 'DIL' | undefined): NetCounts => {
    // Base assumptions for 2024 coefficients (approximate)
    const difficulty = Math.max(0, (targetScore - 200) / 360); // 0 to 1 scale roughly

    const goals: NetCounts = {
        tyt_turkce: Math.min(40, 25 + (15 * difficulty)),
        tyt_sosyal: Math.min(20, 10 + (10 * difficulty)),
        tyt_matematik: Math.min(40, 15 + (25 * difficulty)),
        tyt_fen: Math.min(20, 5 + (15 * difficulty)),
        ayt_matematik: 0,
        ayt_fizik: 0,
        ayt_kimya: 0,
        ayt_biyoloji: 0,
        ayt_edebiyat: 0,
        ayt_tarih1: 0,
        ayt_cografya1: 0,
        ayt_tarih2: 0,
        ayt_cografya2: 0,
        ayt_felsefe: 0,
        ayt_din: 0,
        ydt: 0,
        obp: 80 // Default OBP
    };

    if (type === 'SAY') {
        goals.ayt_matematik = Math.min(40, 15 + (25 * difficulty));
        goals.ayt_fizik = Math.min(14, 5 + (9 * difficulty));
        goals.ayt_kimya = Math.min(13, 5 + (8 * difficulty));
        goals.ayt_biyoloji = Math.min(13, 5 + (8 * difficulty));
    } else if (type === 'EA') {
        goals.ayt_matematik = Math.min(40, 15 + (25 * difficulty));
        goals.ayt_edebiyat = Math.min(24, 10 + (14 * difficulty));
        goals.ayt_tarih1 = Math.min(10, 4 + (6 * difficulty));
        goals.ayt_cografya1 = Math.min(6, 2 + (4 * difficulty));
    } else if (type === 'SOZ') {
        goals.ayt_edebiyat = Math.min(24, 12 + (12 * difficulty));
        goals.ayt_tarih1 = Math.min(10, 5 + (5 * difficulty));
        goals.ayt_cografya1 = Math.min(6, 3 + (3 * difficulty));
        goals.ayt_tarih2 = Math.min(11, 4 + (7 * difficulty));
        goals.ayt_cografya2 = Math.min(11, 4 + (7 * difficulty));
        goals.ayt_felsefe = Math.min(12, 4 + (8 * difficulty));
        goals.ayt_din = Math.min(6, 2 + (4 * difficulty));
    }

    return goals;
};

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<{ name: string } | null>(null);
    const [target, setTarget] = useState<Department | null>(null);
    const [selectedUniversity, setSelectedUniversity] = useState<any | null>(null); // UniversityTarget
    const [currentNets, setCurrentNets] = useState<NetCounts | null>(null);
    const [targetNets, setTargetNets] = useState<NetCounts | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isNotifOpen, setIsNotifOpen] = useState(false);

    // Gamification State
    const [xp, setXp] = useState(0);
    const [level, setLevel] = useState(1);
    const [streak, setStreak] = useState(1);
    const [dailyAdvice, setDailyAdvice] = useState("");

    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                // 1. Load User Info
                let currentUser = null;
                if (supabase) {
                    const { data: { session } } = await supabase.auth.getSession();
                    if (session?.user) {
                        const displayName = session.user.user_metadata?.name || session.user.email?.split('@')[0] || "Öğrenci";
                        currentUser = { name: displayName, ...session.user };
                    }
                }

                if (!currentUser) {
                    router.push("/login");
                    return;
                }

                setUser(currentUser);

                // 2. Load Target & University
                const savedTarget = localStorage.getItem("targetDepartment");
                let parsedTarget = null;
                if (savedTarget) {
                    parsedTarget = JSON.parse(savedTarget);
                    setTarget(parsedTarget);

                    const uniStr = localStorage.getItem("targetUniversity");
                    if (uniStr) setSelectedUniversity(JSON.parse(uniStr));
                } else {
                    // Allow viewing dashboard with empty state instead of direct redirect
                    // router.push("/onboarding/target?direct=true");
                }

                // 3. Load Current Nets
                const savedNets = localStorage.getItem("currentNets");
                if (savedNets) {
                    const parsedNets = JSON.parse(savedNets);
                    setCurrentNets(parsedNets);
                }

                // 4. Load Target Nets
                const savedTargetNets = localStorage.getItem("targetNets");
                if (savedTargetNets) {
                    setTargetNets(JSON.parse(savedTargetNets));
                } else if (parsedTarget) {
                    const targetScore = parsedTarget.minScore || 0;
                    const estimated = estimateRequiredNets(targetScore, parsedTarget.scoreType);
                    setTargetNets(estimated);
                }

                // 5. Load Gamification Data
                const savedXp = parseInt(localStorage.getItem("user_xp") || "150");
                setXp(savedXp);
                setLevel(Math.floor(savedXp / 500) + 1);

                // 6. Streak Logic
                const today = new Date().toISOString().split('T')[0];
                const lastLogin = localStorage.getItem("last_login_date");
                let currentStreak = parseInt(localStorage.getItem("user_streak") || "1");

                if (lastLogin) {
                    const lastDate = new Date(lastLogin);
                    const diffDays = Math.floor((new Date(today).getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

                    if (diffDays === 1) {
                        currentStreak += 1;
                        localStorage.setItem("user_streak", currentStreak.toString());
                    } else if (diffDays > 1) {
                        currentStreak = 1;
                        localStorage.setItem("user_streak", "1");
                    }
                }
                localStorage.setItem("last_login_date", today);
                setStreak(currentStreak);

                const advices = [
                    "Bugün 20 paragraf sorusu çözerek güne zinde başla! 📖",
                    "Matematik'te yapamadığın soruları biriktirme, hemen çözümüne bak! 🔥",
                    "Deneme çözmekten korkma, hataların en büyük öğretmenin. 📈",
                    `${parsedTarget?.name || "Hedefin"} için bugün 1 saat odaklanmış çalışma fark yaratır!`,
                    "UYARI: Sosyal netlerini hafife alma, oradaki 1 net seni binlerce kişinin önüne geçirir.",
                    "Uyku düzenin en iyi ders çalışma programın kadar önemlidir.😴",
                    "Analizlere göre Fen kısmında biraz daha hızlanman gerekebilir."
                ];
                setDailyAdvice(advices[Math.floor(Math.random() * advices.length)]);

            } catch (error) {
                console.error("Dashboard data load error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadDashboardData();
    }, [router]);

    const userName = user?.name || "Öğrenci";

    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({ name: "", price: "" });

    const openPayment = (name: string, price: string) => {
        setSelectedProduct({ name, price });
        setIsPaymentOpen(true);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col font-sans bg-gray-50">
                <Header />
                <main className="container py-8 flex-1">
                    <div className="animate-pulse space-y-8">
                        <div className="h-10 bg-gray-200 rounded w-1/3 mb-8"></div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-6">
                                <div className="h-96 bg-gray-200 rounded-xl"></div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="h-24 bg-gray-200 rounded-lg"></div>
                                    <div className="h-24 bg-gray-200 rounded-lg"></div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="h-40 bg-gray-200 rounded-xl"></div>
                                <div className="h-80 bg-gray-200 rounded-xl"></div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col font-sans bg-gray-50">
            <Header />

            <main className="container py-8 flex-1">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Hoş geldin, {userName} 👋</h1>
                        <p className="text-gray-500">Hedefine ulaşmak için bugün çalışmaya başla.</p>
                    </div>
                    <div className="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-indigo-50">
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Seviye {level}</span>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-black text-gray-700">{xp % 500} / 500 XP</span>
                                <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(xp % 500) / 5}%` }}
                                        className="h-full bg-indigo-500"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                            <Zap className="w-6 h-6 fill-current" />
                        </div>
                    </div>
                    {/* Streak Widget */}
                    <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100 shadow-sm ml-auto md:ml-0">
                        <Coffee className="w-4 h-4 text-amber-600" />
                        <span className="text-xs font-bold text-amber-800 tracking-tight">{streak} Günlük Seri</span>
                    </div>
                </div>

                {/* Daily Coach / Motivation Banner */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-4 bg-white border border-indigo-100 rounded-2xl shadow-sm flex items-center gap-4 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <Lightbulb className="w-24 h-24" />
                    </div>
                    <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center shrink-0">
                        <Coffee className="w-6 h-6" />
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-900 text-sm">Günün Koç Tavsiyesi</h4>
                        <p className="text-gray-600 text-sm italic">"{dailyAdvice}"</p>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <Link href="/blog" className="hidden md:block">
                            <Button variant="ghost" size="sm" className="text-xs text-indigo-600 hover:bg-indigo-50">
                                Tüm Yazıları Gör
                            </Button>
                        </Link>
                        <Button variant="ghost" size="sm" className="text-xs text-indigo-300 hover:bg-indigo-50" onClick={() => setDailyAdvice("Yeni tavsiye yükleniyor...")}>
                            Farklı Bir Tavsiye
                        </Button>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Target & Status */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Target Comparison Card */}
                        {!target ? (
                            <Card className="border-none shadow-md bg-white p-12 flex flex-col items-center text-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-indigo-50/50 backdrop-blur-[2px] z-10"></div>
                                <div className="relative z-20 flex flex-col items-center">
                                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl mb-6 group-hover:scale-110 transition-transform">
                                        <Lock className="w-8 h-8 text-indigo-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Hedef Analizi Kilitli</h3>
                                    <p className="text-gray-500 max-w-sm mb-8">
                                        Hedef üniversite ve bölümünü belirleyerek bu analizi aktif hale getir.
                                    </p>
                                    <Link href="/onboarding/target">
                                        <Button className="bg-indigo-600 hover:bg-indigo-700 h-12 px-8 rounded-2xl font-bold shadow-lg shadow-indigo-100">
                                            Hemen Hedef Belirle
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        ) : (
                            <TargetComparisonCard targetDepartment={target} selectedUniversity={selectedUniversity} currentNets={currentNets} />
                        )}

                        {/* Productive Actions Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Link href="/dashboard/pomodoro" className="block group">
                                <Card className="border-none shadow-md bg-white hover:shadow-xl transition-all h-full p-6 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                        <Brain className="w-24 h-24 text-indigo-600" />
                                    </div>
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-4">
                                            <Brain className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">Derin Odaklanma</h3>
                                        <p className="text-sm text-gray-500 mb-6">Dikkat dağıtıcıları engelle ve XP çarpanı kazan.</p>
                                        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 font-bold h-12 rounded-2xl">SEANSI BAŞLAT</Button>
                                    </div>
                                </Card>
                            </Link>

                            <Link href="/dashboard/net-takip" className="block">
                                <Card className="border-none shadow-md bg-white hover:bg-gray-50 transition-colors cursor-pointer group h-full">
                                    <CardContent className="p-6 flex items-center space-x-4">
                                        <div className="p-3 bg-green-100 text-green-600 rounded-lg group-hover:bg-green-600 group-hover:text-white transition-colors">
                                            <TrendingUp className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">Detaylı Grafikler</h3>
                                            <p className="text-sm text-gray-500">Ders bazlı ilerlemeni gör</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>

                            <Link href="/blog" className="block">
                                <Card className="border-none shadow-md bg-white hover:bg-gray-50 transition-colors cursor-pointer group h-full">
                                    <CardContent className="p-6 flex items-center space-x-4">
                                        <div className="p-3 bg-amber-100 text-amber-600 rounded-lg group-hover:bg-amber-600 group-hover:text-white transition-colors">
                                            <BookOpen className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-900">Başarı Kütüphanesi</h3>
                                            <p className="text-sm text-gray-500">Hedefine özel içerikler</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Sidebar Widgets */}
                    <div className="space-y-6">
                        {/* Onboarding Checklist */}
                        <OnboardingChecklist />

                        {/* Countdown Widget */}
                        <CountdownTimer />

                        {/* Smart Calendar Widget */}
                        {!target ? (
                            <Card className="border-none shadow-md bg-white border border-indigo-50 p-6 opacity-60">
                                <div className="flex items-center gap-3 mb-4">
                                    <CalendarClock className="w-5 h-5 text-gray-400" />
                                    <h3 className="font-bold text-gray-400 italic">Program (Hedef Bekleniyor)</h3>
                                </div>
                                <div className="space-y-3">
                                    {[1, 2].map(i => (
                                        <div key={i} className="h-12 bg-gray-50 rounded-xl" />
                                    ))}
                                </div>
                            </Card>
                        ) : (
                            <SmartCalendar />
                        )}

                        {/* Leaderboard Widget */}
                        <Leaderboard />

                        {/* Active Package */}
                        <Card className="border-none shadow-md bg-gradient-to-br from-indigo-900 to-slate-900 text-white">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Award className="h-5 w-5 text-yellow-400" /> Üyelik Durumu
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-300">Mevcut Plan</p>
                                    <p className="text-2xl font-bold text-white">Ücretsiz Hesap</p>
                                </div>
                                <div className="pt-2">
                                    <p className="text-xs text-gray-400 mb-2">Kalan Analiz Hakkı: 1</p>
                                    <Progress value={33} className="h-1.5 bg-gray-700" />
                                </div>
                                <Link href="/dashboard/profile">
                                    <Button
                                        className="w-full bg-white text-gray-900 hover:bg-gray-100 font-bold mt-2"
                                    >
                                        Premium'a Yükselt 🚀
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        {/* Update Target - The Missing Link */}
                        <Card className="border-none shadow-md bg-white border border-indigo-100">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                        <Target className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-bold text-gray-900">Hedefini mi Değiştirdin?</h3>
                                </div>
                                <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                                    Fikrini değiştirdiysen veya yeni bir bölüm keşfettiysen hedefini dilediğin zaman güncelleyebilirsin.
                                </p>
                                <Link href="/onboarding/target?direct=true">
                                    <Button variant="outline" className="w-full border-indigo-200 text-indigo-700 hover:bg-indigo-50 text-xs h-9">
                                        Hedefimi Güncelle
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            <Footer />
            <PaymentModal
                isOpen={isPaymentOpen}
                onClose={() => setIsPaymentOpen(false)}
                productName={selectedProduct.name}
                price={selectedProduct.price}
            />
        </div>
    );
}
