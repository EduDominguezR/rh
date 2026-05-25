"use client";

import { useState } from 'react';
import Topbar from '../../../components/Topbar';

export default function CompatibilidadFormatoPage() {
  const [form, setForm] = useState({
    tipo: '',
    tipoColor: 'blue',
    tempIni: '',
    tempFin: '',
    plazaActiva: '',
    ciudad: '',
    horario: '',
    trabajador: '',
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch('/compatibilidad/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al guardar');
      setMsg('Guardado correctamente');
    } catch (err) {
      setMsg(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Formato de compatibilidad" />
      <main className="mx-auto max-w-5xl p-6">
        <div className="rounded-xl border bg-white p-6 shadow">
          <h1 className="mb-2 text-2xl font-semibold">Formato de Compatibilidad de Empleos</h1>
          <p className="mb-6 text-sm text-gray-600">
            Captura la información básica del formato institucional.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input className="rounded border p-2" name="tipo" value={form.tipo} onChange={onChange} placeholder="Tipo" />
              <input className="rounded border p-2" name="tipoColor" value={form.tipoColor} onChange={onChange} placeholder="Color" />
              <input className="rounded border p-2" name="tempIni" value={form.tempIni} onChange={onChange} placeholder="Fecha inicio" />
              <input className="rounded border p-2" name="tempFin" value={form.tempFin} onChange={onChange} placeholder="Fecha fin" />
              <input className="rounded border p-2" name="plazaActiva" value={form.plazaActiva} onChange={onChange} placeholder="Plaza activa" />
              <input className="rounded border p-2" name="ciudad" value={form.ciudad} onChange={onChange} placeholder="Ciudad" />
              <input className="rounded border p-2 md:col-span-2" name="horario" value={form.horario} onChange={onChange} placeholder="Horario" />
              <input className="rounded border p-2 md:col-span-2" name="trabajador" value={form.trabajador} onChange={onChange} placeholder="Trabajador" />
            </section>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={saving}
                className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
              >
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