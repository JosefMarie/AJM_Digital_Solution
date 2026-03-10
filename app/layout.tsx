import type { Metadata } from "next";
import "./globals.css";
import FluidBackground from "@/components/ui/FluidBackground";
import ThemeInitializer from "@/components/ThemeInitializer";

export const metadata: Metadata = {
    title: "AJM Digital Portfolio | Full-Stack Engineer",
    description: "Professional portfolio of AJM Digital Solution showcasing full-stack engineering expertise.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className="antialiased bg-void-900 text-white min-h-screen">
                <ThemeInitializer />
                <FluidBackground />
                <main className="relative z-10 w-full">
                    {children}
                </main>
            </body>
        </html>
    );
}
