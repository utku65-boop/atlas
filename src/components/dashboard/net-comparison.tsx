"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Target, TrendingUp, CheckCircle, RefreshCw, ChevronRight, Edit3, PlusCircle } from "lucide-react";
import { NetCalculator } from "@/components/onboarding/net-calculator";
import { NetCounts, calculateYKS } from "@/lib/score-calculator";
import { Department, UniversityTarget } from "@/lib/data/departments";
import Link from "next/link";
import { useState, useEffect } from "react";

interface TargetComparisonCardProps {
    targetDepartment: Department | null;
    selectedUniversity: UniversityTarget | null; // Specific university selection
    currentNets: NetCounts | null;
}

// Helper to estimate required nets based on score and type
// Helper to estimate required nets based on score and type
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

export function TargetComparisonCard({ targetDepartment, selectedUniversity, currentNets }: TargetComparisonCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
    const [customGoals, setCustomGoals] = useState<NetCounts | null>(null);

    const handleNetSave = (nets: NetCounts) => {
        localStorage.setItem("currentNets", JSON.stringify(nets));
        window.location.reload(); // Simple reload to update all components
    };

    // Initial load and estimation
    const targetScore = selectedUniversity ? selectedUniversity.score : (targetDepartment ? targetDepartment.minScore : 0);
    const estimatedGoals = targetDepartment ? estimateRequiredNets(targetScore, targetDepartment.scoreType) : null;

    useEffect(() => {
        const saved = localStorage.getItem("targetNets");
        if (saved) {
            try {
                setCustomGoals(JSON.parse(saved));
            } catch (e) {
                setCustomGoals(estimatedGoals);
            }
        } else {
            setCustomGoals(estimatedGoals);
        }
    }, [targetDepartment, selectedUniversity]);

    // Robust fallback for activeGoals (Flat Structure)
    const defaultStructure: NetCounts = {
        tyt_turkce: 0, tyt_sosyal: 0, tyt_matematik: 0, tyt_fen: 0,
        ayt_matematik: 0, ayt_fizik: 0, ayt_kimya: 0, ayt_biyoloji: 0,
        ayt_edebiyat: 0, ayt_tarih1: 0, ayt_cografya1: 0,
        ayt_tarih2: 0, ayt_cografya2: 0, ayt_felsefe: 0, ayt_din: 0,
        ydt: 0, obp: 0
    };

    const [tempGoals, setTempGoals] = useState<NetCounts | null>(null);

    const rawGoals = tempGoals || customGoals || estimatedGoals || defaultStructure;

    // Utilize flat structure directly
    const activeGoals: NetCounts = {
        ...defaultStructure,
        ...rawGoals
    };

    // Calculate score based on active goals
    const currentProjectedScore = targetDepartment ? calculateYKS(activeGoals, targetDepartment.scoreType) : 0;
    const scoreDiff = currentProjectedScore - targetScore;
    const isGoalMet = currentProjectedScore >= targetScore;

    // Alias for backward compatibility if I introduced safeGoals elsewhere
    const safeGoals = activeGoals;

    const handleSave = () => {
        const finalGoals = tempGoals || customGoals || estimatedGoals || defaultStructure;
        localStorage.setItem("targetNets", JSON.stringify(finalGoals));
        setCustomGoals(finalGoals);
        setIsEditing(false);
    };

    const handleReset = () => {
        setCustomGoals(estimatedGoals);
        setTempGoals(null);
        localStorage.removeItem("targetNets");
        setIsEditing(false);
    };

    const updateGoal = (key: keyof NetCounts, value: number) => {
        setTempGoals((prev) => ({
            ...(prev || customGoals || estimatedGoals || defaultStructure),
            [key]: value
        }));
    };

    if (!targetDepartment || !activeGoals) {
        return (
            <Card className="shadow-sm border-dashed border-2 border-gray-300 bg-gray-50">
                <CardContent className="p-8 text-center">
                    <Target className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-700">Henüz bir hedef belirlemedin</h3>
                    <p className="text-sm text-gray-500 mb-4">Hedef belirleyerek ilerlemeni takip et.</p>
                    <Link href="/onboarding/target">
                        <Button variant="outline">Hedef Belirle</Button>
                    </Link>
                </CardContent>
            </Card>
        );
    }

    const targetName = selectedUniversity ? `${selectedUniversity.name} - ${targetDepartment.name}` : targetDepartment.name;

    const NetRow = ({ label, current, target, color, subjectKey }: { label: string, current: number, target: number, color: string, subjectKey: keyof NetCounts }) => {
        const safeTarget = target || 0;
        const safeCurrent = current || 0;

        // Define max questions for each subject to calculate percentages
        const getMax = (key: string): number => {
            if (key.includes('tyt_turkce') || key.includes('tyt_matematik')) return 40;
            if (key.includes('tyt_sosyal') || key.includes('tyt_fen')) return 20;
            if (key.includes('ayt_matematik')) return 40;
            if (key.includes('ayt_fizik')) return 14;
            if (key.includes('ayt_kimya') || key.includes('ayt_biyoloji')) return 13;
            if (key.includes('ayt_edebiyat')) return 24;
            if (key.includes('ayt_tarih1')) return 10;
            if (key.includes('ayt_cografya1') || key.includes('ayt_din')) return 6;
            if (key.includes('ayt_tarih2') || key.includes('ayt_cografya2')) return 11;
            if (key.includes('ayt_felsefe')) return 12;
            if (key.includes('ydt')) return 80;
            return 40; // Fallback
        };

        const max = getMax(subjectKey as string);
        const currentPercent = Math.min(100, Math.max(0, (safeCurrent / max) * 100));
        const targetPercent = Math.min(100, Math.max(0, (safeTarget / max) * 100));

        // Color logic: Red if far behind, Yellow if close, Green if met/exceeded
        // But user asked for generic "filled bar" and "target marker".
        // Let's use the requested logic: Green if bar filled (reached target), Red if not reached.
        const isTargetMet = safeCurrent >= safeTarget;
        const barColor = isTargetMet ? 'bg-green-500' : 'bg-rose-500';

        return (
            <div className="mb-4">
                <div className="flex justify-between text-xs md:text-sm mb-1.5 items-end">
                    <span className="font-bold text-gray-700">{label}</span>
                    <div className="flex gap-2 md:gap-4 text-[10px] md:text-xs">
                        <div className="text-gray-500">
                            Hedef: <span className="font-bold text-gray-900">{safeTarget}</span>
                        </div>
                        <div className={`${isTargetMet ? 'text-green-600' : 'text-rose-600'}`}>
                            Mevcut: <span className="font-bold">{safeCurrent}</span>
                        </div>
                    </div>
                </div>

                {isEditing ? (
                    <div className="px-1 py-1">
                        <Slider
                            defaultValue={[activeGoals[subjectKey]]}
                            max={max}
                            step={0.5}
                            onValueChange={(vals) => updateGoal(subjectKey, vals[0])}
                            className="py-2"
                        />
                        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                            <span>0</span>
                            <span>{max}</span>
                        </div>
                    </div>
                ) : (
                    <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                        {/* Target Marker Line - drawn underneath or on top? On top makes sense but hard to see if bar is full. */}
                        {/* Strategy: Draw bar first, then marker. */}

                        {/* Current Net Bar */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${currentPercent}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className={`h-full ${barColor} rounded-l-full ${currentPercent >= 98 ? 'rounded-r-full' : ''}`}
                        ></motion.div>

                        {/* Target Marker */}
                        {activeGoals[subjectKey] > 0 && (
                            <div
                                className="absolute top-0 bottom-0 w-0.5 bg-black z-10 shadow-[0_0_4px_rgba(0,0,0,0.5)]"
                                style={{ left: `${targetPercent}%` }}
                            >
                                {/* Tooltip-ish thing for target? Maybe too cluttered. Let's keep it clean. */}
                            </div>
                        )}

                        {/* Optional: Add tick marks for every 10%? Nah, keep clean. */}
                    </div>
                )}
            </div>
        );
    };

    return (
        <Card className="shadow-md border-indigo-100 bg-white overflow-hidden">
            <CardHeader className="bg-indigo-50/50 border-b border-indigo-100 pb-4">
                <div className="flex justify-between items-start md:items-center">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Target className="w-5 h-5 text-indigo-600" />
                            <span className="text-xs font-bold uppercase tracking-wider text-indigo-500">Ana Hedef</span>
                        </div>
                        <CardTitle className="text-xl md:text-2xl font-bold text-indigo-900">
                            {targetName}
                        </CardTitle>
                        <CardDescription className="mt-1 flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                            <div className="flex items-center gap-1.5 text-xs">
                                Hedef: <span className="font-black text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded">{targetScore}</span>
                                <span className="text-gray-300 hidden md:inline">|</span>
                                <span className="text-gray-500 font-bold">{targetDepartment.scoreType}</span>
                            </div>
                            {isEditing && (
                                <div className={`ml-0 md:ml-4 text-sm font-bold px-2 py-1 rounded border ${isGoalMet ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-50 text-red-600 border-red-100'}`}>
                                    Simüle Edilen: {currentProjectedScore} {isGoalMet ? '(Hedefe Ulaşıldı!)' : `(${Math.abs(scoreDiff)} puan eksik)`}
                                </div>
                            )}
                        </CardDescription>
                    </div>
                    <div className="flex gap-2">
                        {isEditing ? (
                            <>
                                <Button variant="ghost" size="sm" onClick={handleReset} className="text-red-600 hover:text-red-700 hover:bg-red-50 h-8">
                                    <RefreshCw className="w-3 h-3 mr-1.5" /> Sıfırla
                                </Button>
                                <Button size="sm" onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white h-8">
                                    <CheckCircle className="w-3 h-3 mr-1.5" /> Kaydet
                                </Button>
                            </>
                        ) : (
                            <div className="flex gap-2">
                                <Dialog open={isCalculatorOpen} onOpenChange={setIsCalculatorOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant="outline" size="sm" className="bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100 h-8 text-xs font-bold">
                                            <PlusCircle className="w-3 h-3 mr-1.5" /> Yeni Deneme Ekle
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-2xl">
                                        <NetCalculator
                                            isOpen={isCalculatorOpen}
                                            onClose={() => setIsCalculatorOpen(false)}
                                            onSave={handleNetSave}
                                        />
                                    </DialogContent>
                                </Dialog>

                                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="bg-white hover:bg-white text-gray-600 border-gray-200 hover:border-gray-300 shadow-sm transition-all text-xs h-8">
                                    <Edit3 className="w-3 h-3 mr-1.5" /> Hedefi Düzenle
                                </Button>
                                <Link href="/onboarding/target">
                                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 h-8 text-xs px-2">
                                        <RefreshCw className="w-3 h-3" />
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* TYT Section */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-gray-800 flex items-center mb-4 pb-2 border-b">
                            <CheckCircle className="w-4 h-4 mr-2 text-blue-500" /> TYT Net Hedefleri
                        </h4>
                        <div className="space-y-1">
                            <NetRow label="Türkçe" current={currentNets?.tyt_turkce || 0} target={activeGoals.tyt_turkce} subjectKey="tyt_turkce" color="bg-blue-100 [&>div]:bg-blue-600" />
                            <NetRow label="Sosyal" current={currentNets?.tyt_sosyal || 0} target={activeGoals.tyt_sosyal} subjectKey="tyt_sosyal" color="bg-blue-100 [&>div]:bg-blue-500" />
                            <NetRow label="Matematik" current={currentNets?.tyt_matematik || 0} target={activeGoals.tyt_matematik} subjectKey="tyt_matematik" color="bg-blue-100 [&>div]:bg-blue-600" />
                            <NetRow label="Fen" current={currentNets?.tyt_fen || 0} target={activeGoals.tyt_fen} subjectKey="tyt_fen" color="bg-blue-100 [&>div]:bg-blue-500" />
                        </div>
                    </div>

                    {/* AYT Section */}
                    <div className="space-y-4">
                        <h4 className="font-bold text-gray-800 flex items-center mb-4 pb-2 border-b">
                            <TrendingUp className="w-4 h-4 mr-2 text-purple-500" /> AYT Net Hedefleri ({targetDepartment.scoreType})
                        </h4>
                        <div className="space-y-1">
                            {targetDepartment.scoreType === 'SAY' && (
                                <>
                                    <NetRow label="Matematik" current={currentNets?.ayt_matematik || 0} target={activeGoals.ayt_matematik} subjectKey="ayt_matematik" color="bg-purple-100 [&>div]:bg-purple-600" />
                                    <NetRow label="Fizik" current={currentNets?.ayt_fizik || 0} target={activeGoals.ayt_fizik} subjectKey="ayt_fizik" color="bg-purple-100 [&>div]:bg-purple-500" />
                                    <NetRow label="Kimya" current={currentNets?.ayt_kimya || 0} target={activeGoals.ayt_kimya} subjectKey="ayt_kimya" color="bg-purple-100 [&>div]:bg-purple-500" />
                                    <NetRow label="Biyoloji" current={currentNets?.ayt_biyoloji || 0} target={activeGoals.ayt_biyoloji} subjectKey="ayt_biyoloji" color="bg-purple-100 [&>div]:bg-purple-500" />
                                </>
                            )}
                            {targetDepartment.scoreType === 'EA' && (
                                <>
                                    <NetRow label="Matematik" current={currentNets?.ayt_matematik || 0} target={activeGoals.ayt_matematik} subjectKey="ayt_matematik" color="bg-purple-100 [&>div]:bg-purple-600" />
                                    <NetRow label="Edebiyat" current={currentNets?.ayt_edebiyat || 0} target={activeGoals.ayt_edebiyat} subjectKey="ayt_edebiyat" color="bg-purple-100 [&>div]:bg-purple-500" />
                                    <NetRow label="Tarih-1" current={currentNets?.ayt_tarih1 || 0} target={activeGoals.ayt_tarih1} subjectKey="ayt_tarih1" color="bg-purple-100 [&>div]:bg-purple-500" />
                                    <NetRow label="Coğrafya-1" current={currentNets?.ayt_cografya1 || 0} target={activeGoals.ayt_cografya1} subjectKey="ayt_cografya1" color="bg-purple-100 [&>div]:bg-purple-500" />
                                </>
                            )}
                            {targetDepartment.scoreType === 'SOZ' && (
                                <>
                                    <NetRow label="Edebiyat" current={currentNets?.ayt_edebiyat || 0} target={activeGoals.ayt_edebiyat} subjectKey="ayt_edebiyat" color="bg-purple-100 [&>div]:bg-purple-600" />
                                    <NetRow label="Tarih-1" current={currentNets?.ayt_tarih1 || 0} target={activeGoals.ayt_tarih1} subjectKey="ayt_tarih1" color="bg-purple-100 [&>div]:bg-purple-500" />
                                    <NetRow label="Coğrafya-1" current={currentNets?.ayt_cografya1 || 0} target={activeGoals.ayt_cografya1} subjectKey="ayt_cografya1" color="bg-purple-100 [&>div]:bg-purple-500" />
                                    <NetRow label="Tarih-2" current={currentNets?.ayt_tarih2 || 0} target={activeGoals.ayt_tarih2} subjectKey="ayt_tarih2" color="bg-purple-100 [&>div]:bg-purple-500" />
                                    <NetRow label="Coğrafya-2" current={currentNets?.ayt_cografya2 || 0} target={activeGoals.ayt_cografya2} subjectKey="ayt_cografya2" color="bg-purple-100 [&>div]:bg-purple-500" />
                                    <NetRow label="Felsefe Grb." current={currentNets?.ayt_felsefe || 0} target={activeGoals.ayt_felsefe} subjectKey="ayt_felsefe" color="bg-purple-100 [&>div]:bg-purple-500" />
                                    <NetRow label="Din Kül." current={currentNets?.ayt_din || 0} target={activeGoals.ayt_din} subjectKey="ayt_din" color="bg-purple-100 [&>div]:bg-purple-500" />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
