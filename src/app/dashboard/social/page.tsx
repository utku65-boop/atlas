"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, UserPlus, Search, Trophy, Timer, Zap, MessageSquare, Handshake } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SocialPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [friends, setFriends] = useState<any[]>([]);
    const [requests, setRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            const parsed = JSON.parse(savedUser);
            setUser(parsed);
            fetchInitialData(parsed.username || parsed.name.toLowerCase().replace(/\s/g, ''));
        }
    }, []);

    const fetchInitialData = async (username: string) => {
        try {
            // Fetch friends and incoming requests
            const res = await fetch(`/api/social/friends?username=${username}`);
            const data = await res.json();

            // For now, if no friends, we keep the mock list as "Suggested"
            if (data.friends.length === 0) {
                setFriends([]);
            } else {
                setFriends(data.friends);
            }
            setRequests(data.incoming || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        if (!searchTerm) return;
        setLoading(true);
        try {
            const res = await fetch('/api/user/sync');
            const data = await res.json();
            const foundUsers = data.users.filter((u: any) =>
                u.username?.includes(searchTerm.toLowerCase()) ||
                u.name?.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (foundUsers.length > 0) {
                // Show found user in friends for demo (or add invite logic)
                alert(`${foundUsers[0].name} bulundu! İstek gönderildi.`);
                await fetch('/api/social/friends', {
                    method: 'POST',
                    body: JSON.stringify({ action: 'request', sender: user.username, receiver: foundUsers[0].username })
                });
            } else {
                alert("Kullanıcı bulunamadı.");
            }
        } catch (err) {
            alert("Arama hatası.");
        } finally {
            setLoading(false);
        }
    };

    const handleAccept = async (sender: string) => {
        try {
            await fetch('/api/social/friends', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'accept', sender, receiver: user.username })
            });
            alert("Arkadaşlık isteği kabul edildi!");
            fetchInitialData(user.username);
        } catch (err) {
            alert("İşlem başarısız.");
        }
    };

    const champions = [
        ...friends,
        {
            id: 0,
            name: "Sen",
            username: user?.username || "ben",
            xp: typeof window !== 'undefined' ? parseInt(localStorage.getItem("user_xp") || "0") : 0,
            level: Math.floor((typeof window !== 'undefined' ? parseInt(localStorage.getItem("user_xp") || "0") : 0) / 500) + 1,
            status: "online",
            streak: 7
        }
    ].sort((a, b) => b.xp - a.xp);

    return (
        <div className="min-h-screen bg-gray-50/50 font-sans">
            <Header />

            <main className="container max-w-5xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Sosyal Hub 🤝</h1>
                        <p className="text-gray-500 font-medium">Arkadaşlarınla yarış, birlikte odaklan ve geliş.</p>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                placeholder="Arkadaş ara..."
                                className="pl-10 h-11 bg-white border-none shadow-sm rounded-xl focus-visible:ring-indigo-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button
                            onClick={handleSearch}
                            disabled={loading}
                            className="h-11 bg-indigo-600 hover:bg-indigo-700 rounded-xl px-6 font-bold gap-2"
                        >
                            {loading ? <Zap className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
                            Bul
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Main Content */}
                    <div className="md:col-span-8 space-y-8">
                        <Tabs defaultValue="friends" className="w-full">
                            <TabsList className="bg-transparent border-b w-full justify-start rounded-none h-auto p-0 gap-8">
                                <TabsTrigger value="friends" className="data-[state=active]:bg-transparent data-[state=active]:border-indigo-600 border-b-2 border-transparent rounded-none px-0 py-4 font-black text-sm uppercase tracking-widest text-gray-400 data-[state=active]:text-indigo-600">
                                    Arkadaşlarım ({friends.length})
                                </TabsTrigger>
                                <TabsTrigger value="requests" className="relative data-[state=active]:bg-transparent data-[state=active]:border-indigo-600 border-b-2 border-transparent rounded-none px-0 py-4 font-black text-sm uppercase tracking-widest text-gray-400 data-[state=active]:text-indigo-600">
                                    İstekler
                                    {requests.length > 0 && (
                                        <span className="absolute top-2 -right-4 w-5 h-5 bg-rose-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white animate-pulse">
                                            {requests.length}
                                        </span>
                                    )}
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="friends" className="mt-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {friends.map((friend) => (
                                        <motion.div
                                            key={friend.username}
                                            whileHover={{ y: -5 }}
                                            className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="relative">
                                                    <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 font-black">
                                                        {friend.name?.charAt(0) || friend.username.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full ${friend.status === 'online' ? 'bg-green-500' : friend.status === 'away' ? 'bg-amber-500' : 'bg-gray-300'
                                                        }`} />
                                                </div>
                                                <div>
                                                    <h3 className="font-black text-gray-900 leading-tight">{friend.name || friend.username}</h3>
                                                    <p className="text-xs font-bold text-indigo-500">@{friend.username}</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-[10px] font-black bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded uppercase">Lv. {friend.level || 1}</span>
                                                        <span className="text-[10px] font-black text-amber-500 flex items-center gap-0.5">
                                                            <Zap className="w-3 h-3 fill-amber-500" /> {friend.streak || 0} Gün
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button size="icon" variant="ghost" className="h-10 w-10 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl">
                                                    <Timer className="w-4 h-4" />
                                                </Button>
                                                <Button size="icon" variant="ghost" className="h-10 w-10 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl">
                                                    <MessageSquare className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </TabsContent>

                            <TabsContent value="requests" className="mt-6">
                                <div className="space-y-4">
                                    {requests.length === 0 ? (
                                        <div className="text-center py-12 bg-white rounded-[2rem] border-2 border-dashed border-gray-100">
                                            <Users className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                                            <p className="text-sm font-bold text-gray-400">Henüz yeni bir istek gelmedi.</p>
                                        </div>
                                    ) : (
                                        requests.map((sender: string) => (
                                            <Card key={sender} className="border-none shadow-sm bg-white rounded-3xl overflow-hidden hover:shadow-md transition-shadow">
                                                <CardContent className="p-6 flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-600 font-black">
                                                            {sender.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <h3 className="font-black text-gray-900">Yeni Arkadaş İsteği</h3>
                                                            <p className="text-xs font-bold text-rose-500">@{sender}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button size="sm" variant="ghost" className="text-gray-400 font-bold hover:bg-gray-100 rounded-xl">Yadsı</Button>
                                                        <Button onClick={() => handleAccept(sender)} size="sm" className="bg-indigo-600 hover:bg-indigo-700 font-bold rounded-xl px-6">Kabul Et</Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))
                                    )}
                                </div>
                            </TabsContent>
                        </Tabs>

                        {/* Challenges Section */}
                        <div className="pt-8">
                            <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
                                <Handshake className="w-6 h-6 text-indigo-600" /> Aktif Düellolar
                            </h2>
                            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-100">
                                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                    <div className="text-center md:text-left">
                                        <h3 className="text-2xl font-black mb-2">Don't Touch Challenge! 📵</h3>
                                        <p className="text-indigo-100 font-medium mb-6">Mert ile 25 dakikalık odaklanma düellosuna başla. Sekme değiştiren kaybeder!</p>
                                        <Button className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 h-12 rounded-2xl font-black shadow-lg shadow-black/10">
                                            DÜELLOYU BAŞLAT
                                        </Button>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="flex flex-col items-center">
                                            <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center text-2xl font-black">S</div>
                                            <span className="text-xs font-bold mt-2">Sen</span>
                                        </div>
                                        <div className="text-3xl font-black text-white/50 italic">VS</div>
                                        <div className="flex flex-col items-center">
                                            <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center text-2xl font-black">M</div>
                                            <span className="text-xs font-bold mt-2">Mert</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Abstract Shapes */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Leaderboard */}
                    <div className="md:col-span-4 space-y-6">
                        <Card className="border-none shadow-md bg-white rounded-[2rem] overflow-hidden">
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg font-black flex items-center gap-2">
                                        <Trophy className="w-5 h-5 text-amber-500" /> Şampiyonlar
                                    </CardTitle>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Haftalık</span>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {champions.map((champ, index) => (
                                    <div key={champ.id} className={`flex items-center justify-between p-3 rounded-2xl ${champ.id === 0 ? 'bg-indigo-50 border border-indigo-100' : 'hover:bg-gray-50'
                                        }`}>
                                        <div className="flex items-center gap-3">
                                            <span className={`text-sm font-black w-6 ${index === 0 ? 'text-amber-500' : index === 1 ? 'text-gray-400' : index === 2 ? 'text-amber-700' : 'text-gray-300'
                                                }`}>#{index + 1}</span>
                                            <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center text-sm font-black text-gray-600">
                                                {champ.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-gray-900 leading-tight">{champ.name}</p>
                                                <p className="text-[10px] font-bold text-gray-400">@{champ.username}</p>
                                            </div>
                                        </div>
                                        <span className="text-xs font-black text-indigo-600">{champ.xp.toLocaleString()} XP</span>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-md bg-white rounded-[2rem] overflow-hidden p-6 text-center">
                            <div className="w-16 h-16 bg-amber-100 rounded-3xl flex items-center justify-center text-amber-600 font-black text-2xl mx-auto mb-4">
                                <Trophy className="w-8 h-8" />
                            </div>
                            <h3 className="font-black text-gray-900 mb-2">Global Challange</h3>
                            <p className="text-xs text-gray-500 font-medium mb-4">Bu ay Türkiye genelinde en çok XP toplayan 10 öğrenci arasına gir, Mentorluk paketi kazan!</p>
                            <Button variant="outline" className="w-full rounded-2xl font-black text-xs h-10 border-gray-100">SIRALAMAYI GÖR</Button>
                        </Card>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
