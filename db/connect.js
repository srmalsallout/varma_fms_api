const mongoose = require("mongoose")

mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('DataBase Connected successfully'))
    .catch(e => console.log(`Error During DataBase Connection ${e.message}`))