import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Construction, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function SubjectDeficienciesPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8 min-h-[80vh] flex flex-col items-center justify-center text-center max-w-2xl">
                <div className="bg-indigo-50 p-6 rounded-full mb-8 animate-pulse">
                    <Sparkles className="w-12 h-12 text-indigo-600" />
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-4">Konu Eksikleri Analizi</h1>
                <p className="text-xl text-gray-600 mb-8">
                    Yapay zeka destekli konu analizi modülü çok yakında yayında! Deneme sonuçlarına göre hangi konularda eksiğin olduğunu ve nokta atışı çalışma önerilerini burada bulacaksın.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-12">
                    <Card className="p-6 text-left border-l-4 border-l-indigo-500 hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-gray-900 mb-2">Detaylı Konu Haritası</h3>
                        <p className="text-sm text-gray-600">Matematik, Fen ve diğer derslerdeki konu kazanımlarına göre başarı oranların.</p>
                    </Card>
                    <Card className="p-6 text-left border-l-4 border-l-purple-500 hover:shadow-md transition-shadow">
                        <h3 className="font-bold text-gray-900 mb-2">Akıllı Öneriler</h3>
                        <p className="text-sm text-gray-600">"Türevde eksiğin var, şu videoları izle" gibi kişiselleştirilmiş tavsiyeler.</p>
                    </Card>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/dashboard/net-takip">
                        <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                            <TrendingUp className="w-4 h-4 mr-2" />
                            Şimdilik Netlerini Takip Et
                        </Button>
                    </Link>
                    <Link href="/dashboard">
                        <Button size="lg" variant="outline">
                            Panele Dön
                        </Button>
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}
