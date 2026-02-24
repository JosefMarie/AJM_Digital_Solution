import type { Metadata } from "next";
import "./globals.css";
import FluidBackground from "@/components/ui/FluidBackground";

export const metadata: Metadata = {
    title: "Digital Portfolio | Full-Stack Developer",
    description: "Professional portfolio showcasing projects and experience in Next.js, TypeScript, and modern web development",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className="antialiased bg-void-900 text-white min-h-screen">
                <FluidBackground />
                <main className="relative z-10 w-full">
                    {children}
                </main>
            </body>
        </html>
    );
}
