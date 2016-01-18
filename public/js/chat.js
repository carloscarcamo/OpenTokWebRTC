function Chat (chatView, msjInput, roomId, session, socket) {
  _this = this;
  this.roomId = roomId;
  this.session = session;
  this.observable = Rx.Observable; // RxJS Object
  this.$chat = $('#'+chatView);
  this.$msj = $('#'+msjInput);
  this.$chatBtn = $("#displayChat");
  this.messages = [];
  this.peerConnection = undefined;
  this.io = socket; //socket.io
  this.init();
}

Chat.prototype = {
  _this: this,
  constructor: Chat,

  init: function () {
    // dom events
    this.domEvents();

    // events
    this.events();
  },

  setPeerConnection: function (connection) {
    this.peerConnection = connection;
  },

  events: function () {
    // events to a RxJS Observable Sequence
    var message = this.observable.fromEvent(this.io, 'message');

    message.subscribe(function (data) {
      console.log(data.message);
      _this.newMessage(data.message, 'me');
    });

  },

  domEvents: function () {
    // Dom events to a RxJS Observable Sequence
    var msjInput = this.observable.fromEvent(this.$msj, 'keyup');
    var displayChat = this.observable.fromEvent(this.$chatBtn, 'click');

    // Subscribing observables
    msjInput.subscribe(function (e) {
      var code = e.which;
      var msj = $(e.target).val();
      if(code == 13 && msj != '') {
        $(e.target).val('');
        _this.sendMenssage(msj);
      }
    });

    displayChat.subscribe(function (e) {
      $("#chat").toggle();
    });
  },

  sendMenssage: function (message) {
    this.io.emit('new message', {message: message});
    _this.newMessage(message, 'peer');
  },

  newMessage: function (data, to) {
    //console.log(data, to);
    var msjContainer = $('<div></div>');
    var msjSubContainer = $('<div></div>');
    var arrow = $('<div></div>');
    var msjText = $('<div></div>');

    msjContainer.append(msjSubContainer);
    msjSubContainer.append(arrow);
    msjSubContainer.append(msjText);
    msjContainer.addClass('col-xs-12');
    msjText.addClass('msg-content');

    if(to == 'peer') {
      msjSubContainer.addClass('msg-publisher');
      arrow.addClass('arrow-right');
      msjText.html(data);
      this.$chat.append(msjContainer);
    } else if(to == 'me'){
      msjSubContainer.addClass('msg-subscribers');
      arrow.addClass('arrow-left');
      msjText.html(data);
      this.$chat.append(msjContainer);
    }
  }

};
