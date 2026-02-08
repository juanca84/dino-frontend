"use client"

import { ThemeToggle } from "./theme-toggle"
import { LanguageToggle } from "./language-toggle"
import { useLanguage } from "@/contexts/LanguageContext"
import { t } from "@/lib/i18n"

export function Header() {
  const { language } = useLanguage()
  return (
    <header className="border-b-2 border-primary/30 bg-gradient-to-r from-card to-card/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-secondary/60 via-primary/50 to-accent/40 p-3 rounded-xl shadow-lg text-3xl hover:scale-110 transition-transform duration-300 border border-primary/20">
              🦖
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-[family-name:var(--font-merriweather)] tracking-tight leading-tight">
                {t('header.title', language)}
              </h1>
              <p className="text-sm text-muted-foreground font-[family-name:var(--font-inter)] mt-1">
                {t('header.subtitle', language)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#map"
                className="text-sm font-semibold text-foreground/80 hover:text-primary transition-all duration-300 font-[family-name:var(--font-inter)] relative group"
              >
                {t('header.map', language)}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#discoveries"
                className="text-sm font-semibold text-foreground/80 hover:text-primary transition-all duration-300 font-[family-name:var(--font-inter)] relative group"
              >
                {t('header.discoveries', language)}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#species"
                className="text-sm font-semibold text-foreground/80 hover:text-primary transition-all duration-300 font-[family-name:var(--font-inter)] relative group"
              >
                {t('header.species', language)}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#about"
                className="text-sm font-semibold text-foreground/80 hover:text-primary transition-all duration-300 font-[family-name:var(--font-inter)] relative group"
              >
                {t('header.about', language)}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300"></span>
              </a>
            </nav>
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
