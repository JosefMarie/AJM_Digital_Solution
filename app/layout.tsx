import type { Metadata } from "next";
import "./globals.css";
import FluidBackground from "@/components/ui/FluidBackground";
import ThemeInitializer from "@/components/ThemeInitializer";
import CustomCursor from "@/components/ui/CustomCursor";
import PageTransition from "@/components/ui/PageTransition";

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
                <CustomCursor />
                <ThemeInitializer />
                <FluidBackground />
                <main className="relative z-10 w-full overflow-x-hidden">
                    <PageTransition>
                        {children}
                    </PageTransition>
                </main>
            </body>
        </html>
    );
}
