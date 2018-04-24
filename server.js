var express = require('express');
var path = require('path');
var app = express();

//<!--To include json-->

var json = require('express-json');

var bodyParser = require('body-parser');
//<--To Display static html page -->
//app.use(express.static(path.join(__dirname, 'public')));
//app.use(json());
//<!--To Display json object -->
//app.use method accepts any http request
// app.use(function (req, res) {
//   console.log('Request Type:', req.method);
//   res.json({
//       helloWorld: 'Hello World!'
//   });
// });

//<!--Query parameteer value fetching-->
// app.use(function (req, res) {
  //pareInt is to convert the value to pareInt
  //req.param(key passed in url) will fetch value from url
   // var value1 = parseInt(req.param('a'));
   // var value2 = parseInt(req.param('b'));
   //res.json method to return json object
//   res.json({
//       value: value1+value2
//   });
// });

//<!-- Mongodb to store url values [query paramaters]-->
// const MongoClient = require('mongodb').MongoClient
//
// app.use(function (req, res) {
// //<!--To write into collection into mlab db-->
// var value1 = req.param('a');
//  var value2 = req.param('b');
//
//    var myobj = { name: value1, address: value2 };
//   db.collection('info').save(myobj, (err, result) => {
//    if (err) return console.log(err)
//
//   console.log('saved to database')
//    })
//   //<!--end of writing collection-->
//   //<!--To read the collection from mlab-->
//   db.collection('info').find().toArray(function(err, result) {
//   //console.log(results)
//   res.json({
// result
//     });
//   //<!--end of read>
//   // send HTML file populated with quotes here
// })
//
// })
//<!--end of uery paramaters-->

//<!--Simple web app to store value from forms-->
//
// var router = express.Router();
//
//
// router.get('/mcqFetching', function(req, res, next) {
// 	 db.collection('mcq').find().toArray(function(err, result) {
// 	 console.log(result);
// 	res.send(result);
// });
// });
// // export your router
// module.exports = router;
app.get('/mcqFetching', function(req, res){
console.log("success");
db.collection('mcq').find().toArray(function(err, result) {
console.log(result)
res.send(result);
})
});

app.use(express.static(path.join(__dirname, 'www')));


const MongoClient = require('mongodb').MongoClient
//app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.post('/registration', function(req, res){
	var obj = {};
	console.log('body: ' + JSON.stringify(req.body));


  var str2json = require('string-to-json');

    //  var output = str2json.convert({"abc.def.g":2});


    var myobj = str2json.convert(req.body);
    console.log('obj'+myobj);
//{ name: value1, address: value2 };
    db.collection('registration').save(myobj, (err, result) => {
   if (err) return console.log(err)

 console.log('saved to database')
    })
    db.collection('registration').find().toArray(function(err, result) {
  res.send(result);
})
});



var db
  var port = process.env.PORT || 4000;

MongoClient.connect('mongodb://root:root@ds121945.mlab.com:21945/mcqapp', (err, client) => {
  if (err) return console.log(err)
  db = client.db('mcqapp') // whatever your database name is

  app.listen(port, "0.0.0.0", function() {
  console.log("Listening on Port" +port);

  });
})
