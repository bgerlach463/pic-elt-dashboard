import KPICard from './KPICard';
import SectionTitle from './SectionTitle';
import { COLORS, ALL_MONTHS, fmtCompact } from '../utils';

const QUARTER_POSITION = {};
['Jan', 'Apr', 'Jul', 'Oct'].forEach(m => { QUARTER_POSITION[m] = 1; });
['Feb', 'May', 'Aug', 'Nov'].forEach(m => { QUARTER_POSITION[m] = 2; });
['Mar', 'Jun', 'Sep', 'Dec'].forEach(m => { QUARTER_POSITION[m] = 3; });
const POSITION_LABELS = {
  1: 'Mid-range billing month (Q start)',
  2: 'Trough billing month — fewer quarterly invoices',
  3: 'Peak billing month (Q end)',
};

function BillingCycleNote({ latestMonth }) {
  const pos = QUARTER_POSITION[latestMonth];
  const labels = ['Q Start (~$49K quarterly)', 'Mid-Quarter (~$29K quarterly)', 'Q End (~$58K quarterly)'];

  return (
    <div style={{
      background: COLORS.card,
      border: `1px solid ${COLORS.border}`,
      borderLeft: `3px solid ${COLORS.teal}`,
      borderRadius: 8,
      padding: '14px 18px',
      marginTop: 16,
      fontSize: 13,
      color: COLORS.textSecondary,
      lineHeight: 1.6,
    }}>
      <div style={{ fontWeight: 600, color: COLORS.textPrimary, marginBottom: 6, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        Quarterly Billing Cycle
      </div>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 8 }}>
        {[1, 2, 3].map(p => (
          <div key={p} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            opacity: p === pos ? 1 : 0.5,
            fontWeight: p === pos ? 600 : 400,
            color: p === pos ? COLORS.textPrimary : COLORS.textMuted,
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: p === pos ? COLORS.teal : COLORS.border,
              display: 'inline-block',
            }} />
            Mo {p}: {labels[p - 1]}
          </div>
        ))}
      </div>
      <div style={{ fontSize: 12, color: COLORS.textMuted }}>
        Revenue swings ~$29K between trough and peak months (~19% on a $150K base). Compare same-month-in-quarter YoY or use full-quarter totals for an apples-to-apples view.
      </div>
    </div>
  );
}

export default function AnnualGoals({ data }) {
  const { months, annualTargets, fte: defaultFte } = data;
  const count = months.length;
  const latestFte = months.length > 0 ? (months[months.length - 1].fte || defaultFte) : defaultFte;
  const latestMonth = months.length > 0 ? months[months.length - 1].month : 'Jan';
  const qPos = QUARTER_POSITION[latestMonth];

  const ytdRevenue = months.reduce((s, m) => s + m.revenue, 0);
  const ytdProfit = months.reduce((s, m) => s + m.netIncome, 0);
  const annualizedRevenue = count > 0 ? (ytdRevenue / count) * 12 : 0;
  const revPerFte = count > 0 ? annualizedRevenue / latestFte : 0;

  return (
    <section>
      <SectionTitle>2026 Annual Goals — Year-to-Date</SectionTitle>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <KPICard
          label="Revenue"
          actual={ytdRevenue}
          target={annualTargets.revenue}
          subtitle={`Annualized pace: ${fmtCompact(annualizedRevenue)}`}
          monthsElapsed={count}
          totalMonths={12}
        />
        <KPICard
          label="Profit"
          actual={ytdProfit}
          target={annualTargets.profit}
          subtitle={POSITION_LABELS[qPos]}
          monthsElapsed={count}
          totalMonths={12}
        />
        <KPICard
          label="Rev / FTE"
          actual={Math.round(revPerFte)}
          target={annualTargets.revPerFte}
          subtitle={`Based on ${latestFte} FTEs`}
          baseline={94361}
          monthsElapsed={count}
          totalMonths={12}
        />
      </div>
      <BillingCycleNote latestMonth={latestMonth} />
    </section>
  );
}
