"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Hammer, ArrowLeft, Construction } from "lucide-react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function UnderConstructionPage() {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-gray-50 dark:bg-gray-900">
            <Header />

            <main className="flex-1 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-md w-full text-center space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-indigo-50"
                >
                    <div className="flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-20 rounded-full"></div>
                            <div className="w-24 h-24 bg-yellow-50 rounded-full flex items-center justify-center relative z-10 border border-yellow-100">
                                <Construction className="w-12 h-12 text-yellow-500" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h1 className="text-3xl font-black text-gray-900">Yapım Aşamasında 🚧</h1>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Bu sayfa şu anda geliştirilme aşamasındadır. En kısa sürede harika içeriklerle burayı güncelleyeceğiz! Sabrınız için teşekkür ederiz.
                        </p>
                    </div>

                    <Link href="/" className="inline-block">
                        <Button className="bg-indigo-600 hover:bg-indigo-700 font-bold h-12 px-8 rounded-2xl shadow-lg shadow-indigo-100 flex items-center gap-2 text-white">
                            <ArrowLeft className="w-4 h-4" />
                            Ana Sayfaya Dön
                        </Button>
                    </Link>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
