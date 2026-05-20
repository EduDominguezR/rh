# SICOMP

SICOMP es una aplicación web para digitalizar un formato que antes se manejaba en Excel, permitiendo consultar, capturar y organizar información de compatibilidad laboral desde una interfaz web. La idea es conservar la lógica del formato original, pero convertirla en páginas, rutas y componentes reutilizables para que el proceso sea más fácil de mantener y extender. [web:62][web:58]

## Estructura general

El proyecto usa Next.js con App Router, donde cada ruta se define por carpetas y archivos `page.jsx`, y el diseño persistente se maneja con `layout.js`. En este esquema, `app/page.jsx` es la página raíz, mientras que rutas como `app/trabajadores/page.jsx` o `app/compatibilidad/formato/page.jsx` representan secciones específicas de la aplicación. [web:62][web:74]

## Rutas principales

La aplicación queda organizada en estas rutas: `/` para el inicio, `/trabajadores` para el catálogo de trabajadores, `/plazas` para plazas, `/autoridades` para autoridades y `/compatibilidad/formato` para el formato de compatibilidad. En Next.js, la carpeta `app/compatibilidad/formato/page.jsx` genera la URL `/compatibilidad/formato`, y el nombre `page.jsx` no se escribe dentro del enlace. [web:62][web:46]

## Navegación

La navegación interna debe hacerse con `next/link`, porque Next.js la optimiza con prefetching y transiciones del lado del cliente. Para el sidebar, `usePathname()` permite marcar automáticamente el enlace activo, pero como es un hook del cliente, el componente debe iniciar con `'use client'`. [web:58][web:75]

## Componentes reutilizables

El proyecto se apoya en componentes comunes para evitar repetir estructura: `Sidebar`, `Topbar`, `SearchBar`, `TableContainer`, `Badge` y `ActionButtons`. Esta separación hace que las páginas se concentren en sus datos y sus secciones, mientras el estilo y la navegación se mantienen consistentes entre pantallas. [web:62][web:74]

## Fuente de datos

Como la migración viene de Excel, los datos se separaron en archivos dentro de `data/` para simular lo que antes vivía en hojas de cálculo. Así, el dashboard, trabajadores, plazas, autoridades y compatibilidad toman información de arreglos JavaScript en lugar de depender de contenido escrito directamente dentro de cada página. [web:62][web:74]

## Formato de compatibilidad

La parte más importante del proyecto es el formulario de compatibilidad, porque ahí se traduce la estructura del Excel a una interfaz web editable. En vez de depender de celdas manuales, el formato se divide en bloques visuales como datos del solicitante, institución 1, institución 2, firmas, autorización y lista checable. [web:62][web:74]

## Estilos

Los estilos globales viven en `app/globals.css` y controlan el layout, sidebar, topbar, tablas, botones, badges y el diseño del formato. Si el sitio se ve sin diseño, normalmente el problema está en que `globals.css` no se importó correctamente en `app/layout.js` o en que faltan las clases CSS esperadas por los componentes. [web:56][web:62]

## Qué hace cada archivo

| Archivo | Función |
|---|---|
| `app/layout.js` | Envuelve toda la aplicación y carga los estilos globales. [web:62] |
| `app/page.jsx` | Inicio / dashboard de la aplicación. [web:74] |
| `app/compatibilidad/formato/page.jsx` | Vista principal del formato migrado desde Excel. [web:62][web:46] |
| `components/Sidebar.jsx` | Menú lateral con enlace activo. [web:75] |
| `components/Topbar.jsx` | Encabezado común de cada vista. [web:62] |
| `data/*.js` | Datos simulados para las pantallas. [web:74] |

## Flujo de uso

El usuario entra al dashboard, navega con el sidebar y llega al módulo de compatibilidad, donde abre el formulario principal del formato. Desde ahí puede consultar, capturar o revisar la información que antes estaba distribuida en Excel. [web:58][web:75]

## Nota final

Este proyecto no es una migración de un panel administrativo hecho en HTML estático a Next.js; es una migración de un formato de Excel a una página web. [web:62][web:74]
