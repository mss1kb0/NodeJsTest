﻿const express = require('express');
var app = express();

app.get('/', (req, res) => {
    res.send('Welcome to Express!');
});

app.listen(process.env.PORT || 3000);