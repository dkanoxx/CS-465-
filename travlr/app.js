const express = require('express');
const path = require('path');
const hbs = require('hbs');
require('./app_server/models/db');

const app = express();

// Allow Angular admin app running on localhost:4200 to call the API on localhost:3000.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }

    next();
});

app.use(express.json());

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app_server/views'));

// Serve the existing css and images folders from the project root.
app.use(express.static(path.join(__dirname)));

const routes = require('./app_server/routes/index');
const apiRoutes = require('./app_api/routes/index');

app.use('/', routes);
app.use('/api', apiRoutes);

const port = 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
