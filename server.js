const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const PORT = process.env.PORT || 5000;


var app = express();
hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    
    console.log(log);
    
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    });

    next();
});


app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));



hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});


hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


hbs.registerHelper('getCurrent');


app.get('/', (req, res) => {
    res.send('<h1>Hello express!</h1>');
});


app.get('/bad', (req, res) => {
    res.send('About Page');
});


app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        welcomeMessage: 'heeeeej'
    });
});


app.listen(PORT, () => {
    console.log('Server is up on port: ' + PORT);
});