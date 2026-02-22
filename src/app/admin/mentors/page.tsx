"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    ShieldCheck,
    XCircle,
    ChevronLeft,
    Mail,
    Phone,
    GraduationCap,
    Clock,
    UserCheck,
    Filter
} from "lucide-react";
import Link from "next/link";

const APPLICANTS = [
    { id: 1, name: "Ali Yılmaz", university: "İTÜ", department: "Bilgisayar Mühendisliği", date: "20 Şub 2026", status: "Beklemede", score: "482.5 (SAY)" },
    { id: 2, name: "Zeynep Kaya", university: "Boğaziçi", department: "İktisat", date: "21 Şub 2026", status: "Beklemede", score: "475.2 (EA)" },
    { id: 3, name: "Can Demir", university: "ODTÜ", department: "Fizik", date: "19 Şub 2026", status: "Onaylandı", score: "490.1 (SAY)" },
];

export default function AdminMentorsPage() {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-gray-50">
            <Header />
            <main className="container py-12 flex-1">
                <div className="mb-10">
                    <Link href="/admin" className="text-xs font-bold text-indigo-600 flex items-center gap-1 mb-4 hover:underline">
                        <ChevronLeft className="w-3 h-3" /> Panele Geri Dön
                    </Link>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Mentor Yönetimi</h1>
                            <p className="text-gray-500">Üniversiteli mentor başvurularını inceleyin ve onaylayın.</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" className="text-xs h-9 flex items-center gap-2"><Filter className="w-4 h-4" /> Filtrele</Button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {APPLICANTS.map((mentor) => (
                        <Card key={mentor.id} className="border-none shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden">
                            <CardContent className="p-0">
                                <div className="flex flex-col lg:flex-row">
                                    <div className="p-6 flex-1">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-700 font-bold text-xl">
                                                    {mentor.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-gray-900">{mentor.name}</h3>
                                                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                                                        <GraduationCap className="w-3 h-3" /> {mentor.university} - {mentor.department}
                                                    </div>
                                                </div>
                                            </div>
                                            <Badge className={`text-[10px] border-none ${mentor.status === 'Onaylandı' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                                                {mentor.status}
                                            </Badge>
                                        </div>

                                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Başarı Puanı</p>
                                                <p className="text-xs font-bold text-gray-700">{mentor.score}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Başvuru Tarihi</p>
                                                <p className="text-xs font-bold text-gray-700 flex items-center gap-1"><Clock className="w-3 h-3" /> {mentor.date}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">İletişim</p>
                                                <div className="flex gap-2">
                                                    <button className="text-gray-400 hover:text-indigo-600 transition-colors"><Mail className="w-4 h-4" /></button>
                                                    <button className="text-gray-400 hover:text-green-600 transition-colors"><Phone className="w-4 h-4" /></button>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Özet</p>
                                                <p className="text-[10px] text-gray-500 italic">"3 yıldan fazladır koçluk yapıyorum..."</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 p-6 flex items-center justify-center lg:border-l border-gray-100 gap-3">
                                        <Button variant="outline" className="border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 h-10 px-6">
                                            <XCircle className="w-4 h-4 mr-2" /> Reddet
                                        </Button>
                                        <Button className="bg-green-600 hover:bg-green-700 text-white font-bold h-10 px-6 shadow-lg shadow-green-100">
                                            <UserCheck className="w-4 h-4 mr-2" /> Onayla
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
