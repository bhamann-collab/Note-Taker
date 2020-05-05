const express = require('express')
const bp = require("body-parser")

const port = 5000;

const app = express()

//Middleware
app.use(bp.urlencoded({extended: false}))
app.use(bp.json())

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`)
})
