import SectionTitle from './SectionTitle';
import { COLORS, fmtDollar, fmtPct } from '../utils';

export default function YearOverYear({ selectedData }) {
  if (!selectedData.length) return null;

  const monthsWithPY = selectedData.filter(m => m.py_revenue !== 0);
  const monthsWithoutPY = selectedData.filter(m => m.py_revenue === 0);

  const cy = { revenue: 0, cogs: 0, grossProfit: 0, expenses: 0, netIncome: 0 };
  const py = { revenue: 0, cogs: 0, grossProfit: 0, expenses: 0, netIncome: 0 };

  selectedData.forEach(m => {
    cy.revenue += m.revenue;
    cy.cogs += m.cogs;
    cy.grossProfit += m.grossProfit;
    cy.expenses += m.expenses;
    cy.netIncome += m.netIncome;
    py.revenue += m.py_revenue;
    py.cogs += m.py_cogs;
    py.grossProfit += m.py_grossProfit;
    py.expenses += m.py_expenses;
    py.netIncome += m.py_netIncome;
  });

  const allZeroPY = py.revenue === 0 && py.cogs === 0 && py.expenses === 0;

  const rows = [
    { label: 'Revenue', cy: cy.revenue, py: py.revenue, bold: false },
    { label: 'COGS', cy: cy.cogs, py: py.cogs, bold: false },
    { label: 'Gross Profit', cy: cy.grossProfit, py: py.grossProfit, bold: true, highlight: true },
    { label: 'Expenses', cy: cy.expenses, py: py.expenses, bold: false },
    { label: 'Net Income', cy: cy.netIncome, py: py.netIncome, bold: true, topBorder: true },
  ];

  function changeArrow(cyVal, pyVal) {
    if (pyVal === 0) return <span style={{ color: COLORS.textMuted }}>—</span>;
    const change = ((cyVal - pyVal) / Math.abs(pyVal)) * 100;
    const up = change >= 0;
    const color = up ? COLORS.green : COLORS.red;
    return (
      <span style={{ color, fontSize: 13, fontWeight: 600 }}>
        {up ? '▲' : '▼'} {fmtPct(Math.abs(change))}
      </span>
    );
  }

  return (
    <section>
      <SectionTitle>Year-over-Year Comparison</SectionTitle>
      {monthsWithoutPY.length > 0 && monthsWithPY.length > 0 && (
        <div style={{ fontSize: 12, color: COLORS.yellow, marginBottom: 12 }}>
          Note: Prior year data only available for {monthsWithPY.map(m => m.month).join(', ')}. {monthsWithoutPY.map(m => m.month).join(', ')} show $0 for FY2025.
        </div>
      )}
      <div style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 12,
        overflow: 'hidden',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['', 'FY2026', 'FY2025', 'Change'].map((h, i) => (
                <th key={h} style={{
                  padding: '12px 16px',
                  fontSize: 12,
                  fontWeight: 600,
                  color: COLORS.textMuted,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  textAlign: i === 0 ? 'left' : 'right',
                  borderBottom: `1px solid ${COLORS.border}`,
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} style={{
                background: row.highlight ? 'rgba(0,201,219,0.04)' : 'transparent',
                borderTop: row.topBorder ? `2px solid ${COLORS.border}` : undefined,
              }}>
                <td style={{ padding: '10px 16px', fontSize: 14, fontWeight: row.bold ? 700 : 400, color: COLORS.textPrimary }}>
                  {row.label}
                </td>
                <td style={{ padding: '10px 16px', textAlign: 'right', fontSize: 14, fontWeight: row.bold ? 700 : 400, color: COLORS.textPrimary }}>
                  {fmtDollar(row.cy, 2)}
                </td>
                <td style={{ padding: '10px 16px', textAlign: 'right', fontSize: 14, color: COLORS.textSecondary }}>
                  {allZeroPY ? '—' : (row.py === 0 ? '—' : fmtDollar(row.py, 2))}
                </td>
                <td style={{ padding: '10px 16px', textAlign: 'right' }}>
                  {allZeroPY ? <span style={{ color: COLORS.textMuted }}>—</span> : changeArrow(row.cy, row.py)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
