import { useState } from 'react';
import { COLORS } from '../utils';
import data from '../data/actuals.json';
import Header from './Header';
import AnnualGoals from './AnnualGoals';
import QuarterlyGoals from './QuarterlyGoals';
import NewBusiness from './NewBusiness';
import MonthSelector from './MonthSelector';
import BudgetVsActuals from './BudgetVsActuals';
import YearOverYear from './YearOverYear';
import GrossMarginChart from './GrossMarginChart';
import Footer from './Footer';

export default function Dashboard() {
  const allMonthNames = data.months.map(m => m.month);
  const [selectedMonths, setSelectedMonths] = useState([...allMonthNames]);

  const toggleMonth = (mo) => {
    setSelectedMonths(prev =>
      prev.includes(mo) ? prev.filter(m => m !== mo) : [...prev, mo]
    );
  };

  const selectAll = () => setSelectedMonths([...allMonthNames]);
  const clearAll = () => setSelectedMonths([]);

  const selectedData = data.months.filter(m => selectedMonths.includes(m.month));

  return (
    <div style={{
      minHeight: '100vh',
      background: `radial-gradient(ellipse at 50% 20%, rgba(0,201,219,0.06) 0%, ${COLORS.bg} 60%)`,
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Header monthCount={data.months.length} lastUpdated={data.lastUpdated} />
      <main style={{ flex: 1, maxWidth: 1200, width: '100%', margin: '0 auto', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 32 }}>
        <AnnualGoals data={data} />
        <QuarterlyGoals data={data} />
        <NewBusiness data={data} />
        <MonthSelector
          availableMonths={data.months}
          selectedMonths={selectedMonths}
          onToggle={toggleMonth}
          onSelectAll={selectAll}
          onClear={clearAll}
        />
        <BudgetVsActuals selectedData={selectedData} budget={data.budget} />
        <YearOverYear selectedData={selectedData} />
        <GrossMarginChart months={data.months} />
      </main>
      <Footer months={data.months} />
    </div>
  );
}
