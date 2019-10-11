const express = require('express');
const app = express();
const PORT = 7777;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// CRUD operations on contacts,and their associated Marketing preferences,
// EMAIL and Marketing preferences fields are mandatory and need to be validated  when a request is made

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const routes = require('./api/routes'); //importing route
routes(app); //register the route


app.listen(PORT);



console.log(`FT Rest API server runs on port ${PORT}`);