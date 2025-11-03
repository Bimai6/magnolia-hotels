![logo](https://res.cloudinary.com/dk1g12n2h/image/upload/v1740471924/magnolialLogoMobile_awbjyy_1_od9omf.png)

# **Magnolia Hotels** 🏨

**Magnolia Hotels** is an exclusive chain of luxury hotels where every detail is designed to offer you a unique experience. With single and double luxury rooms, a gourmet restaurant that takes gastronomy to new heights, and pool and spa services for your total relaxation. Located in central and privileged areas, **Magnolia Hotels** guarantees you a dream getaway, combining comfort, elegance, and sophistication in one place.

Fullstack application with a React frontend and Node.js/Express backend, connected to MongoDB Atlas for complete management of room and restaurant reservations, featuring JWT authentication.

---

## 📌 **Table of Contents**
1. [⚙️ Installation and Requirements](#installation-and-requirements)
2. [🔐 Authentication & Security](#auth-security)
3. [🌐 REST API Endpoints](#rest-api-endpoints)
4. [🎨 Application Design](#app-design)
5. [💻 Technologies Used](#technologies-used)
6. [📚 Libraries](#-libraries) 
7. [🚀 Next Steps](#-next-steps)
8. [👥 Original Team](#original-team)
9. [🔖 License](#-license)

---

## ⚙️ Installation and Requirements <a name="installation-and-requirements"></a>

### **Prerequisites**  
>[!IMPORTANT]
Before you start, ensure you have the following installed:
- **Node.js** (Download from [here](https://nodejs.org/))
- **npm** (comes with Node.js)
- **MongoDB Atlas** (free account at mongodb.com)

### **Installation Steps**

1. **Clone the repository**  
   Use Git to clone the repository to your local machine:

   ```bash
   git clone https://github.com/Bimai6/Magnolia-Hotels.git

2. **Install the dependencies**
    Navigate to the project folder and install the required dependencies

   ```bash
   cd magnolia-hotels
   npm install
   
3. **Run the application**
   Thanks to concurrently, you run both backend and frontend with the same command
   ("dev": "concurrently \"npm run dev --prefix frontend\" \"npm run dev --prefix backend\"")

   ```bash
   npm run dev
   
   
---

## 🔐 **Authentication & Security** <a name="auth-security"></a>
-This app uses JWT (JSON Web Tokens) for user authentication and secure access.

-User login credentials are securely handled and stored in the database.

-Protected routes ensure that only authorized users can access certain resources.

---

## 🌐 REST API Endpoints <a name="rest-api-endpoints"></a>

### **Authentication**

| Method | Endpoint      | Description         | Auth |
|--------|---------------|-------------------|------|
| POST   | /login        | Log in a user      | ❌   |
| POST   | /register     | Register a new user| ❌   |

---

### **Users**

| Method | Endpoint                  | Description                     | Auth |
|--------|---------------------------|---------------------------------|------|
| GET    | /users                    | Get all users                   | ❌   |
| GET    | /users/:id                | Get a specific user by ID       | ❌   |
| PATCH  | /users/:id                | Update user profile             | ✅   |
| PATCH  | /users/:id/reservations   | Update user's reservations      | ✅   |

---

### **Rooms**

| Method | Endpoint           | Description                     | Auth |
|--------|------------------|---------------------------------|------|
| GET    | /rooms            | Get all rooms                   | ❌   |
| GET    | /rooms/:id        | Get a specific room by ID       | ❌   |
| PATCH  | /rooms/:id        | Update room reservations        | ✅   |

---

### **Restaurant Reservations**

| Method | Endpoint                         | Description                           | Auth |
|--------|----------------------------------|---------------------------------------|------|
| GET    | /restaurantReservations           | Get all restaurant reservations       | ❌   |
| POST   | /restaurantReservations           | Create a new restaurant reservation   | ✅   |
| POST   | /restaurantReservations/:id       | Get reservation by email and ID       | ✅   |
| PATCH  | /restaurantReservations/:id       | Update a restaurant reservation       | ✅   |
| DELETE | /restaurantReservations/:id       | Delete a restaurant reservation       | ✅   |


---

## 🎨 **App Design** <a name="app-design"></a>

### 🖥️ Desktop Version  

| Home Page | Restaurant Page | Restaurant Reservation | Restaurant Menu |
|-----------|----------------|------------------------|----------------|
| [![Home Page](https://res.cloudinary.com/dk1g12n2h/image/upload/v1740390718/homePage_v6r72r.png)](https://res.cloudinary.com/dk1g12n2h/image/upload/v1740390718/homePage_v6r72r.png) | [![Restaurant Page](https://res.cloudinary.com/dk1g12n2h/image/upload/v1740473446/Restaurante_s4pswh.png)](https://res.cloudinary.com/dk1g12n2h/image/upload/v1740473446/Restaurante_s4pswh.png) | [![Restaurant Reservation](https://res.cloudinary.com/dk1g12n2h/image/upload/v1740473324/reservaDesktop_eprhaw.png)](https://res.cloudinary.com/dk1g12n2h/image/upload/v1740473324/reservaDesktop_eprhaw.png) | [![Restaurant Menu](https://res.cloudinary.com/dk1g12n2h/image/upload/v1740472850/cartaDesktop_dfdc5y.png)](https://res.cloudinary.com/dk1g12n2h/image/upload/v1740472850/cartaDesktop_dfdc5y.png) |


### 📱 Mobile Version  

| Home Page | Restaurant Page | Restaurant Reservation | Restaurant Menu |
|-----------|----------------|------------------------|----------------|
| [![Home Page](https://res.cloudinary.com/dk1g12n2h/image/upload/v1740469834/homePageMobile_yzmmro.png)](https://res.cloudinary.com/dk1g12n2h/image/upload/v1740469834/homePageMobile_yzmmro.png) | [![Restaurant Page](https://res.cloudinary.com/dk1g12n2h/image/upload/v1740473446/RestauranteMobile_baqkp5.png)](https://res.cloudinary.com/dk1g12n2h/image/upload/v1740473446/RestauranteMobile_baqkp5.png) | [![Restaurant Reservation](https://res.cloudinary.com/dk1g12n2h/image/upload/v1740472856/reservaMobile_bnvhgt.png)](https://res.cloudinary.com/dk1g12n2h/image/upload/v1740472856/reservaMobile_bnvhgt.png) | [![Restaurant Menu](https://res.cloudinary.com/dk1g12n2h/image/upload/v1740472894/cartaMobile_sh0u29.png)](https://res.cloudinary.com/dk1g12n2h/image/upload/v1740472894/cartaMobile_sh0u29.png) |

---

## 💻 **Technologies Used** <a name="technologies-used"></a>
 This project utilizes the following technologies:

###Frontend
- React
- React Router
- Bootstrap
- React Bootstrap
- MUI Components

###Backend
- Node.js
- Express.js
- JWT
- Mongoose
- Joi
- Nodemon

###Database
- MongoDB Atlas

---

## 📚 **Libraries**

- @cloudinary/react
- @cloudinary/url-gen
- @emotion/react
- @emotion/styled
- @mui/icons-material
- @mui/material
- @mui/x-date-pickers
- bootstrap
- dayjs
- react
- react-bootstrap
- react-dom
- react-icons
- react-router-dom
- react-slick
- slick-carousel
- sweetalert2
- mongoose
- jsonwebtoken
- joi
- nodemon
- concurrently

---

## 🚀 **Next Steps**

- Choose reservations during time slots at the restaurant
- Create social media accounts
- Add dark mode
- Create chat for Contact section
  
---

## 👥 Original Team <a name="original-team"></a>

This project originally started as a group effort but has evolved into an individual fullstack project.

### Initial Team

| Name                | Role           | GitHub |
|--------------------|----------------|--------|
| Mario Lebrero       | Developer      | [@Bimai6](https://github.com/Bimai6) |
| Pablo Jiménez       | Developer      | [@pablo-jm](https://github.com/pablo-jm) |
| Alejandro Gómez     | Developer      | [@AleGomoj](https://github.com/AleGomoj) |
| Jesús Manuel García | Scrum Master   | [@LozzDev](https://github.com/LozzDev) |
| Felipe Chacón       | Product Owner  | [@PhilippeInCode](https://github.com/PhilippeInCode) |

### Current Development

| Name          | Role                                                                 |
|---------------|----------------------------------------------------------------------|
| Mario Lebrero | Fullstack Developer (Backend + MongoDB connection + Deployment)      |

> Note: All backend functionality, database connection, and deployment have been handled individually by Mario Lebrero.


## 🔖 **License**

Magnolia Hotels is licensed under the [MIT license](https://opensource.org/licenses/MIT).

--- 
