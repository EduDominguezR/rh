"use client";

import Topbar from '../../components/Topbar';
import SearchBar from '../../components/SearchBar';
import TableContainer from '../../components/TableContainer';
import Badge from '../../components/Badge';
import ActionButtons from '../../components/ActionButtons';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function TrabajadoresPage() {
  const [trabajadores, setTrabajadores] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [q, setQ] = useState('');

  useEffect(() => {
    async function fetchTrabajadores() {
      try {
        setLoading(true);
        const params = new URLSearchParams({ page: String(page), limit: String(limit) });
        if (q) params.set('q', q);
        const res = await fetch(`/trabajadores/api?${params.toString()}`);
        if (!res.ok) throw new Error('Error al cargar trabajadores');
        const json = await res.json();
        const data = json.data ?? json;
        setTrabajadores(data);
        setTotal(json.meta?.total ?? 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTrabajadores();
  }, [page, limit, q]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Trabajadores" />
      <main className="p-6">
        <div className="flex gap-4 items-center">
          <SearchBar value={q} onChange={setQ} placeholder="Buscar trabajadores..." />
          <div className="ml-auto flex items-center gap-3">
            <Link href="/trabajadores/new" className="rounded bg-green-600 px-3 py-1 text-white">Agregar</Link>
            <div>Página {page} / {Math.max(1, Math.ceil(total / limit) || 1)}</div>
          </div>
        </div>
        <TableContainer
          title="Trabajadores"
          subtitle="Listado general"
          columns={['Nombre', 'Apellido paterno', 'Apellido materno', 'RFC', 'Estatus', 'Acciones']}
        >
          {loading ? (
            <tr>
              <td colSpan="6" className="p-4 text-center">Cargando...</td>
            </tr>
          ) : error ? (
            <tr>
              <td colSpan="6" className="p-4 text-center text-red-600">{error}</td>
            </tr>
          ) : trabajadores.length === 0 ? (
            <tr>
              <td colSpan="6" className="p-4 text-center">Sin registros</td>
            </tr>
          ) : (
            trabajadores.map((t) => (
              <tr key={t.id}>
                <td className="p-2">{t.nombre}</td>
                <td className="p-2">{t.apellidoPaterno}</td>
                <td className="p-2">{t.apellidoMaterno}</td>
                <td className="p-2">{t.rfc}</td>
                <td className="p-2">
                  <Badge color={t.estatusColor}>{t.estatus}</Badge>
                </td>
                <td className="p-2">
                  <ActionButtons id={t.id} />
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