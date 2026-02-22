"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Save, TrendingUp, Target, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Mock Target Net (e.g., needed for Computer Engineering)
const TARGET_TYT = 90;
const TARGET_AYT = 65;

export default function NetTrackingPage() {
    const [history, setHistory] = useState<any[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Form States
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [tytForm, setTytForm] = useState({ turkce: "", mat: "", sosyal: "", fen: "" });
    const [aytForm, setAytForm] = useState({ mat: "", fen: "", sos1: "", sos2: "" });

    useEffect(() => {
        const stored = localStorage.getItem("netHistory");
        if (stored) {
            setHistory(JSON.parse(stored));
        }
    }, []);

    // Helper to validate and set input
    const handleInput = (setter: any, state: any, field: string, value: string, max: number) => {
        let val = Number(value);
        if (val < 0) val = 0;
        if (val > max) val = max;
        setter({ ...state, [field]: val === 0 && value === "" ? "" : val });
    };

    const handleSave = () => {
        const tytTotal = Number(tytForm.turkce) + Number(tytForm.sosyal) + Number(tytForm.mat) + Number(tytForm.fen);
        const aytTotal = Number(aytForm.mat) + Number(aytForm.fen) + Number(aytForm.sos1) + Number(aytForm.sos2);

        const newEntry = {
            id: Date.now(),
            date: date,
            tyt: { ...tytForm },
            ayt: { ...aytForm },
            // For chart compatibility (converting strings to numbers for aggregation if needed, or just total)
            totalTyt: tytTotal,
            totalAyt: aytTotal,
            // Individual fields for chart
            tyt_turkce: Number(tytForm.turkce),
            tyt_sosyal: Number(tytForm.sosyal),
            tyt_matematik: Number(tytForm.mat),
            tyt_fen: Number(tytForm.fen),
            ayt_matematik: Number(aytForm.mat),
            ayt_fen: Number(aytForm.fen),
            ayt_sos1: Number(aytForm.sos1),
            ayt_sos2: Number(aytForm.sos2)
        };

        const updated = [...history, newEntry].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setHistory(updated);
        localStorage.setItem("netHistory", JSON.stringify(updated));

        // Gamification: Earn XP
        const currentXp = parseInt(localStorage.getItem("user_xp") || "0");
        const newXp = currentXp + 100;
        localStorage.setItem("user_xp", newXp.toString());

        setIsDialogOpen(false);
        // Reset form? maybe keep date
    };

    return (
        <div className="min-h-screen flex flex-col font-sans bg-gray-50">
            <Header />
            <main className="container py-8 flex-1">
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Net Takip & Analiz</h1>
                            <p className="text-gray-500">Deneme sonuçlarını gir, gelişimini grafiklerle gör.</p>
                        </div>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-indigo-600 hover:bg-indigo-700">
                                    <Plus className="w-5 h-5 mr-1" /> Yeni Deneme Ekle
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle>Yeni Deneme Sonucu Ekle</DialogTitle>
                                    <DialogDescription>
                                        Son yaptığın denemenin detaylarını aşağıya gir.
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="date" className="text-right">Tarih</Label>
                                        <Input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} className="col-span-3" />
                                    </div>

                                    <Tabs defaultValue="tyt" className="w-full">
                                        <TabsList className="grid w-full grid-cols-2">
                                            <TabsTrigger value="tyt">TYT Netleri</TabsTrigger>
                                            <TabsTrigger value="ayt">AYT Netleri</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="tyt" className="space-y-4 p-4 border rounded-md mt-2">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label>Türkçe (40)</Label>
                                                    <Input type="number" min="0" max="40" placeholder="0" value={tytForm.turkce} onChange={e => handleInput(setTytForm, tytForm, 'turkce', e.target.value, 40)} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Sosyal (20)</Label>
                                                    <Input type="number" min="0" max="20" placeholder="0" value={tytForm.sosyal} onChange={e => handleInput(setTytForm, tytForm, 'sosyal', e.target.value, 20)} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Matematik (40)</Label>
                                                    <Input type="number" min="0" max="40" placeholder="0" value={tytForm.mat} onChange={e => handleInput(setTytForm, tytForm, 'mat', e.target.value, 40)} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Fen (20)</Label>
                                                    <Input type="number" min="0" max="20" placeholder="0" value={tytForm.fen} onChange={e => handleInput(setTytForm, tytForm, 'fen', e.target.value, 20)} />
                                                </div>
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="ayt" className="space-y-4 p-4 border rounded-md mt-2">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label>Matematik (40)</Label>
                                                    <Input type="number" min="0" max="40" placeholder="0" value={aytForm.mat} onChange={e => handleInput(setAytForm, aytForm, 'mat', e.target.value, 40)} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Fen Bilimleri (40)</Label>
                                                    <Input type="number" min="0" max="40" placeholder="0" value={aytForm.fen} onChange={e => handleInput(setAytForm, aytForm, 'fen', e.target.value, 40)} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Edebiyat-Sos1 (40)</Label>
                                                    <Input type="number" min="0" max="40" placeholder="0" value={aytForm.sos1} onChange={e => handleInput(setAytForm, aytForm, 'sos1', e.target.value, 40)} />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>Sosyal-2 (40)</Label>
                                                    <Input type="number" min="0" max="40" placeholder="0" value={aytForm.sos2} onChange={e => handleInput(setAytForm, aytForm, 'sos2', e.target.value, 40)} />
                                                </div>
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </div>

                                <Button onClick={handleSave} className="w-full bg-indigo-600 hover:bg-indigo-700">Kaydet</Button>
                            </DialogContent>
                        </Dialog>
                    </div>

                    {/* Charts Section */}
                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Only show charts if history exists */}
                        {history.length > 0 ? (
                            <>
                                <Card className="shadow-md border-none">
                                    <CardHeader>
                                        <CardTitle className="text-blue-700 font-bold flex items-center gap-2">
                                            <TrendingUp className="w-5 h-5" /> TYT Gelişim Grafiği
                                        </CardTitle>
                                        <CardDescription>Ders bazlı netler</CardDescription>
                                    </CardHeader>
                                    <CardContent className="h-[300px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={history.slice(-10)}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                                <XAxis dataKey="date" type="category" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Line type="monotone" dataKey="tyt_turkce" stroke="#3b82f6" name="Türkçe" strokeWidth={2} activeDot={{ r: 6 }} />
                                                <Line type="monotone" dataKey="tyt_sosyal" stroke="#f59e0b" name="Sosyal" strokeWidth={2} />
                                                <Line type="monotone" dataKey="tyt_matematik" stroke="#ef4444" name="Matematik" strokeWidth={2} />
                                                <Line type="monotone" dataKey="tyt_fen" stroke="#10b981" name="Fen" strokeWidth={2} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>

                                <Card className="shadow-md border-none">
                                    <CardHeader>
                                        <CardTitle className="text-purple-700 font-bold flex items-center gap-2">
                                            <TrendingUp className="w-5 h-5" /> AYT Gelişim Grafiği
                                        </CardTitle>
                                        <CardDescription>Alan netleri</CardDescription>
                                    </CardHeader>
                                    <CardContent className="h-[300px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={history.slice(-10)}>
                                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                                <XAxis dataKey="date" type="category" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Line type="monotone" dataKey="ayt_matematik" stroke="#ef4444" name="Matematik" strokeWidth={2} activeDot={{ r: 6 }} />
                                                <Line type="monotone" dataKey="ayt_fen" stroke="#8b5cf6" name="Fen" strokeWidth={2} />
                                                <Line type="monotone" dataKey="ayt_sos1" stroke="#ec4899" name="Ed-Sos1" strokeWidth={2} />
                                                <Line type="monotone" dataKey="ayt_sos2" stroke="#10b981" name="Sos-2" strokeWidth={2} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>
                            </>
                        ) : (
                            <div className="col-span-2 text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                <p className="text-gray-500">Henüz deneme sonucu eklemediniz. "Yeni Deneme Ekle" butonunu kullanarak başlayın.</p>
                            </div>
                        )}
                    </div>

                    {/* Target Analysis Card (Optional: Keep mock or dynamic) */}
                    <Card className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Target className="text-yellow-400" /> Hedef Analizi
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <p className="text-sm text-gray-300">
                                    Hedeflediğin bölüme ulaşmak için eksiklerini kapatmaya odaklan.
                                    {history.length > 0 && ` Son denemende TYT'de ${history[history.length - 1].totalTyt} net, AYT'de ${history[history.length - 1].totalAyt} net yaptın.`}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    );
}
