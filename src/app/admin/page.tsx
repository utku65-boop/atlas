"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Users,
    FileText,
    ShieldCheck,
    CreditCard,
    TrendingUp,
    ArrowUpRight,
    MoreVertical,
    BarChart3,
    Database as DbIcon
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminPage() {
    const stats = [
        { label: "Toplam Kullanıcı", value: "12,482", trend: "+14%", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Aylık Gelir", value: "₺42,900", trend: "+8%", icon: CreditCard, color: "text-green-600", bg: "bg-green-50" },
        { label: "Aktif Mentor", value: "156", trend: "+4", icon: ShieldCheck, color: "text-purple-600", bg: "bg-purple-50" },
        { label: "Blog İçerikleri", value: "84", trend: "+12", icon: FileText, color: "text-amber-600", bg: "bg-amber-50" },
    ];

    return (
        <div className="min-h-screen flex flex-col font-sans bg-gray-50">
            <Header />
            <main className="container py-12 flex-1">
                <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Admin Kontrol Paneli</h1>
                        <p className="text-gray-500">Platformun tüm operasyonlarını buradan yönetebilirsiniz.</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" className="text-xs h-9">Rapor İndir</Button>
                        <Link href="/admin/blog">
                            <Button className="bg-indigo-600 hover:bg-indigo-700 text-xs h-9">Yeni İçerik Ekle</Button>
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <Card className="border-none shadow-sm bg-white">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                            <stat.icon className="w-5 h-5" />
                                        </div>
                                        <Badge variant="secondary" className="text-[10px] font-bold text-green-600 bg-green-50 border-none">
                                            {stat.trend}
                                        </Badge>
                                    </div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                                    <h3 className="text-2xl font-black text-gray-900 mt-1">{stat.value}</h3>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Applications / Orders */}
                    <Card className="border-none shadow-sm bg-white lg:col-span-2">
                        <CardHeader className="flex flex-row items-center justify-between border-b border-gray-50">
                            <CardTitle className="text-lg font-bold">Bekleyen Mentor Başvuruları</CardTitle>
                            <Button variant="ghost" size="sm" className="text-indigo-600 text-xs">Hepsini Gör</Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="p-6 flex items-center border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold mr-4">U{i}</div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-gray-900">Utku Arslan - İTÜ Bilgisayar</h4>
                                        <p className="text-xs text-gray-400">Başvuru Tarihi: 22 Feb 2026</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" className="text-xs h-8 text-red-600">Reddet</Button>
                                        <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-xs h-8">Onayla</Button>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Quick Access Menu */}
                    <div className="space-y-6">
                        <Card className="border-none shadow-sm bg-indigo-900 text-white">
                            <CardHeader>
                                <CardTitle className="text-lg">Hızlı Erişim</CardTitle>
                            </CardHeader>
                            <CardContent className="grid gap-3">
                                <Link href="/admin/data" className="flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all group">
                                    <div className="flex items-center gap-3">
                                        <DbIcon className="w-4 h-4" />
                                        <span className="text-sm">Okul / Bölüm (Veri) Yönetimi</span>
                                    </div>
                                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                                </Link>
                                <Link href="/admin/blog" className="flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all group">
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-4 h-4" />
                                        <span className="text-sm">Blog / İçerik Yönetimi</span>
                                    </div>
                                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                                </Link>
                                <Link href="/admin/mentors" className="flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all group">
                                    <div className="flex items-center gap-3">
                                        <ShieldCheck className="w-4 h-4" />
                                        <span className="text-sm">Mentor Başvuruları</span>
                                    </div>
                                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                                </Link>
                                <Link href="/admin/payments" className="flex items-center justify-between p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all group">
                                    <div className="flex items-center gap-3">
                                        <BarChart3 className="w-4 h-4" />
                                        <span className="text-sm">Finansal Raporlar / Ödemeler</span>
                                    </div>
                                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
