import Topbar from '../../components/Topbar';
import SearchBar from '../../components/SearchBar';
import TableContainer from '../../components/TableContainer';
import Badge from '../../components/Badge';
import ActionButtons from '../../components/ActionButtons';
import { trabajadores } from '../../data/trabajadoresData';

export default function TrabajadoresPage() {
  return (
    <Topbar
      title="Trabajadores"
      subtitle="SICOMP · Catálogos · Trabajadores"
      actions={
        <ActionButtons
          buttons={[
            { label: 'Agregar', onClick: true, variant: 'green' },
            { label: 'Exportar', onClick: true, variant: 'light' },
          ]}
        />
      }
    >
      <TableContainer
        toolbar={<SearchBar placeholder="Buscar por nombre o RFC" />}
        columns={[
          'ID',
          'Nombre',
          'Ap. Paterno',
          'Ap. Materno',
          'RFC',
          'Estatus',
          'Acciones',
        ]}
      >
        {trabajadores.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.nombre}</td>
            <td>{item.apellidoPaterno}</td>
            <td>{item.apellidoMaterno}</td>
            <td>{item.rfc}</td>
            <td>
              <Badge color={item.estatusColor}>{item.estatus}</Badge>
            </td>
            <td>
              <ActionButtons
                buttons={[
                  {
                    label: 'Editar',
                    onClick: true,
                    variant: 'light',
                    small: true,
                  },
                ]}
              />
            </td>
          </tr>
        ))}
      </TableContainer>
    </Topbar>
  );
}