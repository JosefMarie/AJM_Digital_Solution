import Hero from "@/components/public/Hero";
import ProjectsGallery from "@/components/public/ProjectsGallery";
import ResumeSection from "@/components/public/ResumeSection";

export default function Home() {
    return (
        <main className="relative">
            <Hero />
            <ProjectsGallery />
            <ResumeSection />

            {/* Footer */}
            <footer className="py-12 px-6 text-center text-white/60 border-t border-white/10">
                <p className="text-sm">
                    © {new Date().getFullYear()} Digital Portfolio. Built with Next.js, TypeScript, and Firebase.
                </p>
            </footer>
        </main>
    );
}
