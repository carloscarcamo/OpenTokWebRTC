function Room(roomId, apiKey, session, token, Chat, socket) {
  this.roomId = roomId;
  this.apiKey = apiKey;
  this.session = session;
  this.token = token;
  this.Chat = Chat;
  this.observable = Rx.Observable; // RxJS Object
  this.Chat = Chat;
  this.io = socket;
  this.init();
}

Room.prototype = {
  constructor: Room,

  /**
   * Init room session
   */

  init: function () {
    var _this = this;
    // check for requirements
    if (OT.checkSystemRequirements() == 1) {
      var publisherOptions = {
        insertMode: 'append',
        width: '100%',
        height: '100%'
      };

      // Initialize a Publisher, and place it into the element with id="publisher"
      var publisher = OT.initPublisher(this.apiKey, 'publisher', publisherOptions);

      // events to a RxJS Observable Sequence
      var sessionConnected = this.observable.fromEvent(this.session, 'sessionConnected');
      var streamCreated = this.observable.fromEvent(this.session, 'streamCreated');

      // Subscribing observables
      sessionConnected.subscribe(function(event) {
        _this.session.publish(publisher);
      });

      streamCreated.subscribe(function(event) {
        _this.Chat.setPeerConnection(event.stream.connection);
        swal("A new peer has been connected!")
        _this.session.subscribe(event.stream, 'subscribers', publisherOptions);
      });

      // Connect to the Session using the 'apiKey' of the application and a 'token' for permission
      this.session.connect(this.token);

      this.addUser();
      this.socketEvents();
    } else {
      // The client does not support WebRTC.
      swal({
        title: "Error!",
        text: "Your browser does not support WebRTC!",
        type: "error",
        confirmButtonText: "OK"
      });
    }
  },

  addUser: function () {
    this.io.emit('add user', this.token);
  },

  // events to a RxJS Observable Sequence
  socketEvents: function () {
    var login = this.observable.fromEvent(this.io, 'login');
    var userLeft = this.observable.fromEvent(this.io, 'user left');
    var userJoined = this.observable.fromEvent(this.io, 'user joined');
    var full = this.observable.fromEvent(this.io, 'full room');

    // Subscribing observables
    login.subscribe(function (data) {
      console.log('active users:', data);
    });

    userLeft.subscribe(function (data) {
      console.log('active users:', data.numUsers);
    });

    userJoined.subscribe(function (data) {
      console.log('A new user has joined');
    });

    full.subscribe(function (data) {
      sweetAlert("Sorry", data, "error");
      setTimeout(function () {
        window.location.href="/";
      }, 500);

    });

  }
};
