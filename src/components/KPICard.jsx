import { COLORS, fmtDollar, fmtCompact, fmtPct, pct, statusColor, paceColor } from '../utils';

export default function KPICard({ label, actual, target, subtitle, compact = false, prefix = '$', baseline = null, monthsElapsed = null, totalMonths = null }) {
  let percentage, displayLabel, displayActual, displayTarget;
  if (baseline != null) {
    const gap = target - baseline;
    const gained = actual - baseline;
    const progress = gap > 0 ? (gained / gap) * 100 : 0;
    percentage = Math.max(progress, 0);
    const awayPct = gap > 0 ? ((target - actual) / gap) * 100 : 0;
    displayLabel = fmtPct(Math.abs(awayPct)) + ' away';
    displayActual = Math.max(gained, 0);
    displayTarget = gap;
  } else {
    percentage = pct(actual, target);
    displayLabel = fmtPct(percentage);
    displayActual = actual;
    displayTarget = target;
  }
  const color = (monthsElapsed != null && totalMonths != null)
    ? paceColor(baseline != null ? (actual - baseline) : actual, baseline != null ? (target - baseline) : target, monthsElapsed, totalMonths)
    : statusColor(percentage);
  const barWidth = Math.min(percentage, 100);

  return (
    <div style={{
      flex: 1,
      minWidth: compact ? 200 : 240,
      background: `linear-gradient(135deg, ${COLORS.card} 0%, rgba(12,21,39,0.8) 100%)`,
      border: `1px solid ${COLORS.border}`,
      borderTop: `3px solid ${color}`,
      borderRadius: 12,
      padding: compact ? '16px 20px' : '20px 24px',
    }}>
      <div style={{ fontSize: compact ? 12 : 13, color: COLORS.textSecondary, marginBottom: 8, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {label}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
        <span style={{ fontSize: compact ? 24 : 28, fontWeight: 700, color: COLORS.textPrimary }}>
          {prefix === '$' ? fmtDollar(displayActual) : displayActual}
        </span>
        <span style={{ fontSize: 13, color: COLORS.textSecondary }}>
          of {prefix === '$' ? fmtCompact(displayTarget) : displayTarget}
        </span>
        <span style={{
          fontSize: 12,
          fontWeight: 600,
          background: color + '20',
          color: color,
          padding: '2px 8px',
          borderRadius: 10,
        }}>
          {displayLabel}
        </span>
      </div>
      <div style={{
        height: 6,
        background: COLORS.border,
        borderRadius: 3,
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${barWidth}%`,
          background: color,
          borderRadius: 3,
          transition: 'width 0.6s ease',
        }} />
      </div>
      {baseline != null && (
        <div style={{ fontSize: 12, color: COLORS.textSecondary, marginTop: 8 }}>
          Currently {fmtCompact(actual)} of {fmtCompact(target)} goal
        </div>
      )}
      {subtitle && (
        <div style={{ fontSize: 12, color: COLORS.textSecondary, marginTop: baseline != null ? 4 : 8 }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}
