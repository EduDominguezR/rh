"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Topbar from '../../../../components/Topbar';

export default function EditPlazaPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const [form, setForm] = useState({ cdTrabajo: '', clavePresupuestal: '', categoria: '', descripcion: '', salario: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`/plazas/api?limit=1000`);
        const json = await res.json();
        const found = (json.data || []).find((p) => String(p.id) === String(id));
        if (found && mounted) setForm({ cdTrabajo: found.cdTrabajo || '', clavePresupuestal: found.clavePresupuestal || '', categoria: found.categoria || '', descripcion: found.descripcion || '', salario: found.salario || '' });
      } catch (err) {
        setMsg('No se pudo cargar plaza');
      } finally { if (mounted) setLoading(false); }
    }
    load();
    return () => { mounted = false; };
  }, [id]);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function validate() {
    const errors = [];
    if (!form.cdTrabajo || form.cdTrabajo.trim().length === 0) errors.push('CD Trabajo requerido');
    if (!form.categoria || form.categoria.trim().length === 0) errors.push('Categoría requerida');
    return errors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = validate();
    if (errors.length) return setMsg(errors.join('. '));
    try {
      setSaving(true);
      const res = await fetch('/plazas/api', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, ...form }) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Error al actualizar');
      router.push('/plazas');
    } catch (err) { setMsg(err.message); } finally { setSaving(false); }
  }

  if (loading) return <div className="p-6">Cargando...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Editar Plaza" />
      <main className="mx-auto max-w-3xl p-6">
        <div className="rounded-xl border bg-white p-6 shadow">
          <h1 className="mb-2 text-2xl font-semibold">Editar plaza</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input className="rounded border p-2" name="cdTrabajo" value={form.cdTrabajo} onChange={onChange} placeholder="CD Trabajo" />
              <input className="rounded border p-2" name="clavePresupuestal" value={form.clavePresupuestal} onChange={onChange} placeholder="Clave presupuestal" />
              <input className="rounded border p-2" name="categoria" value={form.categoria} onChange={onChange} placeholder="Categoría" />
              <input className="rounded border p-2" name="salario" value={form.salario} onChange={onChange} placeholder="Salario" />
              <textarea className="rounded border p-2 md:col-span-2" name="descripcion" value={form.descripcion} onChange={onChange} placeholder="Descripción" />
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
