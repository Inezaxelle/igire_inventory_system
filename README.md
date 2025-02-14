# Inventory Management App Documentation

## Overview
The Inventory Management App is a web-based application built using Next.js 15. It allows users to manage inventory items, track borrowed items, and report damaged items. The app includes authentication via Clerk and stores data locally using React Context and localStorage.

### ⚠️ Important: Create at Least 4 Items First!
Before using features like borrowing and damage reporting, make sure to add at least 4 items to the inventory. This will allow you to:
✅ Borrow items properly  
✅ Report damage on different items  
✅ Observe the dashboard updates more effectively  

## Features
- **User Authentication**: Users must sign in before accessing the dashboard.
- **Dashboard**:
  - Displays summary cards for total, available, borrowed, and damaged items.
  - Shows recent activity.
  - Provides charts for inventory statistics.
- **Inventory Management**:
  - Add new items with details like name, category, status, and condition.
  - View a list of all inventory items on the `/list` page.
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
│   ├── inventory/           # Add new items
│   ├── list/                # Lists all inventory items
│   ├── borrowing/           # Borrow items
│   ├── damage-reports/      # Report damaged items
│   ├── contexts/            # React Context for inventory state
│   │   ├── InventoryContext.tsx
│   ├── components/          # Shared UI components
│   │   ├── AddItem.tsx
│   │   ├── Dashboard.tsx
│   │   ├── DashboardLayout.tsx
│   │   ├── Sidebar.tsx
│   ├── styles/              # Global styles
│   ├── public/              # Static assets
│   ├── package.json         # Project dependencies
│   ├── README.md            # Project documentation
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
4. Open `http://localhost:3000` in your browser.

## Usage Guide
1️⃣ **Adding Inventory Items**  
   - Navigate to the Inventory page (`/inventory`).  
   - Fill out the item form and click "Add Item".  
   - The item will be stored in localStorage.  
   - Items are listed on the `/list` page.  

2️⃣ **Viewing & Managing Items**  
   - Go to `/list` to see all added inventory items.  

3️⃣ **Borrowing Items**  
   - Navigate to `/borrowing`.  
   - Select an available item and enter the borrower's name.  
   - Click "Borrow Item" to change the item's status.  

4️⃣ **Reporting Damaged Items**  
   - Go to `/damage-reports`.  
   - Select an item and describe the damage.  
   - Click "Submit Damage Report".  

5️⃣ **Dashboard Overview**  
   - View Total Items, Available Items, Borrowed Items, and Damaged Items.  
   - Check recent activity logs and charts to track trends.  

## API & Data Handling
Since the app does not use a backend database, all data is stored in localStorage via React Context.

- `InventoryContext.tsx` handles state management.
- Items are assigned unique IDs using `Date.now().toString()`.

## Known Issues & Limitations
- Data persistence is limited to localStorage.
- No user roles or permissions.
- No email notifications for borrowed/damaged items.

## Contributing
1. Fork the repository.
2. Create a new feature branch: `git checkout -b feature-xyz`.
3. Commit changes: `git commit -m "Add new feature"`.
4. Push to GitHub and submit a pull request.