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

    let currentObj = require('./db.json');

    let dbLength = currentObj.length;
    req.body.id = dbLength + 1;

    currentObj.push(req.body);
    

    
    fs.writeFileSync('db.json', JSON.stringify(currentObj, null, 2), 'utf8');

    //updating the list
    fs.readFile('./db.json','utf8', function read(err, data) {
        res.json(JSON.parse(data));
    })

})

app.get("/api/notes", (req, res) => {
    console.log("we getting bois")
    fs.readFile('./db.json','utf8', function read(err, data) {
        
        res.json(JSON.parse(data))
    })
})

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`)
})


