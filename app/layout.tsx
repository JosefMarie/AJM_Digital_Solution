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
        <html lang="en">
            <body className="antialiased" style={{ fontFamily: '"Tw Cen MT", sans-serif' }}>
                <FluidBackground />
                {children}
            </body>
        </html>
    );
}
