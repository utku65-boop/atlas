"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, Stethoscope, Briefcase, Calculator, Building2, FlaskConical, ArrowRight, Lock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { PaymentModal } from "@/components/payment-modal";

export default function TestCatalogPage() {
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({ name: "", price: "" });

    const openPayment = (name: string, price: string) => {
        setSelectedProduct({ name, price });
        setIsPaymentOpen(true);
    };
    const categories = [
        {
            id: "muhendislik",
            title: "Mühendislik & Teknoloji",
            icon: <BrainCircuit className="w-6 h-6 text-blue-600" />,
            description: "Analitik düşünme ve problem çözme yeteneğini ölç.",
            tests: [
                { name: "Yazılım Mühendisliği Uygunluk Testi", duration: "15 dk", difficulty: "Orta", isLocked: false },
                { name: "Endüstri Mühendisliği Karar Analizi", duration: "20 dk", difficulty: "Zor", isLocked: true },
                { name: "Mekanik & Fiziksel Algı Testi", duration: "10 dk", difficulty: "Kolay", isLocked: true },
            ]
        },
        {
            id: "saglik",
            title: "Tıp & Diş Hekimliği",
            icon: <Stethoscope className="w-6 h-6 text-red-600" />,
            description: "Biyoloji ilgisi, insan odaklılık ve stres yönetimi.",
            tests: [
                { name: "Klinik Empati ve İletişim Testi", duration: "12 dk", difficulty: "Kolay", isLocked: false },
                { name: "Anatomi ve Görsel Hafıza Sınavı", duration: "25 dk", difficulty: "Zor", isLocked: true },
                { name: "Diş Hekimliği El Becerisi Simülasyonu", duration: "15 dk", difficulty: "Orta", isLocked: true },
            ]
        },
        {
            id: "iibf",
            title: "İktisadi ve İdari Bilimler",
            icon: <Briefcase className="w-6 h-6 text-yellow-600" />,
            description: "Liderlik, ekonomi ve yönetim becerileri.",
            tests: [
                { name: "Liderlik ve Girişimcilik Envanteri", duration: "10 dk", difficulty: "Kolay", isLocked: false },
                { name: "Ekonomik Okuryazarlık Testi", duration: "30 dk", difficulty: "Zor", isLocked: true },
                { name: "Uluslararası İlişkiler Diploması Testi", duration: "20 dk", difficulty: "Orta", isLocked: true },
            ]
        }
    ];

    return (
        <div className="min-h-screen flex flex-col font-sans bg-gray-50">
            <Header />

            <main className="container py-8 flex-1">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">İleri Seviye Uygunluk Testleri 🎯</h1>
                    <p className="text-gray-500">Alan bazlı spesifik testlerle hangi bölüme daha yatkın olduğunu keşfet.</p>
                </div>

                <div className="grid gap-8">
                    {categories.map((category) => (
                        <div key={category.id} className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-100">
                                    {category.icon}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">{category.title}</h2>
                                    <p className="text-sm text-gray-500">{category.description}</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                                {category.tests.map((test, index) => (
                                    <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-transparent hover:border-l-indigo-500">
                                        <CardHeader className="pb-3">
                                            <div className="flex justify-between items-start">
                                                <Badge variant={test.difficulty === "Kolay" ? "secondary" : test.difficulty === "Orta" ? "default" : "destructive"} className="mb-2">
                                                    {test.difficulty}
                                                </Badge>
                                                {test.isLocked && <Lock className="w-4 h-4 text-gray-400" />}
                                            </div>
                                            <CardTitle className="text-lg leading-tight">{test.name}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-sm text-gray-500 pb-3">
                                            <div className="flex items-center gap-4">
                                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {test.duration}</span>
                                            </div>
                                        </CardContent>
                                        <CardFooter>
                                            <Button
                                                className={`w-full ${test.isLocked ? "bg-gray-100 text-gray-400 hover:bg-gray-100" : "bg-indigo-600 hover:bg-indigo-700"}`}
                                                disabled={test.isLocked}
                                            >
                                                {test.isLocked ? "Premium Üyelik Gerekli" : "Teste Başla"}
                                                {!test.isLocked && <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />}
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}

// Icon Helper
import { Clock } from "lucide-react";
