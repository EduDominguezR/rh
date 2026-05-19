import Topbar from '../components/Topbar';
import TableContainer from '../components/TableContainer';
import Badge from '../components/Badge';
import ActionButtons from '../components/ActionButtons';
import {
  dashboardCards,
  ultimasCompatibilidades,
} from '../data/dashboardData';

export default function DashboardPage() {
  return (
    <Topbar
      title="Dashboard"
      subtitle="SICOMP · Inicio"
      actions={
        <ActionButtons
          buttons={[
            { label: 'Trabajadores', href: '/trabajadores', variant: 'light' },
            { label: 'Compatibilidad', href: '/compatibilidad/formato', variant: 'primary' },
          ]}
        />
      }
    >
      <section className="grid-4">
        {dashboardCards.map((card) => (
          <article key={card.label} className={`card ${card.variant}`}>
            <span>{card.label}</span>
            <strong>{card.value}</strong>
            <small>{card.meta}</small>
          </article>
        ))}
      </section>

      <TableContainer
        title="Últimas compatibilidades"
        subtitle="Vista rápida del sistema"
        columns={['Tipo', 'Temp. INI', 'Plaza', 'Ciudad', 'Trabajador', 'Estatus']}
      >
        {ultimasCompatibilidades.map((item) => (
          <tr key={`${item.tipo}-${item.plaza}-${item.trabajador}`}>
            <td><Badge color={item.tipoColor}>{item.tipo}</Badge></td>
            <td>{item.tempIni}</td>
            <td>{item.plaza}</td>
            <td>{item.ciudad}</td>
            <td>{item.trabajador}</td>
            <td><Badge color={item.estatusColor}>{item.estatus}</Badge></td>
          </tr>
        ))}
      </TableContainer>
    </Topbar>
  );
}