import KPICard from './KPICard';
import SectionTitle from './SectionTitle';
import { COLORS, ALL_MONTHS, QUARTER_MONTHS, fmtCompact, fmtDollar, pct, statusColor, getCurrentQuarter } from '../utils';

function MonthGrid({ months, newBizTargets }) {
  const reported = {};
  months.forEach(m => { reported[m.month] = m.newBizClosed; });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 8 }}>
      {ALL_MONTHS.map(mo => {
        const target = newBizTargets.monthly[mo];
        const hasData = reported[mo] !== undefined;
        const actual = reported[mo] || 0;
        const hit = hasData && actual >= target;
        const borderColor = hasData ? (hit ? COLORS.green : COLORS.red) : COLORS.border;

        return (
          <div key={mo} style={{
            background: COLORS.card,
            border: `1px solid ${borderColor}`,
            borderRadius: 8,
            padding: '10px 12px',
            textAlign: 'center',
            opacity: hasData ? 1 : 0.5,
          }}>
            <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 4, fontWeight: 600, textTransform: 'uppercase' }}>
              {mo}
            </div>
            {hasData ? (
              <>
                <div style={{ fontSize: 16, fontWeight: 700, color: hit ? COLORS.green : COLORS.red }}>
                  {fmtCompact(actual)}
                </div>
                <div style={{ fontSize: 11, color: COLORS.textMuted }}>
                  of {fmtCompact(target)}
                </div>
              </>
            ) : (
              <div style={{ fontSize: 14, color: COLORS.textMuted }}>
                {fmtCompact(target)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function QuarterBars({ months, newBizTargets }) {
  const quarterTotals = {};
  months.forEach(m => {
    if (!quarterTotals[m.quarter]) quarterTotals[m.quarter] = 0;
    quarterTotals[m.quarter] += m.newBizClosed;
  });

  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
      {['Q1', 'Q2', 'Q3', 'Q4'].map(q => {
        const target = newBizTargets[q];
        const actual = quarterTotals[q] || 0;
        const percentage = pct(actual, target);
        const color = statusColor(percentage);
        const hasData = quarterTotals[q] !== undefined;

        return (
          <div key={q} style={{ flex: 1, minWidth: 140 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.textSecondary }}>{q}</span>
              <span style={{ fontSize: 12, color: COLORS.textMuted }}>
                {hasData ? fmtCompact(actual) : '$0'} / {fmtCompact(target)}
              </span>
            </div>
            <div style={{ height: 8, background: COLORS.border, borderRadius: 4, overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${Math.min(percentage, 100)}%`,
                background: hasData ? color : COLORS.border,
                borderRadius: 4,
                transition: 'width 0.6s ease',
              }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function NewBusiness({ data }) {
  const { months, newBizTargets } = data;
  const quarter = getCurrentQuarter(months);
  const ytdNewBiz = months.reduce((s, m) => s + m.newBizClosed, 0);
  const qMonths = months.filter(m => m.quarter === quarter);
  const qNewBiz = qMonths.reduce((s, m) => s + m.newBizClosed, 0);

  return (
    <section>
      <SectionTitle>New Business Revenue</SectionTitle>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 20 }}>
        <KPICard
          label="YTD New Business"
          actual={ytdNewBiz}
          target={newBizTargets.annual}
          compact
          monthsElapsed={months.length}
          totalMonths={12}
        />
        <KPICard
          label={`${quarter} New Business`}
          actual={qNewBiz}
          target={newBizTargets[quarter]}
          compact
          monthsElapsed={qMonths.length}
          totalMonths={3}
        />
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.textSecondary, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        Monthly Targets
      </div>
      <MonthGrid months={months} newBizTargets={newBizTargets} />
      <QuarterBars months={months} newBizTargets={newBizTargets} />
    </section>
  );
}
