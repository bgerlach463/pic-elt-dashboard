# July 2026 — Source Data Archive

Pulled: 2026-08-10 via eos-dashboard-update skill

## QBO P&L (July 2026)
- totalIncome: 178963.67
- grossProfit: 94877.31
- COGS (Cost of Goods Sold group total): 84086.36
- totalExpenses (Expenses group total): 100047.84
- netOperatingIncome: -5170.53
- netIncome (bottom line, incl. other income/expense): -4597.52

## QBO P&L (July 2025 — Prior Year)
- totalIncome: 124595.53
- grossProfit: 22463.52
- COGS (Cost of Goods Sold group total): 102132.01
- totalExpenses (Expenses group total): 113842.65
- netIncome: -91379.13

### Parsing note (important for future runs)
The QBO MCP response's `monthlyBreakdown` block is unreliable — it reported
totalIncome of $1,139.42 for July 2026 and totalExpenses of $124,052.46, both
of which double-count "Total for X" subgroup rows. Figures above were taken from
the authoritative `reportData.data.rows` GROUP/SUMMARY rows (Income, Cost of
Goods Sold, Gross Profit, Expenses, Net Operating Income, Net Income). Do not
use `max(totalExpenses)` from the raw JSON.

## Harvest Team Hours (July 1–31, 2026)
Total hours: 3,874.30 (Employees 2,945.10 + Contractors 929.20)

### Salaried (1.0 FTE each, per METRICS.md) — 15 people = 15.0 FTE
Alicia Dorsett 193.70, Blaine Clapper 208.20, Brad Gerlach 201.70,
Christina Grzybek 183.80, Emily Snyder 203.00, Jeff Schroeffel 211.80,
Jim Kappernaros 205.30, Matt Chandler 205.40, Michelle Massung 187.60,
Robb Luther 173.80, Ryan York 159.40, Sara Olujic 164.00,
Tiffany Ferris 189.90, Trista Rodriguez 186.80,
Maria Jose Marfetan 118.60 (counted as salaried per METRICS.md)

Salaried hours subtotal: 2,793.00

### Hourly / Contractors — 1,081.30 hours ÷ 176 = 6.1 FTE
Becca Fehl 73.70, Isabel Tobin 31.30, Stefanie Piscitello 165.70,
Federico Sardiña 26.30, Gurjinder Singh 43.10, Jatinder Saini 183.10,
Jimena Panzera 163.80, Laura Vergara 6.90, Macarena Cuinat 120.00,
Mariana Forteza 101.20, Vince Lombardo 166.20

Check: 2,793.00 + 1,081.30 = 3,874.30 ✓ (ties to Harvest report total)

### Total July 2026 FTE = 21.1
Ramiro Iriñiz logged no hours in July (hourly since Feb 2026).
Parker Hurley departed Apr 2026 — not on report.

## New Business Closed (July 2026)
$37,800 — provided by Brad from the HubSpot "New Business Closed Won per Month"
dashboard.

### HubSpot MCP note (important for future runs)
The connected HubSpot portal (accountId 4211083) is NOT PIC's new-business CRM.
Its deal pipelines are "New Order Pipeline" and "Re-Order Pipeline" and the deal
records are industrial/manufacturing accounts. Validation: a closed-won query for
May 2026 returned 0 deals against the known actual of $105,340. Until the correct
portal is connected, New Business Closed must be supplied by Brad manually.
