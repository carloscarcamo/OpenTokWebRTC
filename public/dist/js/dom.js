$(document).ready(function(){$("#displayChat").click(function(){$("#chat").toggle()}),$("#go").click(function(){var o=$("#room").val().trim();void 0!=o&&""!=o&&(window.location="/"+o)})});