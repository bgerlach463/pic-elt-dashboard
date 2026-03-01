import KPICard from './KPICard';
import SectionTitle from './SectionTitle';
import { fmtCompact } from '../utils';

export default function AnnualGoals({ data }) {
  const { months, annualTargets, fte: defaultFte } = data;
  const count = months.length;
  const latestFte = months.length > 0 ? (months[months.length - 1].fte || defaultFte) : defaultFte;

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
          subtitle="Jan/Feb are historically the weakest months"
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
    </section>
  );
}
