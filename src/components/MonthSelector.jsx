import { COLORS, ALL_MONTHS } from '../utils';

export default function MonthSelector({ availableMonths, selectedMonths, onToggle, onSelectAll, onClear }) {
  const availableSet = new Set(availableMonths.map(m => m.month));
  const estimatedSet = new Set(availableMonths.filter(m => m.isEstimated).map(m => m.month));

  return (
    <section>
      <div style={{
        background: `linear-gradient(135deg, rgba(0,201,219,0.08) 0%, ${COLORS.card} 100%)`,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 12,
        padding: '16px 24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Select Months
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={onSelectAll} style={btnStyle}>All</button>
            <button onClick={onClear} style={btnStyle}>Clear</button>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {ALL_MONTHS.map(mo => {
            const available = availableSet.has(mo);
            const selected = selectedMonths.includes(mo);
            const estimated = estimatedSet.has(mo);

            return (
              <button
                key={mo}
                onClick={() => available && onToggle(mo)}
                disabled={!available}
                style={{
                  position: 'relative',
                  padding: '8px 16px',
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: 'DM Sans, sans-serif',
                  background: selected ? COLORS.teal + '20' : 'transparent',
                  color: selected ? COLORS.teal : available ? COLORS.textSecondary : COLORS.textMuted,
                  border: `1px solid ${selected ? COLORS.teal : COLORS.border}`,
                  borderRadius: 20,
                  cursor: available ? 'pointer' : 'default',
                  opacity: available ? 1 : 0.35,
                  transition: 'all 0.2s',
                }}
              >
                {mo}
                {estimated && available && (
                  <span style={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: COLORS.yellow,
                  }} />
                )}
              </button>
            );
          })}
        </div>
        <div style={{ fontSize: 11, color: COLORS.textSecondary, marginTop: 8 }}>
          <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: COLORS.yellow, marginRight: 4, verticalAlign: 'middle' }} />
          Estimated / projected data
        </div>
      </div>
    </section>
  );
}

const btnStyle = {
  padding: '4px 14px',
  fontSize: 12,
  fontWeight: 600,
  fontFamily: 'DM Sans, sans-serif',
  background: 'transparent',
  color: COLORS.textSecondary,
  border: `1px solid ${COLORS.border}`,
  borderRadius: 6,
  cursor: 'pointer',
};
