"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight, CheckCircle2, TrendingUp, UserCheck, BrainCircuit, Target } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [hasTarget, setHasTarget] = useState(false);

  useEffect(() => {
    // Mobile-first lock: Redirect to dashboard if already logged in
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      window.location.href = "/dashboard";
      return;
    }

    // Only set hasTarget if the user is actually logging in or we want to persist it.
    // However, if there's NO user, we shouldn't show "Dashboard'a Dön" anyway because they can't access dashboard.
    // So let's ensure we only show the target prompt if we somehow want to suggest they continue, but "Dashboard'a Dön" strictly requires login.
    // Actually, if there is no user, they should always see the fresh homepage.
    const target = localStorage.getItem("targetDepartment");
    if (target && savedUser) {
      setHasTarget(true);
    } else {
      setHasTarget(false);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container relative z-10 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-indigo-100 text-indigo-700 hover:bg-indigo-200 mb-6">
                🚀 YKS 2026 Dönemi İçin Güncellendi
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl mb-6 max-w-4xl">
                Geleceğini Şansa Bırakma, <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Verilerle Karar Ver!</span>
              </h1>
              <p className="text-xl text-gray-500 mb-10 max-w-2xl leading-relaxed">
                Yapay zeka destekli analiz motorumuzla sana en uygun kariyer yolunu çiz veya hedefini kendin belirleyip yol haritanı oluştur.
              </p>

              {hasTarget && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-12"
                >
                  <Link href="/dashboard">
                    <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-14 px-10 shadow-xl shadow-indigo-100 group">
                      Dashboard'a Geri Dön <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <p className="mt-3 text-sm text-indigo-600 font-medium">✨ Daha önce bir hedef belirlemişsin, kaldığın yerden devam et!</p>
                </motion.div>
              )}
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
              {/* Path 1: Analysis */}
              <Link href="/test" className="group">
                <Card className="h-full border-2 border-transparent hover:border-indigo-500 transition-all duration-300 shadow-md hover:shadow-xl bg-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-3">
                    <BrainCircuit className="w-8 h-8 text-indigo-100 group-hover:text-indigo-500 transition-colors" />
                  </div>
                  <CardHeader className="pb-2">
                    <Badge className="w-fit mb-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-none">Yapay Zeka Destekli</Badge>
                    <CardTitle className="text-2xl font-bold">Kariyer Analizi</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-12 text-gray-500">
                    Kişilik envanteri ve RIASEC modeli ile sana en uygun 20+ mesleği keşfet.
                  </CardContent>
                  <CardFooter className="absolute bottom-0 w-full p-6 pt-0">
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12">
                      Analizi Başlat <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>

              {/* Path 2: Direct Target Selection */}
              <Link href="/onboarding/target?direct=true" className="group">
                <Card className="h-full border-2 border-transparent hover:border-purple-500 transition-all duration-300 shadow-md hover:shadow-xl bg-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-3">
                    <Target className="w-8 h-8 text-purple-100 group-hover:text-purple-500 transition-colors" />
                  </div>
                  <CardHeader className="pb-2">
                    <Badge className="w-fit mb-2 bg-purple-100 text-purple-700 hover:bg-purple-100 border-none">Hızlı Başlangıç</Badge>
                    <CardTitle className="text-2xl font-bold">Hedefimi Seçeyim</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-12 text-gray-500">
                    Hedeflediğin bölümü ve üniversiteyi doğrudan seç, net simülasyonuna geç.
                  </CardContent>
                  <CardFooter className="absolute bottom-0 w-full p-6 pt-0">
                    <Button variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 font-bold h-12">
                      Kategorileri İncele
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            </div>

            <div className="mt-12 flex flex-col items-center gap-4">
              <Link href="/mentor-basvuru" className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200">
                Üniversiteli misin? <span className="text-indigo-600 underline">Mentor başvurusu yap 🎓</span>
              </Link>

              <div className="text-xs text-gray-400 flex items-center gap-6">
                <div className="flex items-center"><CheckCircle2 className="w-3 h-3 mr-1 text-green-600" /> 500k+ Analiz</div>
                <div className="flex items-center"><CheckCircle2 className="w-3 h-3 mr-1 text-green-600" /> %98 Memnuniyet</div>
              </div>
            </div>

          </div>

          {/* Background Decor */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="py-20 lg:py-32">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Neden KariyerRehberi.ai?</h2>
              <p className="text-lg text-gray-500">Sadece bir test değil, uçtan uca kariyer yönetim platformu.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-none shadow-lg bg-indigo-50/50">
                <CardHeader>
                  <BrainCircuit className="w-10 h-10 text-indigo-600 mb-4" />
                  <CardTitle>AI Destekli Eşleşme</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Klasik anketlerin ötesinde, akademik başarını ve kişisel ilgi alanlarını analiz eden gelişmiş algoritma.</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg bg-purple-50/50">
                <CardHeader>
                  <TrendingUp className="w-10 h-10 text-purple-600 mb-4" />
                  <CardTitle>Gelecek Projeksiyonu</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Seçtiğin bölümün 5 ve 10 yıllık maaş beklentisini, sektörün büyüme hızını ve risklerini gör.</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg bg-blue-50/50">
                <CardHeader>
                  <UserCheck className="w-10 h-10 text-blue-600 mb-4" />
                  <CardTitle>Kişisel Mentorluk</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Hedefine ulaşman için gereken çalışma programı ve YKS stratejisi sana özel hazırlanır.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section id="how-it-works" className="py-20 bg-gray-50">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Nasıl Çalışır?</h2>
              <p className="text-lg text-gray-500">3 adımda geleceğini planla.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">1</div>
                <h3 className="font-bold text-xl mb-2">Profilini Oluştur</h3>
                <p className="text-gray-500">Hedeflerini ve akademik durumunu gir.</p>
              </div>
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">2</div>
                <h3 className="font-bold text-xl mb-2">Analizi Tamamla</h3>
                <p className="text-gray-500">Yapay zeka destekli envanteri çöz.</p>
              </div>
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">3</div>
                <h3 className="font-bold text-xl mb-2">Yol Hariteni Al</h3>
                <p className="text-gray-500">Sana özel kariyer ve çalışma planına kavuş.</p>
              </div>

              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-indigo-100 -z-0" />
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing" className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Fiyatlandırma</h2>
              <p className="text-lg text-gray-500">Her bütçeye uygun kariyer planlaması.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Plan */}
              <Card className="border shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl">Başlangıç</CardTitle>
                  <div className="text-4xl font-bold mt-2">₺0 <span className="text-sm font-normal text-gray-500">/sonsuza kadar</span></div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> Temel Kariyer Testi</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> 1 Adet Sonuç Raporu</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> Bölüm Maaş Tahmini</li>
                  </ul>
                  <Link href="/test">
                    <Button className="w-full" variant="outline">Hemen Başla</Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Pro Plan */}
              <Card className="border-2 border-indigo-600 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1">ÖNERİLEN</div>
                <CardHeader>
                  <CardTitle className="text-2xl">Premium Koç</CardTitle>
                  <div className="text-4xl font-bold mt-2">₺299 <span className="text-sm font-normal text-gray-500">/tek seferlik</span></div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-indigo-600" /> <strong>Her Şey Dahil</strong></li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-indigo-600" /> Detaylı Net Takibi & Analiz</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-indigo-600" /> Kişiye Özel Çalışma Programı</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-indigo-600" /> Mentor ile 30 Dk Görüşme</li>
                  </ul>
                  <Link href="/login">
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 font-bold">Hemen Abone Ol</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* MENTOR CTA SECTION */}
        <section id="mentor-cta" className="py-20 bg-gradient-to-r from-indigo-900 to-purple-900 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="container relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Sen de Mentor Ol, Geleceğe İlham Ver</h2>
            <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Üniversite deneyimlerini paylaşarak lise öğrencilerine rehberlik et. Hem kendi harçlığını çıkar hem de geleceğin meslektaşlarına yol göster.
            </p>
            <Link href="/mentor-basvuru">
              <Button size="lg" className="bg-white text-indigo-900 hover:bg-gray-100 px-8 py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105">
                Mentor Başvurusu Yap <TrendingUp className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-6">Hayallerini Erteleme</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Kariyer yolculuğunda sana en uygun rotayı çizmek için sadece 5 dakikanı ayır.
            </p>
            <Link href="/test">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 h-14 text-lg font-bold">
                Ücretsiz Başla
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
