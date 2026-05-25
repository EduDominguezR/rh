"use client";

import Topbar from '../../components/Topbar';
import SearchBar from '../../components/SearchBar';
import TableContainer from '../../components/TableContainer';
import ActionButtons from '../../components/ActionButtons';
import { useEffect, useState } from 'react';

export default function PlazasPage() {
  const [plazas, setPlazas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlazas() {
      try {
        setLoading(true);
        const res = await fetch('/plazas/api');
        if (!res.ok) throw new Error('Error al cargar plazas');
        const data = await res.json();
        setPlazas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPlazas();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Plazas" />
      <main className="p-6">
        <SearchBar />
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
      </main>
    </div>
  );
}