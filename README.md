# Ashes - Advanced Search Application

Ashes es una aplicación de búsqueda moderna y avanzada construida con React, TypeScript y Tailwind CSS. Presenta un sistema de autenticación basado en roles, acceso para invitados, contenido restringido y recomendaciones personalizadas basadas en el historial de búsqueda del usuario.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Sistema de Autenticación](#sistema-de-autenticación)
- [Modos de Acceso](#modos-de-acceso)
- [Funcionalidades Principales](#funcionalidades-principales)
- [Persistencia de Datos](#persistencia-de-datos)
- [Guía de Usuario](#guía-de-usuario)
- [Guía de Administrador](#guía-de-administrador)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)

## ✨ Características

### Diseño y UI
- **Glassmorphism Moderno**: Efecto de vidrio esmerilado con degradados suaves
- **4 Temas Personalizables**: Oscuro (Morado), Azul, Verde y Rojo con transiciones fluidas
- **Diseño Responsive**: Funciona perfectamente en móvil, tablet y desktop
- **Animaciones Suaves**: Transiciones y efectos visuales pulidos
- **Accesibilidad**: WCAG AA compliant con navegación por teclado

### Búsqueda y Filtrado
- **5 Categorías de Búsqueda**: Webs, Archivos, Productos, Noticias e Imágenes
- **Sistema de Filtros Dinámicos**: 4 filtros específicos por categoría
- **Búsqueda en Tiempo Real**: Debounced a 300ms con resaltado de términos
- **Dos Modos de Vista**: Grid responsivo y Vista de Lista
- **Filtrado Multidimensional**: Por categoría, filtros y término de búsqueda

### Autenticación y Permisos
- **Dos Roles Principales**: Administrador y Usuario Regular
- **Acceso para Invitados**: Búsqueda sin necesidad de autenticación
- **Contenido Restringido**: Ciertos resultados solo visibles para usuarios autenticados
- **Gestión de Permisos**: Admin controla qué contenido ven los invitados

### Perfiles y Recomendaciones
- **Perfil de Usuario**: Panel que muestra información y búsquedas recientes
- **Recomendaciones Personalizadas**: Basadas en categorías y filtros usados previamente
- **Historial Inteligente**: Últimas 10 búsquedas con restauración rápida
- **Análisis de Patrones**: Sistema que identifica tendencias en búsquedas

### Administración
- **Gestión de Resultados**: Crear, editar, eliminar y marcar como restringidos
- **Estadísticas Detalladas**: Gráficos de categorías y búsquedas más frecuentes
- **Control de Acceso**: Determinar qué contenido pueden ver los invitados
- **Importar/Exportar**: Backup y restauración completa de datos

## 🚀 Instalación

### Requisitos Previos
- Node.js 18+ 
- npm o yarn

### Pasos de Instalación y Ejecución

#### 1. Descargar el Proyecto

Si descargaste el proyecto como ZIP:

\`\`\`bash
# Extrae el archivo ZIP
# Abre la terminal en la carpeta del proyecto
cd ashes-project
\`\`\`

#### 2. Instalar Dependencias

\`\`\`bash
# Con npm
npm install

# O con yarn
yarn install

# O con pnpm
pnpm install
\`\`\`

#### 3. Ejecutar en Desarrollo

\`\`\`bash
# Con npm
npm run dev

# O con yarn
yarn dev

# O con pnpm
pnpm dev
\`\`\`

La aplicación estará disponible en: **http://localhost:3000**

#### 4. Compilar para Producción

\`\`\`bash
# Con npm
npm run build
npm start

# O con yarn
yarn build
yarn start
\`\`\`

### Verificación de Instalación

Después de ejecutar \`npm run dev\`, deberías ver:

\`\`\`
> ashes-project@0.1.0 dev
> next dev

  ▲ Next.js 16.0.3
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in 1.23s
\`\`\`

Abre tu navegador y ve a \`http://localhost:3000\`. Deberías ver la pantalla de login de Ashes.

### Primeras Credenciales de Prueba

Una vez que la aplicación esté corriendo:

**Admin**
- Email: \`admin@ashes.com\`
- Contraseña: \`admin123\`

**O crea un usuario nuevo**
- Cualquier email válido
- Cualquier contraseña

**O entra como Invitado**
- Haz clic en "Continuar como Invitado"

### Troubleshooting de Instalación

#### Puerto 3000 en Uso
\`\`\`bash
# Ejecutar en puerto diferente
npm run dev -- -p 3001
\`\`\`

#### Error de Módulos No Encontrados
\`\`\`bash
# Limpiar node_modules y reinstalar
rm -rf node_modules
npm install
\`\`\`

#### Limpiar localStorage
\`\`\`javascript
// En la consola del navegador (F12)
localStorage.clear()
// Luego recarga la página
\`\`\`

#### Windows - Comando no Reconocido
Si en Windows recibes error de comando no encontrado:
\`\`\`bash
# Asegúrate de tener Node.js instalado
node --version
npm --version

# Si no lo tienes, descárgalo de: https://nodejs.org/
\`\`\`

## 📁 Estructura del Proyecto

\`\`\`
src/
├── app/
│   ├── page.tsx              # Página principal (componente raíz)
│   ├── layout.tsx            # Layout base
│   ├── globals.css           # Estilos globales y temas
│   └── loading.tsx           # Componente de carga
│
├── components/
│   ├── Header.tsx            # Encabezado con información de usuario
│   ├── SearchBar.tsx         # Barra de búsqueda principal
│   ├── Categories.tsx        # Selector de categorías
│   ├── Filters.tsx           # Filtros dinámicos por categoría
│   ├── SettingsPanel.tsx     # Panel de configuración y opciones
│   ├── LoginForm.tsx         # Formulario de autenticación
│   ├── PermissionsBadge.tsx  # Badge que muestra permisos del usuario
│   ├── ProfileModal.tsx      # Modal de perfil con recomendaciones
│   ├── ManagementModal.tsx   # Modal de gestión de resultados (admin)
│   ├── StatsPanel.tsx        # Panel de estadísticas (admin)
│   ├── Results/
│   │   ├── ResultsContainer.tsx
│   │   ├── ResultCard.tsx
│   │   ├── ResultListItem.tsx
│   │   └── index.tsx
│
├── hooks/
│   └── useLocalStorage.ts    # Hook para gestionar localStorage
│
├── utils/
│   ├── auth.ts               # Utilidades de autenticación
│   ├── themes.ts             # Configuración de temas
│   ├── localStorage.ts       # Operaciones CRUD en localStorage
│   ├── searchUtils.ts        # Lógica de filtrado y búsqueda
│   └── recommendations.ts    # Algoritmo de recomendaciones
│
├── types/
│   └── index.ts              # Definiciones de tipos TypeScript
│
└── data/
    ├── categories.ts         # Definiciones de categorías
    ├── filters.ts            # Definiciones de filtros
    └── sampleResults.ts      # 20+ resultados de ejemplo
\`\`\`

## 🔐 Sistema de Autenticación

### Credenciales de Prueba

#### Administrador
- **Email**: `admin@ashes.com`
- **Contraseña**: `admin123`
- **Acceso**: Gestión completa, estadísticas, control de contenido

#### Usuario Regular
- **Email**: Cualquier email válido (ej: `user@example.com`)
- **Contraseña**: Cualquier contraseña (ej: `password123`)
- **Acceso**: Búsquedas, perfil con recomendaciones, contenido público

#### Invitado (Guest)
- **Acceso**: Sin autenticación
- **Permisos**: Búsquedas públicas, opción de ver contenido restringido
- **Limitación**: No puede ver perfil ni recomendaciones

### Flujo de Autenticación

1. **LoginForm**: Pantalla inicial con opciones de login, registro o acceso como invitado
2. **Validación**: Email y contraseña se validan contra localStorage
3. **Sesión**: Usuario se guarda en localStorage con timestamp
4. **Logout**: Limpia la sesión y vuelve al LoginForm

## 🌐 Modos de Acceso

### Acceso como Invitado
\`\`\`
Características:
✓ Búsqueda en categorías y filtros
✓ Vista de resultados públicos
✓ Cambio de temas
✗ Ver resultados restringidos
✗ Acceso a perfil y recomendaciones
\`\`\`

### Usuario Autenticado
\`\`\`
Características:
✓ Todas las de invitado
✓ Ver resultados restringidos (requiresAuth: true)
✓ Perfil con información personal
✓ Recomendaciones personalizadas
✓ Historial de búsquedas guardado
✓ Persistencia de preferencias
\`\`\`

### Administrador
\`\`\`
Características:
✓ Todas las de usuario autenticado
✓ Gestionar resultados (CRUD)
✓ Marcar resultados como restringidos
✓ Ver estadísticas detalladas
✓ Exportar/Importar datos
✓ Resetear a datos de ejemplo
\`\`\`

## 🔍 Funcionalidades Principales

### 1. Sistema de Búsqueda

**Categorías Disponibles**
- 🌐 **Webs**: Blogs, E-commerce, Educación, Entretenimiento
- 📄 **Archivos**: Audio, Imágenes, Videos, Documentos
- 🛍️ **Productos**: Electrónica, Ropa, Hogar, Deportes
- 📰 **Noticias**: Nacional, Internacional, Deportes, Tecnología
- 📸 **Imágenes**: Fotografía, Ilustraciones, Vectores, Iconos

**Filtros Dinámicos**
- Se muestran solo cuando hay una categoría seleccionada
- Selección múltiple (máximo 3 filtros)
- Animación de entrada suave

**Búsqueda de Texto**
- Busca en título, descripción y tags
- Case-insensitive
- Resaltado de coincidencias en resultados
- Debouncing de 300ms para optimizar rendimiento

### 2. Modos de Visualización

**Grid View** (Predeterminado)
- 3 columnas en desktop
- 2 columnas en tablet
- 1 columna en móvil
- Efecto hover con ampliación

**List View**
- Formato vertical compacto
- Mejor legibilidad de descripciones
- Mismos datos que grid

### 3. Recomendaciones Personalizadas

El sistema de recomendaciones analiza:
- **Categorías** utilizadas en últimas búsquedas
- **Filtros** más frecuentes
- **Patrones** de búsqueda del usuario

**Ejemplo de Funcionamiento**
\`\`\`
Usuario busca:
→ Categoría: Webs
→ Filtros: [Videos]

Sistema detecta:
→ Usuario interesado en webs de videos

Recomendación:
→ Muestra otros resultados con: 
  - Categoría: Webs
  - Filtro: Videos
\`\`\`

### 4. Gestión de Resultados (Admin)

**Crear Nuevo Resultado**
- Título (3-100 caracteres)
- Descripción (10-500 caracteres)
- Categoría (seleccionar una)
- Filtros (1-3)
- Tags (máximo 5)
- URL (opcional)
- Thumbnail (opcional)
- Marcar como restringido

**Editar Resultado**
- Modificar cualquier campo
- Cambiar estado de restricción
- Actualizar metadata

**Eliminar Resultado**
- Confirmación antes de eliminar
- Eliminación permanente

**Control de Acceso**
- Toggle "Solo usuarios autenticados"
- Los invitados verán notificación cuando hay contenido restringido

## 💾 Persistencia de Datos

Todos los datos se guardan en **localStorage** del navegador:

### Estructura de localStorage

\`\`\`typescript
// Resultados de búsqueda
ashes-results: Result[]

// Historial de búsquedas
ashes-history: SearchHistory[]

// Preferencias de usuario
ashes-theme: Theme
ashes-viewMode: 'grid' | 'list'

// Información de sesión
ashes-auth: User (con rol y email)
\`\`\`

### Datos Guardados por Usuario

**Administrador**
- Todos los resultados (incluyendo restringidos)
- Historial de cambios (createdAt de cada resultado)
- Estadísticas de uso

**Usuario Regular**
- Resultados accesibles (públicos + restringidos vistos)
- Historial personal de búsquedas
- Preferencias de tema y vista

**Invitado**
- Resultados públicos solamente
- No se guarda sesión (temporal)
- Historial de búsqueda local

### Operaciones CRUD

\`\`\`typescript
// Guardar resultado
saveResult(result: Result)

// Obtener todos
getResults(): Result[]

// Actualizar
updateResult(id: string, data: Partial<Result>)

// Eliminar
deleteResult(id: string)

// Historial
saveSearchHistory(search: SearchHistory)
getSearchHistory(): SearchHistory[]

// Preferencias
savePreferences(prefs: UserPreferences)
getPreferences(): UserPreferences
\`\`\`

## 👥 Guía de Usuario

### Primeros Pasos

1. **Elige tu modo de acceso**:
   - Crea una cuenta de usuario
   - Accede como administrador (credenciales arriba)
   - Continúa como invitado

2. **Realiza tu primera búsqueda**:
   - Selecciona una categoría (Webs, Productos, etc.)
   - Elige filtros específicos
   - Escribe tu término de búsqueda
   - Visualiza resultados

3. **Personaliza tu experiencia**:
   - Abre Configuración (ícono de engranaje)
   - Cambia el tema de color
   - Alterna entre vista Grid y List
   - Revisa tu historial de búsquedas

### Opciones del Usuario

**Barra de Búsqueda**
- Ingresa términos para buscar
- Los resultados se actualizan en tiempo real
- Las coincidencias se resaltan

**Categorías**
- Selecciona una para ver sus filtros
- Solo una categoría activa a la vez
- Efecto visual morado-rosa cuando está seleccionada

**Filtros**
- Aparecen cuando seleccionas categoría
- Puedes elegir múltiples
- Los resultados se filtran en tiempo real

**Modos de Vista**
- Grid: Cards lado a lado
- List: Vertical compacta
- Alterna con el botón en la esquina superior derecha

**Perfil (Usuarios Autenticados)**
- Clic en tu email en el header
- Ver información personal
- Recibir recomendaciones basadas en tus búsquedas
- Recomendaciones usan categorías y filtros de búsquedas previas

**Configuración**
- Cambiar tema de color
- Importar/exportar datos como JSON
- Ver historial de últimas 10 búsquedas
- Limpiar historial
- Cerrar sesión

### Contenido Restringido

- Los invitados ven notificación de "contenido restringido disponible"
- Los usuarios autenticados ven todos los resultados
- Badge de "Restringido" identifica contenido solo para registrados

## 🔧 Guía de Administrador

### Acceso de Administrador

\`\`\`
Email: admin@ashes.com
Contraseña: admin123
\`\`\`

Única cuenta de admin pre-configurada. Los usuarios nuevos siempre son rol "user".

### Panel de Administración

#### 1. Gestión de Resultados
- **Botón**: "Database" en el header (solo admin)
- **Funciones**:
  - Ver todos los resultados
  - Crear nuevos (formulario validado)
  - Editar existentes
  - Eliminar con confirmación
  - Toggle "Solo usuarios autenticados"

**Validaciones**
\`\`\`
Título:     Requerido, 3-100 caracteres
Descripción: Requerido, 10-500 caracteres
Categoría:  Una de: webs, archivos, productos, noticias, imágenes
Filtros:    1-3 filtros válidos para la categoría
Tags:       Máximo 5, cada uno máximo 20 caracteres
URL:        Opcional, debe ser URL válida si se proporciona
\`\`\`

#### 2. Panel de Estadísticas
- **Botón**: "Stats" en el header (solo admin)
- **Métricas**:
  - Total de resultados guardados
  - Gráfico de resultados por categoría
  - Búsquedas más frecuentes
  - Categorías más usadas
  - Tendencias generales

#### 3. Exportar/Importar Datos
- **Ubicación**: Panel de Configuración
- **Exportar**: Descarga JSON con todo (resultados, historial, preferencias)
- **Importar**: Sube JSON para restaurar datos
- **Reset**: Vuelve a datos de ejemplo

### Tareas Comunes del Admin

**Agregar nuevo resultado**
1. Clic en "Database"
2. "Agregar Nuevo Resultado"
3. Rellenar formulario con validación
4. Toggle restricción si es necesario
5. Guardar

**Controlar acceso para invitados**
1. Abre "Database"
2. Selecciona un resultado existente
3. Activa/desactiva toggle "Solo usuarios autenticados"
4. Guarda cambios

**Ver estadísticas de uso**
1. Clic en "Stats"
2. Revisa gráficos de categorías
3. Identifica búsquedas más populares
4. Analiza patrones de usuario

**Respaldar datos**
1. Abre Configuración
2. "Exportar Datos" → guarda JSON
3. Más tarde: "Importar Datos" → selecciona archivo

## 🛠️ Tecnologías Utilizadas

- **React 19** - UI framework con Server Components
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first styling
- **Next.js 16** - App Router, Route Handlers
- **Lucide React** - Icon library
- **SWR** (opcional) - Data fetching
- **localStorage API** - Persistent storage

## 🎨 Temas Disponibles

### Oscuro (Default)
- Gradiente: Morado → Gris oscuro
- Accent: Morado y Rosa
- Mejor para: Uso nocturno, ojos sensibles

### Azul
- Gradiente: Azul → Cian
- Accent: Azul y Cyan
- Mejor para: Profesional, limpio

### Verde
- Gradiente: Verde → Esmeralda
- Accent: Verde y Lime
- Mejor para: Natural, relajante

### Rojo
- Gradiente: Rojo → Naranja
- Accent: Rojo y Naranja
- Mejor para: Energético, dinámico

## 📊 Estructura de Datos

### Result
\`\`\`typescript
{
  id: string                    // Identificador único
  title: string                 // Título del resultado
  description: string           // Descripción
  category: string              // Una de las 5 categorías
  filters: string[]             // 1-3 filtros de la categoría
  tags: string[]                // Máximo 5 tags
  url?: string                  // URL opcional
  thumbnail?: string            // URL de imagen opcional
  createdAt: string             // ISO timestamp
  requiresAuth?: boolean        // Solo usuarios autenticados
}
\`\`\`

### User
\`\`\`typescript
{
  id: string                    // Identificador único
  email: string                 // Email único
  role: 'admin' | 'user'        // Rol de usuario
  isGuest?: boolean             // True para invitados
  createdAt: string             // ISO timestamp
}
\`\`\`

### SearchHistory
\`\`\`typescript
{
  id: string                    // Identificador único
  term: string                  // Término buscado
  category: string              // Categoría usada
  filters: string[]             // Filtros aplicados
  timestamp: string             // ISO timestamp
  resultsCount: number          // Cantidad de resultados
}
\`\`\`

## 🔄 Flujo de Recomendaciones

\`\`\`
1. Usuario realiza búsqueda
   └─ Se guarda en SearchHistory con categoría y filtros

2. Usuario abre su Perfil
   └─ Sistema analiza últimas búsquedas

3. Identificación de patrones
   └─ ¿Qué categorías/filtros usa frecuentemente?

4. Generación de recomendaciones
   └─ Busca resultados con categorías/filtros similares

5. Presentación personalizada
   └─ Muestra en sección "Basado en tus búsquedas"
\`\`\`

## 🐛 Debugging

Para realizar debugging durante desarrollo:

1. Abre las herramientas de desarrollador: \`F12\` o \`Ctrl+Shift+I\`
2. Navega a la pestaña "Console"
3. Verifica cualquier error o advertencia
4. Usa el Network tab para inspeccionar solicitudes
5. Abre Application → LocalStorage para ver datos guardados

Para agregar logs personalizados en componentes:
\`\`\`typescript
console.log("Debug message:", variable)
\`\`\`

## 📱 Responsividad

- **Móvil** (< 640px): 1 columna, padding reducido
- **Tablet** (640px - 1024px): 2 columnas, padding medio
- **Desktop** (> 1024px): 3 columnas, padding completo

Grid de resultados se adapta automáticamente. Prueba redimensionando el navegador.

## 🔐 Seguridad y Buenas Prácticas

- Contraseñas se validan pero NO se encriptan (localStorage no es seguro)
  - **Nota**: Para producción, usar backend con hash/salt
- XSS protection via React
- CSRF tokens no necesarios (localStorage local)
- Sanitización de input en formularios
- Validación both-side en Modal de Gestión

## 📝 Notas de Desarrollo

- **localStorage limit**: ~5-10MB por dominio (suficiente para la app)
- **Estado**: Totalmente sincronizado entre pestañas (excepto sesión)
- **Rendering**: Optimizado con React.memo donde aplica
- **Búsqueda**: Debounced a 300ms para performance

## 🤝 Soporte

Si encuentras issues:
1. Limpia localStorage: `localStorage.clear()`
2. Recarga la página: `Ctrl+Shift+R`
3. Verifica la consola: `F12` → Console
4. Reset a datos de ejemplo via Configuración

## 📄 Licencia

Proyecto de demostración - Uso libre.

---

**Versión**: 1.0.0
**Última actualización**: Diciembre 2024
**Built with**: React + TypeScript + Tailwind CSS
