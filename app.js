const express = require('express');
const bodyParser = require('body-parser');
const snmpAPI = require('./api.js')

const app = express();
const port = 3000;

const jsonParser = bodyParser.json();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/api', jsonParser, (req, res) => {
    const { action, host, port, community, oids, type, value } = req.body;
    console.log(`/api ${action} ${host}:${port} ${community} ${oids} ${value ? value : "-"} ${type ? type : "-"}`);
    switch (action) {
        case "GET":
            snmpAPI.get(host, port, community, oids).then(
                (result) => {
                    res.send(result);
                },
                (error) => {
                    res.send(error)
                } 
            );
            break;
        case "GETNEXT":
            snmpAPI.getNext(host, port, community, oids).then(
                (result) => {
                    res.send(result);
                },
                (error) => {
                    res.send(error)
                } 
            );
            break;
        case "SNMPWALK":
            snmpAPI.getSubtree(host, port, community, oids).then(
                (result) => {
                    res.send(result);
                },
                (error) => {
                    res.send(error)
                } 
            );
            break;
        case "GETALL":
            snmpAPI.getAll(host, port, community, oids).then(
                (result) => {
                    res.send(result);
                },
                (error) => {
                    res.send(error)
                } 
            );
            break;
        case "SET":
            snmpAPI.set(host, port, community, oids, type, value).then(
                (result) => {
                    res.send(result);
                },
                (error) => {
                    res.send(error)
                } 
            );
            break;
        default:
            res.send("Default branch");
            break;
    }
});


app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})