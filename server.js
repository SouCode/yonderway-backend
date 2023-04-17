const express = require("express"); // Import the Express.js framework
const app = express(); // Create an instance of the Express application
const cors = require("cors"); // Import the CORS middleware
const database = require("./utils/database"); // Import the database module
const bcrypt = require("bcrypt");
const session = require('express-session');
const mongoose = require('mongoose');
const restaurantRoutes = require("./routes/restaurants"); // Import the routes for the restaurant endpoint
const attractionsRouter = require('./routes/attractions'); // Import the routes for the attractions endpoint
const destinationsRouter = require('./routes/destinations'); // Import the routes for the destinations endpoint
const hotelRoutes = require('./routes/hotels'); // Import the routes for the hotels endpoint
const usersRouter = require('./routes/users');
const User = require('./models/users')

require("dotenv").config();

database.connect();


// ADD SESSION KEY TO .ENV FILE (ON TRELLO)
const SESSION_SECRET = process.env.SESSION_SECRET
console.log(SESSION_SECRET); // should see session key in console if working 
app.use(session({
    secret: SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false 
}));


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/restaurant", restaurantRoutes);
app.use("/attractions", attractionsRoutes);
app.use('/destinations', destinationsRouter);
app.use('/hotel', hotelRoutes); // Use the hotels routes for the /hotel endpoint
app.use('/api/destinations', destinationsRouter);


const userRoutes = require('./routes/users')
app.use('/register', userRoutes);


app.use((req, res) => {
	res.status(404).json({message: "NOT A PROPER ROUTE"})
})


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
