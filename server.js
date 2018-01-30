let express = require('express');
let fs = require('fs');
let bodyParser = require('body-parser');

let stringData = '';
let app = express();

app.get('/getNote', (req,res) => {
    console.log('Otrzymałem żądanie GET do /');
    fs.readFile('data.json', 'utf-8',(err, data)=>{
        if (!err) {
            stringData = data;
            res.send(stringData);
        } else {
            throw err;
        }
    })
});

app.post('/updateNote/:note', (req,res)=>{
    stringData = req.params.note;
    
    fs.appendFile('data.json', stringData, err=>{
        if (!err) {
            console.log('file updated');
            res.send(stringData);
        } else {
            throw err;
        }
    });
});


let server = app.listen(3000, ()=>{
    console.log('listen:: localhost:3000');
});

app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.status(404).send('Err404');
});