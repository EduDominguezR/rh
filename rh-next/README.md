## Objetivo

Este proyecto adapta vistas estáticas a una estructura moderna de Next.js para dejar la interfaz organizada, reutilizable y lista para crecer sin backend por ahora. La migración convierte enlaces `.html` a rutas del App Router, mueve datos simulados a archivos separados y reutiliza componentes como sidebar, topbar, tablas, badges y acciones.[1][2][3][4][5]

## Estructura sugerida

```bash
app/
├─ layout.js
├─ globals.css
├─ page.jsx
├─ trabajadores/
│  └─ page.jsx
├─ plazas/
│  └─ page.jsx
├─ autoridades/
│  └─ page.jsx
└─ compatibilidad/
   └─ formato/
      └─ page.jsx

components/
├─ Sidebar.jsx
├─ Topbar.jsx
├─ SearchBar.jsx
├─ TableContainer.jsx
├─ Badge.jsx
└─ ActionButtons.jsx

data/
├─ dashboardData.js
├─ trabajadoresData.js
├─ plazasData.js
├─ autoridadesData.js
├─ compatibilidadData.js
└─ compatibilidadFormatoMock.js
```

La ruta de compatibilidad final se resolvió como `/compatibilidad/formato`, porque en App Router el archivo `app/compatibilidad/formato/page.jsx` genera esa URL y no se debe usar `/compatibilidad/compatibilidad` ni agregar `page.jsx` dentro del `href`.[7]

## Componentes principales

| Componente | Propósito |
|---|---|
| `Sidebar.jsx` | Navegación lateral con ruta activa automática mediante `usePathname()`.[1][5] |
| `Topbar.jsx` | Encabezado superior reutilizable con título, subtítulo y acciones por vista.[1][2][3][4][5] |
| `SearchBar.jsx` | Campo visual de búsqueda para tablas y paneles.[2][3][4][5] |
| `TableContainer.jsx` | Contenedor reutilizable para títulos, toolbar y tablas.[1][2][3][4][5] |
| `Badge.jsx` | Etiquetas visuales para tipo, estatus y claves.[1][2][3][4][5] |
| `ActionButtons.jsx` | Renderiza botones o enlaces con estilos consistentes.[1][2][3][4][5] |

## Datos simulados

Los registros visibles se separan en `data/` para evitar tablas hardcodeadas dentro del JSX y mantener la lógica visual más limpia. El dashboard usa tarjetas KPI y una tabla de últimas compatibilidades, mientras que trabajadores, plazas, autoridades y compatibilidad reutilizan arreglos simples basados en el contenido de los HTML originales.[1][2][3][4][5]

## Estilos

El estilo visual del sistema se concentra en `app/globals.css`, donde se define el layout con sidebar oscuro, topbar clara, paneles, tarjetas, botones, tablas y badges, además de los estilos del módulo del formato institucional. Si la app se ve como texto plano, normalmente significa que `globals.css` no está importado en `app/layout.js` o que el archivo no contiene las clases del layout.[6][8][9]

Ejemplo mínimo de `app/layout.js`:

```jsx
import './globals.css';

export const metadata = {
  title: 'SICOMP',
  description: 'Compatibilidad laboral',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
```

## Rutas principales

| Ruta | Archivo |
|---|---|
| `/` | `app/page.jsx` |
| `/trabajadores` | `app/trabajadores/page.jsx` |
| `/plazas` | `app/plazas/page.jsx` |
| `/autoridades` | `app/autoridades/page.jsx` |
| `/compatibilidad/formato` | `app/compatibilidad/formato/page.jsx` |

La vista de compatibilidad en el menú lateral debe apuntar a `/compatibilidad/formato`, porque esa es la ruta derivada de la carpeta del App Router que se definió para el módulo del formato institucional.[7]

## Instalación y ejecución

1. Instalar dependencias:

```bash
npm install
```

2. Ejecutar el entorno de desarrollo:

```bash
npm run dev
```

3. Abrir el proyecto en el navegador:

```bash
http://localhost:3000
```

## Checklist de verificación

- `app/layout.js` importa `./globals.css`.[9]
- `Sidebar.jsx` usa `href: '/compatibilidad/formato'` para Compatibilidad.[7]
- No hay imports relativos incorrectos dentro de `app/compatibilidad/formato/page.jsx`.[7]
- Los datos vienen de `data/*.js` y no están pegados directamente en cada tabla.[1][2][3][4][5]
- Los enlaces HTML antiguos fueron reemplazados por `Link` de `next/link`.[1][2][3][4][5]
- Los atributos incompatibles con React fueron migrados a JSX válido, como `className` y etiquetas correctamente cerradas.[1][2][3][4][5]

## Notas

Este proyecto está enfocado solo en la parte visual y estructural. No incluye backend, persistencia ni lógica de negocio real todavía; todo el contenido actual se alimenta con datos simulados para facilitar la migración inicial a React y Next.js.[1][2][3][4][5]