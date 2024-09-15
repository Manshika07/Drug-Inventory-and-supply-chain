require('dotenv').config();
const express = require('express');
const path = require('path'); 
const passport = require('passport');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const { initializingPassport } = require('./config/passportConfig.js');
const http = require("http");          // For creating the HTTP server
const socketio = require("socket.io");  // For Socket.io integration
const staticRouter = require('./routes/static');
const supplyRouter = require('./routes/orders.js')
const inventoryRouter = require('./routes/inventory.js')
const authRouter = require('./routes/auth.js')
const userRouter = require('./routes/users.js')

const restrictTo = require('./config/authorize.js')


const app = express();
const server = http.createServer(app);  // Create the HTTP server
const io = socketio(server);            // Initialize Socket.io

// Database connection
mongoose.connect("mongodb://localhost:27017/Drug_Inventory")
    .then(() => console.log('Database connected'))
    .catch(error => console.log(error));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session management
app.use(expressSession({
    secret: "drugInventory",
    saveUninitialized: false,
    resave: false
}));

// Passport configuration
initializingPassport(passport);
app.use(passport.initialize());
app.use(passport.session());

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/api/auth', authRouter)    // authentication route for login and signup
app.use('/api/drugs', restrictTo(["Staff"]), inventoryRouter)      // for the drug inventory - to get the list of drugs and to add any drug to the inventory
app.use('/api/orders', supplyRouter)
app.use('/api/user', userRouter)
app.use('/', staticRouter)

//route for tracking 

// Socket.io setup(logic of traking starts here)
io.on("connection", function(socket) {
    console.log(`New user connected: ${socket.id}`);

    socket.on("send-location", function(data) {
        // Broadcast the location to all clients
        io.emit("receive-location", { id: socket.id, ...data });
    });

    socket.on("disconnect", function() {
        console.log(`User disconnected: ${socket.id}`);
        io.emit("user-disconnected", socket.id);
    });
});//logic of traking ends here



server.listen(process.env.PORT, () => console.log(`server Started at port ${process.env.PORT}`))