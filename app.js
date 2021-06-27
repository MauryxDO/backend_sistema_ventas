var express = require ('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = process.env.PORT || 4201;

var app = express();

//importar las rutas


//configurar conexión a mongodb
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/sistema',{useUnifiedTopology: true, useNewUrlParser: true},(err, res)=>{
    if(err){
        throw err;
    }
    else{
        console.log("Corriendo servidor");
        app.listen(port, function(){
            console.log("servidor conectado en " + port);
        });
    }
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api',user_routes)



module.exports = app;