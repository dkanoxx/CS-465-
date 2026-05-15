const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'app_server/views'));

app.use(express.static(path.join(__dirname, 'public')));

const routes = require('./app_server/routes/index');
app.use('/', routes);

const port = 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});