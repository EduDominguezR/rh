"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useUi } from './UiProvider';

export default function ActionButtons({ buttons = [], id, resource, small }) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState(null);

  // Infer resource from current path if not provided
  let inferred = resource;
  try {
    if (!inferred && typeof window !== 'undefined') {
      const parts = window.location.pathname.split('/').filter(Boolean);
      inferred = parts[0] || '';
    }
  } catch (e) {
    inferred = inferred || '';
  }

  async function handleDelete(targetId) {
    try {
      const confirmed = await ui.confirm('¿Eliminar registro? Esta acción es irreversible.');
      if (!confirmed) return;
      setLoadingId(targetId);
      const res = await fetch(`/${inferred}/api`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: targetId }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Error eliminando');
      ui.showToast('Eliminado correctamente', 'info');
      router.refresh();
    } catch (err) {
      ui.showToast(err.message || String(err), 'error');
    } finally {
      setLoadingId(null);
    }
  }

  const ui = useUi();

  if (buttons && buttons.length > 0) {
    return (
      <div className="actions">
        {buttons.map((button) => {
          const className = ['btn', button.variant || 'light', button.small ? 'small' : '']
            .filter(Boolean)
            .join(' ');

          if (button.href) {
            return (
              <Link key={button.label} href={button.href} className={className}>
                {button.label}
              </Link>
            );
          }

          return (
            <button
              key={button.label}
              type="button"
              className={className}
              onClick={button.onClick === true ? undefined : button.onClick}
            >
              {button.label}
            </button>
          );
        })}
      </div>
    );
  }

  // Default compact actions when `id` is provided
  return (
      <div className="actions" style={{ display: 'flex', gap: 8 }}>
      <Link href={`/${inferred}/new`} className={`btn ${small ? 'small' : ''} green`}>
        Nuevo
      </Link>
      <button
        type="button"
        className={`btn ${small ? 'small' : ''} red`}
        onClick={() => handleDelete(id)}
        disabled={loadingId === id}
      >
        {loadingId === id ? '...' : 'Eliminar'}
      </button>
    </div>
  );
}