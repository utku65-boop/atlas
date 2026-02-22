"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, GraduationCap, MapPin, Save, Shield, Settings } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilePage() {
    const [user, setUser] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const target = localStorage.getItem("targetDepartment");
        const uni = localStorage.getItem("selectedUniversity");

        if (savedUser) {
            setUser({
                ...JSON.parse(savedUser),
                target: target ? JSON.parse(target).name : "Henüz seçilmedi",
                university: uni || "Henüz seçilmedi"
            });
        }
    }, []);

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50/50 font-sans">
            <Header />

            <main className="container max-w-4xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar / Nav */}
                    <div className="md:w-64 space-y-2">
                        <Button variant="ghost" className="w-full justify-start gap-3 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-bold">
                            <User className="w-4 h-4" /> Profil Bilgileri
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-3 text-gray-500 hover:bg-gray-100 font-bold">
                            <Settings className="w-4 h-4" /> Tercih Ayarları
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-3 text-gray-500 hover:bg-gray-100 font-bold">
                            <Shield className="w-4 h-4" /> Güvenlik
                        </Button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <Card className="border-none shadow-md bg-white overflow-hidden">
                                <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-600" />
                                <CardContent className="relative pt-12 pb-8">
                                    <div className="absolute -top-12 left-8 w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center p-2">
                                        <div className="w-full h-full bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 font-black text-3xl">
                                            {user.name.charAt(0)}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mb-8">
                                        <div>
                                            <h1 className="text-2xl font-black text-gray-900 tracking-tight">{user.name}</h1>
                                            <p className="text-sm font-bold text-indigo-600">@{user.username || user.name.toLowerCase().replace(/\s/g, '')}</p>
                                        </div>
                                        <Button
                                            variant={isEditing ? "outline" : "default"}
                                            onClick={() => setIsEditing(!isEditing)}
                                            className={isEditing ? "" : "bg-indigo-600 hover:bg-indigo-700"}
                                        >
                                            {isEditing ? "Vazgeç" : "Profili Düzenle"}
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Ad Soyad</Label>
                                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                                                    <User className="w-4 h-4 text-gray-400" />
                                                    <Input
                                                        defaultValue={user.name}
                                                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                                                        disabled={!isEditing}
                                                        className="border-none bg-transparent h-6 p-0 shadow-none focus-visible:ring-0 font-bold"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Kullanıcı Adı</Label>
                                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                                    <span className="text-gray-400 font-bold">@</span>
                                                    <Input
                                                        defaultValue={user.username || user.name.toLowerCase().replace(/\s/g, '')}
                                                        onChange={(e) => setUser({ ...user, username: e.target.value.replace(/[^a-z0-9_.]/g, '') })}
                                                        disabled={!isEditing}
                                                        placeholder="kullanici_adi"
                                                        className="border-none bg-transparent h-6 p-0 shadow-none focus-visible:ring-0 font-bold"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-xs font-bold text-gray-400 uppercase tracking-widest">E-posta</Label>
                                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                                                    <Mail className="w-4 h-4 text-gray-400" />
                                                    <Input
                                                        defaultValue="ogrenci@kariyerrehberi.ai"
                                                        disabled={true}
                                                        className="border-none bg-transparent h-6 p-0 shadow-none focus-visible:ring-0 font-bold italic opacity-50"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Hedef Bölüm</Label>
                                                <div className="flex items-center gap-3 p-3 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                                                    <GraduationCap className="w-4 h-4 text-indigo-600" />
                                                    <span className="text-sm font-bold text-indigo-900">{user.target}</span>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Hedef Üniversite</Label>
                                                <div className="flex items-center gap-3 p-3 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                                                    <MapPin className="w-4 h-4 text-indigo-600" />
                                                    <span className="text-sm font-bold text-indigo-900">{user.university}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {isEditing && (
                                        <div className="mt-8 flex justify-end">
                                            <Button
                                                onClick={() => {
                                                    localStorage.setItem("user", JSON.stringify(user));
                                                    setIsEditing(false);
                                                    window.location.reload();
                                                }}
                                                className="bg-green-600 hover:bg-green-700 gap-2 h-12 px-8 rounded-2xl font-bold shadow-lg shadow-green-100"
                                            >
                                                <Save className="w-4 h-4" /> Değişiklikleri Kaydet
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card className="border-none shadow-sm bg-indigo-600 text-white">
                                <CardContent className="p-6">
                                    <h3 className="text-sm font-bold opacity-75 mb-1">Hesap Türü</h3>
                                    <p className="text-xl font-black mb-4">Ücretsiz Plan</p>
                                    <Button variant="outline" className="w-full bg-white/10 border-white/20 hover:bg-white/20 text-white font-black">PREMIUM'A GEÇ</Button>
                                </CardContent>
                            </Card>
                            <Card className="border-none shadow-sm bg-white">
                                <CardContent className="p-6">
                                    <h3 className="text-sm font-bold text-gray-400 mb-1">Toplam XP</h3>
                                    <p className="text-2xl font-black text-gray-900">12,450 XP</p>
                                    <p className="text-xs text-green-500 font-bold flex items-center gap-1 mt-1">
                                        Haftalık: +250 XP ▲
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
