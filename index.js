const express = require('express');
const path = require('path');

const fs = require('fs');
const port = 4444;

const app = express();


app.get("/", (req, res) =>{
    res.sendFile( path.join(__dirname, "./view/index.html"));
})


app.get("/style.css", (req, res) =>{
    res.sendFile( path.join(__dirname, "./view/style.css"));
})       

app.get("/gyrosok", (req, res) =>{
    res.sendFile( path.join(__dirname, "./data/gyros.json"));
})         
        
app.get("/gyros.js", (req, res) =>{
    res.sendFile( path.join(__dirname, "./public/gyros.js"));
}) 
       
app.post("/gyrosok", (req, res) =>{
    let adatom = '';
    req.on('data', (chunk) => {
        adatom += chunk.toString();
    });
    req.on('end', () => {
        const ujGyros = JSON.parse(adatom);



        fs.readFile('./data/gyrosok.json', (err, data) => {
            let adatok = JSON.parse(data);
            adatok.push({
                "nev": ujGyros.nev,
                "telefonszam": ujGyros.telefonszam,
                "cim": ujGyros.cim,
                "fajta": ujGyros.adag,
                "meret": ujGyros.tipus,
                "liszt": ujGyros.martas,
            });
            fs.writeFile('./data/gyrosok.json', JSON.stringify(adatok), () => {
                res.end(JSON.stringify(adatok));
            })
        })
    })
})

       
            

app.get("/", (req, res) => {
    res.redirect("/");
})           

app.listen(port);


