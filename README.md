# Inferno Across America: A Visual Chronicle of Wildfires

[Web App is hosted at Vercel](https://cdv-project.vercel.app/)

An interactive data story that maps and charts U.S. wildfire activity from 1992–2015. The experience pairs a county-level choropleth with time-series visualizations so viewers can explore seasonal patterns, long-term change, and the climate questions behind the numbers.

## What this project is about

Inferno Across America is a visual chronicle of wildfire impact across the United States. It focuses on the scale of acres burned over time, letting users move through months and years to reveal where fires concentrate, when they peak, and how yearly totals evolve. The goal is to make the climate narrative tangible through direct, interactive exploration rather than static charts.

## Features

- County-level wildfire map with color intensity for acres burned and a legend for quick comparison.
- Clickable counties that surface a narrative sentence and contextual imagery when available.
- Search to jump to a specific county and a toggle for state labels.
- Time controls for month and year, plus an autoplay option to scan through months.
- Two chart modes: yearly comparison of monthly patterns and long-term evolution of annual totals.
- Built-in data source modal with citations for transparency.

## Screenshots

![Hero view – map and charts](documentation/image.png)

## Data sources

- Kaggle: 1.88 Million US Wildfires (FPA_FOD_20170508)  
  https://www.kaggle.com/datasets/rtatman/188-million-us-wildfires
- Derived JSON used in the app:
  - `src/data/FiresPerCountyMonthly.json`
  - `src/data/FiresPerMonthUS.json`
  - `src/data/counties-10m.json`

Citation: Short, Karen C. 2017. Spatial wildfire occurrence data for the United States, 1992–2015 [FPA_FOD_20170508]. 4th Edition. Fort Collins, CO: Forest Service Research Data Archive. https://doi.org/10.2737/RDS-2013-0009.4

## Tech stack

- Next.js (App Router), React
- D3 + TopoJSON for mapping and charting
- Tailwind CSS + MUI for UI components

## How to run

Prerequisite: Node.js 18+.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

Optional:

```bash
npm run build
npm start
```
