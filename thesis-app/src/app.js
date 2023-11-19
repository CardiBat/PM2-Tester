// modules
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const loader = require('./utils/fibonacci-series.js') 
const db = require('./utils/database.js') 
const infos = require('./utils/weather.js')
const tx2 = require('tx2')

// creating the app //
const app = express()

// paths for express setup
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// handlebars --> setup engine, views and partials
app.set('view engine' , 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// static directory to serve (which contains css, js client side, ...)
app.use(express.static(publicDirPath))

// Static weather content for PM2 testing
const weather = infos.weather

// Set
let maxLatency = 0;

// CUSTOM METRICS
// ----------------------------------------
var counter = tx2.counter({
    name : 'Requests-Counter'
})
// ----------------------------------------


// Graceful Start --> same as graceful stop in the end
// ----------------------------------------

// ----------------------------------------

// FROM HERE, EXPRESS.JS MANAGES THE INCOMING REQUESTS DESCRIMANTING WITH THE LINK

// Wrapper handlers of request of only pages (with href or a simple get)
// ----------------------------------------
// localhost:3000
app.get('', (req, res) => {
    // matching with 'index'.hbs in views
    res.render('index' , {
        title: 'Weather app', 
        name: 'Simoni F'
    })
})
// localhost:3000/about
app.get('/about', (req, res) => {
    res.render('about' , {
        title: 'About me:',
        message: 'ME!'
    })
})
// localhost:3000/help
app.get('/help', (req, res) => {
    res.render('help' , {
        title: 'Help', 
        message: 'helpful text'
    })
})
// ----------------------------------------






// Wrapper handlers for request with parameters --> CHANGE LOAD IN FIBONACCI F IF NECESSARY
// ----------------------------------------
app.get('/weather', (req, res) => {

    // incrementing number (metrics)
    counter.inc()

    // req received
    console.log(
        '[PID:'+process.pid+'] req received!\n' +
        'request: Weather' + '\n' + 
        'computing data ...'
    )

    // searching weather ? --> STATIC search for PM2 testing
    // **

        // random server computing power
        // var computingPower = Math.floor(Math.random() * (10 - 1 + 1)) + 1;

        // parsing
        if(req.query.cityToSearch === 'a'){
            // CPU-Intensive task --> Blocking the event loop
            let number = loader.calculateFibonacciValue(40);
        }
        else{
            // Normal task
            let number = loader.calculateFibonacciValue(5);
        }

        // success
        console.log(
            'Success!\n' +
            'City : ' + weather.location.name + '\n' +
            'Sending data to client ...'
        )

        // sending static data to client
        res.send(weather)

        // decrementing number (metrics) => waiting for ALL the response
        // res.on('finish', () => {
        //     counter.dev();
        // });

    // **

})
// ----------------------------------------




// ERRORS --> Wrapper handlers for bad request of pages
// ----------------------------------------
// error accessing bad public folder files (SPECIFIC)
app.get('/help/*', (req,res) =>{
    res.render('error' , {
        title: '404',
        name: 'Simoni F',
        errorMessage: 'Article not found'
    })
})

// error accessing bad public folder files (GENERIC)
app.get('*', (req,res) =>{
    res.render('error' , {
        title: '404',
        name: 'Simoni F',
        errorMessage: 'Page not found'
    })
})
// ----------------------------------------

// Graceful Stop
// ----------------------------------------
process.on('SIGINT', function() {
    db.stop().then(()=>{
        console.log('Terminating the app ...')
        process.exit(0)
    })
})
// ----------------------------------------

// starting the server --> default is 80 for web server
app.listen(3000, (req,res) => {
    console.log('Server is up on port 3000')
})