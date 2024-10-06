const express = require('express');
const app = express();
const route = require('./route');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const path = require('path');
const db = require('./config/db');
const PORT = process.env.PORT || 3000;

db.connect();

app.use(morgan('combined'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        helpers: {
            sum(a) {
                console.log(a);
                return 1;
            },
        },
    }),
);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

route(app);

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});
