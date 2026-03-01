import SectionTitle from './SectionTitle';
import { COLORS, fmtDollar, fmtPct } from '../utils';

function VarianceBadge({ variance, variancePct, invertColor }) {
  const flagged = Math.abs(variancePct) > 10;
  if (!flagged) return <span style={{ fontSize: 13, color: COLORS.textSecondary }}>{fmtPct(variancePct)}</span>;

  // For revenue/profit: red if under (negative variance)
  // For cogs/expenses: red if over (positive variance means over budget)
  let isRed;
  if (invertColor) {
    isRed = variance > 0; // over budget on costs is bad
  } else {
    isRed = variance < 0; // under budget on revenue is bad
  }
  const color = isRed ? COLORS.red : COLORS.green;

  return (
    <span style={{
      fontSize: 12,
      fontWeight: 600,
      background: color + '20',
      color: color,
      padding: '2px 8px',
      borderRadius: 10,
    }}>
      {fmtPct(variancePct)}
    </span>
  );
}

export default function BudgetVsActuals({ selectedData, budget }) {
  if (!selectedData.length) return null;

  const agg = { revenue: 0, cogs: 0, grossProfit: 0, expenses: 0, netIncome: 0 };
  const budgetAgg = { revenue: 0, cogs: 0, expenses: 0 };

  selectedData.forEach(m => {
    agg.revenue += m.revenue;
    agg.cogs += m.cogs;
    agg.grossProfit += m.grossProfit;
    agg.expenses += m.expenses;
    agg.netIncome += m.netIncome;
    const b = budget[m.month];
    if (b) {
      budgetAgg.revenue += b.revenue;
      budgetAgg.cogs += b.cogs;
      budgetAgg.expenses += b.expenses;
    }
  });

  budgetAgg.grossProfit = budgetAgg.revenue - budgetAgg.cogs;
  budgetAgg.netIncome = budgetAgg.grossProfit - budgetAgg.expenses;

  const rows = [
    { label: 'Revenue', actual: agg.revenue, budget: budgetAgg.revenue, bold: false, invertColor: false },
    { label: 'COGS', actual: agg.cogs, budget: budgetAgg.cogs, bold: false, invertColor: true },
    { label: 'Gross Profit', actual: agg.grossProfit, budget: budgetAgg.grossProfit, bold: true, invertColor: false, highlight: true },
    { label: 'Expenses', actual: agg.expenses, budget: budgetAgg.expenses, bold: false, invertColor: true },
    { label: 'Net Income', actual: agg.netIncome, budget: budgetAgg.netIncome, bold: true, invertColor: false, topBorder: true },
  ];

  return (
    <section>
      <SectionTitle>Budget vs. Actuals</SectionTitle>
      <div style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 12,
        overflow: 'hidden',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['', 'Actual', 'Budget', 'Variance $', 'Variance %'].map((h, i) => (
                <th key={h} style={{
                  padding: '12px 16px',
                  fontSize: 12,
                  fontWeight: 600,
                  color: COLORS.textSecondary,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  textAlign: i === 0 ? 'left' : 'right',
                  borderBottom: `1px solid ${COLORS.border}`,
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const variance = row.actual - row.budget;
              const variancePct = row.budget !== 0 ? (variance / Math.abs(row.budget)) * 100 : 0;
              return (
                <tr key={row.label} style={{
                  background: row.highlight ? 'rgba(0,201,219,0.04)' : 'transparent',
                  borderTop: row.topBorder ? `2px solid ${COLORS.border}` : undefined,
                }}>
                  <td style={{ padding: '10px 16px', fontSize: 14, fontWeight: row.bold ? 700 : 400, color: COLORS.textPrimary }}>
                    {row.label}
                  </td>
                  <td style={{ padding: '10px 16px', textAlign: 'right', fontSize: 14, fontWeight: row.bold ? 700 : 400, color: COLORS.textPrimary }}>
                    {fmtDollar(row.actual, 2)}
                  </td>
                  <td style={{ padding: '10px 16px', textAlign: 'right', fontSize: 14, color: COLORS.textSecondary }}>
                    {fmtDollar(row.budget, 2)}
                  </td>
                  <td style={{ padding: '10px 16px', textAlign: 'right', fontSize: 14, color: variance >= 0 ? COLORS.textPrimary : COLORS.textSecondary }}>
                    {fmtDollar(variance, 2)}
                  </td>
                  <td style={{ padding: '10px 16px', textAlign: 'right' }}>
                    <VarianceBadge variance={variance} variancePct={variancePct} invertColor={row.invertColor} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
