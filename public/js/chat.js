function Chat (chatView, msjInput, roomId, session) {
  _this = this;
  this.roomId = roomId;
  this.session = session;
  this.observable = Rx.Observable;
  this.$chat = $('#'+chatView);
  this.$msj = $('#'+msjInput);
  this.messages = [];
  this.peerConnection = undefined;
  this.init();
}

Chat.prototype = {
  _this: this,
  constructor: Chat,

  init: function() {
    // register dom events
    this.domEvents();

    // register events
    this.events();

  },

  setPeerConnection: function(connection) {
    this.peerConnection = connection;
  },

  events: function() {
    var signal = this.observable.fromEvent(this.session, 'signal:chat');
    signal.subscribe(function(event) {
        console.log(event.data);
        _this.newMessage(event.data, 'me');
    });

  },

  domEvents: function() {
    var msjInput = this.observable.fromEvent(this.$msj, 'keyup');
    msjInput.subscribe(function (e) {
      var code = e.which;
      var msj = $(e.target).val();
      if(code == 13 && msj != '') {
        $(e.target).val('');
        _this.sendMenssage(msj);
      }
    });
  },

  sendMenssage: function(message) {
    if (this.peerConnection != undefined) {
      var _data = message;
      console.log(_data);
      this.session.signal(
        {
          to: this.peerConnection,
          type: 'chat',
          data: _data
        },
        function (error) {
          if (error) {
            console.log("signal error ("+ error.code+ "): " + error.message);
          } else {
            console.log('message sent');
            _this.newMessage(_data, 'peer')
          }
        }
      );
    } else {
      swal({
        title: "Error!",
        text: "There is no peer to chat!",
        type: "error",
        confirmButtonText: "OK"
      });
    }
  },

  newMessage: function(data, to) {
    console.log(data, to);
    var msjContainer = $('<div></div>');
    var msjSubContainer = $('<div></div>');
    var arrow = $('<div></div>');
    var msjText = $('<div></div>');
    /*var msjSubContainer = document.createElement('div');
    var arrow = document.createElement('div');
    var msjText = document.createElement('div');*/

    msjContainer.append(msjSubContainer);
    msjSubContainer.append(arrow);
    msjSubContainer.append(msjText);

    /*msjContainer.className = 'col-xs-12';
    msjText.className = 'msg-content';*/
    msjContainer.addClass('col-xs-12');
    msjText.addClass('msg-content');

    //if(to == 'peer' && this.peerConnection != undefined) {
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
