import './globals.css';

export const metadata = {
  title: 'SICOMP',
  description: 'Compatibilidad laboral',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}