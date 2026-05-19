import Topbar from '../../components/Topbar';
import SearchBar from '../../components/SearchBar';
import TableContainer from '../../components/TableContainer';
import Badge from '../../components/Badge';
import ActionButtons from '../../components/ActionButtons';
import { autoridades } from '../../data/autoridadesData';

export default function AutoridadesPage() {
  return (
    <Topbar
      title="Autoridades"
      subtitle="SICOMP · Catálogos · Autoridades"
      actions={
        <ActionButtons
          buttons={[
            { label: 'Nueva autoridad', onClick: true, variant: 'purple' },
          ]}
        />
      }
    >
      <TableContainer
        toolbar={<SearchBar placeholder="Buscar autoridad o plantel" />}
        columns={[
          'Autoridad 1',
          'Plantel 1',
          'Puesto',
          'Nombre',
          'Autoridad 2',
          'Plantel 2',
        ]}
      >
        {autoridades.map((item) => (
          <tr key={item.autoridad1}>
            <td>
              <Badge color="blue">{item.autoridad1}</Badge>
            </td>
            <td>{item.plantel1}</td>
            <td>{item.puesto}</td>
            <td>{item.nombre}</td>
            <td>
              <Badge color="purple">{item.autoridad2}</Badge>
            </td>
            <td>{item.plantel2}</td>
          </tr>
        ))}
      </TableContainer>
    </Topbar>
  );
}