import KPICard from './KPICard';
import SectionTitle from './SectionTitle';
import { QUARTERS } from '../utils';

export default function QuarterlyGoals({ data }) {
  const { months, quarterlyTargets, fte: defaultFte } = data;
  const activeQuarters = QUARTERS.filter(q => months.some(m => m.quarter === q));

  return (
    <>
      {activeQuarters.map(quarter => {
        const targets = quarterlyTargets[quarter];
        const qMonths = months.filter(m => m.quarter === quarter);
        const avgFte = qMonths.reduce((s, m) => s + (m.fte || defaultFte), 0) / qMonths.length;

        const qRevenue = qMonths.reduce((s, m) => s + m.revenue, 0);
        const qProfit = qMonths.reduce((s, m) => s + m.netIncome, 0);
        const annualizedRev = (qRevenue / qMonths.length) * 12;
        const revPerFte = annualizedRev / avgFte;

        return (
          <section key={quarter}>
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
                subtitle={`Based on ${avgFte.toFixed(1)} avg FTE`}
                compact
              />
            </div>
          </section>
        );
      })}
    </>
  );
}
