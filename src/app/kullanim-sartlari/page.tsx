import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata = {
    title: "Kullanım Şartları | KariyerRehberi.ai",
    description: "KariyerRehberi.ai Kullanım Şartları",
};

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen flex flex-col font-sans">
            <Header />
            <main className="flex-1 py-16 bg-gray-50 dark:bg-gray-950">
                <div className="container max-w-4xl mx-auto bg-white dark:bg-gray-900 p-8 md:p-12 rounded-2xl shadow-sm border">
                    <h1 className="text-3xl font-bold mb-8">Kullanım Şartları</h1>

                    <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 space-y-6">
                        <p>
                            Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}
                        </p>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">1. Taraflar ve Konu</h2>
                            <p>
                                Bu kullanım şartları, KariyerRehberi.ai platformunu kullanan tüm üyeler ile platform yönetimi
                                arasındaki yasal sözleşmeyi ifade eder. Sisteme üye olan herkes bu şartları kabul etmiş sayılır.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">2. Hizmetlerin İçeriği</h2>
                            <p>
                                KariyerRehberi.ai, öğrencilere yapay zeka destekli kariyer analizi, net takibi ve mentorluk
                                hizmetleri sunan çevrimiçi bir platformdur. Platform, sağlanan bilgilerin doğruluğunu artırmak
                                için çalışsa da %100 kesinlik garantisi vermez.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">3. Kullanıcı Yükümlülükleri</h2>
                            <p>
                                Kullanıcılar, platforma sağladıkları bilgilerin (profil, deneme sonuçları vs.) doğru olduğunu
                                beyan eder. Başkasına ait bilgilerin izinsiz kullanımı durumunda hesap askıya alınabilir.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">4. Hesap İptali ve Fesih</h2>
                            <p>
                                Şirket, kurallara uymayan, zararlı faaliyetlerde bulunan veya yasa dışı işlem yapan hesapları
                                önceden bildirmeksizin kapatma hakkını saklı tutar. Kullanıcılar da diledikleri zaman hesaplarını
                                silebilirler.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
