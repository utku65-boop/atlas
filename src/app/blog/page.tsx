"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Heart, Share2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const DUMMY_POSTS = [
    {
        id: 1,
        title: "Tıp Fakültesi İçin Son 100 Gün Stratejisi",
        excerpt: "Derece yapan öğrencilerin son düzlükte uyguladığı fen branş denemesi taktikleri...",
        category: "Strateji",
        readTime: "5 dk",
        target: "SAY",
        image: "https://images.unsplash.com/photo-1576091160550-2173bdb999ef?auto=format&fit=crop&q=80&w=800",
        slug: "tip-fakultesi-stratejisi"
    },
    {
        id: 2,
        title: "Hukuk Okumak İsteyenlerin Mutlaka Bilmesi Gereken 5 Şey",
        excerpt: "Edebiyat netlerinizi artıracak hafıza teknikleri ve güncel hukuk eğitimi trendleri.",
        category: "Rehberlik",
        readTime: "7 dk",
        target: "EA",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800",
        slug: "hukuk-rehberi"
    },
    {
        id: 3,
        title: "Sınav Kaygısı İle Başa Çıkma Rehberi",
        excerpt: "Psikologlar tarafından onaylanmış nefes teknikleri ve odaklanma egzersizleri.",
        category: "Psikoloji",
        readTime: "4 dk",
        target: "GENEL",
        image: "https://images.unsplash.com/photo-1499209974431-9dac3adaf471?auto=format&fit=crop&q=80&w=800",
        slug: "sinav-kaygisi"
    }
];

export default function BlogPage() {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-gray-50">
            <Header />
            <main className="container py-12 flex-1">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-2xl">
                        <Badge className="mb-4 bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-none px-3 py-1">Kariyer Rehberi Blog</Badge>
                        <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Kişiselleştirilmiş Başarı Kütüphanesi</h1>
                        <p className="text-lg text-gray-500">Hedefine giden yolda sana ilham verecek makaleler, stratejiler ve başarı hikayeleri.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {DUMMY_POSTS.map((post, idx) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Link href={`/blog/${post.slug}`}>
                                <Card className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all h-full bg-white flex flex-col">
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <Badge className="bg-white/90 backdrop-blur-md text-gray-900 border-none shadow-sm">{post.category}</Badge>
                                        </div>
                                    </div>
                                    <CardContent className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                                            <span className="flex items-center gap-1 text-indigo-500"><BookOpen className="w-3 h-3" /> {post.target} Odaklı</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">{post.title}</h3>
                                        <p className="text-sm text-gray-500 line-clamp-2 mb-6">{post.excerpt}</p>

                                        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <button className="text-gray-400 hover:text-rose-500 transition-colors"><Heart className="w-4 h-4" /></button>
                                                <button className="text-gray-400 hover:text-indigo-500 transition-colors"><Share2 className="w-4 h-4" /></button>
                                            </div>
                                            <span className="text-xs font-bold text-indigo-600 flex items-center gap-1">Devamını Oku <ChevronRight className="w-4 h-4" /></span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
