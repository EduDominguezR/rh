"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Topbar from '../../../components/Topbar';

export default function NewTrabajadorPage() {
  const router = useRouter();
  const [form, setForm] = useState({ nombre: '', apellidoPaterno: '', apellidoMaterno: '', rfc: '' });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function validate() {
    const errors = [];
    if (!form.nombre || form.nombre.trim().length === 0) errors.push('Nombre requerido');
    if (!form.apellidoPaterno || form.apellidoPaterno.trim().length === 0) errors.push('Apellido paterno requerido');
    if (!form.apellidoMaterno || form.apellidoMaterno.trim().length === 0) errors.push('Apellido materno requerido');
    if (!form.rfc || form.rfc.trim().length < 3) errors.push('RFC inválido (mínimo 3 caracteres)');
    return errors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = validate();
    if (errors.length) return setMsg(errors.join('. '));
    try {
      setSaving(true);
      const res = await fetch('/trabajadores/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: form.nombre, apellidoPaterno: form.apellidoPaterno, apellidoMaterno: form.apellidoMaterno, rfc: form.rfc }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al guardar');
      router.push('/trabajadores');
    } catch (err) {
      setMsg(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Nuevo Trabajador" />
      <main className="mx-auto max-w-3xl p-6">
        <div className="rounded-xl border bg-white p-6 shadow">
          <h1 className="mb-2 text-2xl font-semibold">Crear trabajador</h1>
          <p className="mb-6 text-sm text-gray-600">Captura los datos básicos del trabajador.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input className="rounded border p-2" name="apellidoPaterno" value={form.apellidoPaterno} onChange={onChange} placeholder="Apellido paterno" />
              <input className="rounded border p-2" name="apellidoMaterno" value={form.apellidoMaterno} onChange={onChange} placeholder="Apellido materno" />
              <input className="rounded border p-2 md:col-span-2" name="nombre" value={form.nombre} onChange={onChange} placeholder="Nombre(s)" />
              <input className="rounded border p-2 md:col-span-2" name="rfc" value={form.rfc} onChange={onChange} placeholder="RFC" />
            </section>

            <div className="flex items-center gap-3">
              <button type="submit" disabled={saving} className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50">
                {saving ? 'Guardando...' : 'Guardar'}
              </button>
              {msg && <p className="text-sm text-gray-700">{msg}</p>}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
