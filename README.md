# Inventory Management App Documentation

## Overview
The Inventory Management App is a web-based application built using Next.js 15. It allows users to manage inventory items, track borrowed items, and report damaged items. The app includes authentication via Clerk and stores data locally using React context and localStorage.

## Features
- **User Authentication**: Users must sign in before accessing the dashboard.
- **Dashboard**:
  - Displays summary cards for total, available, borrowed, and damaged items.
  - Shows recent activity.
  - Provides charts for inventory statistics.
- **Inventory Management**:
  - Add new items with details like name, category, status, and condition.
  - View a list of all inventory items.
- **Borrowing System**:
  - Borrow available items.
  - Track borrowed items.
- **Damage Reports**:
  - Report damaged items.
  - View a list of damaged items.

## Technology Stack
- **Framework**: Next.js 15
- **Authentication**: Clerk
- **State Management**: React Context API
- **Storage**: LocalStorage
- **UI Components**: Tailwind CSS, Lucide Icons

## Project Structure
```
/project-root
├── app/
│   ├── dashboard/
│   ├── inventory/
│   ├── borrowing/
│   ├── damage-reports/
│   ├── contexts/ (InventoryContext.tsx)
│   ├── components/ (Shared UI components)
├── pages/
├── public/
├── styles/
├── package.json
├── README.md
```

## Installation & Setup
### Prerequisites
- Node.js installed (v18+ recommended)
- npm or yarn package manager

### Installation Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/inventory-management.git
   cd inventory-management
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the development server:
   ```sh
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage Guide
### Adding Inventory Items
- Navigate to the Inventory page.
- Fill out the item form and click "Add Item".
- The item will be stored in localStorage and displayed in the list.

### Borrowing Items
- Navigate to the Borrowing page.
- Select an available item and enter the borrower’s name.
- Click "Borrow Item".

### Reporting Damaged Items
- Navigate to the Damage Reports page.
- Select an item and describe the damage.
- Click "Submit Damage Report".

## API & Data Handling
Since the app does not use a backend database, all data is stored in localStorage via React Context.

- **InventoryContext.tsx** handles state management.
- Items are assigned unique IDs using `Date.now().toString()`.

## Deployment
1. Build the app:
   ```sh
   npm run build
   ```
2. Deploy using Vercel:
   ```sh
   vercel deploy
   ```

## Known Issues & Limitations
- Data persistence is limited to localStorage.
- No user roles or permissions.
- No email notifications for borrowed/damaged items.

## Contributing
- Fork the repository.
- Create a new feature branch: `git checkout -b feature-xyz`
- Commit changes: `git commit -m "Add new feature"`
- Push to GitHub and submit a pull request.

