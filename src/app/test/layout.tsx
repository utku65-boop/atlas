import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Kariyer Testi | Kariyer Rehberi",
    description: "Yapay zeka destekli kariyer analizi testi. 5 dakikada ilgi alanlarını ve potansiyelini keşfet.",
};

export default function TestLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
