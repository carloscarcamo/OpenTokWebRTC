$(document).ready(function() {
  $("#displayChat").click(function() {
    $("#chat").toggle();
  });

  $('#go').click(function() {
    var room = $("#room").val().trim();
    if (room != undefined && room != '') {
      window.location = '/'+room;
    }
  });
});
