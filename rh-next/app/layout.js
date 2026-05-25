import './globals.css';
import UiProvider from '../components/UiProvider';

export const metadata = {
  title: 'SICOMP',
  description: 'Compatibilidad laboral',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body suppressHydrationWarning={true}>
        <UiProvider>{children}</UiProvider>
      </body>
    </html>
  );
}