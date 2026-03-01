import SectionTitle from './SectionTitle';
import { COLORS, ALL_MONTHS } from '../utils';

export default function FTETracker({ data }) {
  const { months, fte: defaultFte } = data;
  const reported = {};
  months.forEach(m => { reported[m.month] = m.fte || defaultFte; });

  // Build ordered list of reported months for delta calculation
  const reportedMonths = months.map(m => ({
    month: m.month,
    fte: m.fte || defaultFte,
  }));

  return (
    <section>
      <SectionTitle>FTE by Month</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 8 }}>
        {ALL_MONTHS.map(mo => {
          const hasData = reported[mo] !== undefined;
          const fte = reported[mo];

          // Calculate delta from previous month
          let delta = null;
          if (hasData) {
            const idx = reportedMonths.findIndex(m => m.month === mo);
            if (idx > 0) {
              delta = fte - reportedMonths[idx - 1].fte;
            }
          }

          const deltaColor = delta > 0 ? COLORS.green : delta < 0 ? COLORS.red : COLORS.textMuted;

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
                  <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.textPrimary }}>
                    {fte.toFixed(1)}
                  </div>
                  {delta !== null && (
                    <div style={{ fontSize: 11, fontWeight: 600, color: deltaColor }}>
                      {delta > 0 ? '+' : ''}{delta.toFixed(1)}
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
    </section>
  );
}
