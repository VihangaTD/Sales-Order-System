Sales Order
===========

Features
--------

*   Create New Sales Orders
    
*   Edit Existing Orders
    
*   Auto-calculate totals (Excl, Tax, Incl)
    
*   Dynamic Item Selection
    
*   Customer Address Auto-fill
    
*   Print Sales Orders
    
*   Redux State Management
    
*   Clean Modular Component Structure
    
*   Responsive UI (Tailwind CSS)
    

Tech Stack
----------

*   **Frontend:** React.js
    
*   **State Management:** Redux Toolkit
    
*   **Routing:** React Router DOM
    
*   **Styling:** Tailwind CSS
    
*   **Icons:** Lucide React
    
*   **API Handling:** Axios
    

Installation
------------

### 1️⃣ Clone the repository

`   git clone https://github.com/your-username/your-repo-name.git  cd your-repo-name   `

### 2️⃣ Install dependencies

`   npm install   `

### 3️⃣ Start development server

`   npm run dev  `

App will run on:

`   http://localhost:5173   `

Order Calculation Logic
-----------------------

Each item automatically calculates:

*   **Exclusive Amount** = Quantity × Price
    
*   **Tax Amount** = Exclusive × Tax Rate (%)
    
*   **Inclusive Amount** = Exclusive + Tax
    

Totals are dynamically calculated using:

`   const totals = items.reduce(...)   `

Print Feature
-------------

The application includes a built-in print function:

` window.print();   `

The UI uses no-print classes to hide buttons during printing.