const express = require('express')
const bp = require("body-parser")
const fs = require('fs');

const port = 5000;

const app = express()

//Middleware
app.use(bp.urlencoded({extended: false}))
app.use(bp.json())
app.use(express.static(__dirname + '/public'))

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.get("/notes", (req, res) => {
    res.sendFile(__dirname + '/public/notes.html')
})

app.post("/api/notes", (req, res) => {
    console.log("we posting bois")
    var person = JSON.stringify({
        "firstName": "John",
        "lastName": "Doe",
        "age": 50,
        "eyeColor": "blue"
      }, null, 2);

      console.log(req.body)
    
    fs.writeFileSync('db.json', JSON.stringify(req.body, null, 2), 'utf8');

})

app.get("/api/notes", (req, res) => {
    console.log("we getting bois")
})

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`)
})
