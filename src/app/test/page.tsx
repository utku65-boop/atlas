"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { questions as riasecQuestions } from "@/lib/data/questions";
import { calculateRiasecScore } from "@/lib/algorithm";
import { ArrowRight, Check, ChevronLeft, User, GraduationCap, MapPin, Target } from "lucide-react";
import { supabase } from "@/lib/supabase";

// Types
type TestStage = 'PROFILE' | 'TEST' | 'ACADEMIC' | 'GATE';

// interface UserProfile {
//     name: string;
//     city: string;
//     grade: string;
// }

interface AcademicProfile {
    bestSubjects: string[];
    worstSubjects: string[];
}

export default function CareerTestPage() {
    const router = useRouter();

    // Check if Profile is set - REMOVED per new flow
    // useEffect(() => {
    //     const prefs = localStorage.getItem("preferencesSet");
    //     if (!prefs) {
    //         router.push("/onboarding/profile");
    //     }
    // }, []);

    const [stage, setStage] = useState<TestStage>('TEST');

    // Test State
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);

    // Load progress on mount
    useEffect(() => {
        const savedStage = localStorage.getItem("test_stage") as TestStage;
        const savedStep = localStorage.getItem("test_step");
        const savedAnswers = localStorage.getItem("test_answers");

        if (savedStage) setStage(savedStage);
        if (savedStep) setCurrentStep(parseInt(savedStep));
        if (savedAnswers) setSelectedQuestions(JSON.parse(savedAnswers));
    }, []);

    // Save progress on change
    useEffect(() => {
        localStorage.setItem("test_stage", stage);
        localStorage.setItem("test_step", currentStep.toString());
        localStorage.setItem("test_answers", JSON.stringify(selectedQuestions));
    }, [stage, currentStep, selectedQuestions]);

    // Academic State
    const [academicProfile, setAcademicProfile] = useState<AcademicProfile>({ bestSubjects: [], worstSubjects: [] });

    // Gate State
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [isOtpSent, setIsOtpSent] = useState(false);

    const totalQuestions = riasecQuestions.length;

    // --- Handlers ---

    // 1. Profile Handler - REMOVED
    // const handleProfileSubmit = (e: React.FormEvent) => { ... }

    // 2. Test Handler
    const handleAnswer = (optionId: string) => {
        const newSelected = [...selectedQuestions, optionId];
        setSelectedQuestions(newSelected);

        if (currentStep < totalQuestions - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setStage('ACADEMIC');
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        } else {
            // Reached start of test, do nothing or redirect to home?
            // For now, just do nothing as Profile is gone.
            router.push("/");
        }
    };

    // 3. Academic Handler
    const handleSubjectToggle = (subject: string, type: 'best' | 'worst') => {
        setAcademicProfile(prev => {
            const list = type === 'best' ? prev.bestSubjects : prev.worstSubjects;
            const otherList = type === 'best' ? prev.worstSubjects : prev.bestSubjects;

            // Prevent selecting same subject in both
            if (otherList.includes(subject)) return prev;

            let newList;
            if (list.includes(subject)) {
                newList = list.filter(s => s !== subject);
            } else {
                if (list.length >= 3) return prev; // Max 3
                newList = [...list, subject];
            }

            return {
                ...prev,
                [type === 'best' ? 'bestSubjects' : 'worstSubjects']: newList
            };
        });
    };

    const handleAcademicSubmit = () => {
        if (academicProfile.bestSubjects.length > 0) {
            setStage('GATE');
        }
    };

    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState("");

    // 4. Gate Handler
    const handleGateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!supabase) {
            alert("Supabase bağlantısı kurulamadı");
            return;
        }

        setIsLoading(true);

        try {
            const emailPrefix = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
            const defaultName = emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1);

            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        name: defaultName,
                        username: emailPrefix,
                        isPremium: false
                    }
                }
            });

            if (error) {
                alert("Kayıt sırasında hata oluştu: " + error.message);
                setIsLoading(false);
                return;
            }

            // Calculate scores to pass to next step
            const scores = calculateRiasecScore(selectedQuestions, riasecQuestions);

            // Here we should ideally save scores to Supabase DB.
            // For now, continuing the existing flow by saving to local storage.
            // In a full implementation, we'd do an insert into the `profiles` table.

            localStorage.setItem("tempScores", JSON.stringify(scores));

            // Clear Test Persistence
            localStorage.removeItem("test_stage");
            localStorage.removeItem("test_step");
            localStorage.removeItem("test_answers");

            // Redirect to Target Selection
            router.push("/onboarding/target");
        } catch (err: any) {
            alert("Beklenmeyen hata: " + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // --- Renderers ---

    // PROFILE Stage Removed

    if (stage === 'TEST') {
        const progress = ((currentStep + 1) / totalQuestions) * 100;
        const currentQuestion = riasecQuestions[currentStep];

        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
                <div className="w-full max-w-xl space-y-8">
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm font-medium text-gray-500">
                            <span>Soru {currentStep + 1} / {totalQuestions}</span>
                            <span>%{Math.round(progress)}</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="shadow-lg border-t-4 border-t-indigo-500">
                                <CardHeader>
                                    <CardTitle className="text-xl text-center text-gray-800">İlgi Alanı Testi</CardTitle>
                                </CardHeader>
                                <CardContent className="py-6">
                                    <p className="text-lg text-center font-medium leading-relaxed mb-8 min-h-[60px] flex items-center justify-center">
                                        {currentQuestion.text}
                                    </p>
                                    <div className="space-y-3">
                                        {currentQuestion.options.map((option) => (
                                            <Button
                                                key={option.id}
                                                variant="outline"
                                                className="w-full text-left justify-start h-auto py-4 px-6 text-base hover:border-indigo-500 hover:bg-indigo-50 transition-all whitespace-normal"
                                                onClick={() => handleAnswer(option.id)}
                                            >
                                                <div className="flex items-start w-full">
                                                    <div className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center mr-4 shrink-0 font-bold text-sm mt-0.5">
                                                        {String.fromCharCode(65 + currentQuestion.options.indexOf(option))}
                                                    </div>
                                                    <span className="flex-1 break-words">{option.text}</span>
                                                </div>
                                            </Button>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </AnimatePresence>

                    <div className="flex justify-between items-center">
                        <Button variant="ghost" onClick={handleBack} className="text-gray-400 hover:text-gray-600">
                            <ChevronLeft className="mr-2 h-4 w-4" /> Geri
                        </Button>
                        <Button variant="ghost" onClick={() => router.push("/dashboard")} className="text-indigo-600 hover:text-indigo-700 font-medium">
                            Testi Atla <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    if (stage === 'ACADEMIC') {
        const subjects = ["Matematik", "Fizik", "Kimya", "Biyoloji", "Edebiyat", "Tarih", "Coğrafya", "Felsefe", "Yabancı Dil"];
        const canSubmit = academicProfile.bestSubjects.length > 0 && academicProfile.bestSubjects.length <= 3 &&
            academicProfile.worstSubjects.length > 0 && academicProfile.worstSubjects.length <= 3;

        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
                <Card className="w-full max-w-2xl shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-xl text-center text-indigo-800">Akademik Check-up 🩺</CardTitle>
                        <CardDescription className="text-center">Gerçekçi bir plan için güçlü ve zayıf yanlarını bilmeliyiz.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Best Subjects */}
                        <div className="space-y-3">
                            <Label className="text-green-700 font-bold flex items-center"><Check className="w-4 h-4 mr-1" /> En İyi Olduğun 3 Ders</Label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {subjects.map(s => (
                                    <div
                                        key={s}
                                        onClick={() => handleSubjectToggle(s, 'best')}
                                        className={`cursor-pointer border rounded-md p-2 text-sm flex items-center justify-between transition-all ${academicProfile.bestSubjects.includes(s)
                                            ? 'bg-green-100 border-green-500 text-green-900 font-semibold shadow-sm'
                                            : academicProfile.worstSubjects.includes(s)
                                                ? 'opacity-30 cursor-not-allowed bg-gray-50'
                                                : 'hover:bg-gray-50 border-gray-200'
                                            }`}
                                    >
                                        {s}
                                        {academicProfile.bestSubjects.includes(s) && <Check className="w-3 h-3 text-green-600" />}
                                    </div>
                                ))}
                            </div>
                            <p className="text-[10px] text-gray-400 text-right">{academicProfile.bestSubjects.length}/3 Seçildi</p>
                        </div>

                        {/* Worst Subjects */}
                        <div className="space-y-3">
                            <Label className="text-red-700 font-bold flex items-center"><ArrowRight className="w-4 h-4 mr-1 rotate-45" /> En Zorlandığın 3 Ders</Label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {subjects.map(s => (
                                    <div
                                        key={s}
                                        onClick={() => handleSubjectToggle(s, 'worst')}
                                        className={`cursor-pointer border rounded-md p-2 text-sm flex items-center justify-between transition-all ${academicProfile.worstSubjects.includes(s)
                                            ? 'bg-red-50 border-red-500 text-red-900 font-semibold shadow-sm'
                                            : academicProfile.bestSubjects.includes(s)
                                                ? 'opacity-30 cursor-not-allowed bg-gray-50'
                                                : 'hover:bg-gray-50 border-gray-200'
                                            }`}
                                    >
                                        {s}
                                        {academicProfile.worstSubjects.includes(s) && <span className="text-red-500 text-xs">Zor</span>}
                                    </div>
                                ))}
                            </div>
                            <p className="text-[10px] text-gray-400 text-right">{academicProfile.worstSubjects.length}/3 Seçildi</p>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full bg-indigo-600 hover:bg-indigo-700"
                            disabled={!canSubmit}
                            onClick={handleAcademicSubmit}
                        >
                            Analizi Tamamla
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    if (stage === 'GATE') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4 fixed inset-0 z-50">
                <Card className="w-full max-w-sm shadow-2xl animate-in scale-95 duration-200">
                    <CardHeader className="bg-indigo-50 border-b border-indigo-100 rounded-t-xl">
                        <CardTitle className="text-lg text-center text-indigo-900">Sonuçların Hazır! 🎉</CardTitle>
                        <CardDescription className="text-center text-xs">Detaylı analizini görmek ve hedefini belirlemek için hesap oluştur.</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form onSubmit={handleGateSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label>E-posta Adresi</Label>
                                <Input
                                    type="email"
                                    placeholder="ornek@ogrenci.com"
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Şifre Belirle</Label>
                                <Input
                                    type="password"
                                    placeholder="******"
                                    required
                                    minLength={6}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="kvkk" required />
                                <label
                                    htmlFor="kvkk"
                                    className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-500"
                                >
                                    Üyelik sözleşmesini okudum, onaylıyorum.
                                </label>
                            </div>
                            <Button type="submit" className="w-full bg-indigo-600 text-white hover:bg-indigo-700">
                                Sonuçları Gör & Kaydol 🚀
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return null;
}
