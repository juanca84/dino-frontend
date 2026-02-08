import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { language } = useLanguage()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      console.log("Login attempt:", { email, password })
      await new Promise(resolve => setTimeout(resolve, 1000))
      localStorage.setItem("admin_token", "token_placeholder")
      window.location.href = "/admin/dashboard"
    } catch (err) {
      setError(language === 'es' ? "Error al iniciar sesión" : "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-card flex flex-col">
      {/* Header con toggles */}
      <div className="flex justify-between items-center p-4 border-b border-border">
        <h1 className="text-2xl font-bold text-primary">🦖 DinoFossil</h1>
        <div className="flex gap-3">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>

      {/* Contenedor principal */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Card del formulario */}
          <div className="bg-card border border-border rounded-2xl shadow-lg p-8">
            {/* Encabezado */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-primary mb-2 font-[family-name:var(--font-merriweather)]">
                {language === 'es' ? 'Panel Admin' : 'Admin Panel'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {language === 'es' ? 'Inicia sesión para continuar' : 'Sign in to continue'}
              </p>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                  {language === 'es' ? 'Email' : 'Email'}
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@dinosaurios.com"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground"
                  required
                />
              </div>

              {/* Contraseña */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-foreground mb-2">
                  {language === 'es' ? 'Contraseña' : 'Password'}
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Mensaje de error */}
              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              {/* Botón de envío */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground font-semibold rounded-lg transition-all duration-300 mt-8"
              >
                {isLoading 
                  ? (language === 'es' ? 'Iniciando...' : 'Signing in...')
                  : (language === 'es' ? 'Iniciar Sesión' : 'Sign In')}
              </button>
            </form>
          </div>

          {/* Pie de página */}
          <div className="text-center mt-6 text-xs text-muted-foreground">
            <p>
              {language === 'es' 
                ? '© 2026 Mapa de Fósiles de Dinosaurios'
                : '© 2026 Dinosaur Fossil Map'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
