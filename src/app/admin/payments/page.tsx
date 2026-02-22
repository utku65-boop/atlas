"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    CreditCard,
    ArrowUpRight,
    ChevronLeft,
    Download,
    TrendingUp,
    Calendar,
    Search
} from "lucide-react";
import Link from "next/link";

const PAYMENTS = [
    { id: "PAY-001", user: "Utku Arslan", amount: "₺499.00", date: "22 Şub 2026", status: "Başarılı", method: "Visa **** 4242" },
    { id: "PAY-002", user: "Mert Demir", amount: "₺299.00", date: "21 Şub 2026", status: "Başarılı", method: "Mastercard **** 5555" },
    { id: "PAY-003", user: "Selin Kaya", amount: "₺499.00", date: "21 Şub 2026", status: "Beklemede", method: "Visa **** 1234" },
    { id: "PAY-004", user: "Ali Yıldız", amount: "₺299.00", date: "20 Şub 2026", status: "Başarılı", method: "İninal" },
];

export default function AdminPaymentsPage() {
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
                            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Finansal İşlemler</h1>
                            <p className="text-gray-500">Satışları ve ödeme geçmişini buradan takip edebilirsiniz.</p>
                        </div>
                        <Button variant="outline" className="text-xs h-9 flex items-center gap-2">
                            <Download className="w-4 h-4" /> CSV Olarak İndir
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
                    <Card className="border-none shadow-sm bg-white">
                        <CardContent className="p-6">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Toplam Ciro</p>
                            <h3 className="text-2xl font-black text-gray-900">₺142,580</h3>
                            <div className="flex items-center gap-1 text-green-600 text-[10px] font-bold mt-2">
                                <TrendingUp className="w-3 h-3" /> +12% Geçen Aya Göre
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm bg-white">
                        <CardContent className="p-6">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Bekleyen İşlemler</p>
                            <h3 className="text-2xl font-black text-gray-900">12</h3>
                            <p className="text-[10px] text-gray-400 mt-2 italic">Tahmini değer: ₺3,600</p>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-sm bg-indigo-600 text-white">
                        <CardContent className="p-6">
                            <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest mb-1">Aktif Aboneler</p>
                            <h3 className="text-2xl font-black">284</h3>
                            <p className="text-[10px] text-indigo-100 mt-2">Bu hafta +12 yeni kullanıcı</p>
                        </CardContent>
                    </Card>
                </div>

                <Card className="border-none shadow-sm overflow-hidden bg-white">
                    <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
                        <h4 className="font-bold text-gray-900 text-sm">Son İşlemler</h4>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="text-xs text-gray-500"><Calendar className="w-3 h-3 mr-2" /> Bugün</Button>
                            <Button variant="ghost" size="sm" className="text-xs text-indigo-600 bg-indigo-50"><Calendar className="w-3 h-3 mr-2" /> Son 30 Gün</Button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">İşlem ID</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Kullanıcı</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tutar</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tarih</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Yöntem</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Durum</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {PAYMENTS.map((pay) => (
                                    <tr key={pay.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-xs font-mono text-gray-500">{pay.id}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-gray-900">{pay.user}</td>
                                        <td className="px-6 py-4 text-sm font-black text-gray-900">{pay.amount}</td>
                                        <td className="px-6 py-4 text-xs text-gray-500">{pay.date}</td>
                                        <td className="px-6 py-4 text-xs text-gray-400">{pay.method}</td>
                                        <td className="px-6 py-4">
                                            <Badge className={`text-[10px] border-none ${pay.status === 'Başarılı' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                                                {pay.status}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </main>
            <Footer />
        </div>
    );
}
