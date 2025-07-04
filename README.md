# 🏘️ NeighborFit

> **Smart Neighborhood Recommender** — Explore and discover the most suitable Indian neighborhoods based on your lifestyle, preferences, commute, amenities, and safety, all powered by real-time geospatial data.

---

## 🌐 Live Links

| Component  | URL |
|------------|-----|
| 🖥️ Frontend | [https://neighbourfit.vercel.app](https://neighbour-fit-virid.vercel.app/) |
| 🛠️ Backend  | [https://neighbourfit-backend.onrender.com](https://neighbourfit-backend.onrender.com/) |

---

## 🚀 Features

### ✅ Frontend (React.js + Vite)

- 🎯 Personalized neighborhood matches based on saved preferences
- 🔍 Search and filter neighborhoods by name or description
- 💖 Like and save neighborhoods
- 🗺️ View exact location on OpenStreetMap
- 📱 Responsive UI with Tailwind CSS and ShadCN components
- 🧠 Dynamic preference storage using `localStorage`

### ✅ Backend (Node.js + Express)

- 📥 Accepts and processes user preferences
- 📍 Queries geolocation using **OpenStreetMap’s Nominatim API**
- 📊 Enriches results with mock rent, commute, and lifestyle scores
- 🧠 Custom matching algorithm using preference-based logic
- 🧾 REST API: `/api/neighborhood/match`

---

## 🧱 Tech Stack

| Layer        | Technology                                   |
|--------------|----------------------------------------------|
| Frontend     | React.js, Vite, Tailwind CSS, ShadCN UI, Axios |
| Backend      | Node.js, Express, CORS, dotenv               |
| Database     | MongoDB Atlas (Cloud DB) via Mongoose        |
| DevOps       | Vercel (Frontend), Render (Backend), GitHub |
| Geolocation  | OpenStreetMap + Nominatim API                |

---

## 🗃️ Database Schema (MongoDB)

| Field         | Type           | Description                              |
|---------------|----------------|------------------------------------------|
| `name`        | `String`       | Neighborhood name                        |
| `description` | `String`       | Location or description                  |
| `location`    | `String`       | City or area                             |
| `image`       | `String`       | Image URL                                |
| `mapUrl`      | `String`       | OpenStreetMap link                       |
| `commute`     | `String`       | Commute category                         |
| `walkability` | `String`       | Walkability score/category               |
| `type`        | `String`       | Residential, Urban, etc.                 |
| `amenities`   | `[String]`     | Must-have amenities like parks, gyms     |

---

## 🌍 External APIs Used

| API                        | Purpose                                    | Endpoint |
|----------------------------|--------------------------------------------|----------|
| **OpenStreetMap Nominatim API** | Fetch geolocation data for Indian cities | `https://nominatim.openstreetmap.org/search?format=json&q={CITY}&countrycodes=in&limit=5` |

📌 **Important Notes for Nominatim Usage:**

- Use a valid `User-Agent` header in requests:
  ```js
  headers: {
    'User-Agent': 'NeighborFit/1.0 (your-email@example.com)',
    'Accept-Language': 'en'
  }


## 📽️ Demo Video

> 🎥 [Click here to watch the demo](#)  
*(Replace this with your actual video link or embedded iframe)*

---

## ⚙️ Setup Instructions

### 🧩 Prerequisites

- **Node.js** (v18+)
- **MongoDB Atlas** cluster
- **Git**
- **Vercel & Render** accounts

---

### 📁 Project Structure

```bash
NeighbourFit/
├── client/       # React frontend (deployed on Vercel)
├── server/       # Express backend (deployed on Render)
└── README.md     # You're here!
```

## 🔐 Environment Variables

### 📌 Backend `.env`

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/NeighbourFit?retryWrites=true&w=majority
```
🔒 Make sure your `.env` is added to `.gitignore` so it's never pushed to GitHub.

### 📌 Frontend `.env`

```env
REACT_APP_BACKEND_URL=[https://neighbourfit-backend.onrender.com](https://neighbourfit-backend.onrender.com)
```

## 🛠️ Local Installation

### 🔹 Backend Setup

```bash
cd server
npm install
node index.js
```

### 🔹 Frontend Setup

```bash
cd client
npm install
npm run dev
```

## Deployment Guide

### 🚀 Backend on Render

1.  Go to [Render](https://render.com/).
2.  Create a new Web Service.
3.  Connect your GitHub repository.
4.  Set the environment variable:
    * `MONGO_URI`: your MongoDB Atlas connection string
5.  Start command:

    ```bash
    node index.js
    ```
6.  Deploy your backend!

### 🌐 Frontend on Vercel

1.  Go to [Vercel](https://vercel.com/).
2.  Import your GitHub repository.
3.  Go to project settings → Environment Variables:
    * `REACT_APP_BACKEND_URL`: your Render backend URL
4.  Hit Deploy.

---

## 👨‍💻 Author

**Simerpreet Seehra**

🧠 Developer | 💡 Visionary | 🛠 Tech Enthusiast
📧 [simerseehra13@gmail.com](mailto:simerseehra13@gmail.com)

🔗 [GitHub Profile](https://github.com/Simer13) ---

## 🙏 Thank You

Thank you for exploring NeighborFit — your personal assistant for smarter, lifestyle-based city living.

Feel free to clone, explore, and contribute to the project! 🌱



