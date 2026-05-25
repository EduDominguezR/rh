# Contribuir

Gracias por colaborar. Sigue estas pautas para que el flujo de trabajo sea claro y consistente.

## Flujo recomendado

- Crea una rama a partir de `develop` con un nombre descriptivo: `feature/mi-cambio` o `fix/errores-xyz`.
- Haz commits pequeños y descriptivos.
- Empuja la rama a `origin` y abre un Pull Request hacia `develop`.

## Requisitos para correr el proyecto

1. Node >= 18 y `npm` instalado.
2. En la raíz del repo, el frontend está en `rh-next`.

Comandos útiles:

```bash
cd rh-next
npm install
npm run dev
```

Opcionalmente, si trabajas con la base de datos (MySQL/MariaDB):

```bash
npm run seed-db    # poblado de ejemplo, ajusta rh-next/utils/db.js según tu entorno
npm run test-db    # verifica la conexión
```

## Estilo de commits

Usa mensajes claros, por ejemplo:

- `feat: añadir búsqueda en trabajadores`
- `fix: corregir validación de formulario`
- `chore: actualizar dependencias`

## Revisión de PRs

- Incluye una descripción breve del cambio y el motivo.
- Añade capturas o pasos para reproducir cuando aplique.
- Pide revisión a al menos un compañero antes de mergear.

## Contacto

Si tienes dudas, menciona a `@EduDominguezR` o al equipo en el PR.
