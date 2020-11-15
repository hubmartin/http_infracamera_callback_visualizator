var app = require('express')();
var bodyParser = require('body-parser')
var http = require('http').createServer(app);
var io = require('socket.io')(http);

/*
curl -X POST -H "Content-Type: application/json" --data @payload.json localhost:3010/post
*/

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
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
    res.sendStatus(200);
});

http.listen(3010, () => {
  console.log('listening on *:3010');
});