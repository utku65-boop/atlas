import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, DollarSign, Users, Briefcase, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function MentorApplicationPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-indigo-600 text-white py-20">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Geleceğin Meslektaşlarına Rehber Ol</h1>
                        <p className="text-xl md:text-2xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                            Üniversite ve bölüm deneyimlerini paylaşarak lise öğrencilerine yol göster, hem onlara ilham ol hem de gelir elde et.
                        </p>
                        <Link href="/mentor-basvuru/form">
                            <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100 font-bold text-lg px-8 py-6 rounded-full shadow-lg transition-transform hover:scale-105">
                                Hemen Başvur <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Neden Mentor Olmalısın?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <Card className="border-none shadow-md hover:shadow-xl transition-shadow bg-white">
                                <CardContent className="p-8 text-center space-y-4">
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                                        <DollarSign className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">Ek Gelir Elde Et</h3>
                                    <p className="text-gray-600">
                                        Boş zamanlarını değerlendirerek 30 dakikalık görüşmeler üzerinden düzenli gelir kazan. Kendi ücretini kendin belirle.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-md hover:shadow-xl transition-shadow bg-white">
                                <CardContent className="p-8 text-center space-y-4">
                                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                                        <Users className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">Network Genişlet</h3>
                                    <p className="text-gray-600">
                                        Geleceğin potansiyel meslektaşlarıyla tanış, liderlik becerilerini geliştir ve güçlü bir iletişim ağı kur.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-md hover:shadow-xl transition-shadow bg-white">
                                <CardContent className="p-8 text-center space-y-4">
                                    <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto">
                                        <Briefcase className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900">CV'ine Güç Kat</h3>
                                    <p className="text-gray-600">
                                        Mentorluk deneyimini özgeçmişine ekle. İşverenler için sosyal sorumluluk ve liderlik yetenekleri değerlidir.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* How it Works */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Nasıl Çalışır?</h2>
                        <div className="max-w-4xl mx-auto space-y-8 relative">
                            <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-indigo-200 hidden md:block"></div>

                            {[
                                { title: "Başvuru Yap", desc: "Formu doldur, öğrenci belgeni yükle ve profilini oluştur." },
                                { title: "Profilin Onaylansın", desc: "Ekibimiz başvurunu incelesin ve 24 saat içinde onaylasın." },
                                { title: "Takvimini Belirle", desc: "Müsait olduğun gün ve saatleri sisteme gir." },
                                { title: "Kazanmaya Başla", desc: "Öğrencilerle görüşmeler yap ve ödemelerini haftalık al." }
                            ].map((step, idx) => (
                                <div key={idx} className="flex gap-6 items-start">
                                    <div className="w-14 h-14 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0 z-10">
                                        {idx + 1}
                                    </div>
                                    <div className="pt-2">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                                        <p className="text-gray-600">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Bottom */}
                <section className="bg-gray-900 text-white py-20 text-center">
                    <h2 className="text-3xl font-bold mb-6">Hemen Başla</h2>
                    <p className="text-gray-400 mb-8">Türkiye'nin en büyük kariyer rehberliği topluluğunda yerini al.</p>
                    <Link href="/mentor-basvuru/form">
                        <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-10 py-6 rounded-full">
                            Başvuru Formuna Git
                        </Button>
                    </Link>
                </section>
            </main>
            <Footer />
        </div>
    );
}
