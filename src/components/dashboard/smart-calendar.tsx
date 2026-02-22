"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, CheckCircle2, Circle } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export function SmartCalendar() {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Mock Schedule Data based on common study patterns
    const schedule = [
        { day: 'Pzt', task: 'TYT Türkçe + Matematik', status: 'completed' },
        { day: 'Sal', task: 'AYT Fen/Sos + Paragraf', status: 'completed' },
        { day: 'Çar', task: 'Deneme Analizi + Eksikler', status: 'today' },
        { day: 'Per', task: 'TYT Sosyal + Geometri', status: 'upcoming' },
        { day: 'Cum', task: 'AYT Matematik + Fizik', status: 'upcoming' },
        { day: 'Cmt', task: 'Genel TYT Denemesi', status: 'upcoming' },
        { day: 'Paz', task: 'Haftalık Tekrar + Dinlenme', status: 'upcoming' },
    ];

    return (
        <Card className="border-none shadow-md bg-white">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-indigo-600" />
                    <span>Akıllı Çalışma Takvimi</span>
                </CardTitle>
                <div className="flex items-center gap-1">
                    <button className="p-1 hover:bg-gray-100 rounded-md"><ChevronLeft className="w-4 h-4 text-gray-400" /></button>
                    <span className="text-xs font-bold text-gray-600">Şubat 2026</span>
                    <button className="p-1 hover:bg-gray-100 rounded-md"><ChevronRight className="w-4 h-4 text-gray-400" /></button>
                </div>
            </CardHeader>
            <CardContent className="pt-4">
                <div className="flex justify-between gap-1 mb-6">
                    {schedule.map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-2 flex-1">
                            <span className="text-[10px] font-bold text-gray-400 uppercase">{item.day}</span>
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center border-2 transition-all
                                ${item.status === 'completed' ? 'bg-indigo-50 border-indigo-200 text-indigo-600' :
                                    item.status === 'today' ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100 scale-110' :
                                        'bg-white border-gray-100 text-gray-300'}`}
                            >
                                {item.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : idx + 21}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-3">
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest border-b pb-2">Bugünkü Görevin</h4>
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center gap-4"
                    >
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm">
                            <CalendarIcon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-indigo-900">Deneme Analizi + Eksikler</p>
                            <p className="text-[10px] text-indigo-600">Hedeflenen Net: +2.5 Artış</p>
                        </div>
                        <div className="w-6 h-6 rounded-full border-2 border-indigo-300"></div>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <p className="text-[10px] font-bold text-gray-400 uppercase">Yarın</p>
                            <p className="text-xs font-bold text-gray-700">Geometri Odaklı</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                            <p className="text-[10px] font-bold text-gray-400 uppercase">Haftalık İlerleme</p>
                            <p className="text-xs font-bold text-gray-700">%42 Tamamlandı</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
