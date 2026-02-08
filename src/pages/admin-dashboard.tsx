import { useState } from "react"
import { LogOut, Users, Menu, X, Database, Plus, Trash2, Edit2 } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { LanguageToggle } from "@/components/language-toggle"
import { ThemeToggle } from "@/components/theme-toggle"

interface TestUser {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
}

interface TestDino {
  id: number
  name: string
  species: string
  period: string
  diet: string
  region: string
}

interface FormData {
  name?: string
  email?: string
  role?: string
  status?: string
  species?: string
  period?: string
  diet?: string
  region?: string
}

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [currentTab, setCurrentTab] = useState<'users' | 'dinosaurs'>('users')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<TestUser | TestDino | null>(null)
  const [formData, setFormData] = useState<FormData>({})
  const [users, setUsers] = useState<TestUser[]>([
    {
      id: 1,
      name: 'Juan Carlos',
      email: 'juan@paleontology.com',
      role: 'Admin',
      status: 'active'
    },
    {
      id: 2,
      name: 'María García',
      email: 'maria@paleontology.com',
      role: 'Editor',
      status: 'active'
    },
    {
      id: 3,
      name: 'Pedro López',
      email: 'pedro@paleontology.com',
      role: 'Viewer',
      status: 'active'
    },
    {
      id: 4,
      name: 'Ana Rodríguez',
      email: 'ana@paleontology.com',
      role: 'Editor',
      status: 'inactive'
    },
    {
      id: 5,
      name: 'Carlos Martínez',
      email: 'carlos@paleontology.com',
      role: 'Viewer',
      status: 'active'
    }
  ])
  const [dinosaurs, setDinosaurs] = useState<TestDino[]>([
    {
      id: 1,
      name: 'Tyrannosaurus',
      species: 'T. rex',
      period: 'Cretácico',
      diet: 'Carnívoro',
      region: 'América del Norte'
    },
    {
      id: 2,
      name: 'Triceratops',
      species: 'T. horridus',
      period: 'Cretácico',
      diet: 'Herbívoro',
      region: 'América del Norte'
    },
    {
      id: 3,
      name: 'Brachiosaurus',
      species: 'B. altithorax',
      period: 'Jurásico',
      diet: 'Herbívoro',
      region: 'América del Norte'
    },
    {
      id: 4,
      name: 'Velociraptor',
      species: 'V. mongoliensis',
      period: 'Cretácico',
      diet: 'Carnívoro',
      region: 'Mongolia'
    },
    {
      id: 5,
      name: 'Stegosaurus',
      species: 'S. stenops',
      period: 'Jurásico',
      diet: 'Herbívoro',
      region: 'América del Norte'
    }
  ])
  const { language } = useLanguage()

  const handleLogout = () => {
    localStorage.removeItem("admin_token")
    window.location.href = "/admin/login"
  }

  const handleCreate = () => {
    setFormData({})
    setSelectedItem(null)
    setShowCreateModal(true)
  }

  const handleEdit = (item: TestUser | TestDino) => {
    setSelectedItem(item)
    setFormData(item)
    setShowEditModal(true)
  }

  const handleDelete = (item: TestUser | TestDino) => {
    setSelectedItem(item)
    setShowDeleteModal(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSaveCreate = () => {
    if (currentTab === 'users') {
      const newUser: TestUser = {
        id: Math.max(...users.map(u => u.id), 0) + 1,
        name: formData.name || '',
        email: formData.email || '',
        role: formData.role || 'Viewer',
        status: (formData.status as 'active' | 'inactive') || 'active'
      }
      setUsers([...users, newUser])
    } else {
      const newDino: TestDino = {
        id: Math.max(...dinosaurs.map(d => d.id), 0) + 1,
        name: formData.name || '',
        species: formData.species || '',
        period: formData.period || '',
        diet: formData.diet || '',
        region: formData.region || ''
      }
      setDinosaurs([...dinosaurs, newDino])
    }
    setShowCreateModal(false)
    setFormData({})
  }

  const handleSaveEdit = () => {
    if (!selectedItem) return

    if (currentTab === 'users') {
      setUsers(users.map(u => u.id === selectedItem.id ? {
        ...u,
        name: formData.name || u.name,
        email: formData.email || u.email,
        role: formData.role || u.role,
        status: (formData.status as 'active' | 'inactive') || u.status
      } : u))
    } else {
      setDinosaurs(dinosaurs.map(d => d.id === selectedItem.id ? {
        ...d,
        name: formData.name || d.name,
        species: formData.species || d.species,
        period: formData.period || d.period,
        diet: formData.diet || d.diet,
        region: formData.region || d.region
      } : d))
    }
    setShowEditModal(false)
    setFormData({})
    setSelectedItem(null)
  }

  const confirmDelete = () => {
    if (!selectedItem) return
    
    if (currentTab === 'users') {
      setUsers(users.filter(u => u.id !== selectedItem.id))
    } else {
      setDinosaurs(dinosaurs.filter(d => d.id !== selectedItem.id))
    }
    
    setShowDeleteModal(false)
    setSelectedItem(null)
  }

  const testUsers = users
  const testDinos = dinosaurs

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-2 border-primary/30 bg-gradient-to-r from-card to-card/80 sticky top-0 z-40">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-secondary/30 rounded-lg transition-colors lg:hidden"
            >
              {isSidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🦖</span>
              <h1 className="text-2xl font-bold text-primary">
                {language === 'es' ? 'Panel Admin' : 'Admin Panel'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <LanguageToggle />
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-destructive"
              title={language === 'es' ? 'Cerrar sesión' : 'Logout'}
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? 'w-64' : 'w-0'
          } border-r border-border bg-card/50 transition-all duration-300 overflow-hidden lg:w-64`}
        >
          <nav className="p-4 space-y-2 mt-4">
            <button
              onClick={() => setCurrentTab('users')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentTab === 'users'
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-primary/10 text-foreground hover:text-primary'
              }`}
            >
              <Users className="h-5 w-5" />
              <span className="font-medium text-left">{language === 'es' ? 'Usuarios' : 'Users'}</span>
            </button>
            <button
              onClick={() => setCurrentTab('dinosaurs')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentTab === 'dinosaurs'
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-primary/10 text-foreground hover:text-primary'
              }`}
            >
              <Database className="h-5 w-5" />
              <span className="font-medium text-left">{language === 'es' ? 'Dinosaurios' : 'Dinosaurs'}</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 lg:p-8">
            {/* Título y botones */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-2">
                  {currentTab === 'users'
                    ? (language === 'es' ? 'Gestión de Usuarios' : 'Users Management')
                    : (language === 'es' ? 'Gestión de Dinosaurios' : 'Dinosaurs Management')}
                </h2>
                <p className="text-muted-foreground">
                  {currentTab === 'users'
                    ? (language === 'es' ? 'Administra los usuarios del sistema' : 'Manage system users')
                    : (language === 'es' ? 'Administra la base de datos de dinosaurios' : 'Manage dinosaur database')}
                </p>
              </div>
              <button
                onClick={handleCreate}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold rounded-lg transition-all"
              >
                <Plus className="h-5 w-5" />
                {language === 'es' ? 'Crear' : 'Create'}
              </button>
            </div>

            {/* Tabla de Usuarios */}
            {currentTab === 'users' && (
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-card/50">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        {language === 'es' ? 'Nombre' : 'Name'}
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        {language === 'es' ? 'Email' : 'Email'}
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        {language === 'es' ? 'Rol' : 'Role'}
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        {language === 'es' ? 'Estado' : 'Status'}
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        {language === 'es' ? 'Acciones' : 'Actions'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {testUsers.map((user) => (
                      <tr key={user.id} className="border-b border-border hover:bg-background/50 transition-colors">
                        <td className="px-6 py-4 text-sm text-foreground font-medium">{user.name}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{user.email}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-semibold">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.status === 'active'
                              ? 'bg-secondary/20 text-secondary'
                              : 'bg-muted/20 text-muted-foreground'
                          }`}>
                            {user.status === 'active' 
                              ? (language === 'es' ? 'Activo' : 'Active')
                              : (language === 'es' ? 'Inactivo' : 'Inactive')}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm flex gap-2">
                          <button
                            onClick={() => handleEdit(user)}
                            className="p-2 hover:bg-accent/20 rounded-lg transition-colors text-accent"
                            title={language === 'es' ? 'Editar' : 'Edit'}
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(user)}
                            className="p-2 hover:bg-destructive/20 rounded-lg transition-colors text-destructive"
                            title={language === 'es' ? 'Eliminar' : 'Delete'}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            )}

            {/* Tabla de Dinosaurios */}
            {currentTab === 'dinosaurs' && (
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-card/50">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        {language === 'es' ? 'Nombre' : 'Name'}
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        {language === 'es' ? 'Especie' : 'Species'}
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        {language === 'es' ? 'Período' : 'Period'}
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        {language === 'es' ? 'Dieta' : 'Diet'}
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        {language === 'es' ? 'Región' : 'Region'}
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                        {language === 'es' ? 'Acciones' : 'Actions'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {testDinos.map((dino) => (
                      <tr key={dino.id} className="border-b border-border hover:bg-background/50 transition-colors">
                        <td className="px-6 py-4 text-sm text-foreground font-medium">{dino.name}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{dino.species}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-semibold">
                            {dino.period}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-foreground">{dino.diet}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{dino.region}</td>
                        <td className="px-6 py-4 text-sm flex gap-2">
                          <button
                            onClick={() => handleEdit(dino)}
                            className="p-2 hover:bg-accent/20 rounded-lg transition-colors text-accent"
                            title={language === 'es' ? 'Editar' : 'Edit'}
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(dino)}
                            className="p-2 hover:bg-destructive/20 rounded-lg transition-colors text-destructive"
                            title={language === 'es' ? 'Eliminar' : 'Delete'}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            )}

            {/* Modal de Crear */}
            {showCreateModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md max-h-screen overflow-y-auto">
                  <h3 className="text-xl font-bold text-primary mb-4">
                    {language === 'es' ? 'Crear Nuevo Registro' : 'Create New Record'}
                  </h3>

                  <div className="space-y-4 mb-6">
                    {currentTab === 'users' ? (
                      <>
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">
                            {language === 'es' ? 'Nombre' : 'Name'}
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name || ''}
                            onChange={handleInputChange}
                            placeholder={language === 'es' ? 'Ingresa el nombre' : 'Enter name'}
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email || ''}
                            onChange={handleInputChange}
                            placeholder={language === 'es' ? 'Ingresa el email' : 'Enter email'}
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">
                            {language === 'es' ? 'Rol' : 'Role'}
                          </label>
                          <select
                            name="role"
                            value={formData.role || 'Viewer'}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                          >
                            <option value="Admin">Admin</option>
                            <option value="Editor">Editor</option>
                            <option value="Viewer">Viewer</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">
                            {language === 'es' ? 'Estado' : 'Status'}
                          </label>
                          <select
                            name="status"
                            value={formData.status || 'active'}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                          >
                            <option value="active">{language === 'es' ? 'Activo' : 'Active'}</option>
                            <option value="inactive">{language === 'es' ? 'Inactivo' : 'Inactive'}</option>
                          </select>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">
                            {language === 'es' ? 'Nombre' : 'Name'}
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name || ''}
                            onChange={handleInputChange}
                            placeholder={language === 'es' ? 'Ingresa el nombre' : 'Enter name'}
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">
                            {language === 'es' ? 'Especie' : 'Species'}
                          </label>
                          <input
                            type="text"
                            name="species"
                            value={formData.species || ''}
                            onChange={handleInputChange}
                            placeholder={language === 'es' ? 'Ej: T. rex' : 'E.g: T. rex'}
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">
                            {language === 'es' ? 'Período' : 'Period'}
                          </label>
                          <input
                            type="text"
                            name="period"
                            value={formData.period || ''}
                            onChange={handleInputChange}
                            placeholder={language === 'es' ? 'Ej: Cretácico' : 'E.g: Cretaceous'}
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">
                            {language === 'es' ? 'Dieta' : 'Diet'}
                          </label>
                          <input
                            type="text"
                            name="diet"
                            value={formData.diet || ''}
                            onChange={handleInputChange}
                            placeholder={language === 'es' ? 'Ej: Carnívoro' : 'E.g: Carnivorous'}
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">
                            {language === 'es' ? 'Región' : 'Region'}
                          </label>
                          <input
                            type="text"
                            name="region"
                            value={formData.region || ''}
                            onChange={handleInputChange}
                            placeholder={language === 'es' ? 'Ej: América del Norte' : 'E.g: North America'}
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowCreateModal(false)}
                      className="flex-1 px-4 py-2 bg-muted hover:bg-muted/80 text-muted-foreground rounded-lg font-semibold transition-colors"
                    >
                      {language === 'es' ? 'Cancelar' : 'Cancel'}
                    </button>
                    <button
                      onClick={handleSaveCreate}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground rounded-lg font-semibold transition-colors"
                    >
                      {language === 'es' ? 'Crear' : 'Create'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Modal de Editar */}
            {showEditModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md max-h-screen overflow-y-auto">
                  <h3 className="text-xl font-bold text-primary mb-4">
                    {language === 'es' ? 'Editar Registro' : 'Edit Record'}
                  </h3>

                  <div className="space-y-4 mb-6">
                    {currentTab === 'users' ? (
                      <>
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">
                            {language === 'es' ? 'Nombre' : 'Name'}
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name || ''}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email || ''}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">
                            {language === 'es' ? 'Rol' : 'Role'}
                          </label>
                          <select
                            name="role"
                            value={formData.role || 'Viewer'}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                          >
                            <option value="Admin">Admin</option>
                            <option value="Editor">Editor</option>
                            <option value="Viewer">Viewer</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">
                            {language === 'es' ? 'Estado' : 'Status'}
                          </label>
                          <select
                            name="status"
                            value={formData.status || 'active'}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                          >
                            <option value="active">{language === 'es' ? 'Activo' : 'Active'}</option>
                            <option value="inactive">{language === 'es' ? 'Inactivo' : 'Inactive'}</option>
                          </select>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">
                            {language === 'es' ? 'Nombre' : 'Name'}
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name || ''}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">
                            {language === 'es' ? 'Especie' : 'Species'}
                          </label>
                          <input
                            type="text"
                            name="species"
                            value={formData.species || ''}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">
                            {language === 'es' ? 'Período' : 'Period'}
                          </label>
                          <input
                            type="text"
                            name="period"
                            value={formData.period || ''}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">
                            {language === 'es' ? 'Dieta' : 'Diet'}
                          </label>
                          <input
                            type="text"
                            name="diet"
                            value={formData.diet || ''}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">
                            {language === 'es' ? 'Región' : 'Region'}
                          </label>
                          <input
                            type="text"
                            name="region"
                            value={formData.region || ''}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowEditModal(false)}
                      className="flex-1 px-4 py-2 bg-muted hover:bg-muted/80 text-muted-foreground rounded-lg font-semibold transition-colors"
                    >
                      {language === 'es' ? 'Cancelar' : 'Cancel'}
                    </button>
                    <button
                      onClick={handleSaveEdit}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground rounded-lg font-semibold transition-colors"
                    >
                      {language === 'es' ? 'Guardar' : 'Save'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Modal de Eliminar */}
            {showDeleteModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md">
                  <h3 className="text-xl font-bold text-destructive mb-4">
                    {language === 'es' ? '¿Eliminar Registro?' : 'Delete Record?'}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {language === 'es' ? 'Esta acción no se puede deshacer.' : 'This action cannot be undone.'}
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="flex-1 px-4 py-2 bg-muted hover:bg-muted/80 text-muted-foreground rounded-lg font-semibold transition-colors"
                    >
                      {language === 'es' ? 'Cancelar' : 'Cancel'}
                    </button>
                    <button
                      onClick={confirmDelete}
                      className="flex-1 px-4 py-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-lg font-semibold transition-colors"
                    >
                      {language === 'es' ? 'Eliminar' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
