import DinoMap from "@/components/DinoMap"
import { StatsBar } from "@/components/stats-bar"
import { Header } from "@/components/header"
import { LanguageProvider } from "@/contexts/LanguageContext"

export default function Home() {
  return (
    <LanguageProvider>
      <main className="min-h-screen bg-background">
        <Header />
        <StatsBar />
        <DinoMap />
      </main>
    </LanguageProvider>
  );
}
