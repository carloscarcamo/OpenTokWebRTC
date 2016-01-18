var events = require('events');
var eventEmitter = new events.EventEmitter();
var _ = require('lodash');
var actors = require('simple-actors');
var bus = new actors.LocalMessageBus();
var users = {};
var numUsers = 0;

var socket = function(io, roomId, res) {
  var io = io.of(roomId);
  var addedUser = false;
  io.removeAllListeners();
  io.on('connection', function(socket) {
    socket.removeAllListeners();
    console.log('a user connected to room:', roomId);
    if (numUsers == 2) {
      socket.emit('full room', 'This room is full!');
    }

    // when the client emits 'new message', this listens and executes
    socket.once('new message', function (data) {
      var actor1 = users[socket.username];
      var actor2 = _.filter(users, function (o) { return !(o[socket.username]==actor1); })[0];

      // send a message to actor
      actor1.send(actor2.id, data.message);

      socket.broadcast.emit('message', {
        username: socket.username,
        message: data.message
      });
    });

    // when the client emits 'add user', this listens and executes
    socket.on('add user', function (username) {
      if (addedUser || numUsers == 2) return;

      // we store the username in the socket session for this client
      socket.username = username;

      // create an actor with id equals to opentok token
      users[username] = new actors.Actor(username);
      users[username].connect(bus);

      ++numUsers;

      if (numUsers == 2) {
        eventEmitter.removeListener('actors_messages', actorsMessages);
        eventEmitter.emit('actors_messages', users, socket); // register actors events
      }

      addedUser = true;
      socket.emit('login', {
        numUsers: numUsers
      });
      // echo globally (all clients) that a person has connected
      socket.broadcast.emit('user joined', {
        username: socket.username,
        numUsers: numUsers
      });
    });

    // when the user disconnects..
    socket.on('disconnect', function () {
      console.log('user disconnected from room:', roomId);
      delete users[socket.username];
      if (addedUser) {
        --numUsers;

        // echo globally that this client has left
        socket.broadcast.emit('user left', {
          //username: socket.username,
          numUsers: numUsers
        });
      }
    });
  });

  // actors messages
  eventEmitter.once('actors_messages', actorsMessages);
};

/****************************************
 *                                      *
 *   implementing Actor pattern here    *
 *                                      *
 ****************************************/
var actorsMessages = function (actors, socket) {
  console.log('listener');
  var actor1 = actors[socket.username];
  var actor2 = _.filter(actors, function (o) { return !(o[socket.username]==actor1); })[0];

  // actors listens for any message and log the message
  actor1.on(/./, function (from, message) {
    console.log(from + ' said: ' + message);
  });

  actor2.on(/./, function (from, message) {
    console.log(from + ' said: ' + message);
  });
}

module.exports = socket;
