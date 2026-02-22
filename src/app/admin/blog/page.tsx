"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
    Plus,
    Trash2,
    Edit,
    Eye,
    Search,
    ChevronLeft,
    Image as ImageIcon
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const INITIAL_POSTS = [
    { id: 1, title: "Tıp Fakültesi Stratejisi", category: "Strateji", target: "SAY", status: "Yayında" },
    { id: 2, title: "Hukuk Rehberi", category: "Rehberlik", target: "EA", status: "Yayında" },
    { id: 3, title: "Sınav Kaygısı", category: "Psikoloji", target: "GENEL", status: "Taslak" },
];

export default function AdminBlogPage() {
    const [posts, setPosts] = useState(INITIAL_POSTS);
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="min-h-screen flex flex-col font-sans bg-gray-50">
            <Header />
            <main className="container py-12 flex-1">
                <div className="mb-8">
                    <Link href="/admin" className="text-xs font-bold text-indigo-600 flex items-center gap-1 mb-4 hover:underline">
                        <ChevronLeft className="w-3 h-3" /> Panele Geri Dön
                    </Link>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Blog İçerik Yönetimi</h1>
                        <Button
                            onClick={() => setShowForm(!showForm)}
                            className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100"
                        >
                            {showForm ? "Listeye Dön" : <><Plus className="mr-2 w-4 h-4" /> Yeni İçerik Ekle</>}
                        </Button>
                    </div>
                </div>

                {showForm ? (
                    <Card className="border-none shadow-xl bg-white max-w-4xl mx-auto">
                        <CardHeader className="border-b border-gray-50">
                            <CardTitle>Yeni Makale Oluştur</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Başlık</label>
                                    <Input placeholder="Örn: AYT Matematik Net Arttırma Taktikleri" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase">Kategori</label>
                                    <Input placeholder="Strateji, Psikoloji, Rehberlik..." />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase">Hedef Kitle</label>
                                <div className="flex gap-2">
                                    {["SAY", "EA", "SÖZ", "DİL", "GENEL"].map(tag => (
                                        <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-indigo-50">{tag}</Badge>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase">Kapak Görseli URL</label>
                                <Input placeholder="https://unsplash.com/..." />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase">Özet</label>
                                <Input placeholder="Kısa bir giriş metni yazın..." />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase">Makale İçeriği (Markdown desteklenir)</label>
                                <Textarea className="min-h-[300px]" placeholder="Yazmaya başlayın..." />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <Button variant="ghost" onClick={() => setShowForm(false)}>İptal</Button>
                                <Button className="bg-green-600 hover:bg-green-700 text-white font-bold h-11 px-8">Kaydet ve Yayınla</Button>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-4">
                        <div className="relative max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input className="pl-10 h-11 border-none bg-white shadow-sm" placeholder="İçeriklerde ara..." />
                        </div>

                        <Card className="border-none shadow-sm overflow-hidden bg-white">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50 border-b border-gray-100">
                                        <tr>
                                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Başlık</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Kategori</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Hedef</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Durum</th>
                                            <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">İşlemler</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {posts.map(post => (
                                            <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 text-sm font-bold text-gray-900">{post.title}</td>
                                                <td className="px-6 py-4"><Badge variant="secondary" className="bg-gray-100 text-gray-600 text-[10px] border-none">{post.category}</Badge></td>
                                                <td className="px-6 py-4 text-xs font-medium text-indigo-600">{post.target}</td>
                                                <td className="px-6 py-4">
                                                    <Badge className={`text-[10px] border-none ${post.status === 'Yayında' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                                                        {post.status}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-indigo-600"><Edit className="w-4 h-4" /></Button>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-rose-600"><Trash2 className="w-4 h-4" /></Button>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-blue-600"><Eye className="w-4 h-4" /></Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
