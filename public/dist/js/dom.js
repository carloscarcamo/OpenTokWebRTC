function redirect(r){void 0!=r&&""!=r&&(window.location="/"+r)}$(document).ready(function(){var r=$("#go"),e=$("#room"),i=Rx.Observable.fromEvent(r,"click"),c=Rx.Observable.fromEvent(e,"keyup");i.subscribe(function(){var r=e.val().trim();redirect(r)}),c.subscribe(function(r){var e=r.which;13==e&&redirect($(r.target).val())})});