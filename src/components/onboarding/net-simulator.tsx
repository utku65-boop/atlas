
"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { calculateYKS, NetCounts } from "@/lib/score-calculator";
import { Target, Trophy, RefreshCcw, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface NetSimulatorProps {
    minScore: number;
    scoreType: 'SAY' | 'EA' | 'SOZ' | 'DIL';
    departmentName: string;
    onSave: (targetNets: NetCounts, calculatedScore: number) => void;
    initialNets?: NetCounts;
}

export function NetSimulator({ minScore, scoreType, departmentName, onSave, initialNets }: NetSimulatorProps) {
    // Default Nets
    // Default Nets - Reset to 0 as per user request to start from scratch
    const defaultNets: NetCounts = {
        tyt_turkce: 0,
        tyt_sosyal: 0,
        tyt_matematik: 0,
        tyt_fen: 0,
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
        obp: 80 // Reasonable default average
    };

    const [nets, setNets] = useState<NetCounts>(initialNets || defaultNets);
    const [score, setScore] = useState(0);

    // Calculate score whenever nets change
    useEffect(() => {
        const calculated = calculateYKS(nets, scoreType);
        setScore(calculated);
    }, [nets, scoreType]);

    const handleNetChange = (key: keyof NetCounts, value: number[]) => {
        setNets(prev => ({ ...prev, [key]: value[0] }));
    };

    const isGoalReached = score >= minScore;

    return (
        <Card className="w-full border-t-4 border-t-indigo-500 shadow-xl">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-2xl font-bold flex items-center gap-2">
                            <Target className="w-6 h-6 text-indigo-600" /> Hedef Net Belirleme
                        </CardTitle>
                        <CardDescription>
                            {departmentName} için hedeflediğin {minScore} puanı yakalamak adına netlerini ayarla.
                        </CardDescription>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-gray-500 font-medium">Hedef Puan</div>
                        <div className="text-3xl font-black text-indigo-700">{minScore}</div>
                    </div>
                </div>

                {/* Score Dashboard */}
                <div className={`mt-6 p-4 rounded-xl border flex justify-between items-center transition-all duration-300 ${isGoalReached ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-center gap-3">
                        {isGoalReached ? <Trophy className="w-8 h-8 text-green-600" /> : <RefreshCcw className="w-8 h-8 text-gray-400 animate-spin-slow" />}
                        <div>
                            <p className="text-sm text-gray-500">Hesaplanan Puan ({scoreType})</p>
                            <p className={`text-3xl font-bold ${isGoalReached ? 'text-green-600' : 'text-gray-700'}`}>{score}</p>
                        </div>
                    </div>
                    <div>
                        {isGoalReached ? (
                            <Badge className="bg-green-600 hover:bg-green-700 text-lg py-1 px-3">HEDEFE ULAŞILDI 🎉</Badge>
                        ) : (
                            <Badge variant="outline" className="text-gray-500 border-gray-300 text-sm py-1">
                                {minScore - score} puan daha gerekli
                            </Badge>
                        )}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-8">
                {/* TYT Section */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">TYT Hedefleri</h3>
                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                        <NetSlider label="Türkçe" value={nets.tyt_turkce} max={40} onChange={(v) => handleNetChange('tyt_turkce', v)} color="bg-red-500" />
                        <NetSlider label="Sosyal" value={nets.tyt_sosyal} max={20} onChange={(v) => handleNetChange('tyt_sosyal', v)} color="bg-yellow-500" />
                        <NetSlider label="Matematik" value={nets.tyt_matematik} max={40} onChange={(v) => handleNetChange('tyt_matematik', v)} color="bg-blue-500" />
                        <NetSlider label="Fen" value={nets.tyt_fen} max={20} onChange={(v) => handleNetChange('tyt_fen', v)} color="bg-green-500" />
                    </div>
                </div>

                {/* AYT Section - Dynamic based on Score Type */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">AYT Hedefleri ({scoreType})</h3>
                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                        {(scoreType === 'SAY' || scoreType === 'EA') && (
                            <NetSlider label="Matematik" value={nets.ayt_matematik} max={40} onChange={(v) => handleNetChange('ayt_matematik', v)} color="bg-blue-600" />
                        )}

                        {scoreType === 'SAY' && (
                            <>
                                <NetSlider label="Fizik" value={nets.ayt_fizik} max={14} onChange={(v) => handleNetChange('ayt_fizik', v)} color="bg-purple-500" />
                                <NetSlider label="Kimya" value={nets.ayt_kimya} max={13} onChange={(v) => handleNetChange('ayt_kimya', v)} color="bg-pink-500" />
                                <NetSlider label="Biyoloji" value={nets.ayt_biyoloji} max={13} onChange={(v) => handleNetChange('ayt_biyoloji', v)} color="bg-teal-500" />
                            </>
                        )}

                        {(scoreType === 'EA' || scoreType === 'SOZ') && (
                            <>
                                <NetSlider label="Edebiyat" value={nets.ayt_edebiyat} max={24} onChange={(v) => handleNetChange('ayt_edebiyat', v)} color="bg-orange-500" />
                                <NetSlider label="Tarih-1" value={nets.ayt_tarih1} max={10} onChange={(v) => handleNetChange('ayt_tarih1', v)} color="bg-amber-600" />
                                <NetSlider label="Coğrafya-1" value={nets.ayt_cografya1} max={6} onChange={(v) => handleNetChange('ayt_cografya1', v)} color="bg-emerald-600" />
                            </>
                        )}

                        {scoreType === 'SOZ' && (
                            <>
                                <NetSlider label="Tarih-2" value={nets.ayt_tarih2} max={11} onChange={(v) => handleNetChange('ayt_tarih2', v)} color="bg-amber-700" />
                                <NetSlider label="Coğrafya-2" value={nets.ayt_cografya2} max={11} onChange={(v) => handleNetChange('ayt_cografya2', v)} color="bg-emerald-700" />
                                <NetSlider label="Felsefe Grb." value={nets.ayt_felsefe} max={12} onChange={(v) => handleNetChange('ayt_felsefe', v)} color="bg-indigo-400" />
                                <NetSlider label="Din Kül." value={nets.ayt_din} max={6} onChange={(v) => handleNetChange('ayt_din', v)} color="bg-sky-500" />
                            </>
                        )}
                    </div>
                </div>

                {/* OBP Slider */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Diğer</h3>
                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                        <NetSlider label="Diploma Notu (OBP)" value={nets.obp} max={100} min={50} step={1} onChange={(v) => handleNetChange('obp', v)} color="bg-gray-600" />
                    </div>
                </div>
            </CardContent>

            <CardFooter className="bg-gray-50 border-t p-6 flex justify-end">
                <Button
                    type="button"
                    size="lg"
                    onClick={() => {
                        console.log("Saving nets:", nets, "Score:", score);
                        onSave(nets, score);
                    }}
                    className={`px-8 text-lg font-bold shadow-lg transition-transform hover:scale-105 active:scale-95 ${isGoalReached ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 hover:bg-gray-500'}`}
                >
                    {isGoalReached ? <><CheckCircle2 className="mr-2" /> Hedefi Kaydet ve Başla</> : "Hedefi Kaydet"}
                </Button>
            </CardFooter>
        </Card>
    );
}

// Helper Subfolder
function NetSlider({ label, value, max, min = 0, step = 0.5, onChange, color }: { label: string, value: number, max: number, min?: number, step?: number, onChange: (val: number[]) => void, color: string }) {
    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">{label}</label>
                <div className="bg-white border rounded px-2 py-0.5 text-sm font-bold text-gray-900 shadow-sm w-12 text-center">
                    {value}
                </div>
            </div>
            <Slider
                value={[value]}
                max={max}
                min={min}
                step={step}
                onValueChange={onChange}
                className={color} // Custom usage of className might need checking Slider implementation, usually it accepts className for the root.
            // Recharts Slider might be different. Shadcn Slider accepts className.
            />
            <div className="flex justify-between text-xs text-gray-400 px-1">
                <span>{min}</span>
                <span>{max}</span>
            </div>
        </div>
    );
}
