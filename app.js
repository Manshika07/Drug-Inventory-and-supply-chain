require('dotenv').config();
const express = require('express');
const path = require('path'); 
const passport = require('passport');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const { initializingPassport } = require('./config/passportConfig.js');
const http = require("http");          // For creating the HTTP server
const socketio = require("socket.io");  // For Socket.io integration

// Import routers
const vendorRouter = require('./routes/vendor');
const authRouter = require('./routes/auth');
const inventoryRouter = require('./routes/inventory');
const userRouter = require('./routes/users');
const supplyRouter = require('./routes/supply');
const express = require('express')
const vendorRouter = require('./routes/vendor.js')
const authRouter = require('./routes/auth')
const inventoryRouter = require('./routes/inventory')
const userRouter = require('./routes/users.js')
const supplyRouter = require('./routes/orders.js')
const path = require('path');
const ejs = require('ejs')
const passport = require('passport')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const {initializingPassport} = require('./config/passportConfig.js')
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

// Routes
app.use('/api/auth', authRouter);        // Authentication route for login and signup
app.use('/api/drugs', inventoryRouter);  // Drug inventory routes
app.use('/api/vendor', vendorRouter);    // Vendor management routes
app.use('/api/supply-orders', supplyRouter);  // Supply orders routes
app.use('/api/user', userRouter);        // User management routes

// Homepage route

app.use('/api/auth', authRouter)    // authentication route for login and signup
app.use('/api/drugs', restrictTo(["staff"]), inventoryRouter)      // for the drug inventory - to get the list of drugs and to add any drug to the inventory
app.use('/api/vendor', vendorRouter)
app.use('/api/orders', supplyRouter)
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
    res.end("homepage");
});
//route for tracking 
app.get('/track',(req,res)=>{
    res.render("index")
})

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

// Start the server
server.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on http://localhost:${process.env.PORT || 3000}`);
});

    res.render('homepage', {user : req.user});
})

app.get('/about', (req, res) => {
    res.render('about', {user : req.user});
})

app.listen(process.env.PORT, () => console.log(`server Started at port ${process.env.PORT}`))