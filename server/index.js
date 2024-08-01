const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const itemsRoutes=require('./routes/items')
const usersRoutes=require("./routes/users")
const cartRoutes=require("./routes/cart")
require('dotenv').config()

const port=process.env.PORT || 4000;


app.use(cors())
app.use(express.json())

app.use('/api/items',itemsRoutes)
app.use('/api/users',usersRoutes)
app.use('/api/cart',cartRoutes)

app.listen(port,()=>console.log(`Server running on port ${port}`))


mongoose.connect(process.env.MONGO_URL).then(()=>console.log('MongoDb connected')).catch(err=>console.log(err))
