![logo](https://res.cloudinary.com/dk1g12n2h/image/upload/v1740471924/magnolialLogoMobile_awbjyy_1_od9omf.png)

# **Magnolia Hotels** 🏨

**Magnolia Hotels** is an exclusive luxury hotel chain, where every detail is designed to offer you a unique experience. With individual and double luxury rooms, a gourmet restaurant that takes gastronomy to new heights, and a pool and spa service for your total relaxation. Located in central and privileged locations, **Magnolia Hotels** guarantees you a dream getaway, combining comfort, elegance, and sophistication in one place.

---

## 📌 **Table of Contents**
1. [⚙️ Installation and Requirements](#installation-and-requirements)
2. [👥 Team Members](#-team-members)
3. [🎨 App Design](#-app-design)
4. [🏗️ Project Architecture](#project-architecture)
5. [💻 Technologies Used](#-technologies-used) 
6. [📚 Libraries](#-libraries)
7. [🧪 Test Screenshots](#-test-screenshots)
8. [🚀 Next Steps](#-next-steps)
9. [🌐 Preview](#-preview)
10. [🔖 License](#-license)

---

## ⚙️ Installation and Requirements <a name="installation-and-requirements"></a>

### **Prerequisites**  
>[!IMPORTANT]
Before you start, ensure you have the following installed:
- **Node.js** (Download from [here](https://nodejs.org/))
- **npm** (comes with Node.js)

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
   Start the development server using the following command

   ```bash
   npm run dev
   
4. **Run the server**
   Start the json server using the following command

   ```bash
   npm start

---

## 👥 **Team Members**  

| Nombre | Rol | GitHub |
|--------|-----|--------|
| **Mario Lebrero** | Developer | [@Bimai6](https://github.com/Bimai6) |
| **Pablo Jiménez** | Developer | [@pablo-jm](https://github.com/pablo-jm) |
| **Alejandro Gómez** | Developer | [@AleGomoj](https://github.com/AleGomoj) |
| **Jesús Manuel García** | Scrum Master | [@LozzDev](https://github.com/LozzDev) |
| **Felipe Chacón** | Product Owner | [@PhilippeInCode](https://github.com/PhilippeInCode) |

---


## 🎨 **App Design**

### 🖥️ Desktop Version  

| Home Page | Restaurant Page | Restaurant Reservation | Restaurant Menu |
|-----------|----------------|------------------------|----------------|
| [![Home Page](https://res.cloudinary.com/dk1g12n2h/image/upload/v1740390718/homePage_v6r72r.png)](https://res.cloudinary.com/dk1g12n2h/image/upload/v1740390718/homePage_v6r72r.png) | [![Restaurant Page](https://res.cloudinary.com/dk1g12n2h/image/upload/v1740473446/Restaurante_s4pswh.png)](https://res.cloudinary.com/dk1g12n2h/image/upload/v1740473446/Restaurante_s4pswh.png) | [![Restaurant Reservation](https://res.cloudinary.com/dk1g12n2h/image/upload/v1740473324/reservaDesktop_eprhaw.png)](https://res.cloudinary.com/dk1g12n2h/image/upload/v1740473324/reservaDesktop_eprhaw.png) | [![Restaurant Menu](https://res.cloudinary.com/dk1g12n2h/image/upload/v1740472850/cartaDesktop_dfdc5y.png)](https://res.cloudinary.com/dk1g12n2h/image/upload/v1740472850/cartaDesktop_dfdc5y.png) |


### 📱 Mobile Version  

| Home Page | Restaurant Page | Restaurant Reservation | Restaurant Menu |
|-----------|----------------|------------------------|----------------|
| [![Home Page](https://res.cloudinary.com/dk1g12n2h/image/upload/v1740469834/homePageMobile_yzmmro.png)](https://res.cloudinary.com/dk1g12n2h/image/upload/v1740469834/homePageMobile_yzmmro.png) | [![Restaurant Page](https://res.cloudinary.com/dk1g12n2h/image/upload/v1740473446/RestauranteMobile_baqkp5.png)](https://res.cloudinary.com/dk1g12n2h/image/upload/v1740473446/RestauranteMobile_baqkp5.png) | [![Restaurant Reservation](https://res.cloudinary.com/dk1g12n2h/image/upload/v1740472856/reservaMobile_bnvhgt.png)](https://res.cloudinary.com/dk1g12n2h/image/upload/v1740472856/reservaMobile_bnvhgt.png) | [![Restaurant Menu](https://res.cloudinary.com/dk1g12n2h/image/upload/v1740472894/cartaMobile_sh0u29.png)](https://res.cloudinary.com/dk1g12n2h/image/upload/v1740472894/cartaMobile_sh0u29.png) |

---

## 🏗️ Project Architecture <a name="project-architecture"></a>

📂 Magnolia-Hotels

├─ 📂 src

   │ ├─ 📂 components
   
      │ │ ├─ 📂 Auth
      │ │ ├─ 📂 ButtonRestaurant
         │ │ │ ├─ ButtonRestaurant.css
         │ │ │ └─ ButtonRestaurant.jsx
      │ │ ├─ 📂 ButtonSearch
      │ │ ├─ 📂 ContactSlider
      │ │ ├─ 📂 EmailButton
      │ │ ├─ 📂 Footer
      │ │ ├─ 📂 Header
      │ │ ├─ 📂 RoomCard
      │ │ └─ 📂 SearchResult
      
   │ ├─ 📂 context
   
   │ ├─ 📂 data
   
   │ ├─ 📂 pages
   
      │ │ ├─ 📂 Home
         │ │ │ ├─ Home.css
            │ │ │ └─ Home.jsx
            
      │ │ ├─ 📂 MyReservations
      │ │ ├─ 📂 Profile
      │ │ ├─ 📂 Reservations
      │ │ └─ 📂 Restaurant
      │ │ └─ RestaurantMenu
      
   │ ├─ 📂 router
   
      │ │ └─ Router.jsx
      
   │ ├─ index.css
   
   │ ├─ main.jsx
   
   │ └─ ...
   
├─ 📄 .gitignore

├─ 📄 eslint.config.js

├─ 📄 index.html

├─ 📄 package.json

├─ 📄 README.md

└─ 📄 vite.config.js

---

## 💻 **Technologies Used**
 This project utilizes the following technologies:

- React: Frontend JavaScript library for building user interfaces
- React Router: For handling navigation within the app
- Bootstrap: For responsive design and UI components
- React Bootstrap: Bootstrap components for React

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

---
## 🧪 **Test Screenshots**

| Test Name         | Screenshot |
|------------------|------------|
| **Header Test**  | ![Header Test](https://res.cloudinary.com/dczjloaiy/image/upload/v1740668360/headertest_yhtzk5.png) |
| **Footer Test**  | ![Footer Test](https://res.cloudinary.com/dczjloaiy/image/upload/v1740668360/footertest_u7esvi.png) |
| **Button Search** | ![Button Search](https://res.cloudinary.com/dczjloaiy/image/upload/v1740668823/buttonsearchtest_iykbe3.png) |
| **Room Card**    | ![Room Card](https://res.cloudinary.com/dczjloaiy/image/upload/v1740668654/roomcardtest_c9dyiv.png) |
| **Email Button** | ![Email Button](https://res.cloudinary.com/dk1g12n2h/image/upload/v1740776961/EmailButton_n6pcem.jpg) |
| **Contact Slider** | ![Contact Slider](https://res.cloudinary.com/dk1g12n2h/image/upload/v1740776961/ContactSlider_f8yiot.jpg) |

---

## 🚀 **Next Steps**

- Choose reservations during time slots at the restaurant
- Create social media accounts
- Add dark mode
- Create chat for Contact section
- Replace json with database

---

## 🌐 **Preview**
   Comming soon
---

## 🔖 **License**

Magnolia Hotels is licensed under the [MIT license](https://opensource.org/licenses/MIT).

--- 
