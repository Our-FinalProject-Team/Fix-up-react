# FixUp 🚀

FixUp is a production-like service marketplace platform that uses real-time communication, smart request analysis, and professional routing to help customers receive fast and efficient assistance for technical and home-service related issues.

---

# 💡 About The Project

FixUp is a smart real-time assistance platform designed to connect customers with professional service providers quickly and efficiently.

The platform allows users to:

* Report technical or home-service related issues
* Upload images for better issue understanding
* Receive smart issue classification
* Connect instantly with relevant professionals
* Book short-term professional visits
* Receive booking confirmation emails

The system focuses on reducing the time between reporting a problem and receiving professional assistance.

---

# ✨ Features

## 💬 Real-Time Chat

* Built with SignalR
* Instant communication between customers and professionals
* Real-time message updates

## 📸 Image Upload

* Users can upload images directly in the chat
* Images are stored and served through the backend API

## 🧠 Request Analysis System

* AI-powered image analysis using Gemini API
* Custom multilingual keyword-based text classification system
* Automatic issue categorization and professional routing

### Supported Languages

* Hebrew
* English
* Russian
* Arabic

## 🧑‍🔧 Smart Professional Routing

* Requests are automatically routed by category
* Professionals receive relevant job notifications in real time

## 📅 Professional Availability Calendar

* Professionals can manage their availability
* Personal busy/free scheduling system

## 📧 Booking System

* Customers can request a professional visit
* Email notifications are sent after booking confirmation

## 🔐 Authentication & Authorization

* JWT token-based authentication
* Role-based route protection
* Separate access permissions for customers and professionals

## 🧾 Chat History

* Customers: session-based conversations
* Professionals: persistent conversation history

---

# 🧱 Tech Stack

## Frontend

* React
* TypeScript
* Tailwind CSS
* Redux
* Context API

## Backend

* .NET Web API
* SignalR
* Layered Architecture

## AI & Analysis

* Gemini API for image analysis
* Custom multilingual keyword-based classification engine

## Database

* SQL Server

---

# 🏗️ Backend Architecture

The backend is built using a layered architecture approach:

* Controllers Layer
* Services Layer
* Repository/Data Access Layer
* SignalR Real-Time Layer

This structure improves maintainability, scalability, and separation of concerns.

---

# 👥 Team Contribution

This project was developed collaboratively under a GitHub Organization.

### My Responsibilities

* Real-time chat system using SignalR
* AI integration and image analysis flow
* Multilingual text classification system
* Chat flow and client-server communication
* Message routing logic

### Team Member A

* Booking and appointment system
* Email notification integration

### Team Member B

* Backend architecture in C#
* Layered system structure
* API and core backend implementation

### UI / Design

* Initial UI design created using Base44 (AI-assisted design tool)
* Final implementation adapted into React + Tailwind CSS

---

# 📸 Screenshots

## Customer Chat Interface

![Customer Chat](./screenshots/chat.png)

---

## Professional Dashboard

![Professional Dashboard](./screenshots/dashboard.png)

---

## Booking System

![Booking System](./screenshots/booking.png)

---

# 🚀 Getting Started

## Prerequisites

Before running the project, make sure you have installed:

* Node.js
* .NET SDK
* SQL Server
* Visual Studio / VS Code

---

# ⚙️ Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend will run on:

```txt
http://localhost:5173
```

---

# ⚙️ Backend Setup

```bash
cd server
dotnet restore
dotnet run
```

Backend API will run on:

```txt
https://localhost:7230
```

---

# 🔑 Environment Variables

Configure your environment settings:

```json
{
  "GeminiApiKey": "YOUR_API_KEY",
  "ConnectionStrings": {
    "DefaultConnection": "YOUR_SQL_SERVER_CONNECTION"
  }
}
```

---

# 🔐 Security

* JWT Authentication
* Role-based authorization
* Protected routes per user type
* Server-side request validation

---

# ☁️ Deployment

The project is currently under active development and is planned for future cloud deployment (Azure / AWS).

---

# 🔮 Future Improvements

* Persistent customer chat history
* Payment integration
* Mobile application
* Ratings & reviews system
* Advanced AI classification improvements
* Cloud image storage
* Push notifications

---

# 📌 Project Goal

FixUp was built to simulate a modern real-world service marketplace platform by combining:

* Real-time communication
* Smart request analysis
* Professional matching
* Scalable full-stack architecture

The project focuses on creating a fast, intelligent, and user-friendly experience for both customers and professionals.

