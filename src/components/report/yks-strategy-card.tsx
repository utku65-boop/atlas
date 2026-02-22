import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Department } from "@/lib/data/departments";
import { Target, BookOpen } from "lucide-react";

interface YksStrategyCardProps {
    department: Department;
}

export function YksStrategyCard({ department }: YksStrategyCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-red-500" />
                    Kazanma Stratejisi
                </CardTitle>
                <CardDescription>Bu bölümü kazanmak için odaklanman gerekenler</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Kritik Dersler & Konular</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {department.yksFocusAttributes.map((attr, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm text-gray-700 bg-white p-2 rounded border border-gray-100 shadow-sm">
                                <BookOpen className="w-3 h-3 text-indigo-500" />
                                {attr}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 text-sm text-yellow-800">
                    <strong>İpucu:</strong> {department.scoreType === 'SAY'
                        ? "Matematik ve Fen netlerin belirleyici olacak. Özellikle AYT Matematik çalışma programında öncelikli olmalı."
                        : "Edebiyat ve Sosyal bilimler fark yaratır. Paragraf çözme hızını artırmak sana büyük avantaj sağlar."}
                </div>
            </CardContent>
        </Card>
    );
}
