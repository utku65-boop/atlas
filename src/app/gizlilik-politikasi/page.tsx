import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata = {
    title: "Gizlilik Politikası | KariyerRehberi.ai",
    description: "KariyerRehberi.ai Gizlilik Politikası",
};

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen flex flex-col font-sans">
            <Header />
            <main className="flex-1 py-16 bg-gray-50 dark:bg-gray-950">
                <div className="container max-w-4xl mx-auto bg-white dark:bg-gray-900 p-8 md:p-12 rounded-2xl shadow-sm border">
                    <h1 className="text-3xl font-bold mb-8">Gizlilik Politikası</h1>

                    <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-6">
                        <p>
                            Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}
                        </p>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">1. Toplanan Veriler</h2>
                            <p>
                                KariyerRehberi.ai olarak, sizlere daha iyi hizmet verebilmek amacıyla ad, soyad, e-posta adresi,
                                eğitim durumu ve kariyer hedefleri gibi kişisel verilerinizi toplamaktayız. Yapılan kariyer testlerinin
                                sonuçları da analiz amaçlı olarak kaydedilmektedir.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2. Verilerin Kullanımı</h2>
                            <p>
                                Toplanan verileriniz, size özel kariyer haritası oluşturmak, platform içi deneyiminizi kişiselleştirmek ve
                                uygun mentor eşleşmeleri sağlamak amacıyla kullanılmaktadır. Verileriniz hiçbir koşulda üçüncü şahıslara
                                satılmamaktadır.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. Veri Güvenliği</h2>
                            <p>
                                Kişisel verileriniz, güvenli sunucularda saklanmakta ve endüstri standardı şifreleme yöntemleriyle
                                korunmaktadır. Hesaplarınıza erişim, güvenli kimlik doğrulama protokolleri ile sağlanır.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4. İletişim</h2>
                            <p>
                                Gizlilik politikamız ile ilgili her türlü soru ve önerileriniz için <strong>iletisim@kariyerrehberi.ai</strong>
                                adresi üzerinden bizimle iletişime geçebilirsiniz.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
