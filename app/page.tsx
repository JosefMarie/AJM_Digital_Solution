import Hero from "@/components/public/Hero";
import ProjectsGallery from "@/components/public/ProjectsGallery";
import ResumeSection from "@/components/public/ResumeSection";
import ContactSection from "@/components/public/ContactSection";

export default function Home() {
    return (
        <main className="relative">
            <Hero />
            <ProjectsGallery />
            <ResumeSection />
            <ContactSection />

            {/* Footer */}
            <footer className="py-12 px-6 text-center text-white/60 border-t border-white/10">
                <p className="text-sm">
                    © {new Date().getFullYear()} AJM Digital Solution. Built with Next.js, TypeScript, and Firebase.
                </p>
            </footer>
        </main>
    );
}
