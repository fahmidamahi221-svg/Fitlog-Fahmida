# FitLog — Gym Companion & Workout Library

FitLog is a modern, responsive web application designed as a dark, no-nonsense gym companion. Users can explore workout routines, lock them into today's training plan, or save them for later tracking.

## Technologies Used

- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **State & Storage**: React Context API & `localStorage`

## Key Features

1. **Interactive Workout Library Grid**: Filterable and sortable 3x4 grid displaying exercise stats, equipment details, and muscle group category pills.
2. **Real-time Metrics Tracker**: Dynamic summary cards calculating cumulative duration (minutes), calories burned, and total exercises live.
3. **5-Lift Daily Cap Enforcement**: Integrated constraint that restricts users to a maximum of 5 lifts per daily plan to promote focused training.
4. **Persistent Local Storage**: Context API synchronization maintaining saved lists and plan status across browser page reloads.
5. **Detailed Exercise Guides**: Comprehensive view displaying step-by-step instructions, equipment requirements, difficulty tags, and quick-action plan adders.
