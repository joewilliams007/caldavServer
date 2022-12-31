var url = "http://stardash.de:5232/joe/4e566d71-06bb-9559-994e-3e48cc19e97c/"
var username = "joe"
var password = "johannw2004"

const express = require('express');
const Scrapegoat = require("scrapegoat");
const moment = require("moment");

const app = express()
const PORT = 9898;
app.use(express.json())

app.listen(
    PORT,
    () => console.log("Its alive on http://localhost:" + PORT + "")
)

app.get("/next_event", (req, res) => {

    getnext(function (event) {
        res.status(200).send({
            event
        })
    })
})

config = {
    auth: {
        user: username,
        pass: password
    },
    // example using baikal as CalDAV server
    uri: url
};



const scrapegoat = new Scrapegoat(config);

// getname()

async function getname() {
    var name = await scrapegoat.getCtag();

    scrapegoat.getAllEvents().then(function (res) {
       
            var position = 0
            var text
            for (const item of res.values()) {
                text += "\n"+item.data.title
                position++
            }
            
            console.log(name.name+" You have "+position+" events.\n"+text.replace("undefined",""))
    
    });
}

// getnext()

async function getnext(callback) {
    var name = await scrapegoat.getCtag();
   

    const start = moment()
    .format("YYYYMMDD[T]HHmmss[Z]");
 
    const end = "20251231T152236Z"
        console.log (start+"\n"+end)
    scrapegoat.getEventsByTime(start, end).then(function (res) {
  
        console.log(res[0])
        return callback(res[0])

    });
}


