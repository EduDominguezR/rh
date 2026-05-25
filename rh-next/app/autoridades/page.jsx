"use client";

import Topbar from '../../components/Topbar';
import SearchBar from '../../components/SearchBar';
import TableContainer from '../../components/TableContainer';
import ActionButtons from '../../components/ActionButtons';
import { useEffect, useState } from 'react';

export default function AutoridadesPage() {
  const [autoridades, setAutoridades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAutoridades() {
      try {
        setLoading(true);
        const res = await fetch('/autoridades/api');
        if (!res.ok) throw new Error('Error al cargar autoridades');
        const data = await res.json();
        setAutoridades(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAutoridades();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Autoridades" />
      <main className="p-6">
        <SearchBar />
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
      </main>
    </div>
  );
}