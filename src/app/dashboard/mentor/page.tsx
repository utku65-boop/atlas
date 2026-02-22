"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Star, MapPin, GraduationCap, Search, Check, CreditCard, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import { supabase } from "@/lib/supabase";

export default function MentorPage() {
    const [mentors, setMentors] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchMentors();
    }, []);

    const fetchMentors = async () => {
        setIsLoading(true);
        if (!supabase) return;

        const { data, error } = await supabase
            .from('mentors')
            .select('*')
            .order('rating', { ascending: false });

        if (!error && data) {
            setMentors(data);
        }
        setIsLoading(false);
    };
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUni, setSelectedUni] = useState("all");
    const [selectedMentor, setSelectedMentor] = useState<any>(null);
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [bookingStep, setBookingStep] = useState(1); // 1: Slot, 2: Payment, 3: Success
    const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

    const slots = [
        { id: 1, date: "Bugün", time: "18:00" },
        { id: 2, date: "Yarın", time: "19:00" },
        { id: 3, date: "Cumartesi", time: "10:00" },
        { id: 4, date: "Cumartesi", time: "13:00" }
    ];

    const filteredMentors = mentors.filter((mentor: any) => {
        const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mentor.department.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesUni = selectedUni === "all" || mentor.university === selectedUni;
        return matchesSearch && matchesUni;
    });

    const handleBookClick = (mentor: any) => {
        setSelectedMentor(mentor);
        setBookingStep(1);
        setSelectedSlot(null);
        setIsBookingOpen(true);
    };

    const handlePayment = () => {
        // Mock payment processing
        setTimeout(() => {
            setBookingStep(3);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8 space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Mentor Bul</h1>
                        <p className="text-gray-600 mt-1">Hayalindeki bölümü okuyanlardan gerçek deneyimlerini dinle, sorularını sor.</p>
                    </div>
                    <Button className="bg-indigo-600 hover:bg-indigo-700">
                        <Calendar className="w-4 h-4 mr-2" /> Randevularım
                    </Button>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder="Bölüm veya mentor ara..."
                            className="pl-9 bg-gray-50 border-gray-200"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="w-full md:w-64">
                        <Select value={selectedUni} onValueChange={setSelectedUni}>
                            <SelectTrigger className="bg-gray-50 border-gray-200">
                                <SelectValue placeholder="Üniversite Seç" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tüm Üniversiteler</SelectItem>
                                <SelectItem value="Boğaziçi Üniversitesi">Boğaziçi Üniversitesi</SelectItem>
                                <SelectItem value="ODTÜ">ODTÜ</SelectItem>
                                <SelectItem value="İTÜ">İTÜ</SelectItem>
                                <SelectItem value="Koç Üniversitesi">Koç Üniversitesi</SelectItem>
                                <SelectItem value="Marmara Üniversitesi">Marmara Üniversitesi</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Mentor Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMentors.map(mentor => (
                        <Card key={mentor.id} className="hover:shadow-md transition-shadow duration-200 overflow-hidden group">
                            <CardHeader className="p-0">
                                <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
                                    <div className="absolute -bottom-10 left-6">
                                        <div className="w-20 h-20 rounded-full border-4 border-white bg-white overflow-hidden shadow-sm">
                                            <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                    <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded flex items-center">
                                        <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" /> {mentor.rating}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-12 px-6 pb-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900">{mentor.name}</h3>
                                        <div className="text-sm text-indigo-600 font-medium">{mentor.role}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-gray-900">{mentor.price} ₺</div>
                                        <div className="text-xs text-gray-500">/ 30 dk</div>
                                    </div>
                                </div>

                                <div className="space-y-2 mt-4">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <GraduationCap className="w-4 h-4 mr-2 text-gray-400" />
                                        <span className="truncate">{mentor.university}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                                        <span className="truncate">{mentor.department}</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-4">
                                    {mentor.tags.map((tag: string) => (
                                        <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-600 font-normal hover:bg-gray-200">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                                <Button className="w-full bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-bold group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300"
                                    onClick={() => handleBookClick(mentor)}
                                >
                                    Randevu Al
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                {/* Booking Dialog */}
                <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Randevu Oluştur</DialogTitle>
                            <DialogDescription>
                                {selectedMentor && `${selectedMentor.name} ile görüşme planla`}
                            </DialogDescription>
                        </DialogHeader>

                        {selectedMentor && (
                            <div className="py-2">
                                {bookingStep === 1 && (
                                    <div className="space-y-4">
                                        <div className="text-sm text-gray-500">Uygun zaman dilimini seçiniz:</div>
                                        <div className="grid grid-cols-2 gap-3">
                                            {slots.length > 0 ? slots.map(slot => (
                                                <div
                                                    key={slot.id}
                                                    onClick={() => setSelectedSlot(slot.id)}
                                                    className={`
                                                    p-3 rounded-lg border cursor-pointer transition-all flex justify-between items-center
                                                    ${selectedSlot === slot.id
                                                            ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600'
                                                            : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                                                        }
                                                `}
                                                >
                                                    <div className="text-sm font-medium">{slot.date}</div>
                                                    <div className="text-xs text-gray-500">{slot.time}</div>
                                                </div>
                                            )) : (
                                                <div className="col-span-2 text-center py-4 text-gray-400 text-sm">
                                                    Henüz uygun saat aralığı girilmemiş.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {bookingStep === 2 && selectedSlot && (
                                    <div className="space-y-6">
                                        <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 space-y-3">
                                            <div className="flex justify-between items-center pb-2 border-b border-indigo-200">
                                                <span className="text-sm text-indigo-800">Mentor</span>
                                                <span className="font-bold text-indigo-900">{selectedMentor.name}</span>
                                            </div>
                                            <div className="flex justify-between items-center pb-2 border-b border-indigo-200">
                                                <span className="text-sm text-indigo-800">Tarih</span>
                                                <span className="font-bold text-indigo-900">{slots.find((s: any) => s.id === selectedSlot)?.date} - {slots.find((s: any) => s.id === selectedSlot)?.time}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-indigo-800">Ücret (30 Dk)</span>
                                                <span className="font-black text-xl text-indigo-900">{selectedMentor.price} ₺</span>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <Label>Ödeme Bilgileri (Simülasyon)</Label>
                                            <div className="border p-4 rounded-lg bg-gray-50 space-y-3">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <CreditCard className="w-5 h-5 text-gray-400" />
                                                    <span className="font-medium text-sm text-gray-700">Kredi Kartı / Banka Kartı</span>
                                                </div>
                                                <Input placeholder="Kart Numarası" className="bg-white" disabled value="**** **** **** 4242" />
                                                <div className="grid grid-cols-2 gap-3">
                                                    <Input placeholder="Ay/Yıl" className="bg-white" disabled value="12/28" />
                                                    <Input placeholder="CVC" className="bg-white" disabled value="***" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {bookingStep === 3 && (
                                    <div className="text-center py-6 space-y-4">
                                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in">
                                            <Check className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900">Randevun Oluşturuldu!</h3>
                                        <p className="text-gray-600">
                                            {selectedMentor.name} ile görüşmen onaylandı. Detaylar e-posta adresine gönderildi.
                                        </p>
                                        <div className="bg-gray-50 p-4 rounded-lg inline-block text-left mt-2">
                                            <div className="text-sm text-gray-500">Görüşme Linki:</div>
                                            <div className="text-indigo-600 font-medium underline">https://meet.google.com/abc-defg-hij</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        <DialogFooter className="sm:justify-between items-center">
                            {bookingStep === 3 ? (
                                <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => setIsBookingOpen(false)}>
                                    Tamamla
                                </Button>
                            ) : (
                                <>
                                    {bookingStep > 1 && (
                                        <Button variant="ghost" onClick={() => setBookingStep(prev => prev - 1)}>Geri</Button>
                                    )}
                                    <div className="flex-1"></div>
                                    {bookingStep === 1 && (
                                        <Button onClick={() => setBookingStep(2)} disabled={!selectedSlot} className="bg-indigo-600 hover:bg-indigo-700">
                                            Devam Et <ChevronRight className="w-4 h-4 ml-1" />
                                        </Button>
                                    )}
                                    {bookingStep === 2 && (
                                        <Button onClick={handlePayment} className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto">
                                            Ödeme Yap ve Onayla
                                        </Button>
                                    )}
                                </>
                            )}
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {filteredMentors.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                        <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">Mentor bulunamadı</h3>
                        <p className="text-gray-500 mt-2">Arama kriterlerini değiştirerek tekrar deneyebilirsin.</p>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
