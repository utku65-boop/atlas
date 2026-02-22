"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Globe, GraduationCap, Building } from "lucide-react";

export default function PreferencesPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            // Mark preferences as set
            localStorage.setItem("preferencesSet", "true");
            alert("Tercihlerin kaydedildi! Üniversite önerileri buna göre güncellenecek. ✅");
            router.push("/dashboard");
        }, 1000);
    };

    return (
        <div className="min-h-screen flex flex-col font-sans bg-gray-50">
            <Header />

            <main className="container py-8 flex-1">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-gray-900">Üniversite Tercih Profili 🎓</h1>
                        <p className="text-gray-500">Sana en uygun üniversiteyi bulmamız için kriterlerini belirle.</p>
                    </div>

                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><MapPin className="text-indigo-600" /> Şehir Tercihi</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <RadioGroup defaultValue="aile">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="aile" id="aile" />
                                    <Label htmlFor="aile">Ailemin yanında okumak istiyorum (Ekonomik)</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="farkli" id="farkli" />
                                    <Label htmlFor="farkli">Farklı bir şehirde macera arıyorum</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="farketmez" id="farketmez" />
                                    <Label htmlFor="farketmez">Şehir fark etmez, üniversite kalitesi önemli</Label>
                                </div>
                            </RadioGroup>

                            <div className="mt-4">
                                <Label className="mb-2 block">Öncelikli Şehirler (Opsiyonel)</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Şehir Seçiniz" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="istanbul">İstanbul</SelectItem>
                                        <SelectItem value="ankara">Ankara</SelectItem>
                                        <SelectItem value="izmir">İzmir</SelectItem>
                                        <SelectItem value="eskisehir">Eskişehir</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Building className="text-indigo-600" /> Üniversite Türü & Burs</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="devlet" />
                                <Label htmlFor="devlet">Devlet Üniversitesi</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="ozel_burslu" />
                                <Label htmlFor="ozel_burslu">Vakıf (Tam Burslu)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="ozel_ucretli" />
                                <Label htmlFor="ozel_ucretli">Vakıf (%50 İndirimli / Ücretli)</Label>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Globe className="text-indigo-600" /> Gelecek Hedefleri</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <RadioGroup defaultValue="yurtici">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="yurtici" id="yurtici" />
                                    <Label htmlFor="yurtici">Türkiye'de kariyer planlıyorum</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="yurtdisi" id="yurtdisi" />
                                    <Label htmlFor="yurtdisi">Yurtdışına gitmek istiyorum (Erasmus/Master)</Label>
                                </div>
                            </RadioGroup>
                        </CardContent>
                    </Card>

                    <Button className="w-full h-12 text-lg bg-indigo-600 hover:bg-indigo-700" onClick={handleSave} disabled={loading}>
                        {loading ? "Kaydediliyor..." : "Tercih Profilini Kaydet"}
                    </Button>
                </div>
            </main>
            <Footer />
        </div>
    );
}
