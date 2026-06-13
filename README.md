# 🍽️ EAT24 — Food Delivery Web Application

EAT24 is a full-stack food delivery platform built with **React** (frontend) and **Django REST Framework** (backend). Users can browse restaurants, view menus, place orders, track delivery status, and pay online. The project includes JWT-based authentication, OTP verification, a Redux-powered cart, PayPal integration, Google Maps support, and an in-app chatbot.

---

## 📋 Table of Contents

- [Project Structure](#-project-structure)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Backend Setup (Django)](#-backend-setup-django)
- [Frontend Setup (React)](#-frontend-setup-react)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Environment Variables](#-environment-variables)
- [Database Models](#-database-models)
- [Redux State Management](#-redux-state-management)
- [Troubleshooting](#-troubleshooting)

---

## 📁 Project Structure

```
EAT24/
├── Backend/                        # Django REST API
│   ├── manage.py                   # Django management CLI
│   ├── settings.py                 # Project settings
│   ├── urls.py                     # Root URL config
│   ├── asgi.py / wsgi.py           # ASGI/WSGI entry points
│   ├── static/
│   │   └── images/                 # Media/static images served by Django
│   └── base/                       # Main Django app
│       ├── models.py               # Database models
│       ├── serializers.py          # DRF serializers
│       ├── signals.py              # Django signals (e.g., auto-profile creation)
│       ├── admin.py                # Admin panel registrations
│       ├── views/
│       │   ├── users_views.py      # Auth, profile, OTP
│       │   ├── order_views.py      # Order lifecycle
│       │   ├── restaurant_views.py # Single restaurant detail
│       │   └── restaurants_views.py# Restaurant list
│       ├── urls/
│       │   ├── users_urls.py
│       │   ├── order_urls.py
│       │   ├── restaurant_urls.py
│       │   └── restaurants_urls.py
│       └── migrations/             # Django DB migrations
│
└── dfront/                         # React frontend (Create React App)
    ├── package.json
    ├── public/
    │   ├── index.html
    │   └── pictures/               # Static restaurant images
    └── src/
        ├── index.jsx               # App entry point
        ├── App.jsx                 # Root component with routes
        ├── store.jsx               # Redux store configuration
        ├── axiosConfig.js          # Axios base URL config
        ├── actions/                # Redux action creators
        │   ├── Cartactions.jsx
        │   ├── Orderactions.jsx
        │   ├── Restaurantactions.jsx
        │   └── Useractions.jsx
        ├── reducers/               # Redux reducers
        │   ├── Cartreducers.jsx
        │   ├── Orderreducers.jsx
        │   ├── Restaurantreducer.jsx
        │   └── Userreducers.jsx
        ├── constant/               # Redux action type constants
        ├── component/              # UI screen components
        │   ├── Navbar.jsx
        │   ├── Hotel.jsx           # Restaurant card
        │   ├── Hotelmenu.jsx       # Menu listing
        │   ├── Cartscreen.jsx
        │   ├── LoginScreen.jsx
        │   ├── Registerscreen.jsx
        │   ├── Orderscreen.jsx
        │   ├── Profilescreen.jsx
        │   ├── Placeorderscreen.jsx
        │   ├── Shippingscreen.jsx
        │   ├── Paymentscreen.jsx
        │   ├── Detailscreen.jsx
        │   └── chatbot.jsx
        └── utils/
            └── imageUrl.js
```

---

## 🛠️ Tech Stack

**Frontend**
- React 18
- Redux + Redux Thunk (state management)
- React Router DOM v6 (routing)
- Axios (HTTP client)
- Bootstrap 5 + React-Bootstrap (UI)
- React Toastify (notifications)
- React Multi Carousel (homepage carousel)
- React PayPal Button v2 (payment)
- @react-google-maps/api (location)
- React Simple Chatbot (support bot)
- Styled Components

**Backend**
- Python 3 / Django 4.2
- Django REST Framework
- Simple JWT (JSON Web Token auth)
- django-cors-headers (CORS)
- SQLite (default database — can be swapped to PostgreSQL)
- Pillow (image handling)

---

## ✨ Features

- Browse and search restaurants
- View restaurant menus with item details and images
- Add items to a persistent cart (localStorage-backed)
- User registration with email OTP verification
- JWT-based login/logout with Bearer token auth
- Checkout flow: Cart → Shipping → Payment → Place Order
- PayPal payment integration
- Order tracking: Received → Out for Delivery → Delivered
- User profile management (name, email, password update)
- Admin panel for managing restaurants, menus, and orders
- In-app chatbot support widget
- Google Maps integration for delivery address

---

## ✅ Prerequisites

Before you begin, make sure the following are installed on your machine.

### Node.js & npm (for the React frontend)

**Check if already installed:**
```bash
node --version
npm --version
```

**If not installed — download from the official site:**
> https://nodejs.org/en/download

Choose the **LTS (Long Term Support)** version. The installer bundles both `node` and `npm` together.

After installation, verify:
```bash
node --version   # should print v18.x.x or higher
npm --version    # should print 9.x.x or higher
```

### Python 3 & pip (for the Django backend)

**Check if already installed:**
```bash
python --version     # or: python3 --version
pip --version        # or: pip3 --version
```

**If not installed — download from:**
> https://www.python.org/downloads/

Make sure to check **"Add Python to PATH"** during the Windows installer.

---

## 🐍 Backend Setup (Django)

All commands in this section are run from inside the `Backend/` folder.

### Step 1 — Navigate to the Backend directory

```bash
cd EAT24/Backend
```

### Step 2 — Create a Python virtual environment

A virtual environment isolates your project's Python packages from your system Python, preventing version conflicts.

```bash
# Create the virtual environment (named 'venv')
python -m venv venv
```

### Step 3 — Activate the virtual environment

**On Windows (Command Prompt):**
```cmd
venv\Scripts\activate
```

**On Windows (PowerShell):**
```powershell
venv\Scripts\Activate.ps1
```

**On macOS / Linux:**
```bash
source venv/bin/activate
```

You will see `(venv)` appear at the start of your terminal prompt, confirming it is active.

### Step 4 — Install Python dependencies

```bash
pip install django
pip install djangorestframework
pip install djangorestframework-simplejwt
pip install django-cors-headers
pip install Pillow
```

Or install everything at once if a `requirements.txt` is available:
```bash
pip install -r requirements.txt
```

> **Tip:** To generate a `requirements.txt` from your current environment run:
> `pip freeze > requirements.txt`

### Step 5 — Apply database migrations

Django uses migrations to create and update the database schema. Run:

```bash
python manage.py migrate
```

This will create a `db.sqlite3` file in the `Backend/` folder, which is the default SQLite database.

### Step 6 — Create a superuser (Admin account)

```bash
python manage.py createsuperuser
```

Follow the prompts to set a username, email, and password. This account is used to log in to the Django admin panel at `http://127.0.0.1:8000/admin/`.

### Step 7 — Collect static files (optional for development)

```bash
python manage.py collectstatic
```

### Step 8 — Start the Django development server

```bash
python manage.py runserver
```

The backend API will be running at:
```
http://127.0.0.1:8000
```

Django admin panel:
```
http://127.0.0.1:8000/admin/
```

---

## ⚛️ Frontend Setup (React)

All commands in this section are run from inside the `dfront/` folder.

### Step 1 — Navigate to the frontend directory

Open a **new terminal window** (keep the Django server running in the first one), then:

```bash
cd EAT24/dfront
```

### Step 2 — Install Node modules

This reads `package.json` and downloads all listed dependencies into a `node_modules/` folder.

```bash
npm install
```

This may take 1–3 minutes the first time. You will see a progress bar in the terminal.

> **If you see warnings** about deprecated packages, they are safe to ignore for development. Only errors (in red) need to be addressed.

> **If you get an ERESOLVE error** (peer dependency conflict), try:
> ```bash
> npm install --legacy-peer-deps
> ```

### Step 3 — Verify the Axios base URL

Open `src/axiosConfig.js` and confirm the base URL matches your running Django server:

```js
// src/axiosConfig.js
axios.defaults.baseURL = 'http://127.0.0.1:8000';
```

This file is already pre-configured. Only change it if your Django server runs on a different port.

### Step 4 — Start the React development server

```bash
npm start
```

This command:
- Compiles the React app
- Opens your default browser automatically at `http://localhost:3000`
- Watches for file changes and hot-reloads the page

The terminal will display:
```
Compiled successfully!

You can now view dfront in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

---

## 🚀 Running the Application

You need **two terminals running simultaneously**:

| Terminal | Directory | Command | URL |
|---|---|---|---|
| Terminal 1 (Backend) | `EAT24/Backend` | `python manage.py runserver` | http://127.0.0.1:8000 |
| Terminal 2 (Frontend) | `EAT24/dfront` | `npm start` | http://localhost:3000 |

Open your browser and go to **http://localhost:3000** to use the app.

---

## 📡 API Endpoints

All API routes are prefixed with `http://127.0.0.1:8000/api/`.

### Users

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/users/login/` | Login — returns JWT access & refresh tokens |
| POST | `/api/users/register/` | Register new user |
| GET | `/api/users/profile/` | Get logged-in user's profile (auth required) |
| PUT | `/api/users/profile/update/` | Update profile (auth required) |
| POST | `/api/users/send-otp/` | Send OTP to email for verification |
| POST | `/api/users/verify-otp/` | Verify submitted OTP |

### Restaurants

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/restaurants/` | List all restaurants |
| GET | `/api/restaurant/<id>/` | Get single restaurant with menu |

### Orders

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/orders/add/` | Create a new order |
| GET | `/api/orders/myorders/` | Get all orders for logged-in user |
| GET | `/api/orders/<id>/` | Get a specific order by ID |
| PUT | `/api/orders/<id>/pay/` | Mark order as paid |
| PUT | `/api/orders/<id>/received/` | Mark order as received by restaurant |
| PUT | `/api/orders/<id>/deliver/` | Mark order as delivered |
| PUT | `/api/orders/<id>/out-for-delivery/` | Mark order as out for delivery |

---

## 🔐 Environment Variables

Currently, settings are hardcoded in `Backend/settings.py` and `dfront/src/axiosConfig.js`. For production, move sensitive values to environment files.

**Backend** — create a `.env` file in `Backend/` and update `settings.py`:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

**Frontend** — create a `.env` file in `dfront/`:

```env
REACT_APP_API_URL=http://127.0.0.1:8000
REACT_APP_PAYPAL_CLIENT_ID=your-paypal-client-id
REACT_APP_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

Then in `axiosConfig.js`:
```js
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
```

> **Never commit `.env` files to version control.** Add them to `.gitignore`.

---

## 🗄️ Database Models

### Restaurant
Stores restaurant listings shown on the homepage.

| Field | Type | Notes |
|---|---|---|
| id | AutoField | Primary key |
| name | CharField | Restaurant name |
| description | TextField | Short description |
| rating | DecimalField | e.g., 4.5 |
| time | IntegerField | Delivery time in minutes |
| price | IntegerField | Average price for two |
| path | ImageField | Restaurant cover image |

### RestaurantMenu
Each restaurant has multiple menu items (foreign key to Restaurant).

| Field | Type | Notes |
|---|---|---|
| restaurant | ForeignKey | Links to Restaurant |
| name | CharField | Dish name |
| price | IntegerField | Price in currency units |
| quantity | IntegerField | Available quantity |
| description | TextField | Dish description |
| img | ImageField | Dish image |

### Order
Tracks the full order lifecycle.

| Field | Type | Notes |
|---|---|---|
| user | ForeignKey | Links to Django User |
| itemsPrice | DecimalField | Subtotal |
| taxPrice | DecimalField | Tax amount |
| shippingPrice | DecimalField | Delivery charge |
| totalPrice | DecimalField | Grand total |
| paymentMethod | CharField | e.g., PayPal |
| isPaid | BooleanField | Payment status |
| paidAt | DateTimeField | When paid |
| isReceived | BooleanField | Restaurant received order |
| isOutForDelivery | BooleanField | Rider picked up |
| isDelivered | BooleanField | Delivered to customer |
| createdAt | DateTimeField | Auto timestamp |

### OrderItem
Individual dishes within an order.

| Field | Type | Notes |
|---|---|---|
| order | ForeignKey | Parent order |
| dishid | ForeignKey | Links to RestaurantMenu |
| name | CharField | Dish name snapshot |
| quantity | IntegerField | Quantity ordered |

### ShippingAddress
Delivery address for each order.

| Field | Type | Notes |
|---|---|---|
| order | OneToOneField | One address per order |
| address | CharField | Street address |
| city | CharField | City |
| state | CharField | State |
| postalCode | CharField | PIN / ZIP code |

---

## 🔄 Redux State Management

The Redux store (`src/store.jsx`) manages the following slices of global state:

| Slice | Reducer | Purpose |
|---|---|---|
| `restaurantList` | restaurantListReducer | All restaurants list |
| `restaurantDetail` | restaurantDetailReducer | Single restaurant + menu |
| `cart` | cartReducer | Cart items, shipping address |
| `userLogin` | userLoginReducer | Current logged-in user & JWT |
| `userRegister` | userRegisterReducer | Registration flow state |
| `userDetails` | userDetailsReducer | Profile data |
| `userUpdateProfile` | userUpdateProfileReducer | Profile update status |
| `orderCreate` | orderCreateReducer | New order creation |
| `orderDetails` | orderDetailsReducer | Single order view |
| `orderPay` | orderPayReducer | Payment update |
| `orderListMy` | orderListMyReducer | User's order history |

Cart items, user info, and shipping address are persisted to `localStorage` so they survive page refreshes.

---

## 🏗️ Build for Production

### Frontend — create an optimised production build

```bash
cd EAT24/dfront
npm run build
```

This creates a `build/` folder with minified, optimised static files ready to be served by any web server (Nginx, Apache, etc.) or uploaded to a hosting service like Vercel or Netlify.

### Backend — production considerations

- Switch `DEBUG = False` in `settings.py`
- Set a strong `SECRET_KEY`
- Configure a production database (e.g., PostgreSQL)
- Use Gunicorn as the WSGI server: `gunicorn Backend.wsgi:application`
- Serve static/media files via Nginx or cloud storage (S3)

---

## 🛠️ Troubleshooting

**`npm install` fails with peer dependency errors**
```bash
npm install --legacy-peer-deps
```

**`npm start` — "react-scripts: command not found"**
The `node_modules` folder is missing or corrupt. Run:
```bash
rm -rf node_modules
npm install
```

**Django server — `ModuleNotFoundError`**
Your virtual environment is not activated, or a package is missing. Activate the venv and re-run `pip install`.

**CORS error in browser console**
Django has `CORS_ALLOW_ALL_ORIGINS = True` in settings, which allows all origins in development. If this still fails, ensure `corsheaders` is in `INSTALLED_APPS` and `CorsMiddleware` is placed at the top of the `MIDDLEWARE` list in `settings.py`.

**Images not loading**
Django serves media from `/images/` URL backed by `Backend/static/images/`. Ensure you have run `python manage.py collectstatic` and the `urlpatterns` in `urls.py` includes:
```python
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

**Port already in use**
- Backend: `python manage.py runserver 8001` (use a different port, then update `axiosConfig.js`)
- Frontend: `PORT=3001 npm start` (macOS/Linux) or `set PORT=3001 && npm start` (Windows CMD)

**SQLite database errors after pulling new changes**
Run migrations again:
```bash
python manage.py migrate
```

---

## 📦 Useful npm Scripts

Run these from inside `EAT24/dfront/`:

| Command | Description |
|---|---|
| `npm start` | Start development server at localhost:3000 |
| `npm run build` | Create optimised production build |
| `npm test` | Run React test suite |
| `npm run eject` | Eject from Create React App (irreversible) |

---

## 🐍 Useful Django Commands

Run these from inside `EAT24/Backend/` with the virtualenv active:

| Command | Description |
|---|---|
| `python manage.py runserver` | Start development server |
| `python manage.py migrate` | Apply pending migrations |
| `python manage.py makemigrations` | Create new migrations from model changes |
| `python manage.py createsuperuser` | Create admin account |
| `python manage.py shell` | Open interactive Django Python shell |
| `python manage.py collectstatic` | Collect all static files |

---

## 📄 License

This project is for educational purposes. All restaurant names, images, and brand references used in the sample data are property of their respective owners.
