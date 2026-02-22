"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Upload, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

import { Header } from "@/components/layout/header";

export default function MentorApplicationForm() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => setSubmitted(true), 1500);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
                <Header />
                <div className="flex-1 flex items-center justify-center p-4">
                    <Card className="max-w-md w-full p-8 text-center space-y-6">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto animate-in zoom-in">
                            <CheckCircle className="w-10 h-10" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Başvurunuz Alındı!</h2>
                        <p className="text-gray-600">
                            Mentorluk başvurunuz başarıyla bize ulaştı. Ekibimiz bilgilerinizi inceledikten sonra e-posta yoluyla sizinle iletişime geçecektir.
                        </p>
                        <Link href="/">
                            <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Ana Sayfaya Dön</Button>
                        </Link>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Header />
            <div className="flex-1 py-12 px-4">
                <div className="max-w-2xl mx-auto space-y-8">
                    <Link href="/mentor-basvuru" className="inline-flex items-center text-gray-500 hover:text-indigo-600 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Geri Dön
                    </Link>

                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-900">Mentorluk Başvuru Formu</h1>
                        <p className="text-gray-600 mt-2">Bilgilerini doldur, aramıza katıl.</p>
                    </div>

                    <Card className="bg-white shadow-sm border border-gray-200">
                        <CardContent className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Ad Soyad</Label>
                                        <Input id="name" placeholder="Adınız Soyadınız" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">E-posta</Label>
                                        <Input id="email" type="email" placeholder="ornek@email.com" required />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone">Telefon</Label>
                                    <Input id="phone" type="tel" placeholder="0555 555 55 55" required />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="university">Üniversite</Label>
                                        <Select required>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Üniversite Seçin" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="boun">Boğaziçi Üniversitesi</SelectItem>
                                                <SelectItem value="odtu">ODTÜ</SelectItem>
                                                <SelectItem value="itu">İTÜ</SelectItem>
                                                <SelectItem value="koc">Koç Üniversitesi</SelectItem>
                                                <SelectItem value="bilkent">Bilkent Üniversitesi</SelectItem>
                                                <SelectItem value="other">Diğer</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="department">Bölüm</Label>
                                        <Input id="department" placeholder="Örn: Bilgisayar Mühendisliği" required />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="gpa">Not Ortalaması (AGNO)</Label>
                                    <Input id="gpa" type="number" step="0.01" min="0" max="4.00" placeholder="Örn: 3.50" />
                                </div>

                                <div className="space-y-2">
                                    <Label>Öğrenci Belgesi / Transkript</Label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                        <p className="text-sm text-gray-600">Dosya yüklemek için tıklayın veya sürükleyin</p>
                                        <p className="text-xs text-gray-400 mt-1">(PDF, JPG, PNG - Max 5MB)</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="bio">Kendini Tanıt</Label>
                                    <Textarea
                                        id="bio"
                                        placeholder="Neden mentor olmak istiyorsun? Öğrencilere neler katabilirsin?"
                                        className="h-32"
                                        required
                                    />
                                </div>

                                <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 h-11 text-lg">
                                    Başvuruyu Tamamla
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
