# ELT Dashboard — Metric Definitions

## FTE Calculation
- Salaried/full-time = 1.0 FTE each, regardless of hours logged
- Hourly/part-time/contractors = actual Harvest hours ÷ 176
- Include ALL team members including non-producing roles (e.g., office manager)
- Source: monthly Harvest Users Report PDF

### Salaried (1.0 FTE each)
1. Alicia Dorsett
2. Blaine Clapper
3. Brad Gerlach
4. Christina Grzybek
5. Emily Snyder
6. Jeff Schroeffel
7. Jim Kappernaros
8. Matt Chandler
9. Michelle Massung
10. Parker Hurley
11. Robb Luther
12. Ryan York
13. Tiffany Ferris
14. Trista Rodriguez
15. Maria Jose Marfetan
16. Ramiro Iriñiz (moved to hourly Feb 2026)

### Hourly/Contractors (hours ÷ 176)
Everyone on the Harvest report not listed above.

### Roster Changes
- Feb 2026: Ramiro moves to hourly, salaried count drops to 15

## Monthly Update Process

Source files go in `source-files/YYYY-M/` (e.g., `source-files/2026-3/` for March 2026).

1. Create the month's folder in `source-files/` (e.g., `source-files/2026-3/`)
2. Upload Budget vs. Actuals (from QuickBooks) into that folder
3. Upload P&L YoY (from QuickBooks) into that folder
4. Upload Harvest Users Report into that folder
5. Provide New Business Closed number (from HubSpot)
6. Update `src/data/actuals.json` with new month's data
7. `npm run deploy`
