
'use strict';

const express = require('express');
const request = require('request-promise');

const app = express();
const router = express.Router();

const port = 3001;

// Allowing CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});


// Use router configuration when call /api
app.use('/api', router);

// Starts the server and listens for requests
app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }

    console.log(`api running on port ${port}`);
});


/* GET home page. */
router.get('/', function(req, res) {
    let sites = {}
    getSites()
        .then((response) => {
            // console.log(JSON.parse(response).sort((a,b) => {return (a.name < b.name)?-1:1}));
            sites = JSON.parse(response).sort((a,b) => {return (a.name < b.name)?-1:1});

            res.json(sites);
        })
        .catch((err) => {
            res.send(err);
        });
});


/* POST agencies listing. */
router.post('/agencies', function(req, res) {
    if (req.body.id && req.body.payment && req.body.lat && req.body.lon && req.body.radius){
        let id = req.body.id
        let payment_method = req.body.payment
        let lat = req.body.lat
        let lon = req.body.lon
        let radius = req.body.radius
        let order = req.body.order

        searchAgencies(id, payment_method, lat, lon, radius)
            .then((response) => {
                res.json(orderResponse(response, order));
            })
            .catch((err) => {
                res.send(err);
            });
    } else {
        res.send("Debe ingresar todos los campos obligatorios para continuar");
    }
});
function orderResponse(response, order){
    response = JSON.parse(response);
    switch (order) {
        case "address_line":
            return response.sort((a, b) => b.address_line - a.address_line);
        case "distance":
            return response.sort((a, b) => b.distance - a.distance);
        case "agency_code":
            return response.sort((a, b) => b.agency_code - a.agency_code);
        default:
            return response.sort((a, b) => b.address_line - a.address_line);
    }
}

function searchAgencies(id, payment_method, lat, lon, radius){
    const options = {
        method: 'GET',
        uri: `https://api.mercadolibre.com/sites/${id}/payment_methods/${payment_method}/agencies`,
        qs: {
            near_to: lat, long, radius
        }
    };
    return request(options);
}

function getSites(){
    const options = {
        method: 'GET',
        uri: "https://api.mercadolibre.com/sites"
    };
    return request(options);
}

function getPaymentMethods(id) {
    const options = {
        method: 'GET',
        uri: `https://api.mercadolibre.com/sites/${id}/payment_methods`,
    };
    return request(options);
}

