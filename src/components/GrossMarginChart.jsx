import SectionTitle from './SectionTitle';
import { COLORS, fmtPct } from '../utils';

const THRESHOLD = 45;

export default function GrossMarginChart({ months }) {
  if (!months.length) return null;

  const bars = months.map(m => ({
    month: m.month,
    margin: m.revenue > 0 ? (m.grossProfit / m.revenue) * 100 : 0,
  }));

  const maxMargin = Math.max(...bars.map(b => b.margin), THRESHOLD + 10);

  return (
    <section>
      <SectionTitle>Gross Margin %</SectionTitle>
      <div style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 12,
        padding: '24px',
      }}>
        <div style={{ position: 'relative', height: 220, display: 'flex', alignItems: 'flex-end', gap: 12, paddingBottom: 28 }}>
          {/* Threshold line */}
          <div style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: `${28 + (THRESHOLD / maxMargin) * 170}px`,
            borderTop: `2px dashed ${COLORS.red}`,
            zIndex: 1,
          }}>
            <span style={{
              position: 'absolute',
              right: 0,
              top: -18,
              fontSize: 11,
              color: COLORS.red,
              fontWeight: 600,
            }}>
              {THRESHOLD}% target
            </span>
          </div>

          {bars.map((bar) => {
            const height = (bar.margin / maxMargin) * 170;
            const color = bar.margin >= THRESHOLD ? COLORS.teal : COLORS.red;

            return (
              <div key={bar.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color, marginBottom: 4 }}>
                  {fmtPct(bar.margin)}
                </div>
                <div style={{
                  width: '100%',
                  maxWidth: 60,
                  height: height,
                  background: `linear-gradient(180deg, ${color} 0%, ${color}80 100%)`,
                  borderRadius: '4px 4px 0 0',
                  transition: 'height 0.6s ease',
                }} />
                <div style={{ fontSize: 11, color: COLORS.textSecondary, marginTop: 6, fontWeight: 600 }}>
                  {bar.month}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
