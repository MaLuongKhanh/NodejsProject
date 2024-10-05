const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const route = require('./route');
const { engine } = require('express-handlebars');
const path = require('node:path');

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
