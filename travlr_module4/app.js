const express = require('express');
const path = require('path');
const hbs = require('hbs');
require('./app_server/models/db');

const app = express();

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
