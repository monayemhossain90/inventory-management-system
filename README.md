Inventory Management System
Inventory Management System helps a business track products, stock levels, purchases, sales, returns, suppliers, customers, and expenses in one place
It records every purchase and sale, automatically updates stock, and blocks a sale if there isn't enough stock to cover it

[LinkedIn](https://www.linkedin.com/in/monayem-hossain/)

## About
The Inventory Management System is a web-based application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It aims to streamline product catalog management, purchase and sales tracking, and give a business owner a live picture of their stock, customers, suppliers, and expenses.

## Features

* **Authentication**: Sign up with email OTP verification, sign in (JWT), forgot/reset password with OTP, change password, and a Demo Login button on the sign-in page for quick access.

* **Catalog Management**: A user can

  1. Create, update, delete, and search Brands and Categories
  2. Create, update, delete, and search Products, each with a live Stock quantity
  3. See current stock for every product at a glance

* **Contacts**: A user can

  1. Create, update, delete, and search Customers
  2. Create, update, delete, and search Suppliers

* **Purchases & Sales**: A user can

  1. Record a Purchase from a supplier, which automatically increases product stock
  2. Record a Sale to a customer, which automatically decreases product stock
  3. Get blocked from selling more than what's currently in stock
  4. Delete a Purchase or Sale, which automatically reverses its effect on stock

* **Returns**: A user can record a customer return, which adds the returned quantity back to stock

* **Expenses**: A user can create Expense Types and record Expenses against them

* **Reports & Dashboard**: A user can

  1. See dashboard summary totals for sales, purchases, returns, and expenses
  2. Pull date-range reports for sales, purchases, returns, and expenses

* **Multi-tenant**: Every account's data (products, sales, customers, etc.) is private to that account, so multiple businesses can use the same deployment independently

## Technologies Used

* Frontend: React.js, Bootstrap, Redux Toolkit
* Backend: Node.js, Express.js
* Database: MongoDB

## Installation

```
git clone https://github.com/monayemhossain90/inventory-management-backend
git clone https://github.com/monayemhossain90/inventory-management-frontend
```

Open 2 terminals in separate windows/tabs.

### Terminal 1: Setting Up Backend

```
cd inventory-management-backend
npm install
```

Create a file called .env in the backend folder. Inside it write this :

```
MONGO_URI=[your mongodb uri]
JWT_SECRET=[a long random string]
JWT_EXPIRES_IN_SECONDS=86400
OTP_EXPIRES_IN_MINUTES=10

# email provider (for OTP emails)

SMTP_EMAIL=[your gmail address]
SMTP_PASSWORD=[your gmail app password]
```

Then run the backend

```
npm run dev
```

### Terminal 2: Setting Up frontend

```
cd inventory-management-frontend
npm install
```

Create a .env file in the root folder. Putting the value into it

```
VITE_API_URL=http://localhost:5000/api/v1
```

Then run the frontend

```
npm run dev
```

### Optional: Demo Login

```
cd inventory-management-backend
npm run seed:demo
```

Creates a demo account so the "Demo Login" button on the sign-in page works out of the box.

## Deployment

* Vercel/Render/Railway - backend and frontend
* MongoDB Atlas - database
