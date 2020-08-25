const express = require('express');
const app = express();

// app.use((req, res, next) =>{
//     req.ty
//     res.status(200).json({
//         message: 'Hello World!'
//     })
// });


// app.get('/api/users', function(req, res) {
//     var user_id = req.p    //params('id');
//     var token = req.params('token');
//     var geo = req.params('geo');  
  
//     res.send(user_id + ' ' + token + ' ' + geo);
//   });


// multer stuff
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});
var upload = multer({storage: storage});


app.post('/api/upload',upload.single('file'),function(req, res, next) {
    console.log(req.file);
    if(!req.file) {
      res.status(500);
      //return next(err);
    }
    res.json({ fileUrl: 'http://localhost:3000/public/images/' + req.file.filename });
})

app.get('/public/images/:filename', function(req, res, next) {
    var options = {
        root: 'public/images',
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
        }
      }

    console.log('./public/images/' + req.params.filename);
    res.sendFile(req.params.filename, options)
    
    // res.status(200).json({
    //     message: 'Hello World!'
    // })
});




// app.get('/api/test', function(req, res, next) {
//     res.status(200).json({
//         message: 'Hello World!'
//     })
// });

// app.post('/api/test', function(req, res, next) {
//     res.status(200).json({
//         message: 'hey mr postman!'
//     })
// });







module.exports = app;

//curl -k -X POST -F 'file=@/home/anon/Pictures/tswift.jpg'  localhost:3000/api/upload