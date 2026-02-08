"use client"

import { MapPin, Bone, Globe, ChevronUp, ChevronDown } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { t } from "@/lib/i18n"

export function StatsBar() {
  const [isExpanded, setIsExpanded] = useState(true)
  const { language } = useLanguage()

  return (
    <div className="bg-card border-b border-border relative">
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-balance text-foreground font-[family-name:var(--font-merriweather)]">
            {language === 'es' 
              ? 'Explora Descubrimientos de Fósiles de Dinosaurios en el Mundo'
              : 'Explore Dinosaur Fossil Discoveries Worldwide'}
          </h2>
          <p className="text-center text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto font-[family-name:var(--font-inter)]">
            {language === 'es'
              ? 'Mapa interactivo que muestra descubrimientos autenticados de fósiles de la Era Mesozoica, con identificación de especies y detalles de excavación.'
              : 'Interactive map showcasing authenticated fossil discoveries from the Mesozoic Era, complete with species identification and excavation details.'}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-secondary/30 rounded-xl p-6 text-center border border-border">
              <div className="flex justify-center mb-3">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">1,247</div>
              <div className="text-sm text-muted-foreground">
                {language === 'es' ? 'Sitios de Fósiles' : 'Fossil Sites'}
              </div>
            </div>
            <div className="bg-secondary/30 rounded-xl p-6 text-center border border-border">
              <div className="flex justify-center mb-3">
                <div className="bg-accent/10 p-3 rounded-full">
                  <Bone className="h-6 w-6 text-accent" />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">342</div>
              <div className="text-sm text-muted-foreground">
                {language === 'es' ? 'Especies Identificadas' : 'Species Identified'}
              </div>
            </div>
            <div className="bg-secondary/30 rounded-xl p-6 text-center border border-border">
              <div className="flex justify-center mb-3">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">67</div>
              <div className="text-sm text-muted-foreground">
                {language === 'es' ? 'Países' : 'Countries'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-card border border-border rounded-full p-2 shadow-lg hover:bg-secondary/50 transition-colors z-10"
        aria-label={isExpanded ? "Hide statistics" : "Show statistics"}
      >
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-foreground" />
        ) : (
          <ChevronDown className="h-5 w-5 text-foreground" />
        )}
      </button>
    </div>
  )
}
