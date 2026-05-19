'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { label: 'Dashboard', href: '/' },
  { label: 'Trabajadores', href: '/trabajadores' },
  { label: 'Plazas', href: '/plazas' },
  { label: 'Autoridades', href: '/autoridades' },
  { label: 'Compatibilidad', href: '/compatibilidad/formato' },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActiveLink = (href) => {
    if (href === '/') {
      return pathname === '/';
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo" />
        <div>
          <h1>SICOMP</h1>
          <p>Compatibilidad laboral</p>
        </div>
      </div>

      <nav className="nav">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`nav-link ${isActiveLink(link.href) ? 'active' : ''}`}
          >
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}