"use client";

import { useParams } from "next/navigation";
import { departments } from "@/lib/data/departments";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowLeft, BrainCircuit, BookOpen, DollarSign } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DepartmentDetailPage() {
    const params = useParams();
    const deptId = params.id as string;
    const department = departments.find(d => d.id === deptId);

    // Quiz State
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizFinished, setQuizFinished] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);

    const quizQuestions = [
        { q: "Karmaşık problemleri çözmekten keyif alır mısın?", a: true },
        { q: "Uzun süre masa başında odaklanarak çalışabilir misin?", a: true },
        { q: "Sürekli yeni teknolojileri öğrenmeye açık mısın?", a: true },
        { q: "Takım çalışmasına yatkın mısın?", a: true },
        { q: "Detaylara dikkat eder misin?", a: true }
    ];

    const handleAnswer = (answer: boolean) => {
        if (answer) setScore(score + 1);

        if (currentQuestion < quizQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setQuizFinished(true);
        }
    };

    if (!department) {
        return <div className="p-8 text-center">Bölüm bulunamadı.</div>;
    }

    return (
        <div className="min-h-screen flex flex-col font-sans bg-gray-50">
            <Header />

            <main className="container py-8 flex-1">
                <Link href="/dashboard" className="text-sm text-gray-500 hover:text-indigo-600 flex items-center mb-6">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Panele Dön
                </Link>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="border-t-4 border-indigo-600">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-3xl font-bold text-gray-900 mb-2">{department.name}</CardTitle>
                                        <CardDescription className="text-lg">{department.description}</CardDescription>
                                    </div>
                                    <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 text-sm px-3 py-1">Popüler</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-semibold flex items-center gap-2 mb-3"><BookOpen className="w-4 h-4 text-indigo-600" /> Dersler</h3>
                                    <ul className="space-y-1 text-sm text-gray-600">
                                        {department.courses.map((c: any) => (
                                            <li key={c.name} className="mb-2">
                                                <span className="font-medium text-gray-900">{c.name}</span>
                                                <p className="text-xs text-gray-500">{c.description}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-semibold flex items-center gap-2 mb-3"><DollarSign className="w-4 h-4 text-green-600" /> Kariyer & Maaş</h3>
                                    <ul className="space-y-1 text-sm text-gray-600">
                                        <li>🎓 Başlangıç: ₺{department.salaryProjection.entry.toLocaleString()}</li>
                                        <li>💼 5. Yıl: ₺{department.salaryProjection.experienced.toLocaleString()}</li>
                                        <li>🚀 Kıdemli: ₺{department.salaryProjection.senior.toLocaleString()}</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quiz Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BrainCircuit className="text-pink-600" /> Bu Bölüm Bana Uygun Mu?
                                </CardTitle>
                                <CardDescription>5 soruluk mini testi çöz, uyumunu gör.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {!quizStarted ? (
                                    <div className="text-center py-8">
                                        <p className="mb-6 text-gray-600">Bu bölümün senin karakterine ve çalışma stiline uygun olup olmadığını merak ediyor musun?</p>
                                        <Button onClick={() => setQuizStarted(true)} className="bg-pink-600 hover:bg-pink-700">Teste Başla</Button>
                                    </div>
                                ) : !quizFinished ? (
                                    <div className="py-4">
                                        <div className="flex justify-between text-sm text-gray-500 mb-2">
                                            <span>Soru {currentQuestion + 1}/{quizQuestions.length}</span>
                                        </div>
                                        <Progress value={(currentQuestion / quizQuestions.length) * 100} className="h-2 mb-6" />

                                        <h3 className="text-xl font-bold mb-8 text-center">{quizQuestions[currentQuestion].q}</h3>

                                        <div className="flex justify-center gap-4">
                                            <Button variant="outline" size="lg" className="border-red-200 hover:bg-red-50 hover:text-red-600 w-32" onClick={() => handleAnswer(false)}>
                                                <X className="mr-2" /> Hayır
                                            </Button>
                                            <Button size="lg" className="bg-green-600 hover:bg-green-700 w-32" onClick={() => handleAnswer(true)}>
                                                <Check className="mr-2" /> Evet
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-6">
                                        <div className="text-4xl font-bold text-indigo-600 mb-2">%{score * 20}</div>
                                        <p className="font-bold text-gray-800 mb-4">Uyum Oranı</p>
                                        <p className="text-gray-600 mb-6">
                                            {score >= 4 ? "Harika! Bu bölüm senin için biçilmiş kaftan." : "Hmm, belki başka seçenekleri de değerlendirmelisin."}
                                        </p>
                                        <Button variant="outline" onClick={() => { setQuizStarted(false); setQuizFinished(false); setScore(0); setCurrentQuestion(0); }}>
                                            Tekrar Çöz
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card className="bg-gray-900 text-white">
                            <CardHeader>
                                <CardTitle>Hedef Net Analizi</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm text-gray-300">Bu bölümü kazanmak için ortalama gereken netler:</p>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>TYT</span>
                                        <span className="font-bold">90+ Net</span>
                                    </div>
                                    <Progress value={75} className="h-2 bg-gray-700" />
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>AYT</span>
                                        <span className="font-bold">65+ Net</span>
                                    </div>
                                    <Progress value={50} className="h-2 bg-gray-700" />
                                </div>
                                <Button className="w-full mt-4 bg-white text-gray-900 hover:bg-gray-100">
                                    Çalışma Programı Oluştur
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
