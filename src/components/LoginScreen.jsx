import { useState } from 'react';
import { COLORS } from '../utils';

const PASSWORD = 'picelt';

export default function LoginScreen({ onLogin }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === PASSWORD) {
      sessionStorage.setItem('pic_auth', '1');
      onLogin();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `radial-gradient(ellipse at 50% 40%, rgba(0,201,219,0.08) 0%, ${COLORS.bg} 70%)`,
    }}>
      <form onSubmit={handleSubmit} style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 16,
        padding: '48px 40px',
        width: 400,
        maxWidth: '90vw',
        textAlign: 'center',
        animation: shake ? 'shake 0.4s ease-in-out' : undefined,
      }}>
        <img
          src={import.meta.env.BASE_URL + 'logo-light.svg'}
          alt="PIC"
          style={{ height: 48, marginBottom: 8 }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'block';
          }}
        />
        <div style={{
          display: 'none',
          fontSize: 32,
          fontWeight: 700,
          color: COLORS.teal,
          border: `2px solid ${COLORS.teal}`,
          borderRadius: 8,
          padding: '4px 16px',
          marginBottom: 8,
          width: 'fit-content',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>PIC</div>
        <div style={{ color: COLORS.textSecondary, fontSize: 14, marginBottom: 32 }}>
          ELT Financial Dashboard
        </div>
        <input
          type="password"
          placeholder="Enter password"
          value={value}
          onChange={(e) => { setValue(e.target.value); setError(false); }}
          autoFocus
          style={{
            width: '100%',
            padding: '12px 16px',
            fontSize: 16,
            fontFamily: 'DM Sans, sans-serif',
            background: COLORS.bg,
            border: `1px solid ${error ? COLORS.red : COLORS.border}`,
            borderRadius: 8,
            color: COLORS.textPrimary,
            outline: 'none',
            marginBottom: 8,
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => { if (!error) e.target.style.borderColor = COLORS.teal; }}
          onBlur={(e) => { if (!error) e.target.style.borderColor = COLORS.border; }}
        />
        {error && (
          <div style={{ color: COLORS.red, fontSize: 13, marginBottom: 8, textAlign: 'left' }}>
            Incorrect password
          </div>
        )}
        <button type="submit" style={{
          width: '100%',
          padding: '12px 16px',
          fontSize: 16,
          fontWeight: 600,
          fontFamily: 'DM Sans, sans-serif',
          background: COLORS.teal,
          color: COLORS.bg,
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer',
          marginTop: 8,
          transition: 'opacity 0.2s',
        }}
          onMouseEnter={(e) => e.target.style.opacity = '0.85'}
          onMouseLeave={(e) => e.target.style.opacity = '1'}
        >
          Sign In
        </button>
        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-8px); }
            40% { transform: translateX(8px); }
            60% { transform: translateX(-4px); }
            80% { transform: translateX(4px); }
          }
        `}</style>
      </form>
    </div>
  );
}
