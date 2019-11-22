const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const favicon        = require('serve-favicon');
const morgan         = require('morgan');

const config      = require('./config');
const app            = express();

const port = 8000;

app.use(favicon('./app/public/images/paw_favicon.png'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));                                // request console-logger
app.use(express.static('./app/public'));                           // run static file server

MongoClient.connect(config.mongodb.uri, (err, client) => { // start mongo on config.mongodb.uri
    if (err) return console.log(err);
    const db = client.db(config.mongodb.name);
    require('./routes/routes_entry')(app, db);

    app.listen(port, () => {
        console.log('We are live on localhost:' + port);
    });

    // database.close();
});
