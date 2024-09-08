const express = require("express")
const userRouter = require('./routes/User')
const postRouter = require('./routes/Post')
const {connectDb} = require('./dbConnection')
const cors = require('cors');





const app = express()
const PORT = 8000
app.use(express.json())
app.use(cors());



// monogo connect 

connectDb( 'mongodb://127.0.0.1:27017/MERN')
.then(() => console.log('Connect DB'))
.catch((err) => console.log(err))




// Routes

app.use('/user', userRouter)
app.use('/post', postRouter)










app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})