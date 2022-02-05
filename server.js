// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get('/api/', (req, res) =>{
  let dateRes = new Date();
  res.json({'unix': dateRes.getTime(), 'utc': dateRes.toUTCString()});
})

app.get('/api/:date_string', (req, res) => {
  const date_string = req.params.date_string
  const unix = Date.parse(date_string)
  let data
  if (isNaN(unix)){
    if (/^\d+$/.test(date_string)){
      const dateNumber = new Number(date_string);
      data = {'unix': new Date(dateNumber).getTime(), 'utc': new Date(dateNumber).toUTCString()}
    }else{
      data = {'error': 'Invalid Date'}
    }
  }else{
    data = {'unix': unix, 'utc': new Date(unix).toUTCString()}
  }
  return res.json(data)
})
