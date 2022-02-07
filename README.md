# Event-Mapper
A MERN stack project
![site-image](http://res.cloudinary.com/prashantpks/image/upload/v1643569999/eventMapperImages/ln1rhdyvmubjevzwwnrq.png)

## Introduction

Event-Mapper is a map-based MERN stack web application. It displays all the events happening around the world through GPS map which are added by its users. It uses **Mapbox** react package **react-map-gl** for map layers and styles.

## Key Features
* On map **Geocoder** to navigate directly to any place.
* Show events on map with **popup** and add events very easily with double click on map layer.
* **Filter events** between a particular date range.
* **Multiple user** registration.
* **Update or delete** the events created by you.
* **Responsive Design** with dark mode.

## Technologies Used
This project was created using the following technologies.

**Client**

* Create-react-app (For ReactJS)
* React-map-gl (For map body and styling)
* React-map-gl-geocoder (For on map Geocoder)
* React-datepicker (For selecting range of dates)
* React-router-dom (To handle routing)
* Cloudinary (To host event images on cloud)
* Bootstrap 

**Server**

* Express
* Mongoose
* JWT
* Bcryptjs

**Database**

MongoDB (MongoDB Atlas)

## Configuration and Setup

In order to run this project locally, simply fork and clone the repository or download as zip and unzip on your machine.

* Open this folder in your Code Editor
* Open the terminal and split it into two for client and server.

**In First Terminal**


```bash
$ cd client
$ npm install (to install client-side dependencies)
$ npm start (to start the client)
```
Inside **client folder** in your root directory, add **.env.local** file and write the below code.
```bash
REACT_APP_MAPBOX_TOKEN=
REACT_APP_API_URL=http://localhost:4000
```
* For mapbox token, visit [Mapbox](www.mapbox.com) and create your account to get auth token.

**In Second Terminal**

```bash
$ cd server
$ npm install (to install server-side dependencies)
$ npm start (to start the server)
```
Inside **server folder** in your root directory, add **.env** file and write the below code.

```
PORT=4000
DATABASE_URL=
CORS_ORIGIN=http://localhost:3000
JWT_SECRET_KEY=
NODE_ENV=development
```
## Demo Video
<img src = "./demo1.gif" alt = "demo">


## Comments

This project is created as a practice to showcase my skills. However this is my first MERN project, I intend to add more features further. Please give it a star and suggest improvements.

## Author
* LinkedIn: [@Prashant Kumar](https://www.linkedin.com/in/prashant-kumar-7aa9a4203/)
* Email: [@prashant](mailto:prashantrkt2002@gmail.com)
* Github: [@prashantpks](https://github.com/prashantpks/)
