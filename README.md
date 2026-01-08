
## 🐾 PET WELLNESS MANAGEMENT SYSTEM

## 📚 INTRODUCTION
The **Pet Wellness Management System** is a full-stack **MERN Stack** web application developed to manage pet healthcare services efficiently.  
The system supports multiple user roles such as **Pet Owners, Veterinarians, and Admins**, allowing users to manage pet profiles, book appointments, make online payments, and raise support tickets.

This project was developed as part of an **academic learning project** to gain hands-on experience with modern full-stack web technologies.

---------

## 🛠️ TECH STACK

### 🌐 FRONTEND
- ⚛️ React.js (Vite)
- 🧠 JavaScript
- 🎨 HTML5 & CSS3
- 🔁 Axios
- 🧭 React Router

### 🖥️ BACKEND
- 🟢 Node.js
- 🚏 Express.js
- 🍃 MongoDB
- 📦 Mongoose
- 🔐 JWT Authentication

### 🔗 OTHER INTEGRATIONS
- ☁️ Cloudinary (Image Uploads)
- 💳 PayHere (Payment Gateway)
- 📁 Multer (File Uploads)
- 📄 PDF Generation
- 🤖 AI-based features (Diet plan assistance)

> ⚠️ **NOTE:**  
> The AI feature may sometimes return raw JSON output in the frontend console due to response formatting issues.  
> In some cases, the formatted response is displayed correctly. This issue is currently under improvement.

---

## ✨ KEY FEATURES

### 👤 PET OWNER
- 📝 User registration & login
- 🐶 Manage pet profiles
- 📅 Book & manage appointments
- 🩺 View doctors / veterinarians
- 💳 Online payments
- 🕒 View appointment history
- 🎫 Raise support tickets

### 🩺 VETERINARIAN
- 📅 Manage appointments
- 📋 View pet medical details
- 📝 Update treatment records

### 🛠️ ADMIN
- 📊 Dashboard overview
- 👥 Manage users, vets, and doctors
- 📆 Monitor appointments
- 🎫 Handle support tickets & responses
- 🔐 Role-based access control

---

## 📁 PROJECT STRUCTURE

```

📦 pet-wellness-management-system
┣ 📂 src            # Frontend (React)
┣ 📂 public         # Static assets
┣ 📂 controllers    # Backend controllers
┣ 📂 models         # MongoDB models
┣ 📂 routes         # Express routes
┣ 📂 middleware     # Authentication & authorization
┣ 📜 server.js      # Backend entry point
┣ 📜 package.json
┗ 📜 README.md

````

---

## 🚀 GETTING STARTED

## ✅ PREREQUISITES
- 🟢 Node.js
- 📦 npm
- 🍃 MongoDB

---

## 📥 CLONE THE REPOSITORY
```bash
git clone https://github.com/Thewni/Pets.git
cd Pets
````

---

## 🔧 BACKEND SETUP

```bash
npm install
npm start
```

📍 Backend runs at:

```
http://localhost:5000
```

---

## 🎨 FRONTEND SETUP

```bash
npm install
npm run dev
```

📍 Frontend runs at:

```
http://localhost:5173
```

---

## 🔐 ENVIRONMENT VARIABLES

Create a `.env` file in the root directory and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PAYHERE_MERCHANT_ID=your_merchant_id
```

⚠️ **DO NOT UPLOAD `.env` FILES TO GITHUB**

---

## 🧪 TESTING

* 🧪 API testing using **Postman**
* ⚛️ Frontend testing using **React testing utilities**

---

## 👩‍💻 CONTRIBUTORS

* 👤 Thewni Mahathantri
* 👤 Anuja Sandil
* 👤 Eyaas Ajmal (Ticketing System)
* 👤 Sampath Vinoshan
* 👤 Lakitha Erandunu

---

## 📌 NOTES

* 📘 This project was developed for academic and learning purposes.
* 💡 Demonstrates full-stack development using modern web technologies.

---

## 📄 LICENSE

📚 This project is for educational use only.

---
