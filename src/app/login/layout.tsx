import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Giriş Yap | Kariyer Rehberi",
    description: "Kariyer raporlarına ve dashboard'a erişmek için giriş yap.",
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
