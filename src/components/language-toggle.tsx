import { useLanguage } from '@/contexts/LanguageContext'
import type { Language } from '@/lib/i18n'

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-2">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="px-3 py-2 rounded-md border border-border bg-background text-foreground text-sm cursor-pointer hover:bg-muted transition-colors"
      >
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
    </div>
  )
}
