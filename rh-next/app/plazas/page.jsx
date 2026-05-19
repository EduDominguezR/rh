import Topbar from '../../components/Topbar';
import SearchBar from '../../components/SearchBar';
import TableContainer from '../../components/TableContainer';
import Badge from '../../components/Badge';
import ActionButtons from '../../components/ActionButtons';
import { plazas } from '../../data/plazasData';

export default function PlazasPage() {
  return (
    <Topbar
      title="Plazas"
      subtitle="SICOMP · Catálogos · Plazas"
      actions={
        <ActionButtons
          buttons={[
            { label: 'Nueva plaza', onClick: true, variant: 'green' },
          ]}
        />
      }
    >
      <TableContainer
        toolbar={<SearchBar placeholder="Buscar plaza, clave o categoría" />}
        columns={[
          'CD Trabajo',
          'Clave Presupuestal',
          'Categoría',
          'Descripción',
          'Salario',
        ]}
      >
        {plazas.map((item) => (
          <tr key={item.cdTrabajo}>
            <td>
              <Badge color="blue">{item.cdTrabajo}</Badge>
            </td>
            <td>{item.clavePresupuestal}</td>
            <td>{item.categoria}</td>
            <td>{item.descripcion}</td>
            <td>{item.salario}</td>
          </tr>
        ))}
      </TableContainer>
    </Topbar>
  );
}