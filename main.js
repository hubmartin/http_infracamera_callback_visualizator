var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

/*
curl -X POST -H "Content-Type: application/json" --data @payload1.json localhost:3010/post
pm2 start main.js --name infra_http --watch
*/

var lastMsg = null;

app.use(bodyParser.json());
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('a user connected');
    
    // Send last data
    if (lastMsg !== null)
    {
      console.log("We have lastMsg, send it");
      io.emit("infrared", lastMsg);
    }

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });

    app.get('/callback', (req, res) => {
        io.emit('infrared', {"json": true});
        res.send('OK');
        });
    
  });

app.post('/post', (req, res) => {
    console.log('Got body:', req.body);
    io.emit('infrared', req.body);
    lastMsg = req.body;
    res.sendStatus(200);
});

http.listen(port, () => {
  console.log('listening on *:' + port);
});