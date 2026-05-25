"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Topbar from '../../../../components/Topbar';

export default function EditAutoridadPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const [form, setForm] = useState({ autoridad1: '', nombre: '', puesto: '', plantel1: '', autoridad2: '', nombre2: '', puesto2: '', plantel2: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`/autoridades/api?limit=1000`);
        const json = await res.json();
        const found = (json.data || []).find((a) => String(a.id) === String(id));
        if (found && mounted) setForm({ autoridad1: found.autoridad1 || '', nombre: found.nombre || '', puesto: found.puesto || '', plantel1: found.plantel1 || '', autoridad2: found.autoridad2 || '', nombre2: found.nombre2 || '', puesto2: found.puesto2 || '', plantel2: found.plantel2 || '' });
      } catch (err) { setMsg('No se pudo cargar autoridad'); } finally { if (mounted) setLoading(false); }
    }
    load();
    return () => { mounted = false; };
  }, [id]);

  function onChange(e) { const { name, value } = e.target; setForm((s) => ({ ...s, [name]: value })); }

  function validate() { const errors = []; if (!form.autoridad1 || form.autoridad1.trim().length === 0) errors.push('Autoridad 1 requerida'); return errors; }

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = validate();
    if (errors.length) return setMsg(errors.join('. '));
    try { setSaving(true); const res = await fetch('/autoridades/api', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, ...form }) }); const json = await res.json(); if (!res.ok) throw new Error(json.error || 'Error al actualizar'); router.push('/autoridades'); } catch (err) { setMsg(err.message); } finally { setSaving(false); }
  }

  if (loading) return <div className="p-6">Cargando...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Editar Autoridad" />
      <main className="mx-auto max-w-3xl p-6">
        <div className="rounded-xl border bg-white p-6 shadow">
          <h1 className="mb-2 text-2xl font-semibold">Editar autoridad</h1>
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
              <button type="submit" disabled={saving} className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50">{saving ? 'Guardando...' : 'Guardar cambios'}</button>
              {msg && <p className="text-sm text-gray-700">{msg}</p>}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
