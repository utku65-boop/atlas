import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Department } from "@/lib/data/departments";
import { Briefcase, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

interface CareerOutlookProps {
    department: Department;
}

export function CareerOutlook({ department }: CareerOutlookProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-gray-500" />
                    Kariyer & Gelecek
                </CardTitle>
                <CardDescription>Maaş beklentileri ve sektör durumu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Salary Progression */}
                <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-4">Maaş Projeksiyonu (Aylık)</h4>
                    <div className="relative pt-6 pb-2">
                        {/* Line */}
                        <div className="absolute top-8 left-0 right-0 h-1 bg-gray-100 rounded-full" />

                        <div className="grid grid-cols-3 gap-2 relative">
                            {/* Entry */}
                            <div className="flex flex-col items-center text-center group">
                                <div className="w-4 h-4 rounded-full bg-gray-300 border-2 border-white shadow-sm z-10 mb-2 group-hover:bg-indigo-500 transition-colors" />
                                <span className="text-xs text-gray-500 mb-1">Yeni Mezun</span>
                                <span className="font-bold text-gray-900">₺{department.salaryProjection.entry.toLocaleString()}</span>
                            </div>

                            {/* Mid */}
                            <div className="flex flex-col items-center text-center group">
                                <div className="w-4 h-4 rounded-full bg-indigo-400 border-2 border-white shadow-sm z-10 mb-2" />
                                <span className="text-xs text-gray-500 mb-1">Uzman (3-5 Yıl)</span>
                                <span className="font-bold text-gray-900">₺{department.salaryProjection.experienced.toLocaleString()}</span>
                            </div>

                            {/* Senior */}
                            <div className="flex flex-col items-center text-center group">
                                <div className="w-4 h-4 rounded-full bg-indigo-600 border-2 border-white shadow-sm z-10 mb-2" />
                                <span className="text-xs text-gray-500 mb-1">Kıdemli (+7 Yıl)</span>
                                <span className="font-bold text-gray-900">₺{department.salaryProjection.senior.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-px bg-gray-100" />

                {/* AI Risk & Careers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Otomasyon Riski</h4>
                        <div className={`p-3 rounded-lg border flex items-center gap-3 ${department.aiRiskScore > 50
                                ? 'bg-orange-50 border-orange-100 text-orange-700'
                                : 'bg-green-50 border-green-100 text-green-700'
                            }`}>
                            {department.aiRiskScore > 50 ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                            <div>
                                <div className="font-bold text-lg">%{department.aiRiskScore}</div>
                                <div className="text-xs opacity-80">Yapay zeka tarafından yapılabilirlik</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Popüler Ünvanlar</h4>
                        <div className="flex flex-wrap gap-2">
                            {department.careerPaths.slice(0, 3).map((path, idx) => (
                                <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
                                    {path}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
