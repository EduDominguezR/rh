"use client";

import Topbar from '../../components/Topbar';
import SearchBar from '../../components/SearchBar';
import TableContainer from '../../components/TableContainer';
import Badge from '../../components/Badge';
import ActionButtons from '../../components/ActionButtons';
import { useEffect, useState } from 'react';

export default function TrabajadoresPage() {
  const [trabajadores, setTrabajadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTrabajadores() {
      try {
        setLoading(true);
        const res = await fetch('/trabajadores/api');
        if (!res.ok) throw new Error('Error al cargar trabajadores');
        const data = await res.json();
        setTrabajadores(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTrabajadores();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar title="Trabajadores" />
      <main className="p-6">
        <SearchBar />
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
      </main>
    </div>
  );
}