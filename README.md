# 🦖 DinoFossil Atlas - Mapa de Fósiles de Dinosaurios

Una plataforma interactiva para explorar y gestionar la base de datos de fósiles de dinosaurios a nivel mundial. Incluye un mapa interactivo con información detallada de descubrimientos y un panel administrativo para gestionar usuarios y registros.

## ✨ Características

### 🗺️ Mapa Interactivo
- Visualización de fósiles en mapa con OpenStreetMap
- Clustering automático de marcadores para mejor rendimiento
- Popups detallados con información completa del dinosaurio:
  - Clase, tipo, familia
  - Dieta con indicadores emoji (🦖 Carnívoro, 🌿 Herbívoro, 🍖🌱 Omnívoro)
  - Región geográfica y coordenadas precisas
  - Período geológico (MYA)
  - Descripción

### 🛡️ Panel Administrativo
- **Login seguro** para administradores
- **Gestión de Usuarios**: Crear, editar y eliminar usuarios del sistema
- **Gestión de Dinosaurios**: Crear, editar y eliminar registros de fósiles
- Tabla interactiva con filtros y búsqueda
- Modal de confirmación para operaciones sensibles

### 🌍 Internacionalización
- Soporte completo para **Español** e **Inglés**
- Selector de idioma en todas las vistas
- Todos los textos traducidos dinámicamente

### 🎨 Diseño
- Paleta de colores paleontológica (tonos tierra, ámbar, verde bosque)
- Tema claro y oscuro
- Responsive design (mobile, tablet, desktop)
- Interfaz moderna con Tailwind CSS

## 🛠️ Tecnologías

### Frontend
- **React 18.2.0** - Librería UI
- **TypeScript ~5.8.3** - Type safety
- **Vite 6.3.5** - Build tool y dev server
- **Tailwind CSS 3.4.1** - Utility-first CSS
- **react-router-dom** - Routing y navegación

### Mapas
- **Leaflet 1.9.4** - Librería de mapas
- **react-leaflet 4.2.1** - Integración con React
- **react-leaflet-cluster 2.1.0** - Clustering de marcadores
- **OpenStreetMap** - Tiles del mapa

### Componentes
- **lucide-react** - Iconos SVG
- **Zustand 5.0.5** - State management
- **PostCSS 8.5.4** - Transformaciones CSS

### Fuentes
- **Google Fonts**: Inter (300-900), Merriweather (400/700/900)

## 📦 Instalación

```bash
# Clonar el repositorio
git clone <repo-url>
cd dino-frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 🗺️ Rutas

| Ruta | Descripción |
|------|-------------|
| / | Página principal con mapa interactivo |
| /admin/login | Login para administradores |
| /admin/dashboard | Panel administrativo (protegido) |

## 👥 Características de Usuario

### Página Principal
- Mapa interactivo con todos los fósiles
- Búsqueda y filtrado por región
- Información detallada al hacer clic en marcadores
- Cambio de idioma y tema en tiempo real

### Panel Admin
- Dashboard con estadísticas (total fósiles, especies, regiones, usuarios)
- Sección de Usuarios: CRUD completo
- Sección de Dinosaurios: CRUD completo
- Botones de crear, editar y eliminar
- Modales interactivos con formularios

## 🚀 Próximas Características

- [ ] Integración con API backend real
- [ ] Autenticación JWT
- [ ] Rutas protegidas con verificación de token
- [ ] Búsqueda y filtrado avanzado
- [ ] Exportar datos a CSV/JSON
- [ ] Analytics y reportes
- [ ] Subida de imágenes
- [ ] Comentarios y reseñas

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── DinoMap.tsx           # Mapa interactivo
│   ├── Header.tsx            # Encabezado
│   ├── LanguageToggle.tsx    # Selector de idioma
│   ├── ThemeToggle.tsx       # Selector de tema
│   └── stats-bar.tsx         # Barra de estadísticas
├── pages/
│   ├── admin-login.tsx       # Página de login
│   └── admin-dashboard.tsx   # Panel administrativo
├── contexts/
│   └── LanguageContext.tsx   # Context para idioma
├── lib/
│   ├── i18n.ts              # Sistema de traducción
│   └── fossil-data.ts       # Datos de prueba
├── App.tsx                   # Componente principal
├── main.tsx                  # Entry point
└── globals.css              # Estilos globales
```

## 🧪 Datos de Ejemplo

### Usuario de Prueba (Admin)
- Email: juan@paleontology.com
- Contraseña: (placeholder)

### Dinosaurios Incluidos
- Tyrannosaurus rex (Cretácico)
- Triceratops horridus (Cretácico)
- Brachiosaurus altithorax (Jurásico)
- Velociraptor mongoliensis (Cretácico)
- Stegosaurus stenops (Jurásico)

## 📜 Licencia

Este proyecto está bajo licencia MIT.

## 👨‍💻 Autor

Juan Carlos - Desarrollo Frontend

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o crea un pull request con tus cambios.

## 💬 Soporte

Para reportar bugs o sugerir mejoras, por favor abre un issue en el repositorio.

---

**Última actualización**: Febrero 8, 2026
