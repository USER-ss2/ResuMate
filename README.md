# ResuMate

ResuMate is a full-stack web application designed to help users create and manage a personalized professional portfolio based on their skills, education, work experience, certifications, projects, and professional background.

The application uses a dynamic questionnaire system to collect relevant information and automatically organize it into an interactive and personalized portfolio.

## ✨ Features

* 🔐 JWT-based user authentication
* 📝 Dynamic questionnaire system
  



## 🧩 Portfolio Sections

The generated portfolio is divided into several sections:

* **Banner** — Personal introduction and professional titles
* **Skills** — Technical and professional skills
* **Projects** — Projects, descriptions, technologies, and dates
* **Qualifications** — Education and professional experience presented as a timeline
* **Exhibitions** — Exhibitions and related information
* **Contact** — Contact information

## 🛠️ Technologies Used

### Frontend

* React.js
* React Router
* React Bootstrap
* Axios
* JWT Decode
* Animate.css
* React Multi Carousel
* React On Screen

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

## 📊 Dynamic Questionnaire System

ResuMate uses a database-driven questionnaire system to dynamically collect user information.

Each question is stored in MongoDB 
## 📂 Project Structure

```text
ResuMate/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── seed/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── assets/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/USER-ss2/ResuMate.git
cd ResuMate
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

Open a new terminal and run:

```bash
cd frontend
npm install
```

## 🔐 Environment Variables

Create a `.env` file inside the `backend` directory.

Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Replace the values with your own configuration.

## 🌱 Database Seeding

To populate the database with the initial questions and data, run these commands:

```bash
cd backend
cd seed
node seedquestions.js
```


## ▶️ Running the Application

### Start the Backend

From the `backend` directory:

```bash
node server.js
```

The backend server will typically run on:

```text
http://localhost:5000
```

### Start the Frontend

Open another terminal and run:

```bash
cd frontend
npm run dev
```

The frontend will typically be available at:

```text
http://localhost:5173
```

**ResuMate — Build your professional identity, one answer at a time.**
