$(document).ready(function() {
  var $go = $("#go");
  var $room = $("#room");

  // Dom events to a RxJS Observable Sequence
  var go = Rx.Observable.fromEvent($go, 'click');
  var room = Rx.Observable.fromEvent($room, 'keyup');

  // Subscribing observables
  go.subscribe(function() {
    var room = $room.val().trim();
    redirect(room);
  });

  room.subscribe(function(e) {
    var code = e.which;
    if(code == 13) {
      redirect($(e.target).val());
    }
  });
});

// redirect function
function redirect(to) {
  if (to != undefined && to != '') {
    window.location = '/'+to;
  }
}
