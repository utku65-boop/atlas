"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { supabase } from "@/lib/supabase";
import { Plus, Edit2, Trash2, Search, Database as DbIcon, Loader2, UploadCloud } from "lucide-react";
import { DEPARTMENTS } from "@/lib/data/departments";

export default function AdminDataPage() {
    const [departments, setDepartments] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingDept, setEditingDept] = useState<any>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        university: "",
        city: "",
        type: "Devlet",
        base_score: ""
    });

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        setIsLoading(true);
        if (!supabase) {
            console.warn("Supabase not initialized");
            setIsLoading(false);
            return;
        }

        const { data, error } = await supabase
            .from('departments')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setDepartments(data);
        }
        setIsLoading(false);
    };

    const handleSeed = async () => {
        if (!supabase) return;
        if (!confirm("Tüm varsayılan verileri (okullar ve bölümler) Supabase'e aktarmak istediğinize emin misiniz?")) return;

        setIsLoading(true);
        try {
            const seedData: any[] = [];

            DEPARTMENTS.forEach(dept => {
                // Her bölümün üniversite hedeflerini ayrı birer satır olarak ekleyelim
                dept.universityTargets.forEach(target => {
                    seedData.push({
                        name: dept.name,
                        description: dept.description,
                        university: target.name,
                        city: target.city || "Bilinmiyor",
                        type: target.type || "Devlet",
                        base_score: target.score,
                        riasec_scores: dept.scores,
                        category: dept.scoreType, // SAY, EA vb.
                    });
                });
            });

            const { error } = await supabase.from('departments').insert(seedData);

            // Mentor verilerini de ekleyelim (Örnek)
            const mentorSeed = [
                {
                    name: "Utku Arslan",
                    university: "İTÜ",
                    department: "Bilgisayar Mühendisliği",
                    role: "Yazılım Mühendisi @ Google",
                    rating: 5,
                    price: 250,
                    tags: ["Yazılım", "Kariyer", "Yurt Dışı"],
                    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100"
                },
                {
                    name: "Zeynep Kaya",
                    university: "Hacettepe",
                    department: "Tıp",
                    role: "Genel Cerrah",
                    rating: 4.9,
                    price: 400,
                    tags: ["Tıp", "TUS", "Akademik"],
                    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100"
                }
            ];

            await supabase.from('mentors').insert(mentorSeed);

            alert(`${seedData.length} adet okul/bölüm ve 2 mentor başarıyla yüklendi.`);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        if (!supabase) return;

        const payload = {
            ...formData,
            base_score: parseFloat(formData.base_score) || 0
        };

        if (editingDept) {
            await supabase.from('departments').update(payload).eq('id', editingDept.id);
        } else {
            await supabase.from('departments').insert([payload]);
        }

        setIsDialogOpen(false);
        fetchDepartments();
    };

    const handleDelete = async (id: string) => {
        if (!supabase || !confirm("Bu bölümü silmek istediğinize emin misiniz?")) return;
        await supabase.from('departments').delete().eq('id', id);
        fetchDepartments();
    };

    const openEdit = (dept: any) => {
        setEditingDept(dept);
        setFormData({
            name: dept.name,
            university: dept.university || "",
            city: dept.city || "",
            type: dept.type || "Devlet",
            base_score: dept.base_score?.toString() || ""
        });
        setIsDialogOpen(true);
    };

    const openAdd = () => {
        setEditingDept(null);
        setFormData({ name: "", university: "", city: "", type: "Devlet", base_score: "" });
        setIsDialogOpen(true);
    };

    const filtered = departments.filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.university?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen flex flex-col font-sans bg-gray-50">
            <Header />
            <main className="container py-12 flex-1">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                            <DbIcon className="w-8 h-8 text-indigo-600" /> Veri Yönetimi
                        </h1>
                        <p className="text-gray-500">Okul ve bölüm değişkenlerini buradan güncelleyebilirsiniz.</p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={handleSeed} className="text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                            <UploadCloud className="w-4 h-4 mr-2" /> Varsayılan Verileri Yükle
                        </Button>
                        <Button onClick={openAdd} className="bg-indigo-600 hover:bg-indigo-700">
                            <Plus className="w-4 h-4 mr-2" /> Yeni Bölüm Ekle
                        </Button>
                    </div>
                </div>

                <Card className="border-none shadow-sm bg-white">
                    <CardHeader className="border-b border-gray-50 p-6">
                        <div className="relative max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Bölüm veya üniversite ara..."
                                className="pl-9 bg-gray-50 border-none"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        {isLoading ? (
                            <div className="p-20 text-center">
                                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mx-auto mb-4" />
                                <p className="text-gray-400 font-medium">Veriler yükleniyor...</p>
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-50/50">
                                        <TableHead className="font-bold">Bölüm Adı</TableHead>
                                        <TableHead className="font-bold">Üniversite</TableHead>
                                        <TableHead className="font-bold">Şehir</TableHead>
                                        <TableHead className="font-bold">Tür</TableHead>
                                        <TableHead className="font-bold">Taban Puan</TableHead>
                                        <TableHead className="text-right font-bold">İşlemler</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filtered.map((dept) => (
                                        <TableRow key={dept.id} className="hover:bg-gray-50/50 transition-colors">
                                            <TableCell className="font-medium">{dept.name}</TableCell>
                                            <TableCell>{dept.university || "-"}</TableCell>
                                            <TableCell>{dept.city || "-"}</TableCell>
                                            <TableCell>{dept.type || "-"}</TableCell>
                                            <TableCell className="font-bold">{dept.base_score || "-"}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon" onClick={() => openEdit(dept)} className="text-gray-400 hover:text-indigo-600 h-8 w-8">
                                                        <Edit2 className="w-4 h-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(dept.id)} className="text-gray-400 hover:text-red-600 h-8 w-8">
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {filtered.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-20 text-gray-400">
                                                Veri bulunamadı. Lütfen yeni bir bölüm ekleyin.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </main>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingDept ? "Bölüm Düzenle" : "Yeni Bölüm Ekle"}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Bölüm Adı</Label>
                            <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="university">Üniversite</Label>
                            <Input id="university" value={formData.university} onChange={(e) => setFormData({ ...formData, university: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="city">Şehir</Label>
                                <Input id="city" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="type">Tür</Label>
                                <Input id="type" value={formData.type} placeholder="Devlet / Vakıf" onChange={(e) => setFormData({ ...formData, type: e.target.value })} />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="base_score">Taban Puan</Label>
                            <Input id="base_score" type="number" value={formData.base_score} onChange={(e) => setFormData({ ...formData, base_score: e.target.value })} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>İptal</Button>
                        <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700">Kaydet</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Footer />
        </div>
    );
}
