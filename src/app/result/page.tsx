"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";
import { findBestMatches, RiasecScore } from "@/lib/algorithm";
import { Department } from "@/lib/data/departments";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { TrendingUp, Lock, Unlock, AlertTriangle, BookOpen, ChevronRight, Check, X, ArrowUpRight, ArrowRight, User } from "lucide-react";
import { motion } from "framer-motion";

// Gradient helper
function getGradient(name: string) {
    const colors = [
        "from-blue-500 to-indigo-600",
        "from-purple-500 to-pink-600",
        "from-emerald-500 to-teal-600",
        "from-orange-500 to-red-600",
        "from-cyan-500 to-blue-600",
        "from-rose-500 to-red-600"
    ];
    return colors[name.length % colors.length];
}

function ResultContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [scores, setScores] = useState<RiasecScore | null>(null);
    const [matches, setMatches] = useState<{ department: Department; matchScore: number }[]>([]);
    const [isPremium, setIsPremium] = useState(false);

    // Tool state
    const [selectedDeptId, setSelectedDeptId] = useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string>("istanbul");
    const [projectionData, setProjectionData] = useState<any[]>([]);
    const [userName, setUserName] = useState<string>("");

    useEffect(() => {
        const r = Number(searchParams.get("r"));
        const i = Number(searchParams.get("i"));
        const a = Number(searchParams.get("a"));
        const s = Number(searchParams.get("s"));
        const e = Number(searchParams.get("e"));
        const c = Number(searchParams.get("c"));

        const name = searchParams.get("name") || "";
        const city = searchParams.get("city") || "istanbul";
        setUserName(name);
        setSelectedCity(city);

        let currentScores: RiasecScore | null = null;

        // If query params are present (at least one non-zero)
        if (r || i || a || s || e || c) {
            currentScores = { R: r, I: i, A: a, S: s, E: e, C: c };
        } else {
            // Fallback to localStorage
            const savedScores = localStorage.getItem("tempScores");
            if (savedScores) {
                try {
                    currentScores = JSON.parse(savedScores);
                } catch (e) { console.error("Error parsing saved scores", e); }
            }
        }

        if (currentScores) {
            setScores(currentScores);
            const bestMatches = findBestMatches(currentScores);
            setMatches(bestMatches);
            if (bestMatches.length > 0) {
                setSelectedDeptId(bestMatches[0].department.id);
            }
        } else {
            // No scores found anywhere, redirect to home or test
            router.push("/");
        }
    }, [searchParams, router]);

    // Update projection data when dept or city changes
    useEffect(() => {
        if (!selectedDeptId || matches.length === 0) return;

        const dept = matches.find(m => m.department.id === selectedDeptId)?.department || matches[0].department;

        // City multiplier (Mock)
        const cityMultipliers: { [key: string]: number } = {
            "istanbul": 1.2,
            "ankara": 1.1,
            "izmir": 1.05,
            "diger": 0.9
        };
        const multiplier = cityMultipliers[selectedCity] || 1.0;

        const data = [
            { name: 'Başlangıç', maas: Math.round(dept.salaryProjection.entry * multiplier) },
            { name: '1. Yıl', maas: Math.round(dept.salaryProjection.entry * 1.1 * multiplier) },
            { name: '3. Yıl', maas: Math.round(dept.salaryProjection.experienced * 0.9 * multiplier) },
            { name: '5. Yıl', maas: Math.round(dept.salaryProjection.experienced * multiplier) },
            { name: '10. Yıl', maas: Math.round(dept.salaryProjection.senior * multiplier) },
        ];
        setProjectionData(data);
    }, [selectedDeptId, selectedCity, matches]);


    if (!scores) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="animate-pulse text-indigo-600 font-semibold">Sonuçlarınız Hazırlanıyor...</div></div>;

    const chartData = [
        { subject: "Gerçekçi (R)", A: scores.R, fullMark: 100 },
        { subject: "Araştırmacı (I)", A: scores.I, fullMark: 100 },
        { subject: "Sanatçı (A)", A: scores.A, fullMark: 100 },
        { subject: "Sosyal (S)", A: scores.S, fullMark: 100 },
        { subject: "Girişimci (E)", A: scores.E, fullMark: 100 },
        { subject: "Düzenli (C)", A: scores.C, fullMark: 100 },
    ];

    const handlePremiumPurchase = () => {
        if (confirm("Premium Analiz Raporunu 29.99 TL karşılığında satın almak istiyor musunuz?")) {
            setIsPremium(true);
        }
    };

    const topMatches = matches.slice(0, 3);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans pb-32">
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm px-4 py-3 border-b border-gray-100">
                <div className="container mx-auto flex justify-between items-center max-w-2xl">
                    <h1 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                        {userName ? `Sn. ${userName}` : 'Kariyer Raporu'}
                    </h1>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 z-50 relative cursor-pointer"
                        onClick={() => {
                            localStorage.clear();
                            window.location.href = "/";
                        }}
                    >
                        Çıkış
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-4 pt-6 max-w-2xl space-y-8">

                {/* 1. Radar Chart */}
                <Card className="border-none shadow-sm bg-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-center text-gray-800">Kariyer Profiliniz</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                                <PolarGrid stroke="#e5e7eb" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 10 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar name="Puanınız" dataKey="A" stroke="#4f46e5" strokeWidth={2} fill="#4f46e5" fillOpacity={0.5} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* 2. Top Matches (FREE - Full Details) */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-gray-900 px-1">Tavsiye Edilen Bölümler (Ücretsiz)</h2>
                    {topMatches.map((match, index) => (
                        <Card key={match.department.id} className="overflow-hidden border-none shadow-md group">
                            <div className={`h-24 bg-gradient-to-r ${getGradient(match.department.name)} relative p-4 flex justify-between items-end`}>
                                <div className="text-white">
                                    <div className="text-xs font-medium opacity-90 mb-1">#{index + 1} ÖNERİ</div>
                                    <h3 className="text-2xl font-bold">{match.department.name}</h3>
                                </div>
                                <div className="bg-white/90 text-indigo-600 font-bold px-3 py-1 rounded-full text-sm shadow-sm">
                                    %{match.matchScore} Uyum
                                </div>
                            </div>
                            <CardContent className="p-5 space-y-5">
                                <p className="text-gray-600 text-sm leading-relaxed">{match.department.description}</p>

                                {/* Match Explanation Section */}
                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    <h4 className="text-xs font-bold text-slate-700 uppercase mb-3 flex items-center">
                                        <TrendingUp className="w-3 h-3 mr-1" /> Neden Bu Bölüm?
                                    </h4>
                                    <div className="space-y-3">
                                        {/* Show top 3 traits comparison */}
                                        {match.department.codes.map(code => {
                                            const scoreKey = code as keyof RiasecScore;
                                            const userVal = scores ? scores[scoreKey] : 0;
                                            const deptVal = match.department.scores[scoreKey];
                                            const traitNames: { [key: string]: string } = { R: 'Gerçekçi', I: 'Araştırmacı', A: 'Sanatçı', S: 'Sosyal', E: 'Girişimci', C: 'Düzenli' };

                                            // Calculate simple status
                                            const diff = userVal - deptVal;
                                            let statusText = "Tam Uyum";
                                            let statusColor = "text-green-600";
                                            if (Math.abs(diff) < 15) { statusText = "Mükemmel"; statusColor = "text-green-600"; }
                                            else if (diff > 0) { statusText = "Yüksek Potansiyel"; statusColor = "text-blue-600"; }
                                            else { statusText = "Geliştirilmeli"; statusColor = "text-orange-600"; }

                                            return (
                                                <div key={code} className="text-xs">
                                                    <div className="flex justify-between mb-1">
                                                        <span className="font-semibold text-gray-700">{traitNames[code]} ({code})</span>
                                                        <span className={`font-bold ${statusColor}`}>{statusText}</span>
                                                    </div>
                                                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden flex">
                                                        {/* User Score Marker */}
                                                        <div className="h-full bg-indigo-500 rounded-full opacity-70" style={{ width: `${userVal}%` }} />
                                                        {/* Dept Requirement Marker (Overlay approach is tricky with weak CSS, using simple bar for now) */}
                                                    </div>
                                                    <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                                                        <span>Sen: {userVal}</span>
                                                        <span>Bölüm: {deptVal}</span>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <p className="text-[10px] text-gray-500 mt-3 italic">
                                        Bu bölüm, senin <strong>{match.department.codes.map(c => ({ R: 'Gerçekçi', I: 'Araştırmacı', A: 'Sanatçı', S: 'Sosyal', E: 'Girişimci', C: 'Düzenli' }[c])).join(', ')}</strong> yönlerinle örtüşüyor.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <div className="bg-indigo-50 p-3 rounded-lg">
                                        <h4 className="text-xs font-bold text-indigo-800 uppercase mb-2">Kariyer Yolları</h4>
                                        <ul className="text-xs text-indigo-700 space-y-1">
                                            {match.department.careerPaths.map(p => <li key={p}>• {p}</li>)}
                                        </ul>
                                    </div>
                                    <div className="bg-purple-50 p-3 rounded-lg">
                                        <h4 className="text-xs font-bold text-purple-800 uppercase mb-2">Örnek Dersler</h4>
                                        <p className="text-xs text-purple-700 leading-relaxed">
                                            {match.department.courses.join(", ")}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* 3. PREMIUM SECTION STARTS HERE */}
                <div className="pt-4 border-t-2 border-dashed border-gray-200">
                    <div className="flex items-center space-x-2 mb-6">
                        <div className="bg-yellow-100 p-2 rounded-full"><Unlock className="w-5 h-5 text-yellow-600" /></div>
                        <h2 className="text-xl font-bold text-gray-900">Premium Analiz Araçları</h2>
                    </div>

                    {/* Feature 1: Career Projection Tool */}
                    <Card className={`mb-6 border-2 border-indigo-100 overflow-hidden relative ${!isPremium ? 'opacity-90' : ''}`}>
                        <CardHeader className="bg-slate-50 border-b border-slate-100 pb-3">
                            <div className="flex items-center space-x-2">
                                <TrendingUp className="w-5 h-5 text-green-600" />
                                <CardTitle className="text-base">Maaş & Kariyer Projeksiyonu</CardTitle>
                            </div>
                            <CardDescription className="text-xs">Devlet vs Özel, Şehir ve Deneyime göre tahmini gelir değişimi.</CardDescription>
                        </CardHeader>

                        <CardContent className="p-4 relative">
                            {/* Controls */}
                            <div className="grid grid-cols-2 gap-3 mb-6">
                                <div>
                                    <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Bölüm Seç</label>
                                    <Select value={selectedDeptId} onValueChange={setSelectedDeptId} disabled={!isPremium}>
                                        <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            {topMatches.map(m => (
                                                <SelectItem key={m.department.id} value={m.department.id}>{m.department.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Şehir Seç</label>
                                    <Select value={selectedCity} onValueChange={setSelectedCity} disabled={!isPremium}>
                                        <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="istanbul">İstanbul</SelectItem>
                                            <SelectItem value="ankara">Ankara</SelectItem>
                                            <SelectItem value="izmir">İzmir</SelectItem>
                                            <SelectItem value="diger">Diğer</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Chart Area */}
                            <div className="h-[200px] w-full text-xs">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={projectionData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 10 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 10 }} tickFormatter={(val) => `₺${val / 1000}k`} />
                                        <Tooltip
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            formatter={(val: any) => [`₺${Number(val).toLocaleString('tr-TR')}`, "Tahmini Maaş"]}
                                        />
                                        <Line type="monotone" dataKey="maas" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, fill: '#4f46e5' }} activeDot={{ r: 6 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Lock Overlay */}
                            {!isPremium && (
                                <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center z-10">
                                    <Lock className="w-8 h-8 text-gray-400 mb-2" />
                                    <p className="text-sm font-semibold text-gray-800 mb-2">Bu Projeksiyon Kilitli</p>
                                    <p className="text-xs text-gray-500 mb-4">Gelecekteki tahmini kazancınızı görmek için kilidi açın.</p>
                                    <Button onClick={handlePremiumPurchase} size="sm" className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white border-none shadow-md">
                                        Kilidi Aç (₺29.99)
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Feature 2 & 3: AI Risk & YKS Focus */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* AI Risk Card */}
                        <Card className={`border-none shadow-md bg-red-50 relative overflow-hidden ${!isPremium ? 'opacity-90' : ''}`}>
                            <CardContent className="p-4">
                                <div className="flex items-center mb-2 text-red-700">
                                    <AlertTriangle className="w-4 h-4 mr-2" />
                                    <h3 className="font-bold text-sm">Yapay Zeka Risk Raporu</h3>
                                </div>
                                <div className="relative">
                                    <p className="text-xs text-red-600/80 mb-2">
                                        Seçtiğiniz {matches[0]?.department.name} bölümü için AI otomasyon riski:
                                    </p>
                                    <div className="text-2xl font-black text-red-800 mb-1">
                                        %{matches[0]?.department.aiRiskScore}
                                    </div>
                                    <div className="h-2 w-full bg-red-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-red-600" style={{ width: `${matches[0]?.department.aiRiskScore}%` }} />
                                    </div>

                                    {!isPremium && <div className="absolute inset-0 bg-red-50/80 backdrop-blur-[1px] flex items-center justify-center">
                                        <Lock className="w-5 h-5 text-red-400" />
                                    </div>}
                                </div>
                            </CardContent>
                        </Card>

                        {/* YKS Focus Card */}
                        <Card className={`border-none shadow-md bg-blue-50 relative overflow-hidden ${!isPremium ? 'opacity-90' : ''}`}>
                            <CardContent className="p-4">
                                <div className="flex items-center mb-2 text-blue-700">
                                    <BookOpen className="w-4 h-4 mr-2" />
                                    <h3 className="font-bold text-sm">YKS Odak Tavsiyesi</h3>
                                </div>
                                <div className="relative">
                                    <p className="text-xs text-blue-600/80 mb-2">
                                        Kazanmak için "net" artırmanız gereken kritik konular:
                                    </p>
                                    <ul className="text-sm font-semibold text-blue-900 space-y-1">
                                        {matches[0]?.department.yksFocusAttributes.map(f => (
                                            <li key={f} className="flex items-center"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />{f}</li>
                                        ))}
                                    </ul>

                                    {!isPremium && <div className="absolute inset-0 bg-blue-50/80 backdrop-blur-[1px] flex items-center justify-center">
                                        <Lock className="w-5 h-5 text-blue-400" />
                                    </div>}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* NEW: App Upsell (Mentoring) */}
                    <Card className="bg-gradient-to-r from-gray-900 to-slate-800 text-white border-none shadow-xl mt-8">
                        <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                            <div className="bg-white/10 p-3 rounded-full">
                                <User className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-1">Kişisel Mentorun Hazır!</h3>
                                <p className="text-gray-300 text-sm max-w-sm mx-auto">
                                    {matches[0].department.name} bölümünü kazanman için sana özel ders programı ve koçluk desteği uygulamamızda.
                                </p>
                            </div>
                            <Button className="bg-white text-gray-900 hover:bg-gray-100 w-full max-w-xs font-bold shadow-lg">
                                Uygulamayı Ücretsiz İndir
                            </Button>
                            <p className="text-[10px] text-gray-500">App Store & Play Store</p>
                        </CardContent>
                    </Card>

                    {/* Navigation Bridge: The Missing Link */}
                    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t z-40">
                        <div className="container mx-auto max-w-2xl flex items-center justify-between gap-4">
                            <div className="hidden sm:block">
                                <p className="font-bold text-gray-900 leading-none">Analiz Tamam! 🏁</p>
                                <p className="text-xs text-gray-500 mt-1">Şimdi bu bölümlerden birini hedef seçelim.</p>
                            </div>
                            <Link href="/onboarding/target" className="w-full sm:w-auto">
                                <Button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 px-8 shadow-lg shadow-indigo-200">
                                    Hedefimi Belirle <ArrowRight className="ml-2 w-5 h-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Footer CTA (Old Premium removed/replaced by Lock buttons above) */}
                </div>
            </main>
        </div>
    );
}

export default function ResultPage() {
    return (
        <Suspense fallback={<div className="p-8 text-center">Yükleniyor...</div>}>
            <ResultContent />
        </Suspense>
    );
}

