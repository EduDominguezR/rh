"use client";

import Topbar from '../../components/Topbar';
import SearchBar from '../../components/SearchBar';
import TableContainer from '../../components/TableContainer';
import ActionButtons from '../../components/ActionButtons';
import { useEffect, useState } from 'react';

export default function AutoridadesPage() {
  const [autoridades, setAutoridades] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [q, setQ] = useState('');

  useEffect(() => {
    async function fetchAutoridades() {
      try {
        setLoading(true);
        const params = new URLSearchParams({ page: String(page), limit: String(limit) });
        if (q) params.set('q', q);
        const res = await fetch(`/autoridades/api?${params.toString()}`);
        if (!res.ok) throw new Error('Error al cargar autoridades');
        const json = await res.json();
        const data = json.data ?? json;
        setAutoridades(data);
        setTotal(json.meta?.total ?? 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAutoridades();
  }, [page, limit, q]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Autoridades" />
      <main className="p-6">
        <div className="flex gap-4 items-center">
          <SearchBar value={q} onChange={setQ} placeholder="Buscar autoridades..." />
          <div className="ml-auto flex items-center gap-3">
            <a href="/autoridades/new" className="rounded bg-green-600 px-3 py-1 text-white">Agregar</a>
            <div>Página {page} / {Math.max(1, Math.ceil(total / limit) || 1)}</div>
          </div>
        </div>
        <TableContainer
          title="Autoridades"
          subtitle="Listado general"
          columns={['Autoridad 1', 'Plantel 1', 'Puesto', 'Nombre', 'Autoridad 2', 'Plantel 2', 'Acciones']}
        >
          {loading ? (
            <tr>
              <td colSpan="7" className="p-4 text-center">Cargando...</td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="7" className="p-4 text-center text-red-600">{error}</td>
            </tr>
          ) : autoridades.length === 0 ? (
            <tr>
              <td colSpan="7" className="p-4 text-center">Sin registros</td>
            </tr>
          ) : (
            autoridades.map((a) => (
              <tr key={a.id}>
                <td className="p-2">{a.autoridad1}</td>
                <td className="p-2">{a.plantel1}</td>
                <td className="p-2">{a.puesto}</td>
                <td className="p-2">{a.nombre}</td>
                <td className="p-2">{a.autoridad2}</td>
                <td className="p-2">{a.plantel2}</td>
                <td className="p-2">
                  <ActionButtons id={a.id} />
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