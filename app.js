require("dotenv").config();
require("./db/connect");
const express = require("express")
const app = express()
const users = require("./routes/user")
const { errorHandler } = require("./middlewares/error")

app.use(express.json())
app.use("/users", users)
app.use(errorHandler)
app.get("/", (req, res) => {
    res.send('<h1>Varma Track</h1>')
})
app.listen(8888)
// const model = require("./models/device")
// model.create({
//     VehicleID: 123,
//     Name: 'Veh',
//     PlateNumber: 'PN',
//     FuelType: 'بنزين 95',
//     SpeedLimit: 20
// }).then(d => console.log(d)).catch(e => console.log(e.message))

// model.create({
//     UserName: 'Mostafa',
//     Password: 'pass12312',
//     PhoneNumber: '01121299686',
//     Address: 'Ma3aaaaaaaaadi',
//     Email: "mo@example.com",
//     Role: "user"
// }).then(d => console.log(d)).catch(e => console.log(e.message))

// model.create({
//     IdentityNumber: '123inh64',
//     LicenceNumber: '2312',
//     ParentID: '6397201badb488a68cdf1d01',
//     VehicleID: '6396ef808ab814e1bfdc88ca'
// }).then(d => console.log(d)).catch(e => console.log(e.message))

// model.create({
//     DeviceName: 'first Device',
//     SerialNumber: '123456'
// }).then(d => console.log(d)).catch(e => console.log(e.message))
