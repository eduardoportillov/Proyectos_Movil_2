const express = require("express");
const logger = require('morgan');
let Router = require('./Routes');
let cors = require('cors');
const app = express();

//server config
app.use(express.json());
app.use(logger('dev'));
app.use(cors());

//routes
app.use(require('./Routes'));

//Http Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}/`);
});