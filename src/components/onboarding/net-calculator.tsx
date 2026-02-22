import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NetCounts } from "@/lib/score-calculator";

interface NetCalculatorProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (nets: NetCounts) => void;
}

export function NetCalculator({ isOpen, onClose, onSave }: NetCalculatorProps) {
    const [activeTab, setActiveTab] = useState("tyt");

    // Initial state matching NetCounts structure partially for inputs
    const [inputs, setInputs] = useState<Record<string, { d: number, y: number, max: number }>>({
        // TYT
        tyt_turkce: { d: 0, y: 0, max: 40 },
        tyt_sosyal: { d: 0, y: 0, max: 20 },
        tyt_matematik: { d: 0, y: 0, max: 40 },
        tyt_fen: { d: 0, y: 0, max: 20 },
        // AYT
        ayt_matematik: { d: 0, y: 0, max: 40 },
        ayt_fizik: { d: 0, y: 0, max: 14 },
        ayt_kimya: { d: 0, y: 0, max: 13 },
        ayt_biyoloji: { d: 0, y: 0, max: 13 },
        ayt_edebiyat: { d: 0, y: 0, max: 24 },
        ayt_tarih1: { d: 0, y: 0, max: 10 },
        ayt_cografya1: { d: 0, y: 0, max: 6 },
        ayt_tarih2: { d: 0, y: 0, max: 11 },
        ayt_cografya2: { d: 0, y: 0, max: 11 },
        ayt_felsefe: { d: 0, y: 0, max: 12 },
        ayt_din: { d: 0, y: 0, max: 6 },
        ydt: { d: 0, y: 0, max: 80 },
    });

    const calculateNet = (d: number, y: number) => Math.max(0, d - y / 4);

    const handleInputChange = (key: string, field: 'd' | 'y', value: string) => {
        // Enforce integer-only: Remove non-digit chars
        const sanitized = value.replace(/[^0-9]/g, '');
        let val = sanitized === '' ? 0 : parseInt(sanitized, 10);

        if (val < 0) val = 0;

        setInputs(prev => {
            const current = prev[key];
            const other = field === 'd' ? current.y : current.d;

            // 1. Individual clamp
            if (val > current.max) val = current.max;

            // 2. Sum clamp (val + other <= max)
            // If the new value plus the existing other value exceeds max, reduce the new value
            if (val + other > current.max) {
                val = Math.max(0, current.max - other);
            }

            // Optional: If we wanted to allow the user to force the input and reduce the *other* value, logic would be different.
            // But usually inputs bind to their specific field. So limiting the current input is safer.

            return { ...prev, [key]: { ...current, [field]: val } };
        });
    };

    const handleSave = () => {
        const result: Partial<NetCounts> = {};
        Object.entries(inputs).forEach(([key, val]) => {
            result[key as keyof NetCounts] = calculateNet(val.d, val.y);
        });

        // Add OBP default if missing
        result.obp = 90;

        onSave(result as NetCounts);
        onClose();
    };

    const renderInputRow = (key: string, label: string) => (
        <div key={key} className="grid grid-cols-12 items-center gap-2 py-2 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors px-1 shrink-0">
            <div className="col-span-5">
                <p className="text-xs font-bold text-gray-700 truncate">{label}</p>
                <p className="text-[9px] text-gray-400">Limit: {inputs[key].max}</p>
            </div>
            <div className="col-span-2">
                <Input
                    type="text"
                    inputMode="numeric"
                    className="h-8 text-center font-bold px-1"
                    value={inputs[key].d === 0 ? '' : inputs[key].d}
                    onChange={(e) => handleInputChange(key, 'd', e.target.value)}
                />
            </div>
            <div className="col-span-2">
                <Input
                    type="text"
                    inputMode="numeric"
                    className="h-8 text-center font-bold text-red-600 border-red-100 px-1"
                    value={inputs[key].y === 0 ? '' : inputs[key].y}
                    onChange={(e) => handleInputChange(key, 'y', e.target.value)}
                />
            </div>
            <div className="col-span-3 text-right">
                <div className="inline-flex items-center justify-center h-8 px-2 bg-indigo-50 rounded-lg text-[10px] font-black text-indigo-700 min-w-[3rem]">
                    {calculateNet(inputs[key].d, inputs[key].y).toFixed(2)}
                </div>
            </div>
        </div>
    );

    const TableHeader = () => (
        <div className="grid grid-cols-12 items-center gap-2 pb-2 mb-2 border-b-2 border-gray-100 px-1 sticky top-0 bg-white z-10 shrink-0">
            <div className="col-span-5 text-[9px] font-black uppercase tracking-wider text-gray-400">Ders</div>
            <div className="col-span-2 text-[9px] font-black uppercase tracking-wider text-center text-green-600">Doğru</div>
            <div className="col-span-2 text-[9px] font-black uppercase tracking-wider text-center text-red-600">Yanlış</div>
            <div className="col-span-3 text-[9px] font-black uppercase tracking-wider text-right text-indigo-600">Net</div>
        </div>
    );

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[450px] w-[95vw] h-[85vh] flex flex-col p-1 sm:p-6 gap-0 overflow-hidden rounded-2xl">
                <div className="p-4 sm:p-0">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-black tracking-tight">Netleri Güncelle 📝</DialogTitle>
                        <DialogDescription className="text-xs">
                            Son deneme sonuçlarını hızlıca gir.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <div className="flex-1 overflow-hidden flex flex-col mt-4">
                    <Tabs defaultValue="tyt" className="flex-1 flex flex-col overflow-hidden" onValueChange={setActiveTab}>
                        <div className="px-4 sm:px-0 mb-4">
                            <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-xl p-1">
                                <TabsTrigger value="tyt" className="rounded-lg font-bold text-xs uppercase">TYT</TabsTrigger>
                                <TabsTrigger value="ayt" className="rounded-lg font-bold text-xs uppercase">AYT</TabsTrigger>
                                <TabsTrigger value="dil" className="rounded-lg font-bold text-xs uppercase">YDT</TabsTrigger>
                            </TabsList>
                        </div>

                        <div className="flex-1 overflow-y-auto px-4 sm:px-0 custom-scrollbar">
                            <TabsContent value="tyt" className="mt-0 space-y-0 focus-visible:outline-none">
                                <TableHeader />
                                {renderInputRow('tyt_turkce', 'Türkçe')}
                                {renderInputRow('tyt_sosyal', 'Sosyal Bilimler')}
                                {renderInputRow('tyt_matematik', 'Temel Matematik')}
                                {renderInputRow('tyt_fen', 'Fen Bilimleri')}
                            </TabsContent>

                            <TabsContent value="ayt" className="mt-0 space-y-0 focus-visible:outline-none">
                                <TableHeader />
                                <div className="py-2 bg-gray-50/50 px-2 rounded-lg mb-2">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sayısal & EA</p>
                                </div>
                                {renderInputRow('ayt_matematik', 'AYT Matematik')}
                                {renderInputRow('ayt_fizik', 'Fizik')}
                                {renderInputRow('ayt_kimya', 'Kimya')}
                                {renderInputRow('ayt_biyoloji', 'Biyoloji')}

                                <div className="py-2 bg-gray-50/50 px-2 rounded-lg my-2">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">EA & Sözel</p>
                                </div>
                                {renderInputRow('ayt_edebiyat', 'T.D. Edebiyatı')}
                                {renderInputRow('ayt_tarih1', 'Tarih-1')}
                                {renderInputRow('ayt_cografya1', 'Coğrafya-1')}

                                <div className="py-2 bg-gray-50/50 px-2 rounded-lg my-2">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sözel Ek</p>
                                </div>
                                {renderInputRow('ayt_tarih2', 'Tarih-2')}
                                {renderInputRow('ayt_cografya2', 'Coğrafya-2')}
                                {renderInputRow('ayt_felsefe', 'Felsefe Grubu')}
                                {renderInputRow('ayt_din', 'Din Kültürü')}
                            </TabsContent>

                            <TabsContent value="dil" className="mt-0 focus-visible:outline-none">
                                <TableHeader />
                                {renderInputRow('ydt', 'Yabancı Dil (İng/Alm/Fra)')}
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>

                <div className="p-4 sm:pt-4 sm:px-0 bg-white border-t shrink-0">
                    <Button onClick={handleSave} className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-sm font-black rounded-xl shadow-lg shadow-indigo-100">
                        Kaydet ve Hesapla
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
