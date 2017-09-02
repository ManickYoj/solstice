// Load environment variables
require('dotenv').load();

const config = require('./config')

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const knex = require('knex')(config.database);
const bookshelf = require('bookshelf')(knex);

const PORT = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(PORT, function(){
  console.log(`listening on *:${PORT}`);
});