# Geo Data Dashboard

## Overview
A high-performance React-based dashboard for visualizing spatial and tabular data with seamless map-table synchronization.

## Tech Stack
- **React 18** with Vite
- **Leaflet** for map visualization
- **TanStack Virtual** for table virtualization
- **Tailwind CSS** for styling

## Key Features
- Real-time search and filtering
- Bi-directional sync between map and table
- Handles 5000+ rows smoothly
- Professional dark-themed UI

## Design Decisions
1. **Virtualization**: Used @tanstack/react-virtual to render only visible rows
2. **State Management**: Local useState for simplicity (no Redux overhead)
3. **Map Library**: Leaflet chosen for lightweight performance
4. **Component Structure**: Separated concerns (MapView, TableView, App)

## Performance Optimizations
- Virtual scrolling (only 10-15 DOM nodes for 5000 rows)
- useMemo for filtered data caching
- Debounced search (if needed)

## Time Spent
Approximately 4-5 hours

## Installation
```bash
npm install
npm run dev
```

📁 Folder Structure
geo-project/
│
├── public/
│   └── index.html
│
├── src/
│   ├── api/
│   │   └── api.js              # Mock API / data fetching logic
│   │
│   ├── assets/
│   │   ├── image1.png          # Dashboard screenshots
│   │   ├── image2.png
│   │   ├── image3.png
│   │   ├── image4.png
│   │   └── image5.png
│   │
│   ├── components/
│   │   ├── MapView.jsx         # Leaflet map & marker rendering
│   │   └── TableView.jsx       # Virtualized data table
│   │
│   ├── data/
│   │   ├── data.js             # Project dataset
│   │   └── mockData.js         # Mock paginated data source
│   │
│   ├── App.jsx                 # Root component & state orchestration
│   ├── main.jsx                # React entry point
│   ├── App.css                 # App-level styles
│   └── index.css               # Global styles
│
├── .gitignore
├── eslint.config.js
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md

## Screenshots
![Geo Data Dashboard - Completed Projects View](assets/image1.png)
![Geo Data Dashboard - Mixed Active and Completed Projects](assets/image2.png)
![Geo Data Dashboard - Project 40 Selected](assets/image3.png)
![Geo Data Dashboard - Completed Projects View](assets/image4.png)
![Geo Data Dashboard - Active Projects View](assets/image5.png)
