import "./globals.css";

export const metadata = {
  title: "RH",
  description: "Proyecto RH migrado a Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}