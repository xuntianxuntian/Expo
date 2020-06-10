const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')

// process.env  setting configure
require('dotenv').config()
const port = process.env.PORT || 5000
const db_name = process.env.DB_NAME || 'expo'

//  MongDB Connecting 
mongoose.set('useFindAndModify', false)
mongoose.connect(`mongodb://localhost:27017/${db_name}`)
const db = mongoose.connection
mongoose.set('useCreateIndex', true)
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',()=>console.log('MongoDB connected successfully'));



const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


//passport设置
require('./config/passport')(passport)
app.use(passport.initialize())
app.use(passport.session())



//  Router require
console.log('Into Routes!')
const userRouter =require('./routes/api/user/user.route')
const loginRouter = require('./routes/api/login.route')
const registerRouter = require('./routes/api/register.route')
const uploadRouter = require('./routes/api/uploads.route')
const expoRouter = require('./routes/api/expo.route')
const boothRouter = require('./routes/api/booth.route')


//  Use Routes
app.use('/login',loginRouter)
app.use('/register',registerRouter)
app.use('/user',userRouter)
app.use('/uploads',uploadRouter)
app.use('/expo',expoRouter)
app.use('/booth',boothRouter)

const path =` ${__dirname}/client`

app.listen(port,()=>console.log(`Server is running on port ${port},dir:${path}`))

