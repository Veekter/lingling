var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var multer = require('multer');
var upload = multer();


//my routes
var index = require('./routes/index');
var todos = require('./routes/todos');

var app = express();
var port = process.env.PORT || 3000;

//my middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(upload.array());
app.use(express.static(path.join(__dirname + '/client')));


//setting the view engine
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, './views'));
app.engine('html', require('ejs').renderFile);

//routes
app.use('/', index);
app.use('/todos', todos);


// start the server
app.listen(port, function(){
  console.log('Server running on port: ' + port);
});
