import { COLORS } from '../utils';

export default function SectionTitle({ children }) {
  return (
    <h2 style={{
      fontSize: 18,
      fontWeight: 700,
      color: COLORS.textPrimary,
      marginBottom: 16,
      paddingBottom: 8,
      borderBottom: `1px solid ${COLORS.border}`,
    }}>
      {children}
    </h2>
  );
}
