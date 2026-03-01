import SectionTitle from './SectionTitle';
import { COLORS, ALL_MONTHS, fmtCompact } from '../utils';

function MetricRow({ label, months, allMonths, getValue, formatValue, getDelta, deltaColors, baselineLabel }) {
  return (
    <>
      <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.textSecondary, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {label}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 8, marginBottom: 20 }}>
        {ALL_MONTHS.map(mo => {
          const idx = allMonths.findIndex(m => m.month === mo);
          const hasData = idx !== -1;
          const value = hasData ? getValue(allMonths[idx]) : null;
          const isBaseline = hasData && idx === 0 && baselineLabel;
          const delta = hasData && idx > 0 ? getDelta(allMonths[idx], allMonths[idx - 1]) : null;

          let deltaColor = COLORS.textMuted;
          if (delta !== null && deltaColors) {
            deltaColor = delta > 0 ? deltaColors.up : delta < 0 ? deltaColors.down : COLORS.textMuted;
          }

          return (
            <div key={mo} style={{
              background: COLORS.card,
              border: `1px solid ${hasData ? COLORS.teal : COLORS.border}`,
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
                  <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.textPrimary }}>
                    {formatValue(value)}
                  </div>
                  {isBaseline && (
                    <div style={{ fontSize: 10, fontWeight: 600, color: COLORS.yellow }}>
                      {baselineLabel}
                    </div>
                  )}
                  {delta !== null && (
                    <div style={{ fontSize: 11, fontWeight: 600, color: deltaColor }}>
                      {delta > 0 ? '+' : ''}{formatValue(delta)}
                    </div>
                  )}
                </>
              ) : (
                <div style={{ fontSize: 14, color: COLORS.textMuted }}>—</div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default function FTETracker({ data }) {
  const { months, fte: defaultFte } = data;

  const allMonths = months.map(m => ({
    month: m.month,
    fte: m.fte || defaultFte,
    revenue: m.revenue,
    revPerFte: (m.revenue * 12) / (m.fte || defaultFte),
  }));

  return (
    <section>
      <SectionTitle>Monthly Trends</SectionTitle>

      <MetricRow
        label="FTE"
        months={months}
        allMonths={allMonths}
        getValue={m => m.fte}
        formatValue={v => v.toFixed(1)}
        getDelta={(curr, prev) => curr.fte - prev.fte}
        deltaColors={{ up: COLORS.green, down: COLORS.red }}
      />

      <MetricRow
        label="Revenue"
        months={months}
        allMonths={allMonths}
        getValue={m => m.revenue}
        formatValue={v => fmtCompact(v)}
        getDelta={(curr, prev) => curr.revenue - prev.revenue}
        deltaColors={{ up: COLORS.green, down: COLORS.red }}
      />

      <MetricRow
        label="Rev / FTE (Annualized)"
        months={months}
        allMonths={allMonths}
        getValue={m => m.revPerFte}
        formatValue={v => fmtCompact(v)}
        getDelta={(curr, prev) => curr.revPerFte - prev.revPerFte}
        deltaColors={{ up: COLORS.green, down: COLORS.red }}
        baselineLabel="BASELINE"
      />
    </section>
  );
}
