import KPICard from './KPICard';
import SectionTitle from './SectionTitle';
import { getCurrentQuarter } from '../utils';

export default function QuarterlyGoals({ data }) {
  const { months, quarterlyTargets, fte: defaultFte } = data;
  const quarter = getCurrentQuarter(months);
  const targets = quarterlyTargets[quarter];
  const qMonths = months.filter(m => m.quarter === quarter);
  const latestFte = qMonths.length > 0 ? (qMonths[qMonths.length - 1].fte || defaultFte) : defaultFte;

  const qRevenue = qMonths.reduce((s, m) => s + m.revenue, 0);
  const qProfit = qMonths.reduce((s, m) => s + m.netIncome, 0);
  const annualizedRev = qMonths.length > 0 ? (qRevenue / qMonths.length) * 12 : 0;
  const revPerFte = annualizedRev / latestFte;

  return (
    <section>
      <SectionTitle>{quarter} 2026 Goals</SectionTitle>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <KPICard
          label={`${quarter} Revenue`}
          actual={qRevenue}
          target={targets.revenue}
          compact
          monthsElapsed={qMonths.length}
          totalMonths={3}
        />
        <KPICard
          label={`${quarter} Profit`}
          actual={qProfit}
          target={targets.profit}
          compact
          monthsElapsed={qMonths.length}
          totalMonths={3}
        />
        <KPICard
          label={`${quarter} Rev/FTE`}
          actual={Math.round(revPerFte)}
          target={targets.revPerFte}
          compact
          baseline={101633}
          monthsElapsed={qMonths.length}
          totalMonths={3}
        />
      </div>
    </section>
  );
}
