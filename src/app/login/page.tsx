"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, Chrome } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent | string) => {
        if (typeof e !== 'string') e.preventDefault();

        const emailInput = (document.getElementById('email') as HTMLInputElement)?.value;
        const passwordInput = (document.getElementById('password') as HTMLInputElement)?.value;

        if (!emailInput || !passwordInput || !emailInput.includes('@')) {
            alert("Lütfen geçerli bir e-posta ve şifre giriniz.");
            return;
        }

        setIsLoading(true);

        const username = emailInput.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
        const displayName = username.charAt(0).toUpperCase() + username.slice(1);

        setTimeout(() => {
            setIsLoading(false);
            localStorage.setItem("user", JSON.stringify({
                name: displayName,
                username: username,
                email: emailInput
            }));

            router.push("/dashboard");
        }, 1500);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            <Link href="/" className="mb-8 flex items-center gap-2">
                <Rocket className="h-8 w-8 text-indigo-600" />
                <span className="font-bold text-2xl tracking-tight">Kariyer<span className="text-indigo-600">Rehberi</span>.ai</span>
            </Link>

            <Card className="w-full max-w-sm shadow-xl">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Giriş Yap</CardTitle>
                    <CardDescription className="text-center">
                        Kariyer raporlarına erişmek için hesabına gir.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" onClick={() => handleLogin('google')}>
                            <Chrome className="mr-2 h-4 w-4" />
                            Google
                        </Button>
                        <Button variant="outline" onClick={() => handleLogin('apple')}>
                            <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M13.025 1c-1.446.467-2.617 1.874-2.427 3.65.066.586.29 1.15.54 1.637 1.488 2.593 5.376-1.15 4.864-3.69-.174-.794-.523-1.493-1.077-1.957-.59-.533-1.25-.66-1.9-.64zm2.14 4.314c-.114.61-.416 1.156-.842 1.547-1.076.99-2.5 1.5-3.992.83-.93-.42-1.634-1.21-1.972-2.176-.395-1.127.025-2.28 1.05-2.887.412-.244.757-.318 1.346-.282.805.05 1.442.27 2.053.71.693.496 1.173 1.25 1.258 2.083.022.213.045.426.048.64.083 4.343-3.698 8.018-7.9 7.697-2.733-.21-4.753-2.62-4.654-5.467.094-2.69 2.112-4.99 4.78-5.467 1.36-.242 2.766-.086 4.027.464 1.12.518 1.986 1.445 2.41 2.576.47 1.26.155 2.65-.806 3.535zM12 21.68c-2.492 0-4.665-1.04-6.142-2.748l1.375-1.57c1.13 1.305 2.802 2.108 4.767 2.108 3.53 0 6.398-2.686 6.398-6.002 0-3.315-2.868-6.002-6.398-6.002-3.328 0-6.052 2.502-6.357 5.706H7.95c.348-4.417 4.045-7.896 8.525-7.896 4.717 0 8.55 3.585 8.55 8.002s-3.833 8.002-8.55 8.002z" /></svg>
                            Apple
                        </Button>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">veya e-posta ile</span>
                        </div>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">E-posta</Label>
                            <Input id="email" type="email" placeholder="ornek@mail.com" required />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Şifre</Label>
                                <span className="text-xs text-gray-400 cursor-not-allowed">Şifremi unuttum</span>
                            </div>
                            <Input id="password" type="password" required placeholder="******" />
                        </div>
                        <Button className="w-full bg-indigo-600 hover:bg-indigo-700" type="submit" disabled={isLoading}>
                            {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                    <div className="text-sm text-center text-gray-500">
                        Hesabın yok mu? <Link href="/test" className="text-indigo-600 font-semibold hover:underline">Hemen Teste Başla</Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
