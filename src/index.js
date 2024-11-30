const express = require('express');
const app = express();
const route = require('./routes');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const templatesEngine = require('./utils/handlebars');
const path = require('path');
const db = require('./config/db');
const PORT = process.env.PORT || 3000;

app.use(morgan('combined'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.disable('x-powered-by');
app.use(cookieParser());
templatesEngine(app);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

route(app);

db.connect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
