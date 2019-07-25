
'use strict';
const fs = require('fs');
const express = require('express');
const request = require('request-promise');
// const bodyParse = require('body-parser')

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
// app.use(bodyParse.json());
// app.use(bodyParse.urlencoded({ extended: true })) // handle URL-encoded data

// Starts the server and listens for requests
app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }

    console.log(`api running on port ${port}`);
});


/* GET home page. */
router.get('/', function(req, res) {
    let sites = {};
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

/* GET home page. */
router.get('/payments', function(req, res) {
    let payments = {};
    if (req.query.id) {
        getPaymentMethods(req.query.id)
            .then((response) => {
                payments = JSON.parse(response).sort((a,b) => {return (a.name < b.name)?-1:1});
                payments = payments.filter(v => v.payment_type_id === "ticket");
                res.json(payments);
            })
            .catch((err) => {
                res.send(err);
            });
    } else {
        res.send("SiteId requerido")
    }

});

/* POST agencies listing. */
router.get('/agencies', function(req, res) {
    let id = req.query.id;
    let payment_method = req.query.payment_method;
    let lat = req.query.lat;
    let lon = req.query.lon;
    let radius = req.query.radius;
    let order = req.query.order;
    let limit = req.query.limit;
    let offset = req.query.offset;
    if (id){
        searchAgencies(id, payment_method, lat, lon, radius, limit, offset)
            .then((response) => {
                // console.log(response);
                res.json(orderResponse(response, order));
            })
            .catch((err) => {
                res.send(err);
            });
    } else {
        res.send("Debe ingresar todos los campos obligatorios para continuar");
    }
});

/* GET recommended agencies listing. */
router.get('/getRecAgencies', function(req, res) {
    res.send(getRecAgencies());
});

/* POST agencies listing. */
router.get('/recAgency', function(req, res) {

    let agency = req.query.agency;
    if (agency){
        res.send(insertAgency(agency));
    } else {
        res.send("Debe ingresar todos los campos obligatorios para continuar");
    }
});

/* DELETE agency listing. */
router.get('/deleteAgency', function(req, res) {
    let agency = req.query.agency;
    if (agency){
        res.send(deleteAgency(agency));
    } else {
        res.send("Debe ingresar todos los campos obligatorios para continuar");
    }
});

function getRecAgencies() {
    let agencies = [];
    if (fs.existsSync('message.txt')) {
        agencies = JSON.parse(fs.readFileSync('message.txt').toString());
    }
    return agencies;
}

function insertAgency(agency) {
    let agencies = [];
    if (fs.existsSync('message.txt')) {
        agencies = JSON.parse(fs.readFileSync('message.txt').toString());
        if (agencyIsRecommended(JSON.parse(agency), agencies)) {
            return {message: "La Agencia ya es una agencia recomendada"};
        } else {
            agencies.push(agency);
            fs.writeFileSync('message.txt', JSON.stringify(agencies), "utf8");
        }
    } else {
        fs.writeFileSync('message.txt', "[]", "utf8");
        agencies = JSON.parse(fs.readFileSync('message.txt').toString());
        agencies.push(agency);
        fs.writeFileSync('message.txt', JSON.stringify(agencies), "utf8");
    }
    return {message: "Agencia añadida."};
}
function deleteAgency(agency) {
    let agencies = [];
    if (fs.existsSync('message.txt')) {
        agencies = JSON.parse(fs.readFileSync('message.txt').toString());
        if (!agencyIsRecommended(JSON.parse(agency), agencies)) {
            return {message: "La Agencia no es una agencia recomendada"};
        } else {
            agencies = agencies.filter(a => JSON.parse(a).id !== JSON.parse(agency).id);
            fs.writeFileSync('message.txt', JSON.stringify(agencies), "utf8");
            return {message: "Agencia Eliminada"};
        }
    } else {
        return {message: "La Agencia no es una agencia recomendada"};
    }
}
function agencyIsRecommended(agency, agencies) {
    let arr = agencies.filter(a => JSON.parse(a).id=== agency.id);
    if (arr.length === 0) {
        return false;
    } else {
        return true;
    }


}
function orderResponse(response, order){
    response = JSON.parse(response);
    response = response.results;
    switch (order) {
        case "address_line":
            return response.sort((a,b) => {return (a.address.address_line < b.address.address_line)?-1:1});
        case "distance":
            return response.sort((a,b) => {return (a.distance - b.distance)?-1:1});
        case "agency_code":
            return response.sort((a,b) => {return (a.agency_code < b.agency_code)?-1:1});
        default:
            return response.sort((a,b) => {return (a.agency_code < b.agency_code)?-1:1});
    }
}

function searchAgencies(id, payment_method, lat, lon, radius, limit, offset){
    const options = {
        method: 'GET',
        uri: `https://api.mercadolibre.com/sites/${id}/payment_methods/${payment_method}/agencies?near_to=${lat},${lon},${radius}&limit=${limit}&offset=${offset}`
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

