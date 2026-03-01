import { COLORS, getNextMonthName } from '../utils';

export default function Footer({ months }) {
  const nextMonth = getNextMonthName(months);

  return (
    <footer style={{
      textAlign: 'center',
      padding: '24px 32px',
      borderTop: `1px solid ${COLORS.border}`,
      color: COLORS.textSecondary,
      fontSize: 13,
    }}>
      PIC | Walk With You Marketing® · ELT Fancial Dashboard · Next update: {nextMonth} close
    </footer>
  );
}
