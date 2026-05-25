"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Topbar from '../../../components/Topbar';

export default function NewAutoridadPage() {
  const router = useRouter();
  const [form, setForm] = useState({ autoridad1: '', nombre: '', puesto: '', plantel1: '', autoridad2: '', nombre2: '', puesto2: '', plantel2: '' });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function validate() {
    const errors = [];
    if (!form.autoridad1 || form.autoridad1.trim().length === 0) errors.push('Autoridad 1 requerida');
    return errors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = validate();
    if (errors.length) return setMsg(errors.join('. '));
    try {
      setSaving(true);
      const res = await fetch('/autoridades/api', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Error al guardar');
      router.push('/autoridades');
    } catch (err) { setMsg(err.message); } finally { setSaving(false); }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Nueva Autoridad" />
      <main className="mx-auto max-w-3xl p-6">
        <div className="rounded-xl border bg-white p-6 shadow">
          <h1 className="mb-2 text-2xl font-semibold">Crear autoridad</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input className="rounded border p-2" name="autoridad1" value={form.autoridad1} onChange={onChange} placeholder="Autoridad 1" />
              <input className="rounded border p-2" name="plantel1" value={form.plantel1} onChange={onChange} placeholder="Plantel 1" />
              <input className="rounded border p-2" name="puesto" value={form.puesto} onChange={onChange} placeholder="Puesto" />
              <input className="rounded border p-2 md:col-span-2" name="nombre" value={form.nombre} onChange={onChange} placeholder="Nombre" />
              <input className="rounded border p-2" name="autoridad2" value={form.autoridad2} onChange={onChange} placeholder="Autoridad 2" />
              <input className="rounded border p-2" name="plantel2" value={form.plantel2} onChange={onChange} placeholder="Plantel 2" />
              <input className="rounded border p-2" name="puesto2" value={form.puesto2} onChange={onChange} placeholder="Puesto 2" />
              <input className="rounded border p-2 md:col-span-2" name="nombre2" value={form.nombre2} onChange={onChange} placeholder="Nombre 2" />
            </section>
            <div className="flex items-center gap-3">
              <button type="submit" disabled={saving} className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50">{saving ? 'Guardando...' : 'Guardar'}</button>
              {msg && <p className="text-sm text-gray-700">{msg}</p>}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
