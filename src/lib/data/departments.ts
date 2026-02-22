export type RiasecType = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';

export interface Course {
    name: string;
    description: string;
}

export interface UniversityTarget {
    name: string;
    score: number;
    city?: string;
    type?: 'Devlet' | 'Vakıf' | 'KKTC' | 'Yurtdışı';
    scholarship?: 'Ücretli' | 'Burslu' | '%50 İndirimli' | '%25 İndirimli';
}

export interface Department {
    id: string;
    name: string;
    scores: {
        R: number;
        I: number;
        A: number;
        S: number;
        E: number;
        C: number;
    };
    description: string;
    courses: Course[];
    codes: string[]; // Top 3 RIASEC codes
    salaryProjection: {
        entry: number;
        experienced: number;
        senior: number;
    };
    careerPaths: string[];
    aiRiskScore: number; // 0-100% replacement risk
    yksFocusAttributes: string[];
    scoreType: 'SAY' | 'EA' | 'SOZ' | 'DIL';
    minScore: number; // General base score
    universityTargets: UniversityTarget[];
}

export const DEPARTMENTS: Department[] = [
    {
        id: "55",
        name: "Makine Mühendisliği",
        scores: { R: 80, I: 60, A: 10, S: 10, E: 30, C: 40 },
        codes: ["R", "I", "C"],
        description: "Makine Mühendisliği; mekanik sistemlerin tasarımı, analizi ve üretimi üzerine odaklanan temel bir mühendislik disiplinidir.",
        courses: [
            { name: "Termodinamik", description: "Enerji, ısı ve iş kavramlarını inceler." },
            { name: "Mukavemet", description: "Malzemelerin yük altındaki davranışını analiz eder." },
            { name: "Makine Elemanları", description: "Dişli, mil ve rulman gibi makine parçalarının tasarım prensiplerini kapsar." }
        ],
        salaryProjection: { entry: 35000, experienced: 65000, senior: 110000 },
        careerPaths: ["Makine Mühendisi", "Ar-Ge Uzmanı", "Üretim Müdürü", "Enerji Sistemleri Mühendisi"],
        aiRiskScore: 35,
        yksFocusAttributes: ["TYT Matematik", "AYT Fizik", "Türev-İntegral", "Geometri"],
        scoreType: 'SAY',
        minScore: 420,
        universityTargets: [
            { name: "ODTÜ", score: 515 },
            { name: "İTÜ", score: 505 },
            { name: "Yıldız Teknik", score: 480 },
            { name: "Gazi Üniversitesi", score: 450 }
        ]
    },
    {
        id: "56",
        name: "Elektrik-Elektronik Mühendisliği",
        scores: { R: 75, I: 70, A: 10, S: 5, E: 25, C: 45 },
        codes: ["R", "I", "C"],
        description: "Elektrik-Elektronik Mühendisliği; elektrik enerjisi ve elektronik sistemlerin tasarımı üzerine yoğunlaşır.",
        courses: [
            { name: "Devre Analizi", description: "Elektrik devrelerinin temel analiz yöntemlerini öğretir." },
            { name: "Elektrik Makineleri", description: "Motor ve jeneratörlerin çalışma prensiplerini inceler." },
            { name: "Sayısal Elektronik", description: "Dijital devre ve mantık tasarımını kapsar." }
        ],
        salaryProjection: { entry: 38000, experienced: 70000, senior: 125000 },
        careerPaths: ["Elektrik Mühendisi", "Elektronik Tasarımcısı", "Haberleşme Mühendisi", "Gömülü Yazılım Uzmanı"],
        aiRiskScore: 30,
        yksFocusAttributes: ["AYT Fizik (Elektrik)", "Karmaşık Sayılar", "Trigonometri", "Fonksiyonlar"],
        scoreType: 'SAY',
        minScore: 430,
        universityTargets: [
            { name: "Boğaziçi", score: 535 },
            { name: "ODTÜ", score: 525 },
            { name: "Hacettepe", score: 495 },
            { name: "Ege Üniversitesi", score: 460 }
        ]
    },
    {
        id: "57",
        name: "İnşaat Mühendisliği",
        scores: { R: 80, I: 55, A: 10, S: 15, E: 40, C: 50 },
        codes: ["R", "C", "I"],
        description: "İnşaat Mühendisliği; yapıların tasarımı ve güvenli inşası ile ilgilenir.",
        courses: [
            { name: "Yapı Statiği", description: "Taşıyıcı sistemlerin yük altındaki davranışını analiz eder." },
            { name: "Betonarme", description: "Betonarme yapı tasarım ilkelerini öğretir." },
            { name: "Zemin Mekaniği", description: "Zemin özellikleri ve temel tasarımını inceler." }
        ],
        salaryProjection: { entry: 32000, experienced: 60000, senior: 100000 },
        careerPaths: ["İnşaat Mühendisi", "Şantiye Şefi", "Yapı Denetim Uzmanı", "Proje Müdürü"],
        aiRiskScore: 40,
        yksFocusAttributes: ["AYT Fizik (Mekanik)", "Geometri (Katı Cisimler)", "Limit-Süreklilik", "Problemler"],
        scoreType: 'SAY',
        minScore: 350,
        universityTargets: [
            { name: "İTÜ", score: 480 },
            { name: "Yıldız Teknik", score: 440 },
            { name: "Dokuz Eylül", score: 400 },
            { name: "Kocaeli Üniversitesi", score: 360 }
        ]
    },
    {
        id: "58",
        name: "Tıp",
        scores: { R: 50, I: 80, A: 5, S: 60, E: 20, C: 35 },
        codes: ["I", "S", "R"],
        description: "Tıp; insan sağlığının korunması ve hastalıkların tedavisi üzerine kapsamlı eğitim sunar.",
        courses: [
            { name: "Anatomi", description: "İnsan vücudunun yapısını inceler." },
            { name: "Fizyoloji", description: "Vücut sistemlerinin işleyişini açıklar." },
            { name: "Patoloji", description: "Hastalıkların hücresel temellerini öğretir." }
        ],
        salaryProjection: { entry: 45000, experienced: 85000, senior: 150000 },
        careerPaths: ["Doktor", "Cerrah", "Aile Hekimi", "Akademisyen"],
        aiRiskScore: 10,
        yksFocusAttributes: ["AYT Biyoloji (Sistemler)", "AYT Kimya (Organik)", "Problem Çözme", "Paragraf"],
        scoreType: 'SAY',
        minScore: 500,
        universityTargets: [
            { name: "Hacettepe", score: 545 },
            { name: "Cerrahpaşa", score: 540 },
            { name: "Ankara Tıp", score: 525 },
            { name: "Ege Tıp", score: 515 }
        ]
    },
    {
        id: "59",
        name: "Bilgisayar Mühendisliği",
        scores: { R: 60, I: 85, A: 10, S: 10, E: 25, C: 50 },
        codes: ["I", "R", "C"],
        description: "Bilgisayar Mühendisliği; yazılım ve donanım sistemlerinin geliştirilmesini kapsar.",
        courses: [
            { name: "Veri Yapıları ve Algoritmalar", description: "Etkin algoritma tasarımını öğretir." },
            { name: "İşletim Sistemleri", description: "Bilgisayar kaynak yönetimini açıklar." },
            { name: "Veritabanı Sistemleri", description: "Veri modelleme ve sorgulama tekniklerini kapsar." }
        ],
        salaryProjection: { entry: 40000, experienced: 80000, senior: 140000 },
        careerPaths: ["Yazılım Mühendisi", "Veri Bilimci", "Sistem Mimarı", "Siber Güvenlik Uzmanı"],
        aiRiskScore: 45,
        yksFocusAttributes: ["TYT Matematik (Mantık)", "Fonksiyonlar", "Olasılık", "Sayısal Mantık"],
        scoreType: 'SAY',
        minScore: 450,
        universityTargets: [
            { name: "Boğaziçi", score: 550 },
            { name: "ODTÜ", score: 540 },
            { name: "İTÜ", score: 535 },
            { name: "Gebze Teknik", score: 490 }
        ]
    },
    {
        id: "60",
        name: "İstatistik",
        scores: { R: 40, I: 90, A: 5, S: 10, E: 20, C: 70 },
        codes: ["I", "C", "R"],
        description: "İstatistik; veri analizi ve yorumlama yöntemlerini bilimsel temelde ele alır.",
        courses: [
            { name: "Olasılık Teorisi", description: "Rastlantısal olayların matematiksel temellerini öğretir." },
            { name: "İstatistiksel Çıkarım", description: "Örneklemden sonuç çıkarma yöntemlerini kapsar." },
            { name: "Regresyon Analizi", description: "Değişkenler arası ilişkileri modellemeyi öğretir." }
        ],
        salaryProjection: { entry: 33000, experienced: 65000, senior: 110000 },
        careerPaths: ["Veri Analisti", "Aktüer", "İstatistikçi", "Pazar Araştırmacısı"],
        aiRiskScore: 50,
        yksFocusAttributes: ["PKOB (Permütasyon-Kombinasyon)", "Olasılık", "Grafik Yorumlama", "Fonksiyonlar"],
        scoreType: 'SAY',
        minScore: 380,
        universityTargets: [
            { name: "ODTÜ", score: 470 },
            { name: "Hacettepe", score: 440 },
            { name: "Yıldız Teknik", score: 420 },
            { name: "Mimar Sinan", score: 390 }
        ]
    },
    {
        id: "61",
        name: "Mimarlık",
        scores: { R: 50, I: 50, A: 80, S: 20, E: 40, C: 30 },
        codes: ["A", "R", "I"],
        description: "Mimarlık; estetik ve işlevsel mekân tasarımını öğretir.",
        courses: [
            { name: "Mimari Tasarım Stüdyosu", description: "Proje geliştirme sürecini öğretir." },
            { name: "Yapı Bilgisi", description: "Malzeme ve taşıyıcı sistem bilgisi sağlar." },
            { name: "Mimarlık Tarihi", description: "Mimari akımların gelişimini inceler." }
        ],
        salaryProjection: { entry: 30000, experienced: 60000, senior: 105000 },
        careerPaths: ["Mimar", "İç Mimar", "Şehir Plancısı", "Restorasyon Uzmanı"],
        aiRiskScore: 25,
        yksFocusAttributes: ["Geometri (Uzaysal)", "AYT Fizik", "Görsel Zeka", "Problem Çözme"],
        scoreType: 'SAY',
        minScore: 400,
        universityTargets: [
            { name: "İTÜ", score: 495 },
            { name: "ODTÜ", score: 490 },
            { name: "Mimar Sinan", score: 460 },
            { name: "Yıldız Teknik", score: 450 }
        ]
    },
    {
        id: "62",
        name: "Grafik Tasarım",
        scores: { R: 20, I: 30, A: 90, S: 25, E: 45, C: 15 },
        codes: ["A", "E", "I"],
        description: "Grafik Tasarım; görsel iletişim yoluyla mesaj üretmeyi öğretir.",
        courses: [
            { name: "Tipografi", description: "Yazı karakterlerinin kullanımını öğretir." },
            { name: "Görsel İletişim Tasarımı", description: "Mesajın görsel olarak aktarımını sağlar." },
            { name: "Dijital Tasarım", description: "Grafik yazılımları kullanımını kapsar." }
        ],
        salaryProjection: { entry: 28000, experienced: 50000, senior: 90000 },
        careerPaths: ["Grafik Tasarımcı", "Art Direktör", "UX/UI Tasarımcı", "İllüstratör"],
        aiRiskScore: 60,
        yksFocusAttributes: ["TYT Türkçe (Sözel Mantık)", "TYT Sosyal", "Paragraf", "Tarih"],
        scoreType: 'SOZ',
        minScore: 340,
        universityTargets: [
            { name: "Mimar Sinan", score: 410 },
            { name: "Marmara", score: 390 },
            { name: "Anadolu Üniversitesi", score: 370 },
            { name: "Hacettepe (ÖY)", score: 0 } // Yetenek
        ]
    },
    {
        id: "63",
        name: "Endüstriyel Tasarım",
        scores: { R: 60, I: 40, A: 80, S: 15, E: 35, C: 25 },
        codes: ["A", "R", "I"],
        description: "Endüstriyel Tasarım; kullanıcı odaklı ürün tasarım süreçlerini kapsar.",
        courses: [
            { name: "Ürün Tasarımı Stüdyosu", description: "Konseptten prototipe tasarım sürecini öğretir." },
            { name: "Malzeme ve Üretim Yöntemleri", description: "Üretim tekniklerini inceler." },
            { name: "Ergonomi", description: "İnsan odaklı tasarım prensiplerini açıklar." }
        ],
        salaryProjection: { entry: 32000, experienced: 60000, senior: 100000 },
        careerPaths: ["Endüstriyel Tasarımcı", "Ürün Geliştirme Uzmanı", "Otomotiv Tasarımcısı", "Mobilya Tasarımcısı"],
        aiRiskScore: 35,
        yksFocusAttributes: ["Matematik", "Fizik", "Geometri", "Görsel Algı"],
        scoreType: 'SAY',
        minScore: 390,
        universityTargets: [
            { name: "ODTÜ", score: 485 },
            { name: "İTÜ", score: 480 },
            { name: "Mimar Sinan", score: 430 },
            { name: "Marmara", score: 410 }
        ]
    },
    {
        id: "64",
        name: "Psikoloji",
        scores: { R: 10, I: 60, A: 30, S: 85, E: 25, C: 30 },
        codes: ["S", "I", "A"],
        description: "Psikoloji; insan davranışlarını bilimsel yöntemlerle inceler.",
        courses: [
            { name: "Gelişim Psikolojisi", description: "Yaşam boyu gelişimi inceler." },
            { name: "Klinik Psikoloji", description: "Psikolojik bozuklukları öğretir." },
            { name: "Sosyal Psikoloji", description: "Sosyal davranışları analiz eder." }
        ],
        salaryProjection: { entry: 27000, experienced: 55000, senior: 95000 },
        careerPaths: ["Psikolog", "Klinik Psikolog", "İnsan Kaynakları Uzmanı", "Akademisyen"],
        aiRiskScore: 15,
        yksFocusAttributes: ["Paragraf Yorumlama", "TYT Felsefe", "Biyoloji (Sinir Sistemi)", "İstatistik"],
        scoreType: 'EA',
        minScore: 410,
        universityTargets: [
            { name: "Boğaziçi", score: 510 },
            { name: "ODTÜ", score: 490 },
            { name: "Hacettepe", score: 460 },
            { name: "İstanbul Üniversitesi", score: 440 }
        ]
    },
    {
        id: "65",
        name: "PDR",
        scores: { R: 5, I: 50, A: 25, S: 90, E: 30, C: 35 },
        codes: ["S", "I", "C"],
        description: "PDR; bireylere eğitim ve kariyer süreçlerinde rehberlik sağlar.",
        courses: [
            { name: "Rehberlik Kuramları", description: "Danışmanlık yaklaşımlarını öğretir." },
            { name: "Bireysel Psikolojik Danışma", description: "Danışma sürecini uygular." },
            { name: "Test ve Ölçme Teknikleri", description: "Psikolojik ölçme araçlarını inceler." }
        ],
        salaryProjection: { entry: 26000, experienced: 45000, senior: 80000 },
        careerPaths: ["Okul Rehber Öğretmeni", "Kariyer Danışmanı", "Eğitim Koçu", "İK Uzmanı"],
        aiRiskScore: 20,
        yksFocusAttributes: ["Eğitim Bilimleri", "Felsefe Grubu", "Paragraf", "Mantık"],
        scoreType: 'EA',
        minScore: 380,
        universityTargets: [
            { name: "Boğaziçi", score: 480 },
            { name: "Hacettepe", score: 450 },
            { name: "Ege Üniversitesi", score: 420 },
            { name: "Gazi", score: 410 }
        ]
    },
    {
        id: "66",
        name: "Hemşirelik",
        scores: { R: 40, I: 60, A: 5, S: 85, E: 15, C: 40 },
        codes: ["S", "I", "R"],
        description: "Hemşirelik; hasta bakımını planlama ve uygulama yetkinliği kazandırır.",
        courses: [
            { name: "Hemşirelik Esasları", description: "Temel bakım uygulamalarını öğretir." },
            { name: "Cerrahi Hemşireliği", description: "Cerrahi süreçte hasta bakımını kapsar." },
            { name: "İç Hastalıkları Hemşireliği", description: "Kronik hastalıklarda bakım sağlar." }
        ],
        salaryProjection: { entry: 35000, experienced: 55000, senior: 85000 },
        careerPaths: ["Hemşire", "Başhemşire", "İşyeri Hemşiresi", "Eğitim Hemşiresi"],
        aiRiskScore: 15,
        yksFocusAttributes: ["Biyoloji", "Kimya", "Anatomi Temeli", "Problem Çözme"],
        scoreType: 'SAY',
        minScore: 340,
        universityTargets: [
            { name: "Hacettepe Üniversitesi", score: 440, city: "Ankara", type: "Devlet", scholarship: "Ücretli" },
            { name: "İstanbul Üniversitesi", score: 420, city: "İstanbul", type: "Devlet", scholarship: "Ücretli" },
            { name: "Ege Üniversitesi", score: 400, city: "İzmir", type: "Devlet", scholarship: "Ücretli" },
            { name: "Marmara Üniversitesi", score: 380, city: "İstanbul", type: "Devlet", scholarship: "Ücretli" },
            { name: "Başkent Üniversitesi", score: 350, city: "Ankara", type: "Vakıf", scholarship: "%50 İndirimli" },
            { name: "Acıbadem Üniversitesi", score: 460, city: "İstanbul", type: "Vakıf", scholarship: "Burslu" }
        ]
    },
    {
        id: "67",
        name: "İşletme",
        scores: { R: 10, I: 50, A: 25, S: 40, E: 85, C: 45 },
        codes: ["E", "I", "C"],
        description: "İşletme; yönetim, pazarlama ve finans süreçlerini kapsar.",
        courses: [
            { name: "Yönetim ve Organizasyon", description: "Yönetim teorilerini öğretir." },
            { name: "Pazarlama", description: "Pazar analizi ve marka yönetimini kapsar." },
            { name: "Finansal Yönetim", description: "Finansal karar süreçlerini inceler." }
        ],
        salaryProjection: { entry: 30000, experienced: 65000, senior: 120000 },
        careerPaths: ["Yönetici Adayı", "Pazarlama Uzmanı", "Finans Analisti", "Girişimci"],
        aiRiskScore: 55,
        yksFocusAttributes: ["Matematik", "Türkçe (Anlama)", "Grafik Yorumlama", "Genel Kültür"],
        scoreType: 'EA',
        minScore: 350,
        universityTargets: [
            { name: "Boğaziçi Üniversitesi", score: 520, city: "İstanbul", type: "Devlet", scholarship: "Ücretli" },
            { name: "ODTÜ", score: 480, city: "Ankara", type: "Devlet", scholarship: "Ücretli" },
            { name: "Bilkent Üniversitesi", score: 470, city: "Ankara", type: "Vakıf", scholarship: "Burslu" },
            { name: "İstanbul Teknik Üniversitesi", score: 500, city: "İstanbul", type: "Devlet", scholarship: "Ücretli" }
        ]
    },
    {
        id: "68",
        name: "Ekonomi",
        scores: { R: 20, I: 85, A: 10, S: 25, E: 60, C: 65 },
        codes: ["I", "C", "E"],
        description: "Ekonomi; ekonomik sistemleri ve politika araçlarını inceler.",
        courses: [
            { name: "Mikroekonomi", description: "Birey ve firma davranışlarını analiz eder." },
            { name: "Makroekonomi", description: "Ulusal gelir ve enflasyonu inceler." },
            { name: "Ekonometri", description: "Ekonomik verilerin istatistiksel analizini yapar." }
        ],
        salaryProjection: { entry: 32000, experienced: 70000, senior: 130000 },
        careerPaths: ["Ekonomist", "Bankacı", "Veri Analisti", "Akademisyen"],
        aiRiskScore: 50,
        yksFocusAttributes: ["AYT Matematik", "Grafik Yorumlama", "Türkçe (Paragraf)", "Tarih"],
        scoreType: 'EA',
        minScore: 400,
        universityTargets: [
            { name: "Boğaziçi", score: 525, city: "İstanbul", type: "Devlet", scholarship: "Ücretli" },
            { name: "ODTÜ", score: 485, city: "Ankara", type: "Devlet", scholarship: "Ücretli" },
            { name: "TOBB ETÜ", score: 475, city: "Ankara", type: "Vakıf", scholarship: "Burslu" },
            { name: "Marmara", score: 420, city: "İstanbul", type: "Devlet", scholarship: "Ücretli" }
        ]
    },
    {
        id: "69",
        name: "Uluslararası Ticaret",
        scores: { R: 10, I: 45, A: 20, S: 50, E: 90, C: 50 },
        codes: ["E", "S", "C"],
        description: "Uluslararası Ticaret; küresel mal ve hizmet akışını ekonomik boyutlarıyla inceler.",
        courses: [
            { name: "Uluslararası İktisat", description: "Ticaret teorilerini öğretir." },
            { name: "Dış Ticaret İşlemleri", description: "İhracat ve ithalat süreçlerini kapsar." },
            { name: "Uluslararası Pazarlama", description: "Küresel pazar analizini öğretir." }
        ],
        salaryProjection: { entry: 34000, experienced: 75000, senior: 140000 },
        careerPaths: ["Dış Ticaret Uzmanı", "İhracat Sorumlusu", "Lojistik Yöneticisi", "Gümrük Müşaviri"],
        aiRiskScore: 45,
        yksFocusAttributes: ["İngilizce", "Matematik", "Coğrafya", "Girişimcilik"],
        scoreType: 'EA',
        minScore: 360,
        universityTargets: [
            { name: "Boğaziçi", score: 490, city: "İstanbul", type: "Devlet", scholarship: "Ücretli" },
            { name: "Galatasaray", score: 480, city: "İstanbul", type: "Devlet", scholarship: "Ücretli" },
            { name: "Yeditepe", score: 430, city: "İstanbul", type: "Vakıf", scholarship: "Burslu" },
            { name: "İstanbul Ticaret", score: 380, city: "İstanbul", type: "Vakıf", scholarship: "Burslu" }
        ]
    },
    {
        id: "70",
        name: "Hukuk",
        scores: { R: 10, I: 70, A: 20, S: 50, E: 60, C: 85 },
        codes: ["C", "I", "E"],
        description: "Hukuk; normlar ve yargı süreçlerini inceler.",
        courses: [
            { name: "Medeni Hukuk", description: "Özel hukukun temelini öğretir." },
            { name: "Ceza Hukuku", description: "Suç ve yaptırımları inceler." },
            { name: "Anayasa Hukuku", description: "Devlet yapısını ve hakları açıklar." }
        ],
        salaryProjection: { entry: 30000, experienced: 75000, senior: 150000 },
        careerPaths: ["Avukat", "Hakim", "Savcı", "Hukuk Müşaviri"],
        aiRiskScore: 35,
        yksFocusAttributes: ["AYT Edebiyat", "Paragraf", "Tarih", "Mantık"],
        scoreType: 'EA',
        minScore: 430,
        universityTargets: [
            { name: "Galatasaray", score: 530, city: "İstanbul", type: "Devlet", scholarship: "Ücretli" },
            { name: "Ankara Hukuk", score: 495, city: "Ankara", type: "Devlet", scholarship: "Ücretli" },
            { name: "İstanbul Hukuk", score: 485, city: "İstanbul", type: "Devlet", scholarship: "Ücretli" },
            { name: "Marmara Hukuk", score: 460, city: "İstanbul", type: "Devlet", scholarship: "Ücretli" }
        ]
    },
    {
        id: "71",
        name: "Bankacılık ve Finans",
        scores: { R: 10, I: 75, A: 5, S: 20, E: 65, C: 90 },
        codes: ["C", "I", "E"],
        description: "Bankacılık ve Finans; finansal piyasalar ve bankacılık sistemini inceler.",
        courses: [
            { name: "Bankacılık", description: "Bankacılık işlemlerini açıklar." },
            { name: "Yatırım Analizi", description: "Finansal varlık değerlemesini öğretir." },
            { name: "Risk Yönetimi", description: "Finansal risk türlerini inceler." }
        ],
        salaryProjection: { entry: 35000, experienced: 75000, senior: 140000 },
        careerPaths: ["Bankacı", "Portföy Yöneticisi", "Kredi Analisti", "Finans Müdürü"],
        aiRiskScore: 65,
        yksFocusAttributes: ["Matematik", "İstatistik", "Ekonomi", "Analitik Düşünme"],
        scoreType: 'EA',
        minScore: 355,
        universityTargets: [
            { name: "Marmara", score: 400, city: "İstanbul", type: "Devlet", scholarship: "Ücretli" },
            { name: "İstanbul Üniversitesi", score: 390, city: "İstanbul", type: "Devlet", scholarship: "Ücretli" },
            { name: "Gazi", score: 375, city: "Ankara", type: "Devlet", scholarship: "Ücretli" },
            { name: "Dokuz Eylül", score: 360, city: "İzmir", type: "Devlet", scholarship: "Ücretli" }
        ]
    },
    {
        id: "72",
        name: "Yönetim Bilişim Sistemleri",
        scores: { R: 40, I: 70, A: 20, S: 20, E: 60, C: 75 },
        codes: ["C", "I", "E"],
        description: "Yönetim Bilişim Sistemleri; bilgi teknolojileri ile işletme süreçlerini entegre eder.",
        courses: [
            { name: "Bilgi Sistemleri Analizi", description: "İş süreçlerinin sistem analizini öğretir." },
            { name: "Kurumsal Kaynak Planlama", description: "ERP sistemlerini inceler." },
            { name: "İş Analitiği", description: "Veri analizi ve raporlama tekniklerini kapsar." }
        ],
        salaryProjection: { entry: 36000, experienced: 78000, senior: 135000 },
        careerPaths: ["İş Analisti", "ERP Danışmanı", "Veri Analisti", "IT Proje Yöneticisi"],
        aiRiskScore: 40,
        yksFocusAttributes: ["Matematik", "Türkçe", "Algı", "Teknoloji Okuryazarlığı"],
        scoreType: 'EA',
        minScore: 390,
        universityTargets: [
            { name: "Boğaziçi", score: 505, city: "İstanbul", type: "Devlet", scholarship: "Ücretli" },
            { name: "Marmara", score: 445, city: "İstanbul", type: "Devlet", scholarship: "Ücretli" },
            { name: "Yeditepe", score: 430, city: "İstanbul", type: "Vakıf", scholarship: "Burslu" },
            { name: "Akdeniz Üniversitesi", score: 395, city: "Antalya", type: "Devlet", scholarship: "Ücretli" }
        ]
    }
];

export const departments = DEPARTMENTS;
