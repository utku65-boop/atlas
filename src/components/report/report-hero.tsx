import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Department } from "@/lib/data/departments";
import { ArrowRight, CheckCircle, TrendingUp } from "lucide-react";

interface ReportHeroProps {
    department: Department;
    matchScore: number;
}

export function ReportHero({ department, matchScore }: ReportHeroProps) {
    return (
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />

            <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6 items-start md:items-center">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
                            {department.scoreType} Puan Türü
                        </Badge>
                        <Badge variant="outline" className="text-gray-500">
                            Taban Puan: {department.minScore}+
                        </Badge>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        {department.name}
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl">
                        {department.description}
                    </p>
                </div>

                <div className="flex flex-col items-center bg-indigo-50 p-4 rounded-xl border border-indigo-100 min-w-[140px]">
                    <span className="text-sm font-medium text-gray-500 mb-1">Seninle Uyumu</span>
                    <div className="text-4xl font-black text-indigo-600">
                        %{matchScore}
                    </div>
                    <div className="w-full mt-2">
                        <Progress value={matchScore} className="h-2" />
                    </div>
                </div>
            </div>
        </div>
    );
}
