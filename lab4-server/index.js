require('dotenv').config()
const express = require('express') 
const seq = require('./db.js')
const models = require('./models/models')
const cors = require('cors')
const passport = require('./controllers/googlePassport')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')


const PORT = 5000;



const app = express();
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
app.use(passport.initialize());

const start = async () => {
    try{
        await seq.authenticate()
        await seq.sync();
        app.listen(PORT, () => console.log("Server was started =)"));
    }
    catch(e)
    {
        console.log(e)
    }
}


start()
