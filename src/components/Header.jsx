import { COLORS } from '../utils';

export default function Header({ monthCount, lastUpdated }) {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 32px',
      borderBottom: `1px solid ${COLORS.border}`,
      flexWrap: 'wrap',
      gap: 16,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <img
          src={import.meta.env.BASE_URL + 'logo-light.svg'}
          alt="PIC"
          style={{ height: 36 }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div style={{
          display: 'none',
          fontSize: 24,
          fontWeight: 700,
          color: COLORS.teal,
          border: `2px solid ${COLORS.teal}`,
          borderRadius: 6,
          padding: '2px 10px',
          alignItems: 'center',
        }}>PIC</div>
        <div style={{ width: 1, height: 32, background: COLORS.border }} />
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.textPrimary }}>
            Financial Dashboard
          </div>
          <div style={{ fontSize: 13, color: COLORS.textSecondary }}>
            ELT Leadership KPI Tracker · FY2026
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.teal }}>
          {monthCount} of 12 months
        </div>
        <div style={{ fontSize: 12, color: COLORS.textMuted }}>
          Updated {lastUpdated}
        </div>
      </div>
    </header>
  );
}
