require("dotenv").config();
require("./db/connect");
const express = require("express")
const app = express()
const users = require("./routes/users")
const devices = require("./routes/devices")
const alerts = require("./routes/alerts")


const { errorHandler } = require("./middlewares/error")
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use("/api/users", users)
app.use("/api/devices", devices)
app.use("/api/alerts", alerts)

app.use(errorHandler)
app.get("/", (req, res) => {
    res.send('<h1> Varma Track</h1>')
})
app.listen(PORT, () => console.log(`running on port ${PORT}`))