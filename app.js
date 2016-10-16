/**
 * Created by Ivan on 10/10/2016.
 */
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));


app.get('*', function(request, response) {
    response.sendfile('./public/views/index.html');
});

app.listen(8080);