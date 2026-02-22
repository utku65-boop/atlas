import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard | Kariyer Rehberi",
    description: "Kişiselleştirilmiş YKS çalışma programın, net takibi ve hedef analizlerin.",
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
