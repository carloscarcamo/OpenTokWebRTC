function Room(roomId, apiKey, session, token, Chat) {
  this.roomId = roomId;
  this.apiKey = apiKey;
  this.session = session;
  this.token = token;
  this.Chat = Chat;
  this.observable = Rx.Observable;
  this.Chat = Chat;
  this.init();
}

Room.prototype = {
  constructor: Room,

  /**
   * Init room session
   */

  init: function() {
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

      // Attach event handlers
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

    } else {
      // The client does not support WebRTC.
      swal({
        title: "Error!",
        text: "Your browser does not support WebRTC!",
        type: "error",
        confirmButtonText: "OK"
      });
    }
  }
};
