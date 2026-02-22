import Link from "next/link";
import { Rocket } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t bg-gray-50 dark:bg-gray-900">
            <div className="container py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Rocket className="h-6 w-6 text-indigo-600" />
                            <span className="font-bold text-xl">KariyerRehberi.ai</span>
                        </div>
                        <p className="text-sm text-gray-500 max-w-xs">
                            Yapay zeka destekli kariyer analizi ile geleceğini şansa bırakma. Lise ve üniversite öğrencileri için Türkiye'nin en kapsamlı rehberi.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><Link href="/#features" className="hover:text-indigo-600">Özellikler</Link></li>
                            <li><Link href="/test" className="hover:text-indigo-600">Kariyer Testi</Link></li>
                            <li><Link href="/blog" className="hover:text-indigo-600">Başarı Blogu</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Hızlı Erişim</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><Link href="/dashboard/profile" className="hover:text-indigo-600">Profil Ayarları</Link></li>
                            <li><Link href="/dashboard/net-takip" className="hover:text-indigo-600">Net Takip</Link></li>
                            <li><Link href="/mentor-basvuru" className="hover:text-indigo-600">Mentorluk</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">Yasal</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li className="opacity-50 underline decoration-dotted cursor-help" title="Yakında eklenecek">Gizlilik Politikası</li>
                            <li className="opacity-50 underline decoration-dotted cursor-help" title="Yakında eklenecek">Kullanım Şartları</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} KariyerRehberi.ai. Tüm hakları saklıdır.
                </div>
            </div>
        </footer>
    );
}
