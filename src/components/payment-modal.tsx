"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Check, CreditCard, Loader2 } from "lucide-react";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    productName: string;
    price: string;
}

export function PaymentModal({ isOpen, onClose, productName, price }: PaymentModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate payment processing
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);

            // Auto close after success
            setTimeout(() => {
                onClose();
                setIsSuccess(false); // Reset for next time
            }, 2000);
        }, 1500);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                {!isSuccess ? (
                    <form onSubmit={handlePayment}>
                        <DialogHeader>
                            <DialogTitle>Güvenli Ödeme 🔒</DialogTitle>
                            <DialogDescription>
                                <span className="font-bold text-gray-900">{productName}</span> için ödeme yapıyorsunuz.
                                <br />Tutar: <span className="font-bold text-indigo-600 text-lg">{price}</span>
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Kart Üzerindeki İsim</Label>
                                <Input id="name" placeholder="Ad Soyad" required />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="number">Kart Numarası</Label>
                                <div className="relative">
                                    <Input id="number" placeholder="0000 0000 0000 0000" maxLength={19} required />
                                    <CreditCard className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="expiry">Son Kullanma Tarihi</Label>
                                    <Input id="expiry" placeholder="AA/YY" maxLength={5} required />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="cvv">CVV / CVC</Label>
                                    <Input id="cvv" placeholder="123" maxLength={3} required />
                                </div>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> İşleniyor...
                                    </>
                                ) : (
                                    "Ödemeyi Tamamla"
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                ) : (
                    <div className="flex flex-col items-center justify-center py-8 space-y-4 text-center animate-in zoom-in-95 duration-300">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                            <Check className="w-8 h-8 text-green-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Ödeme Başarılı! 🚀</h3>
                            <p className="text-gray-500">Paketiniz hesabınıza tanımlandı. Yönlendiriliyorsunuz...</p>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
