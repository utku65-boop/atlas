"use client";

import { useState } from "react";
import { Bell, Check, X, Info, Zap, Award, Coffee } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export type Notification = {
    id: string;
    title: string;
    description: string;
    type: 'info' | 'success' | 'warning' | 'achievement';
    time: string;
    isRead: boolean;
};

const INITIAL_NOTIFICATIONS: Notification[] = [
    {
        id: "1",
        title: "Tebrikler!",
        description: "Focus seansını tamamladın ve +25 XP kazandın. 🔥",
        type: 'achievement',
        time: "5 dk önce",
        isRead: false
    },
    {
        id: "2",
        title: "Seri Hatırlatıcısı",
        description: "Bugünkü serini korumak için henüz bir aktivite yapmadın. ☕",
        type: 'warning',
        time: "2 saat önce",
        isRead: false
    },
    {
        id: "3",
        title: "Yeni Blog İçeriği",
        description: "Hukuk Fakültesi Rehberi yayında! Göz atmak ister misin? 📚",
        type: 'info',
        time: "5 saat önce",
        isRead: true
    }
];

export function NotificationCenter({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    };

    const deleteNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'achievement': return <Award className="w-4 h-4 text-amber-500" />;
            case 'success': return <Zap className="w-4 h-4 text-green-500" />;
            case 'warning': return <Info className="w-4 h-4 text-rose-500" />;
            default: return <Bell className="w-4 h-4 text-indigo-500" />;
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[60]"
                    />

                    {/* Panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-screen w-full max-w-sm bg-white shadow-2xl z-[999] border-l border-gray-100 flex flex-col"
                    >
                        <div className="p-6 border-b border-gray-50 flex items-center justify-between mt-16 md:mt-0">
                            <h3 className="text-lg font-black text-gray-900 tracking-tight">Bildirimler</h3>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" onClick={markAllAsRead} className="h-8 w-8 text-gray-400 hover:text-indigo-600">
                                    <Check className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-gray-400 hover:text-red-600">
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {notifications.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                                        <Bell className="w-8 h-8" />
                                    </div>
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Hiç bildirim yok</p>
                                    <p className="text-xs text-gray-300 mt-1">Her şey yolunda görünüyor!</p>
                                </div>
                            ) : (
                                notifications.map((notif) => (
                                    <div
                                        key={notif.id}
                                        className={`p-4 rounded-2xl border transition-all relative group
                                            ${notif.isRead ? 'bg-white border-gray-50' : 'bg-indigo-50/30 border-indigo-100 shadow-sm'}`}
                                    >
                                        <div className="flex gap-4">
                                            <div className="shrink-0 mt-1">
                                                {getIcon(notif.type)}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h4 className={`text-sm font-bold ${notif.isRead ? 'text-gray-700' : 'text-gray-900'}`}>
                                                        {notif.title}
                                                    </h4>
                                                    <span className="text-[10px] font-bold text-gray-400">{notif.time}</span>
                                                </div>
                                                <p className="text-xs text-gray-500 leading-relaxed">{notif.description}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => deleteNotification(notif.id)}
                                            className="absolute top-2 right-2 p-1 text-gray-300 opacity-0 group-hover:opacity-100 transition-all hover:text-rose-500"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                        {!notif.isRead && (
                                            <span className="absolute top-2 left-2 w-2 h-2 bg-indigo-500 rounded-full border border-white" />
                                        )}
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="p-6 border-t border-gray-50">
                            <Button variant="outline" className="w-full text-xs font-bold text-gray-500 bg-gray-50 border-none h-11">
                                Tüm Geçmişi Gör
                            </Button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
