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

    let currentObj = require('./db.json');

    //adding an id to the new object, the id's need to be sequential
    let dbLength = currentObj.length;
    req.body.id = dbLength + 1;

    currentObj.push(req.body);
    
    //entire db updated
    fs.writeFileSync('db.json', JSON.stringify(currentObj, null, 2), 'utf8');

    //updating the list on the front end
    fs.readFile('./db.json','utf8', function read(err, data) {
        res.json(JSON.parse(data));
    })

})

app.get("/api/notes", (req, res) => {
    //updating the list on the front end
    fs.readFile('./db.json','utf8', function read(err, data) {
        
        res.json(JSON.parse(data))
    })
})

app.delete("/api/notes/:id", (req, res) => {
    let idNum = parseInt(req.params.id);
    let currentObj = require('./db.json');
  
    if (currentObj.find(x => x.id === idNum) != undefined) {

        //Deleting the object
        var index = currentObj.map(x => {
            return x.id;
        }).indexOf(idNum);

        currentObj.splice(index, 1);
        

    }

    // renumbering the id's
    currentObj.forEach((currentObj, index) => currentObj.id = index + 1)

    //Writing to JSON file
    fs.writeFileSync('db.json', JSON.stringify(currentObj, null, 2), 'utf8');

    //updating the list on the front end
    fs.readFile('./db.json','utf8', function read(err, data) {
        res.json(JSON.parse(data));
    })
})

app.listen(port, () => {
    console.log(`Express server listening on port ${port}`)
})


