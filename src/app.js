const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        'title': 'Weather',
        'name': 'Thang Nguyen'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        'title': 'About',
        'name': 'Thang Nguyen'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        'title': 'Help',
        'message': 'This is some helpful text!',
        'name': 'Thang Nguyen'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            'error': 'Please provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location, address} = {}) => {
        if (error)
            return res.send({error})

        forecast(latitude, longitude, address, (error, forecastData) => {
            if (error)
                return res.send({error})

            res.send({
                location,
                address: req.query.address,
                forecastData
            })
        });
    });

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        'title': '404',
        'message': 'Help article not found!',
        'name': 'Thang Nguyen'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        'title': '404',
        'message': 'Page not found.',
        'name': 'Thang Nguyen'
    })
})

app.listen(port, () => {
    console.log("Server is up on port " + port + ".")
})