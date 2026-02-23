"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Check, Star, ArrowRight, Target, Filter, Search, ChevronLeft, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { findBestMatches, RiasecScore } from "@/lib/algorithm";
import { Department, UniversityTarget } from "@/lib/data/departments";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";

import { NetSimulator } from "@/components/onboarding/net-simulator";
import { NetCalculator } from "@/components/onboarding/net-calculator";
import { AiAnalysisCard } from "@/components/report/ai-analysis-card"; // Imported
import { CareerOutlook } from "@/components/report/career-outlook"; // Imported
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { NetCounts } from "@/lib/score-calculator";

function TargetSelectionContent() { // Inner Component
    const router = useRouter();
    const searchParams = useSearchParams();
    const isDirect = searchParams.get("direct") === "true";
    const [rankedDepts, setRankedDepts] = useState<(Department & { match: number | string })[]>([]);

    // Selection State
    const [selectedTarget, setSelectedTarget] = useState<string | null>(null); // Format: "deptId-uniIndex" or "deptId"

    // User Info (Cosmetic)
    const [userName, setUserName] = useState("Öğrenci");

    // Filter State
    const [selectedCity, setSelectedCity] = useState<string | string[]>("all");
    const [selectedType, setSelectedType] = useState<string[]>(['Devlet', 'Vakıf']);
    const [selectedScholarship, setSelectedScholarship] = useState<string[]>(['Burslu', '%50 İndirimli', 'Ücretli']);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]); // New Department Filter
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isDeptFilterOpen, setIsDeptFilterOpen] = useState(false);
    const [showCalculator, setShowCalculator] = useState(false);
    const [showSimulator, setShowSimulator] = useState(false);
    const [targetDeptData, setTargetDeptData] = useState<Department | null>(null);
    const [currentNets, setCurrentNets] = useState<NetCounts | null>(null);

    const [allDepartments, setAllDepartments] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        setIsLoading(true);
        if (!supabase) return;

        const { data, error } = await supabase.from('departments').select('*');
        if (!error && data) {
            // Map table results to the internal format expected by the UI
            // Assuming the UI expects the structure similar to DEPARTMENTS array
            // But we can also adapt the UI to the table structure directly.
            // Let's try to adapt the data to match the expected format for now.
            const adaptedData = data.map(d => ({
                id: d.id,
                name: d.name,
                description: d.description,
                scores: d.riasec_scores,
                scoreType: d.category,
                // These components need nested data sometimes, let's see.
                universityTargets: [] // We merged uni targets into rows, so this needs careful handling
            }));

            // Actually, the original departments format had universityTargets inside each department.
            // Our new table has one row per university-department combo.
            // Let's group them by department name to keep the UI flow.

            const groupMap: Record<string, any> = {};
            data.forEach(row => {
                if (!groupMap[row.name]) {
                    groupMap[row.name] = {
                        id: row.id, // Just pick one
                        name: row.name,
                        description: row.description,
                        scores: row.riasec_scores,
                        scoreType: row.category,
                        universityTargets: []
                    };
                }
                groupMap[row.name].universityTargets.push({
                    name: row.university,
                    city: row.city,
                    type: row.type,
                    score: row.base_score
                });
            });

            const grouped = Object.values(groupMap);
            setAllDepartments(grouped);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        // Load user
        const fetchUser = async () => {
            if (supabase) {
                const { data: { session } } = await supabase.auth.getSession();
                if (session?.user) {
                    setUserName(session.user.user_metadata?.name || "Öğrenci");
                }
            }
        };
        fetchUser();

        // Load nets
        const netsStr = localStorage.getItem("currentNets");
        if (netsStr) {
            try { setCurrentNets(JSON.parse(netsStr)); } catch (e) { }
        }
    }, []);

    useEffect(() => {
        if (allDepartments.length === 0) return;

        // Load scores
        const scoresStr = localStorage.getItem("tempScores");

        if (isDirect) {
            // Direct Flow: Show all departments
            const allAdapted = allDepartments.map(d => ({
                ...d,
                match: "Manuel Seçim"
            }));
            setRankedDepts(allAdapted);
        } else if (scoresStr) {
            try {
                const scores = JSON.parse(scoresStr) as RiasecScore;
                const matches = findBestMatches(scores, allDepartments); // Pass fetched departments
                const adapted = matches.map(m => ({
                    ...m.department,
                    match: m.matchScore
                }));
                setRankedDepts(adapted);

                // Default: Select top 3 departments ONLY if no selection exists
                if (adapted.length > 0 && selectedDepartments.length === 0) {
                    setSelectedDepartments(adapted.slice(0, 3).map(d => d.id));
                }
            } catch (e) { console.error(e); }
        } else {
            // Fallback for missing scores
            const allAdapted = allDepartments.map(d => ({
                ...d,
                match: "-"
            }));
            setRankedDepts(allAdapted);
        }
    }, [isDirect, allDepartments]);

    // Helper: Filter Universities per Department
    const getFilteredUniversities = (dept: Department) => {
        if (!dept.universityTargets) return [];
        return dept.universityTargets.filter(uni => {
            const matchCity = selectedCity === 'all' || (Array.isArray(selectedCity) ? selectedCity.length === 0 || (uni.city && selectedCity.includes(uni.city)) : selectedCity === uni.city);
            const matchType = uni.type ? selectedType.includes(uni.type) : false;
            const matchScholarship = uni.type === 'Devlet' || selectedScholarship.includes(uni.scholarship || '');
            const matchSearch = (uni.name || "").toLowerCase().includes(searchQuery.toLowerCase());
            return matchCity && matchType && matchScholarship && matchSearch;
        });
    };

    const toggleType = (type: string) => {
        setSelectedType(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
    };

    const toggleScholarship = (sch: string) => {
        setSelectedScholarship(prev =>
            prev.includes(sch) ? prev.filter(item => item !== sch) : [...prev, sch]
        );
    };



    const handleSelect = (dept: Department) => {
        setTargetDeptData(dept);
        setSelectedTarget(dept.id);
        // setShowCalculator(true); // Removed per user request
    };

    const handleCalculatorSave = (calculatedNets: NetCounts) => {
        setCurrentNets(calculatedNets);
        // Save Current Nets
        localStorage.setItem("currentNets", JSON.stringify(calculatedNets));

        // Close Calculator -> Open Simulator
        setShowCalculator(false);
        setTimeout(() => setShowSimulator(true), 300); // Small delay for UX transition
    };

    const handleSimulatorSave = async (finalTargetNets: NetCounts, finalScore: number) => {
        console.log("handleSimulatorSave triggered", { finalTargetNets, finalScore });
        if (targetDeptData) {
            // Determine selected University object
            let targetUniObj = null;
            if (selectedTarget) {
                const parts = selectedTarget.split("-");
                if (parts.length === 2) {
                    const uniIdx = parseInt(parts[1]);
                    if (targetDeptData.universityTargets && targetDeptData.universityTargets[uniIdx]) {
                        targetUniObj = targetDeptData.universityTargets[uniIdx];
                    }
                }
            }

            // Save Everything
            try {
                localStorage.setItem("targetDepartment", JSON.stringify(targetDeptData));
                localStorage.setItem("selectedTargetId", targetDeptData.id);
                if (targetUniObj) {
                    localStorage.setItem("targetUniversity", JSON.stringify(targetUniObj));
                }

                // Current nets already saved in previous step
                localStorage.setItem("targetNets", JSON.stringify(finalTargetNets));
                localStorage.setItem("finalScore", finalScore.toString());
                localStorage.setItem("minScore", targetDeptData.minScore.toString());
                localStorage.setItem("isOnboardingComplete", "true");

                // Sync to Supabase Metadata
                if (supabase) {
                    await supabase.auth.updateUser({
                        data: {
                            target_department: targetDeptData.name,
                            target_university: targetUniObj?.name || ""
                        }
                    });
                }

                console.log("Data saved to localStorage and synchronized. Redirecting to /dashboard...");
                // Redirect
                router.push("/dashboard");
            } catch (error) {
                console.error("Error saving to localStorage or redirecting:", error);
            }
        } else {
            console.error("No targetDeptData found!");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-24">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-30">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {!isDirect && (
                            <Button variant="ghost" size="sm" onClick={() => router.push("/result")} className="text-gray-500 -ml-2">
                                <ChevronLeft className="w-4 h-4 mr-1" /> Geri
                            </Button>
                        )}
                        <div className="flex items-center gap-2">
                            <Target className="w-5 h-5 text-indigo-600" />
                            <h1 className="font-bold text-gray-900">Hedef Belirleme</h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")} className="text-gray-400">
                            Atla
                        </Button>
                        <div className="text-sm text-gray-500">
                            Adım 2/2
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 space-y-8">
                {/* Intro */}
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {isDirect ? "Hedeflediğin Bölümü ve Üniversiteyi Seç" : "Senin İçin En Uygun Bölümleri Seçtik"}
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        {isDirect
                            ? "Kendi yolunu kendin çizmek istiyorsun. Aşağıdaki listeden sana en yakın hissettiğin bölümleri seçip üniversite hedeflerini belirleyebilirsin."
                            : "Profil analizine göre sana en uygun bölümler aşağıda listelendi. Hedeflediğin bölümü seç ve net hedeflerini belirle."
                        }
                    </p>
                </div>

                {/* Filters */}
                {/* Content Area with Flex Layout */}
                <div className="flex flex-col md:flex-row gap-8 items-start relative">
                    <aside className={`
                        bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all duration-300 z-40
                        ${isFilterOpen
                            ? 'fixed inset-0 m-0 w-full h-full overflow-y-auto rounded-none'
                            : 'hidden md:block w-80 flex-shrink-0 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto'
                        }
                    `}>
                        <div className="flex justify-between items-center md:hidden mb-4">
                            <h2 className="font-bold text-lg text-gray-900">Filtreler</h2>
                            <Button variant="ghost" size="sm" onClick={() => setIsFilterOpen(false)}>Kapat</Button>
                        </div>

                        <div className="space-y-6">
                            {/* Department Filter (Checkbox List) */}
                            <div>
                                <Label className="font-bold text-gray-900 mb-3 block">Bölümler</Label>
                                <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                    {rankedDepts.map((dept) => (
                                        <div key={dept.id} className="flex items-start space-x-3 py-1">
                                            <Checkbox
                                                id={`dept-${dept.id}`}
                                                checked={selectedDepartments.includes(dept.id)}
                                                onCheckedChange={(checked) => {
                                                    setSelectedDepartments(prev =>
                                                        checked
                                                            ? [...prev, dept.id]
                                                            : prev.filter(id => id !== dept.id)
                                                    );
                                                }}
                                                className="mt-1"
                                            />
                                            <Label htmlFor={`dept-${dept.id}`} className="text-sm font-medium text-gray-700 cursor-pointer select-none leading-snug">
                                                {dept.name}
                                                <span className="block text-xs text-indigo-600 font-normal mt-0.5">
                                                    {typeof dept.match === "number" ? `%${dept.match} Eşleşme` : dept.match}
                                                </span>
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="h-px bg-gray-100 my-4"></div>

                            {/* University Search Filter */}
                            <div>
                                <Label className="font-bold text-gray-900 mb-3 block">Üniversite Ara</Label>
                                <Input
                                    type="text"
                                    placeholder="Üniversite Adı..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-gray-50 border-gray-200 text-sm focus-visible:ring-indigo-500 rounded-xl"
                                />
                            </div>

                            <div className="h-px bg-gray-100 my-4"></div>

                            {/* City Filter (Checkbox List) */}
                            <div>
                                <Label className="font-bold text-gray-900 mb-3 block">Şehirler</Label>
                                <div className="space-y-2">
                                    {['İstanbul', 'Ankara', 'İzmir', 'Eskişehir', 'Antalya'].map(city => (
                                        <div key={city} className="flex items-center space-x-3">
                                            <Checkbox
                                                id={`city-${city}`}
                                                checked={Array.isArray(selectedCity) ? selectedCity.includes(city) : selectedCity === city} // Safe check
                                                onCheckedChange={(checked) => {
                                                    // Handle multi-select logic for city
                                                    let current = Array.isArray(selectedCity) ? selectedCity : (selectedCity === 'all' ? [] : [selectedCity]);

                                                    if (checked) {
                                                        current = [...current, city];
                                                    } else {
                                                        current = current.filter(c => c !== city);
                                                    }

                                                    // If empty, maybe set back to 'all' or keep empty (user preference: "all" usually implies no filter)
                                                    // Let's keep it as array. 'all' logic in filter function needs update.
                                                    setSelectedCity(current.length === 0 ? "all" : current as any);
                                                }}
                                            />
                                            <Label htmlFor={`city-${city}`} className="text-sm font-medium text-gray-700 cursor-pointer select-none">{city}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="h-px bg-gray-100 my-4"></div>

                            {/* Type Filter */}
                            <div>
                                <Label className="font-bold text-gray-900 mb-3 block">Üniversite Türü</Label>
                                <div className="space-y-2">
                                    {['Devlet', 'Vakıf'].map(type => (
                                        <div key={type} className="flex items-center space-x-3">
                                            <Checkbox
                                                id={`type-${type}`}
                                                checked={selectedType.includes(type)}
                                                onCheckedChange={() => toggleType(type)}
                                            />
                                            <Label htmlFor={`type-${type}`} className="text-sm font-medium text-gray-700 cursor-pointer select-none">{type}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Scholarship Filter */}
                            {selectedType.includes('Vakıf') && (
                                <div className="animate-in slide-in-from-top-2 duration-200">
                                    <Label className="font-bold text-gray-900 mb-3 block mt-4">Burs Durumu</Label>
                                    <div className="space-y-2">
                                        {['Burslu', '%50 İndirimli', 'Ücretli'].map(sch => (
                                            <div key={sch} className="flex items-center space-x-3">
                                                <Checkbox
                                                    id={`sch-${sch}`}
                                                    checked={selectedScholarship.includes(sch)}
                                                    onCheckedChange={() => toggleScholarship(sch)}
                                                />
                                                <Label htmlFor={`sch-${sch}`} className="text-sm font-medium text-gray-700 cursor-pointer select-none">{sch}</Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1 space-y-8 min-w-0">
                        {rankedDepts.map((dept) => {
                            const filteredUnis = getFilteredUniversities(dept);
                            if (filteredUnis.length === 0) return null;

                            return (
                                <div key={dept.id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-gray-900">{dept.name}</h3>
                                        <Badge variant="secondary" className="text-base px-3 py-1">
                                            {typeof dept.match === "number" ? `${dept.match}% Eşleşme` : dept.match}
                                        </Badge>
                                    </div>
                                    <p className="text-gray-600 mb-6">{dept.description}</p>

                                    {/* Embedded Report Section */}
                                    <div className="mb-8 space-y-6">
                                        <AiAnalysisCard department={dept} matchScore={typeof dept.match === "number" ? dept.match : 0} />

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            <CareerOutlook department={dept} />

                                            {/* Course List Summary */}
                                            <div className="bg-white rounded-xl border border-gray-200 p-5">
                                                <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                    <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
                                                    Temel Dersler
                                                </h4>
                                                <div className="space-y-3">
                                                    {dept.courses.slice(0, 4).map((course, idx) => (
                                                        <div key={idx} className="text-sm">
                                                            <div className="font-semibold text-gray-800">{course.name}</div>
                                                            <div className="text-gray-500 text-xs line-clamp-1">{course.description}</div>
                                                        </div>
                                                    ))}
                                                    {dept.courses.length > 4 && (
                                                        <div className="text-xs text-indigo-600 font-medium pt-1">
                                                            + {dept.courses.length - 4} ders daha...
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="h-px bg-gray-200 flex-1"></div>
                                        <span className="text-sm font-medium text-gray-500">Üniversite Seçimi</span>
                                        <div className="h-px bg-gray-200 flex-1"></div>
                                    </div>

                                    {/* University Cards Grid */}
                                    <div className="grid grid-cols-1 gap-3">
                                        {filteredUnis.map((uni, idx) => {
                                            const originalIdx = dept.universityTargets.indexOf(uni);
                                            const selectionId = `${dept.id}-${originalIdx}`;
                                            const isSelected = selectedTarget === selectionId;

                                            return (
                                                <div
                                                    key={originalIdx}
                                                    onClick={() => {
                                                        setSelectedTarget(selectionId);
                                                        setTargetDeptData(dept);
                                                        // Don't auto open calculator
                                                    }}
                                                    className={cn(
                                                        "relative bg-white rounded-xl border-2 p-4 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md",
                                                        isSelected ? "border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600" : "border-gray-100 hover:border-indigo-200"
                                                    )}
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex-1">
                                                            <div className="font-bold text-gray-900 text-lg">{uni.name}</div>
                                                            <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                                                                <span className="flex items-center"><Target className="w-3 h-3 mr-1" /> {uni.city || "Şehir Belirtilmedi"}</span>
                                                                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                                                <span>{uni.type || "Devlet"}</span>
                                                                {uni.type === 'Vakıf' && (
                                                                    <>
                                                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                                                        <span className={uni.scholarship?.includes("Burslu") ? "text-green-600 font-medium" : "text-gray-600"}>{uni.scholarship || "Ücretli"}</span>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="text-right pl-4">
                                                            <div className="text-2xl font-black text-indigo-900">{uni.score}</div>
                                                            <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Hedef Net</div>
                                                        </div>
                                                    </div>

                                                    {isSelected && (
                                                        <div className="absolute -top-3 -right-3 bg-indigo-600 text-white p-1.5 rounded-full shadow-lg animate-in zoom-in">
                                                            <Check className="w-4 h-4" />
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}

                        {/* Empty State */}
                        {rankedDepts.every(d => getFilteredUniversities(d).length === 0) && (
                            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900">Eşleşen sonuç bulunamadı</h3>
                                <p className="text-gray-500 mt-2">Filtreleri değiştirerek tekrar deneyebilirsin.</p>
                                <Button variant="link" onClick={() => {
                                    setSelectedCity("all");
                                    setSelectedType(["Devlet", "Vakıf"]);
                                }}>Filtreleri Temizle</Button>
                            </div>
                        )}

                        {/* No Selection State (Instructions) */}
                        {selectedDepartments.length === 0 && rankedDepts.length > 0 && (
                            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-indigo-200">
                                <Filter className="w-12 h-12 text-indigo-100 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-gray-900">Keşfetmeye Başla</h3>
                                <p className="text-gray-500 mt-2 max-w-sm mx-auto">Sol taraftaki filtreden ilgini çeken bölümleri seçerek hedeflerini belirleyebilirsin.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Sticky Bottom Bar */}
            <div className={`fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t p-4 z-40 transition-transform duration-300 ${!selectedTarget ? 'translate-y-full' : 'translate-y-0'}`}>
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="hidden md:block">
                        <p className="font-semibold text-gray-900">Harika seçim! 🎉</p>
                        <p className="text-sm text-gray-500">Şimdi bu hedef için önce mevcut durumunu, sonra hedef netlerini belirleyelim.</p>
                    </div>
                    {/* Updated Save Button */}
                    <div className="flex gap-4 w-full md:w-auto">
                        <div className="hidden md:block"></div>
                        <Button
                            size="lg"
                            onClick={() => {
                                if (targetDeptData) {
                                    // Step 1: Open Calculator (Current Nets)
                                    setShowCalculator(true);
                                }
                            }}
                            className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 px-8 shadow-xl shadow-indigo-200"
                        >
                            Netlerimi Gir ve Başla <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Step 1: Net Calculator (Current Nets) */}
            <NetCalculator
                isOpen={showCalculator}
                onClose={() => setShowCalculator(false)}
                onSave={handleCalculatorSave}
            />

            {/* Step 2: Net Simulator (Target Nets) */}
            {/* Step 2: Net Simulator (Target Nets) */}
            <Dialog open={showSimulator} onOpenChange={setShowSimulator}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" aria-describedby="target-simulator-description">
                    <DialogTitle className="sr-only">Hedef ve Net Simülatörü</DialogTitle>
                    <DialogDescription id="target-simulator-description" className="sr-only">
                        Seçilen bölüm ve üniversite için hedef netlerinizi belirleyebileceğiniz simülatör.
                    </DialogDescription>
                    <NetSimulator
                        departmentName={
                            (() => {
                                if (!targetDeptData) return "";
                                if (selectedTarget) {
                                    const parts = selectedTarget.split("-");
                                    if (parts.length === 2 && targetDeptData.universityTargets) {
                                        const uniIdx = parseInt(parts[1]);
                                        const uni = targetDeptData.universityTargets[uniIdx];
                                        if (uni) return `${uni.name} - ${targetDeptData.name}`;
                                    }
                                }
                                return targetDeptData.name;
                            })()
                        }
                        minScore={
                            (() => {
                                if (!targetDeptData) return 0;
                                // Try to get specific university score
                                if (selectedTarget) {
                                    const parts = selectedTarget.split("-");
                                    if (parts.length === 2 && targetDeptData.universityTargets) {
                                        const uniIdx = parseInt(parts[1]);
                                        const uni = targetDeptData.universityTargets[uniIdx];
                                        if (uni) return uni.score;
                                    }
                                }
                                // Fallback to department min score
                                return targetDeptData.minScore;
                            })()
                        }
                        scoreType={targetDeptData?.scoreType || 'SAY'}
                        initialNets={undefined} // User wants to start from scratch/default, not copy current nets
                        onSave={handleSimulatorSave}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default function TargetSelectionPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>}>
            <TargetSelectionContent />
        </Suspense>
    );
}
