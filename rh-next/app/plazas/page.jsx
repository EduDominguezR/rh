"use client";

import Topbar from '../../components/Topbar';
import SearchBar from '../../components/SearchBar';
import TableContainer from '../../components/TableContainer';
import ActionButtons from '../../components/ActionButtons';
import { useEffect, useState } from 'react';

export default function PlazasPage() {
  const [plazas, setPlazas] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [q, setQ] = useState('');

  useEffect(() => {
    async function fetchPlazas() {
      try {
        setLoading(true);
        const params = new URLSearchParams({ page: String(page), limit: String(limit) });
        if (q) params.set('q', q);
        const res = await fetch(`/plazas/api?${params.toString()}`);
        if (!res.ok) throw new Error('Error al cargar plazas');
        const json = await res.json();
        const data = json.data ?? json;
        setPlazas(data);
        setTotal(json.meta?.total ?? 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPlazas();
  }, [page, limit, q]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Plazas" />
      <main className="p-6">
        <div className="flex gap-4 items-center">
          <SearchBar value={q} onChange={setQ} placeholder="Buscar plazas..." />
          <div className="ml-auto flex items-center gap-3">
            <a href="/plazas/new" className="rounded bg-green-600 px-3 py-1 text-white">Agregar</a>
            <div>Página {page} / {Math.max(1, Math.ceil(total / limit) || 1)}</div>
          </div>
        </div>
        <TableContainer
          title="Plazas"
          subtitle="Listado general"
          columns={['CD Trabajo', 'Clave presupuestal', 'Categoría', 'Descripción', 'Salario', 'Acciones']}
        >
          {loading ? (
            <tr>
              <td colSpan="6" className="p-4 text-center">Cargando...</td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="6" className="p-4 text-center text-red-600">{error}</td>
            </tr>
          ) : plazas.length === 0 ? (
            <tr>
              <td colSpan="6" className="p-4 text-center">Sin registros</td>
            </tr>
          ) : (
            plazas.map((p) => (
              <tr key={p.id}>
                <td className="p-2">{p.cdTrabajo}</td>
                <td className="p-2">{p.clavePresupuestal}</td>
                <td className="p-2">{p.categoria}</td>
                <td className="p-2">{p.descripcion}</td>
                <td className="p-2">{p.salario}</td>
                <td className="p-2">
                  <ActionButtons id={p.id} />
                </td>
              </tr>
            ))
          )}
        </TableContainer>
        <div className="flex gap-2 justify-center mt-4">
          <button className="px-3 py-1 border rounded" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>Prev</button>
          <button className="px-3 py-1 border rounded" onClick={() => setPage((p) => p + 1)} disabled={page * limit >= total}>Next</button>
        </div>
      </main>
    </div>
  );
}