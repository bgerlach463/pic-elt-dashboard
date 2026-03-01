export const COLORS = {
  bg: '#060D1B',
  card: '#0C1527',
  border: '#162039',
  teal: '#00C9DB',
  textPrimary: '#F0F4F8',
  textSecondary: '#8DA2B8',
  textMuted: '#506680',
  green: '#10B981',
  yellow: '#F59E0B',
  red: '#EF4444',
};

export const ALL_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'];
export const QUARTER_MONTHS = { Q1: ['Jan', 'Feb', 'Mar'], Q2: ['Apr', 'May', 'Jun'], Q3: ['Jul', 'Aug', 'Sep'], Q4: ['Oct', 'Nov', 'Dec'] };
export const MONTH_TO_QUARTER = {};
ALL_MONTHS.forEach(m => {
  for (const [q, ms] of Object.entries(QUARTER_MONTHS)) {
    if (ms.includes(m)) MONTH_TO_QUARTER[m] = q;
  }
});

export function fmt(n, decimals = 0) {
  if (n == null || isNaN(n)) return '—';
  return n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function fmtDollar(n, decimals = 0) {
  if (n == null || isNaN(n)) return '—';
  const prefix = n < 0 ? '-$' : '$';
  return prefix + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function fmtCompact(n) {
  if (n == null || isNaN(n)) return '—';
  const abs = Math.abs(n);
  const prefix = n < 0 ? '-$' : '$';
  if (abs >= 1000000) return prefix + (abs / 1000000).toFixed(2) + 'M';
  if (abs >= 1000) return prefix + (abs / 1000).toFixed(1) + 'K';
  return prefix + abs.toFixed(0);
}

export function pct(value, total) {
  if (!total) return 0;
  return (value / total) * 100;
}

export function fmtPct(value, decimals = 1) {
  if (value == null || isNaN(value)) return '—';
  return value.toFixed(decimals) + '%';
}

export function statusColor(percentage, greenThreshold = 90, yellowThreshold = 75) {
  if (percentage >= greenThreshold) return COLORS.green;
  if (percentage >= yellowThreshold) return COLORS.yellow;
  return COLORS.red;
}

// Pace-adjusted: compare actual% vs expected% for elapsed period
// paceRatio = actual% / expected%.  ≥90% of pace = green, ≥75% = yellow, else red
export function paceColor(actual, target, monthsElapsed, totalMonths) {
  if (!target || !totalMonths) return COLORS.red;
  const actualPct = (actual / target) * 100;
  const expectedPct = (monthsElapsed / totalMonths) * 100;
  if (expectedPct === 0) return COLORS.red;
  const paceRatio = (actualPct / expectedPct) * 100;
  if (paceRatio >= 90) return COLORS.green;
  if (paceRatio >= 75) return COLORS.yellow;
  return COLORS.red;
}

export function getCurrentQuarter(months) {
  if (!months.length) return 'Q1';
  const last = months[months.length - 1];
  return last.quarter;
}

export function getNextMonthName(months) {
  if (!months.length) return 'January';
  const lastIdx = ALL_MONTHS.indexOf(months[months.length - 1].month);
  if (lastIdx >= 11) return 'January';
  const names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return names[lastIdx + 1];
}
