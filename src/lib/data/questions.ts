export interface RiasecWeights {
    R: number;
    I: number;
    A: number;
    S: number;
    E: number;
    C: number;
}

export interface Option {
    id: string;
    text: string;
    weights: RiasecWeights;
}

export interface Question {
    id: string;
    text: string;
    options: Option[];
}

export const questions: Question[] = [
    {
        id: "13ec9af0-552d-43d5-8425-6dc24cebfc8d",
        text: "Mars kolonisine giden ilk ekiptesin ve yaşam destek ünitesinde kritik bir sızıntı tespit edildi. Zamanın çok az, ne yaparsın?",
        options: [
            { id: "0ba379ce-419c-4330-bd87-a1d3fc12fd18", text: "Panikleyen ekibi sakinleştirip görev dağılımı yaparım.", weights: { R: 5, I: 5, A: 5, S: 25, E: 45, C: 10 } },
            { id: "7e64caab-2a0e-44e0-a390-deb326e1f618", text: "Hemen alet çantasını kapar, sızıntıyı fiziksel olarak yamamaya çalışırım.", weights: { R: 70, I: 5, A: 5, S: 5, E: 5, C: 10 } },
            { id: "85c6ca14-70f4-409b-a3fc-108cad69b85c", text: "Sensör verilerini inceleyerek sızıntının kök nedenini matematiksel olarak hesaplarım.", weights: { R: 5, I: 50, A: 5, S: 5, E: 5, C: 10 } },
            { id: "b50faf33-e5db-4907-86ec-9e29a72bbb5b", text: "Oksijen tüketim protokollerini acil durum moduna göre yeniden düzenlerim.", weights: { R: 10, I: 5, A: 20, S: 5, E: 5, C: 25 } },
        ]
    },
    {
        id: "1b0698ad-8d3b-415b-8bf4-eb9b4968d5fd",
        text: "Bir siber güvenlik şirketinde stajdasın. Binlerce şifreli dosya arasında gizli bir ipucu olduğu söyleniyor. İlk işin ne olur?",
        options: [
            { id: "0398d0a8-4277-4015-93c8-7366397634e4", text: "Diğer stajyerleri toplayıp iş birliği içinde aramayı planlarım.", weights: { R: 5, I: 5, A: 5, S: 20, E: 45, C: 10 } },
            { id: "115a1416-cecd-4021-a903-5cada3dbef5c", text: "Dosyaların şifreleme paternlerini analiz eden bir algoritma yazarım.", weights: { R: 5, I: 45, A: 5, S: 5, E: 5, C: 10 } },
            { id: "b26bd541-8477-4fdf-bbb3-d8cf4664abf6", text: "Bu karmaşayı görselleştirecek, ipucunu fark ettirecek bir arayüz tasarlarım.", weights: { R: 5, I: 10, A: 25, S: 5, E: 5, C: 10 } },
            { id: "fed19c31-3f61-4c5c-8df8-13c832aa5003", text: "Dosya sunucularını fiziksel olarak kontrol eder, kabloları ve donanımı elden geçiririm.", weights: { R: 70, I: 5, A: 5, S: 5, E: 5, C: 10 } },
        ]
    },
    {
        id: "341376d4-549e-4010-8233-6dda94cdbb09",
        text: "Dünyanın en büyük oyun stüdyolarından birinde proje yöneticisi oldun. Yeni oyunun çıkışına 24 saat kala büyük bir hata çıktı. Tavrın ne olur?",
        options: [
            { id: "0b6b2f00-0b7b-4566-b396-0c7f2f988dbf", text: "Hatanın raporunu çıkarıp adım adım çözüm dökümanı hazırlarım.", weights: { R: 5, I: 5, A: 5, S: 5, E: 20, C: 45 } },
            { id: "56c4f4cc-a0ac-4516-9342-7f3b9e57d263", text: "Kodların arasına girip teknik hatayı (bug) düzeltmeye odaklanırım.", weights: { R: 25, I: 5, A: 5, S: 5, E: 10, C: 20 } },
            { id: "64e41bc7-2fa3-4957-897a-e6ff9e8f8720", text: "Hatanın kaynağını oyuncu psikolojisi ve kullanım verileri üzerinden sorgularım.", weights: { R: 5, I: 50, A: 5, S: 5, E: 10, C: 10 } },
            { id: "8689fa01-4ff5-4716-bde0-0586d0935767", text: "Ekibi toplayıp moral aşılarım, riskleri anlatıp onları sabahlamaya ikna ederim.", weights: { R: 5, I: 5, A: 5, S: 20, E: 70, C: 5 } },
        ]
    },
    {
        id: "3f7614f4-fc1f-442d-bb1e-80d167b72231",
        text: "Gelecekte geçen bir film setindesin. Filmin yönetmeni senden sahnenin 'duygusunu' değiştirecek bir şeyler yapmanı istedi. Ne yaparsın?",
        options: [
            { id: "a72d6fa2-e113-41d0-8ecc-2e801f5389f8", text: "Sıra dışı bir ışıklandırma ve soyut bir dekor tasarımı öneririm.", weights: { R: 5, I: 10, A: 45, S: 5, E: 10, C: 5 } },
            { id: "a90261c7-4a8d-4dac-9e3e-e02e0d962db1", text: "Oyuncuların geçmiş performanslarını ve izleyici tepkilerini verilerle analiz ederim.", weights: { R: 5, I: 70, A: 5, S: 5, E: 5, C: 10 } },
            { id: "aad4be7c-56eb-4c9d-ac50-006a0e9fffa7", text: "Çekim takvimini ve sahnelerin akış sırasını milimetrik olarak planlarım.", weights: { R: 5, I: 5, A: 5, S: 10, E: 10, C: 45 } },
            { id: "b91cc2d4-5541-4646-a32f-c4d035609dd1", text: "Oyuncuların yanına gider, onların karakterle bağ kurmasına yardım ederim.", weights: { R: 5, I: 20, A: 5, S: 45, E: 10, C: 5 } },
        ]
    },
    {
        id: "4e61a8ab-fcf2-45af-b702-bc7b97304857",
        text: "Birleşmiş Milletler'de 'Gençlik Delegesi' olarak görevlisin. Bir kriz anında kürsüden binlerce kişiye sesleneceksin. Mesajın ne olur?",
        options: [
            { id: "39762e31-7946-4c66-8738-f29d01fced78", text: "Cesur bir vizyon sunar ve ülkeleri ortak bir amaca yönelik harekete geçiririm.", weights: { R: 5, I: 5, A: 5, S: 10, E: 70, C: 5 } },
            { id: "4f6688d2-2cad-4abe-84dd-06421e71734d", text: "Konuşmanın temposunu, görsel sunumu ve retoriğini bir sanat eseri gibi işlerim.", weights: { R: 5, I: 5, A: 45, S: 5, E: 20, C: 10 } },
            { id: "71637334-4169-4cdc-ae04-f0b0ecfe069e", text: "Konuşmada verilecek bilgilerin doğruluğunu ve kaynakların şeffaflığını garantiye alırım.", weights: { R: 5, I: 10, A: 5, S: 5, E: 10, C: 45 } },
            { id: "b01bceae-368b-49f3-ba95-59f856fa23b2", text: "Söylediklerimin bilimsel temelini ve istatistiksel geçerliliğini vurgularım.", weights: { R: 5, I: 50, A: 5, S: 5, E: 10, C: 10 } },
        ]
    },
    {
        id: "54548ee0-9137-421c-9259-70dd69405aa6",
        text: "Kendi elektrikli araba markanı kurdun. İlk prototipi bugün dünyaya tanıtacaksın. Sunumun odağı ne olur?",
        options: [
            { id: "9d7c33bf-6c3b-4a30-99f8-9d085c755c7e", text: "Arabanın teknik donanımını, motor verimliliğini ve aerodinamik ilkelerini anlatırım.", weights: { R: 5, I: 50, A: 5, S: 5, E: 10, C: 10 } },
            { id: "bed982ce-c1ec-4588-a39a-442674da9abb", text: "Fabrika üretim bandının nasıl sıfır hata ile işleyeceğini açıklarım.", weights: { R: 10, I: 5, A: 5, S: 5, E: 10, C: 45 } },
            { id: "d9036189-a697-44b7-8851-b0f770058b4e", text: "Geleceğin dünyasını hayal ettirir ve markayı bir yaşam stili olarak pazarlarım.", weights: { R: 5, I: 5, A: 10, S: 5, E: 70, C: 5 } },
            { id: "e9de6969-5d4b-4494-b547-2eb1f4276dee", text: "Arabanın dış hatlarının estetiğini ve yarattığı görsel hissi vurgularım.", weights: { R: 5, I: 5, A: 45, S: 5, E: 20, C: 10 } },
        ]
    },
    {
        id: "61a55e86-d34d-4343-80fd-e0484a1415bf",
        text: "Bir arama-kurtarma ekibindesin. Ekipmana hızlıca ihtiyacınız var ancak depodaki envanter kaydı çok eski. Ne yaparsın?",
        options: [
            { id: "0b116181-16b5-492b-8b5a-6cfff92f10d5", text: "Hemen depoya iner, fiziksel olarak kutuları açıp ihtiyacımız olanları bulurum.", weights: { R: 30, I: 5, A: 5, S: 5, E: 10, C: 20 } },
            { id: "5e75d7c6-23c3-4c91-87c1-38b6da826152", text: "Diğer kurtarma ekipleriyle telsizden iletişime geçip onlardan destek isterim.", weights: { R: 5, I: 20, A: 5, S: 45, E: 10, C: 5 } },
            { id: "709ad36c-ea23-4595-b031-b0ce802a7392", text: "Envanter sistemini baştan organize eder, bundan sonraki karışıklıkları önleyecek bir düzen kurarım.", weights: { R: 5, I: 10, A: 5, S: 5, E: 5, C: 70 } },
            { id: "c9063ec6-094d-473a-888f-d5f1410d2488", text: "Ekibi motive edip mevcut kısıtlı imkanlarla operasyonu başlatma Kararı alırım.", weights: { R: 5, I: 5, A: 25, S: 5, E: 45, C: 15 } },
        ]
    },
    {
        id: "6a84ab8e-91d7-4889-8ab5-f4931e6dd4b6",
        text: "Bir bilim kurgu oyununun dünyasını tasarlıyorsun. Oyuncunun kendini başka bir gezegende hissetmesi için önceliğin ne olur?",
        options: [
            { id: "0a4d6bd8-2587-4dd9-9921-898bd01c16da", text: "Gezegenin fizik kurallarını ve ekosistemini bilimsel temellere oturturum.", weights: { R: 5, I: 50, A: 5, S: 5, E: 10, C: 10 } },
            { id: "2282aca0-c0b5-4552-b5a2-420bb3cca9eb", text: "Oyun içindeki 'eşya toplama' ve 'gelişim' sisteminin hatasız çalışmasını sağlarım.", weights: { R: 5, I: 10, A: 5, S: 5, E: 10, C: 45 } },
            { id: "dbf8f7a4-b7ae-47bc-be06-9236dae76c6e", text: "Oyunun pazarlama stratejisini çıkarır ve en çok ilgi çekecek özellikleri belirlerim.", weights: { R: 5, I: 10, A: 5, S: 25, E: 20, C: 20 } },
            { id: "76254954-820d-4769-ac74-52db12bbc836", text: "Tamamen orijinal bitkiler, gökyüzü renkleri ve mimari bir doku hayal ederim.", weights: { R: 5, I: 5, A: 70, S: 10, E: 5, C: 5 } },
        ]
    },
    {
        id: "752bc8df-1ba4-434f-99b8-ee705b5c7300",
        text: "Eski bir saatin iç mekanizması bozuldu. Tamir edilmezse bu tarihi eser çöp olacak. Müdahalen ne olur?",
        options: [
            { id: "13ceb052-fb5c-4ec9-947c-9573cfc66935", text: "Tamir sürecini aşama aşama planlar, her parçanın yerini tek tek kaydederim.", weights: { R: 5, I: 5, A: 5, S: 10, E: 20, C: 45 } },
            { id: "8f607151-e5fc-44c1-8bee-77414e0406e3", text: "Saatin çalışma prensibini analiz eder, hangi dişlinin neden aşındığını araştırırım.", weights: { R: 5, I: 50, A: 5, S: 5, E: 5, C: 10 } },
            { id: "aaf49bec-9a80-46a4-85c3-6df328497429", text: "Saatin kadranını ve akreplerini daha sanatsal bir görünüme kavuşturmak isterim.", weights: { R: 5, I: 5, A: 30, S: 5, E: 10, C: 5 } },
            { id: "b31b9205-4da8-456e-b421-e1911818df73", text: "Hemen tornavida ve büyüteci alır, o küçük dişliyi yerinden söküp onarırım.", weights: { R: 70, I: 5, A: 5, S: 5, E: 5, C: 10 } },
        ]
    },
    {
        id: "7bac27c4-6cf7-46de-af5f-550d4d2b5af9",
        text: "Köy okulundaki öğrencilere teknoloji eğitimi veriyorsun. Bir öğrenci konuyu anlamadığı için ağlamaya başladı. Nasıl yaklaşırsın?",
        options: [
            { id: "43e23720-c833-4ece-9fec-1298012d09f2", text: "Eğitim materyallerini öğrencinin kapasitesine göre tekrar analiz eder ve sadeleştiririm.", weights: { R: 5, I: 50, A: 5, S: 10, E: 5, C: 15 } },
            { id: "6c48c944-eb00-42dc-a65f-f7e20902a45d", text: "Dersi durdururum, öğrencinin yanına gidip ona moral verir ve her şeyi başarabileceğine inandırırım.", weights: { R: 5, I: 5, A: 5, S: 70, E: 10, C: 5 } },
            { id: "bc8c7682-dcdf-41e1-96ba-b3f2772c40ed", text: "Dersi daha eğlenceli hale getirecek bir yarışma kurgulayarak ilgiyi tekrar toplarım.", weights: { R: 5, I: 10, A: 5, S: 20, E: 45, C: 15 } },
            { id: "b54c8e65-1019-48ff-945e-cbfa0ea038ce", text: "Sınıftaki diğer başarılı öğrencilerden yardım alarak küçük çalışma grupları oluştururum.", weights: { R: 10, I: 5, A: 5, S: 20, E: 20, C: 40 } },
        ]
    },
    {
        id: "7f9a8cec-13f0-47d1-ad9c-a7f014a68443",
        text: "Dijital bir sanat galerisi açıyorsun. Gelen ziyaretçilerin 'akılda kalıcı' bir deneyim yaşamasını istiyorsun. Ne hazırlarsın?",
        options: [
            { id: "17d6002f-0f8e-45b5-9da4-993983e4b0ba", text: "Serginin akış planını, küratör dökümanlarını ve kurumsal raporlarını kusursuz hazırlarım.", weights: { R: 5, I: 10, A: 20, S: 5, E: 10, C: 45 } },
            { id: "8011cc75-b229-497f-9764-890e4e05b7cb", text: "Büyük markaları sergiye sponsor olmaya ikna eder, geniş bir bütçe yönetirim.", weights: { R: 5, I: 5, A: 5, S: 10, E: 45, C: 15 } },
            { id: "af200f5f-ffa9-4af4-be30-3940bb3908c8", text: "Sergideki VR gözlüklerin ve projeksiyonların teknik bakımını üstlenirim.", weights: { R: 30, I: 5, A: 10, S: 5, E: 5, C: 10 } },
            { id: "c5b5663b-f42f-495f-959b-31ee27acd1f9", text: "Işık, ses ve hareketle duyulara hitap eden sürreal bir enstalasyon tasarlarım.", weights: { R: 5, I: 5, A: 70, S: 5, E: 10, C: 5 } },
        ]
    },
    {
        id: "8004760b-1a88-4b92-9502-88234be27665",
        text: "Bir yapay zeka projesi beklenen sonuçları vermedi ve bütçe hızla tükeniyor. Yatırımcılar açıklama bekliyor. Ne yaparsın?",
        options: [
            { id: "122ac0f7-d064-4151-b7eb-4da0954d65d3", text: "Projenin tüm harcama ve zaman çizelgesini şeffaf bir şekilde raporlarım.", weights: { R: 5, I: 10, A: 5, S: 5, E: 10, C: 45 } },
            { id: "d7095c91-95b7-49fa-bdf2-c750f3fa3c48", text: "Yatırımcılarla birebir görüşüp onlara projenin gelecekteki potansiyelini anlatır, zaman isterim.", weights: { R: 5, I: 5, A: 5, S: 30, E: 45, C: 10 } },
            { id: "e44a861b-a036-4d6d-9981-53e7b7222534", text: "Algoritmanın içindeki mantıksal hatayı bulmak için kodları en başından itibaren denetlerim.", weights: { R: 5, I: 70, A: 5, S: 5, E: 5, C: 10 } },
            { id: "e5970576-a299-43fa-bca3-50683d81e946", text: "Projeyi tamamen farklı ve yaratıcı bir kullanım alanına (pivot) kaydırmayı öneririm.", weights: { R: 5, I: 10, A: 45, S: 5, E: 10, C: 5 } },
        ]
    },
    {
        id: "8692f81b-7c1d-4f7f-93f4-df8565c5f2dc",
        text: "Devasa bir akıllı şehrin trafik ağını yöneten sistemde bir aksaklık var. Şehir felç olmuş durumda. Nasıl bir çözüm üretirsin?",
        options: [
            { id: "1860a446-6035-4764-9364-f9544ee6bf48", text: "Sivil toplum kuruluşlarıyla koordine olup halkı bilgilendirir ve güvenliği sağlarım.", weights: { R: 5, I: 5, A: 5, S: 10, E: 70, C: 5 } },
            { id: "7fd90fbf-7e55-4083-a1a2-e2d3e2c85e7c", text: "Şehrin silüetini ve trafik lambalarını daha estetik bir şekilde yeniden kurgularım.", weights: { R: 5, I: 5, A: 45, S: 5, E: 20, C: 10 } },
            { id: "9b60fda8-48e6-42e8-a832-2d544c1c17a3", text: "Trafik akış verilerini dijital bir tabloya döker, tıkanıklık noktalarını kronometreyle ölçerim.", weights: { R: 5, I: 10, A: 5, S: 5, E: 5, C: 70 } },
            { id: "a130386e-fba3-424e-970b-486032902374", text: "Hemen olay yerine gider, fiziksel olarak trafik sinyal kutularını açıp donanımsal arızayı gideririm.", weights: { R: 30, I: 5, A: 5, S: 5, E: 10, C: 20 } },
        ]
    },
    {
        id: "966cd973-2a92-43d7-a3de-bc6da09f4978",
        text: "Bir kriz bölgesinde yardım dağıtıyorsun. Ancak kaynaklar yetersiz ve insanlar arasında gerilim artıyor. Nasıl bir tutum sergilersin?",
        options: [
            { id: "728bb9e2-7a85-4da6-be8d-7b6aca96842d", text: "Yardım dağıtım listesini ve lojistik akışı milimetrik bir düzenle disipline ederim.", weights: { R: 5, I: 5, A: 5, S: 5, E: 10, C: 45 } },
            { id: "8c3c7a79-8bab-48aa-9c89-f2f651303a7b", text: "Olayların sosyal etkilerini ve psikolojik temellerini analiz edip rapor hazırlarım.", weights: { R: 5, I: 10, A: 5, S: 20, E: 5, C: 45 } },
            { id: "f16ea78f-5ce6-4230-b00c-b004dd3a8216", text: "Çevredeki yerel güç odaklarıyla görüşüp daha fazla kaynak için pazarlık yaparım.", weights: { R: 5, I: 10, A: 5, S: 10, E: 45, C: 15 } },
            { id: "f4bfe45a-2593-4ac0-96ff-ff8f3c0fb8fe", text: "İnsanlarla göz teması kurar, onları dinler ve bu zor süreci beraber aşacağımıza dair güven veririm.", weights: { R: 5, I: 5, A: 5, S: 70, E: 10, C: 5 } },
        ]
    },
    {
        id: "9688ee0a-58bf-4541-918e-8210c799ace3",
        text: "Kendi podcast kanalını kuruyorsun ve ilk konuğun dünyaca ünlü bir dahi. Yayının en çarpıcı kısmı ne olmalı?",
        options: [
            { id: "5c8db57f-b41a-4971-9c1b-5527bddea356", text: "Konuğu zor sorularla sıkıştırıp yayının sosyal medyada viral olmasını sağlayacak bir 'manşet' yakalarım.", weights: { R: 5, I: 10, A: 5, S: 10, E: 45, C: 15 } },
            { id: "68b5fab4-d197-4f1d-875e-7a0d054b48e6", text: "Yayını sadece bir ses kaydı değil, bir sanat performansı gibi hissettirecek ses tasarımlarıyla süslerim.", weights: { R: 5, I: 5, A: 70, S: 5, E: 10, C: 5 } },
            { id: "db6ae42f-17ca-490f-bf62-1358aba11709", text: "Konuğun buluşlarının teknik derinliğini ve karmaşık teorilerini basitleştirip dinleyiciye kanıtlarla sunarım.", weights: { R: 5, I: 50, A: 5, S: 5, E: 10, C: 10 } },
            { id: "df7ecc3d-2776-4d4e-a0e4-c936e915e787", text: "Yayının teknik altyapısını, mikrofon ayarlarını ve yayın sonrası düzenlemeyi (montaj) milisaniyelik bir titizlikle yaparım.", weights: { R: 5, I: 10, A: 5, S: 5, E: 5, C: 45 } },
        ]
    },
    {
        id: "a5361eda-c954-41a3-ac66-5d852f90b133",
        text: "Şehrinde büyük bir 'Sürdürülebilir Gelecek' festivali düzenleniyor. En çok hangi görevde başarılı olursun?",
        options: [
            { id: "1829f853-9ec4-4564-8ca1-ccbcabdfa92f", text: "Festivalin görsel kimliğini ve dijital içeriklerini tasarlayıp yeni bir akım başlatırım.", weights: { R: 5, I: 5, A: 45, S: 5, E: 20, C: 10 } },
            { id: "a6a698f9-39c8-498a-aec3-9f7cc4955b50", text: "Festivalin bütçe planlamasını ve sponsor hakedişlerini büyük bir disiplinle takip ederim.", weights: { R: 5, I: 10, A: 5, S: 5, E: 20, C: 45 } },
            { id: "ad7fc10f-b2bc-4186-89ab-c6f6a01f8a58", text: "Medya ile ilişkileri yönetir, festivalin ses getirmesi için büyük kurumlarla anlaşmalar yaparım.", weights: { R: 5, I: 5, A: 5, S: 10, E: 70, C: 5 } },
            { id: "bcf3aa1d-eb74-4e56-afd4-09ead632dcc6", text: "Festival alanındaki güneş panellerinin kurulumuna yardım eder, teknik aksaklıkları yerinde çözerim.", weights: { R: 30, I: 5, A: 5, S: 5, E: 10, C: 20 } },
        ]
    },
    {
        id: "b262b358-667c-41f7-bf52-ed3ca46c3d9a",
        text: "Kripto para piyasalarında büyük bir dalgalanma var. Yatırım danışmanı olarak bir karar vermelisin. Tavrın ne olur?",
        options: [
            { id: "761b09ae-fe5b-4a9b-9f36-a5ba29001072", text: "Piyasayı saniyelik verilerle izler, tüm işlemleri kayıt altına alıp risk analizi yaparım.", weights: { R: 5, I: 10, A: 5, S: 5, E: 5, C: 70 } },
            { id: "b052eada-df68-49d7-8586-3ccaae265d34", text: "Sosyal medyadaki toplulukların duygusal tepkilerini ve korku endeksini araştırırım.", weights: { R: 5, I: 20, A: 5, S: 45, E: 10, C: 5 } },
            { id: "cc3830ae-eb38-41ae-9aa4-2cf1cfc6f8f4", text: "Bu krizi bir fırsata çevirip çevremi büyük yatırımlar yapmaya ikna ederim.", weights: { R: 5, I: 5, A: 25, S: 5, E: 45, C: 15 } },
            { id: "e36f57d8-2538-4ca9-9b5c-6514573d34dd", text: "Sunucu altyapısını ve güvenliğini kontrol eder, teknik işlemlerde kopukluk olmadığından emin olurum.", weights: { R: 30, I: 5, A: 5, S: 5, E: 10, C: 20 } },
        ]
    },
    {
        id: "b28bb2df-4d7d-4fd8-8d9b-c9f2c26defcd",
        text: "Kapsamlı bir uzay teleskobunun 10 yıllık gözlem arşivini düzenliyorsun. Milyonlarca veri arasında düzen kurman gerekiyor. Ne yaparsın?",
        options: [
            { id: "1aaf74a3-4478-4e10-aa65-d307d3b60df8", text: "Ekibin motivasyonunu yüksek tutar, bu devasa verinin bilim dünyası için önemini onlara hatırlatırım.", weights: { R: 5, I: 5, A: 5, S: 30, E: 45, C: 10 } },
            { id: "65ff8ab9-ef5a-45b8-85f3-a4287bb7ba7d", text: "Verileri kategorize eder, isimlendirme standartları belirler ve kusursuz bir arşiv sistemi kurarım.", weights: { R: 5, I: 10, A: 5, S: 5, E: 5, C: 70 } },
            { id: "ad34bb3b-3895-4fad-8d30-bb2a525dc283", text: "Verileri görsel bir yıldız haritasına dönüştürür, insanların evreni daha estetik görmesini sağlarım.", weights: { R: 5, I: 5, A: 45, S: 5, E: 20, C: 10 } },
            { id: "eca32b42-cdb4-4f76-bcce-c6741af65062", text: "Teleskobun depolama birimlerini ve teknik altyapısını kontrol eder, veri kaybını önlerim.", weights: { R: 25, I: 5, A: 5, S: 5, E: 10, C: 20 } },
        ]
    },
    {
        id: "b9ab826b-01b3-4bfc-bb53-5483f35ae7e5",
        text: "Issız bir adada mahsur kaldın ve elinde sadece bozuk bir radyo var. Kurtulmak için ilk hamlen ne olur?",
        options: [
            { id: "051b2ea6-b21f-4cee-b9c7-87e4a7c5e2cf", text: "Etraftaki diğer kazazedeleri organize eder, barınak ve su bulma görevlerini paylaştırırım.", weights: { R: 5, I: 5, A: 5, S: 20, E: 45, C: 10 } },
            { id: "0d20f51a-30bc-4dc1-be76-1e946da1292a", text: "Kumun üzerine devasa ve sanatsal bir 'YARDIM' yazısı tasarlar, helikopterlerin dikkatini çekerim.", weights: { R: 5, I: 10, A: 30, S: 5, E: 5, C: 5 } },
            { id: "4e857539-4b55-4240-8a62-98ef133fc9fc", text: "Radyoyu parçalarına ayırır, içindeki devreleri ve kabloları fiziksel olarak onarmaya çalışırım.", weights: { R: 70, I: 5, A: 5, S: 5, E: 5, C: 10 } },
            { id: "58fbb68f-6dbd-4e75-8f85-8a6a319d7e10", text: "Yıldızların konumunu ve rüzgarın yönünü inceleyerek adanın tam koordinatlarını hesaplarım.", weights: { R: 5, I: 45, A: 5, S: 5, E: 5, C: 10 } },
        ]
    },
    {
        id: "bb722a4a-aec3-4b5a-a5ce-7214dbbf72e3",
        text: "Yeni nesil bir akıllı gözlük için kullanıcı arayüzü tasarlanacak. Senin önceliğin ne olurdu?",
        options: [
            { id: "12ebbeb6-f1f2-4616-b4e0-f2c6a92a7304", text: "Kullanıcıyı büyüleyecek, daha önce hiç görülmemiş soyut ve fütüristik bir görsel dil oluştururum.", weights: { R: 5, I: 5, A: 70, S: 5, E: 10, C: 5 } },
            { id: "976c6b53-b9ef-48db-a15f-9270d0c73d08", text: "Göz takip verilerini ve beyin dalgası etkileşimlerini bilimsel olarak analiz eder, en verimli akışı bulurum.", weights: { R: 5, I: 50, A: 5, S: 5, E: 10, C: 10 } },
            { id: "e73f90f6-5762-4a95-947c-4a6e30793e8a", text: "Arayüzün her bir pikselinin ve kod satırının hatasız çalışmasını, sistem optimizasyonunu sağlarım.", weights: { R: 5, I: 10, A: 5, S: 5, E: 10, C: 45 } },
            { id: "f68add2a-fa43-4c0b-96d9-3aa631fe68bc", text: "Tasarımı test edecek geniş bir kullanıcı grubu toplar, onların duygusal tepkilerini raporlarım.", weights: { R: 5, I: 5, A: 5, S: 25, E: 45, C: 15 } },
        ]
    },
    {
        id: "cacafac3-b63b-4cd1-a200-27df10c52cd3",
        text: "Gizemli bir antik kentte kazı yaparken bilinmeyen sembollerle dolu bir yazıt buldun. Nasıl bir yol izlersin?",
        options: [
            { id: "5ed34a5f-3226-4963-8afd-9c8c400f8084", text: "Sembollerin estetiğinden ve hikayesinden yola çıkarak antik halkın hayal gücünü anlamaya çalışırım.", weights: { R: 5, I: 10, A: 30, S: 5, E: 20, C: 5 } },
            { id: "d3591326-4e25-4107-b251-8b32324da3e7", text: "Sembolleri dijital ortama aktarır, frekans analizi yaparak diller arası bağlantıları araştırırım.", weights: { R: 5, I: 70, A: 5, S: 5, E: 5, C: 10 } },
            { id: "d98e86d8-8457-4e01-be26-fe11fe0912c2", text: "Diğer arkeologlarla ve yerel rehberlerle konuşup sembollerin bölgesel mitlerdeki yerini sorarım.", weights: { R: 5, I: 20, A: 5, S: 45, E: 10, C: 5 } },
            { id: "ec325796-bef7-42bd-b228-6f52e01867da", text: "Yazıtı çok hassas bir şekilde paketler, laboratuvara sevkiyatı için lojistik plan yaparım.", weights: { R: 25, I: 5, A: 5, S: 5, E: 10, C: 20 } },
        ]
    },
    {
        id: "db714a0a-c973-4290-9418-dbc0ced3d6db",
        text: "Yapay zeka asistanın etik dışı bir karar vermek üzere olduğunu fark ettin. Müdahalen ne olur?",
        options: [
            { id: "02905206-9198-42d8-8c99-11e0acfb559d", text: "Asistanın algoritmasındaki 'karar ağaçlarını' ve veri setindeki yanlılığı (bias) teknik olarak sorgularım.", weights: { R: 5, I: 45, A: 5, S: 10, E: 10, C: 5 } },
            { id: "296f6a3b-e052-4a43-aed3-fbd385f63507", text: "Asistanla bir 'sohbet' başlatır, ona insani değerleri ve empatinin neden önemli olduğunu öğretmeye çalışırım.", weights: { R: 5, I: 5, A: 5, S: 70, E: 10, C: 5 } },
            { id: "468dc572-c0e7-4bc8-a923-030f08a2d5d0", text: "Asistanı hemen kapatır, güvenlik protokollerini baştan aşağı resmi dökümanlara göre güncellerim.", weights: { R: 5, I: 10, A: 5, S: 20, E: 5, C: 45 } },
            { id: "93e4c710-9c95-4d92-92ed-3021c57e7af9", text: "Bu durumu bir kriz yönetimi projesine dönüştürür, şirket yönetimine çözüm raporu sunarım.", weights: { R: 5, I: 5, A: 5, S: 20, E: 45, C: 10 } },
        ]
    },
    {
        id: "deabb520-f696-44f3-8cb1-673c215e8054",
        text: "Birleşmiş Milletler'de 'Küresel Barış Elçisi' seçildin. İki rakip ülke arasındaki gerilimi düşürmek için ne yaparsın?",
        options: [
            { id: "05d3935b-fc2d-4c1e-a741-5805d288e8e5", text: "İki tarafın liderlerini bir araya getirip ortak insani değerleri vurguladığım bir moderasyon yürütürüm.", weights: { R: 5, I: 5, A: 5, S: 70, E: 10, C: 5 } },
            { id: "80bb7176-8aa8-4c8f-b31e-f0ce44be5860", text: "Barışın simgesi olacak, iki ülkeyi birleştiren fütüristik bir sanat projesi öneririm.", weights: { R: 5, I: 5, A: 30, S: 10, E: 20, C: 10 } },
            { id: "8323bc18-e0ab-4a74-8bfd-f58e943375aa", text: "Uluslararası hukuk dökümanlarını inceleyip iki taraf için de adil olacak bir ateşkes taslağı hazırlarım.", weights: { R: 5, I: 10, A: 5, S: 20, E: 5, C: 45 } },
            { id: "a779091a-0289-4f39-a68e-12b17395e1e8", text: "Sürece hız katmak için bölgesel güçlerle pazarlık yapar, her iki taraf için de cazip ekonomik teşvikler sunarım.", weights: { R: 5, I: 10, A: 5, S: 5, E: 10, C: 45 } },
        ]
    },
    {
        id: "f8f0bc32-225d-4661-97e3-36ff3849e25f",
        text: "Geleceğin dünyasında 'Duygu Bankası' yöneticisisin. İnsanların en değerli anılarını koruyorsun. Güvenlik zafiyeti oluştuğunda ne yaparsın?",
        options: [
            { id: "9dd31d81-b59a-49b2-bf27-aaa52c80dfe2", text: "Anıların saklandığı görsel arayüzü ve estetiği koruyarak sızıntıyı gizlemeye çalışırım.", weights: { R: 10, I: 10, A: 45, S: 5, E: 10, C: 5 } },
            { id: "dc781c8a-89e1-4d0d-bb0c-7482b4453bb8", text: "Hemen sistem loglarını inceler, sızıntının kaynağını ve hangi anıların etkilendiğini dökümante ederim.", weights: { R: 20, I: 5, A: 5, S: 5, E: 10, C: 45 } },
            { id: "dd4fe474-982f-4c17-a4f9-0ff7a029f1ba", text: "Zafiyeti halka açıklar, şeffaf bir kampanya ile özür diler ve telafi sözü veririm.", weights: { R: 5, I: 10, A: 5, S: 30, E: 45, C: 5 } },
            { id: "e7290d4c-d5c3-4667-8819-576b20425f81", text: "Zafiyetin altındaki psikolojik manipülasyon tekniklerini analiz eder, saldırganın motivasyonunu araştırırım.", weights: { R: 5, I: 70, A: 5, S: 5, E: 5, C: 10 } },
        ]
    }
];
