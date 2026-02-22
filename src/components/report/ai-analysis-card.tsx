import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Department } from "@/lib/data/departments";
import { Sparkles, Bot, ThumbsUp } from "lucide-react";

interface AiAnalysisCardProps {
    department: Department;
    matchScore: number;
}

export function AiAnalysisCard({ department, matchScore }: AiAnalysisCardProps) {
    // Mock logic for "Why this fits"
    // In real app, this would use the user's RIASEC scores vs Dept scores
    const isHighMatch = matchScore >= 70;

    return (
        <Card className="border-indigo-100 bg-gradient-to-br from-white to-indigo-50/30 overflow-hidden">
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-indigo-700">
                    <Bot className="w-5 h-5" />
                    Yapay Zeka Analizi
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <p className="text-gray-700 leading-relaxed">
                        {isHighMatch ? (
                            <>
                                <strong className="text-indigo-900">Harika bir eşleşme!</strong> Senin profiline göre
                                <strong> {department.name}</strong> bölümü, sahip olduğun yetkinlikler ve ilgi alanlarınla
                                oldukça uyumlu görünüyor. Özellikle problem çözme ve analitik düşünme yapın, bu bölümün
                                gereklilikleriyle örtüşüyor.
                            </>
                        ) : (
                            <>
                                <strong> {department.name}</strong> bölümü senin için ilginç fırsatlar barındırıyor ancak
                                bazı alanlarda (örneğin {department.scores.R > 50 ? "Pratik Uygulama" : "Soyut Düşünme"})
                                kendini biraz daha zorlaman gerekebilir. Yine de motivasyonun yüksekse bu bir engel değil!
                            </>
                        )}
                    </p>

                    <div className="bg-white/60 p-4 rounded-lg border border-indigo-100">
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center text-sm">
                            <Sparkles className="w-4 h-4 mr-1 text-yellow-500" />
                            Neden Sana Uygun?
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li className="flex items-start gap-2">
                                <ThumbsUp className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                <span>Bu alanda {department.salaryProjection.entry > 30000 ? "yüksek başlangıç maaşı" : "istikrarlı kariyer"} beklentisi var.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <ThumbsUp className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                <span>Yapay zeka risk skoru <strong>%{department.aiRiskScore}</strong> seviyesinde (Düşük riskli).</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
