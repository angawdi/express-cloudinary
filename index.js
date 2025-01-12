require('dotenv').config();
var cloudinary = require('cloudinary');
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var multer = require('multer');
var app = express();
var upload = multer({ dest: './uploads/'});



app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/', upload.single('myFile'), function(req, res) {
	console.log('req.file.path:', req.file.path);
	cloudinary.uploader.upload(req.file.path, function(result){
		res.render('show_image', { url: result.secure_url });
	});
});

app.listen(3000);
