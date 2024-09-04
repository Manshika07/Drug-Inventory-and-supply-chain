require('dotenv').config();
const express = require('express')
const vendorRouter = require('./routes/vendor')
const authRouter = require('./routes/auth')
const inventoryRouter = require('./routes/inventory')
const userRouter = require('./routes/users.js')
const supplyRouter = require('./routes/supply.js')
const path = require('path');
const ejs = require('ejs')
const passport = require('passport')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const {initializingPassport} = require('./config/passportConfig.js')


const app = express();


// Database connection

mongoose.connect("mongodb://localhost:27017/Drug_Inventory")
.then(()=> console.log('Database connected'))
.catch(error => console.log(error))

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended : true}))


initializingPassport(passport);


app.use(expressSession({
    secret : "drugInventory",
    saveUninitialized : "false",
    resave : "false"
}))
app.use(passport.initialize());
app.use(passport.session());


app.use('/api/auth', authRouter)    // authentication route for login and signup
app.use('/api/drugs', inventoryRouter)      // for the drug inventory - to get the list of drugs and to add any drug to the inventory
app.use('/api/vendor', vendorRouter)
app.use('/api/supply-orders', supplyRouter)
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
    res.end("homepage");
})

app.listen(process.env.PORT, () => console.log(`server Started at port ${process.env.PORT}`))