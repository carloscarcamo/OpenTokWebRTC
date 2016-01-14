var express = require('express'),
    router = express.Router(),
    config = require('../config');
    /*OpenTok = require('opentok'),
    opentok = new OpenTok(config.opentok.key, config.opentok.secret);*/

/* GET home room. */
router.get('/:room', function(req, res, next) {
  var opentok =  req.app.get('opentok');
  //console.log(req.params.room);
  var response = function (apiKey, sessid, token ) {

    var data = {
      room: req.params.room,
      apiKey: apiKey,
      sessid: sessid,
      token: token
    }

    res.render('webrtc', data);
  }

  // check if session already exitst
  if(req.app.get('session_id') == undefined) {
    console.log('creating new session');
    opentok.createSession({mediaMode: 'routed'}, function(err, session) {
      if (err) return console.log(err);

      req.app.set('session_id', session.sessionId);
      var token = opentok.generateToken(session.sessionId); // generate new token for this client
      response(config.opentok.key, session.sessionId, token);
    });
  } else {
    console.log('using old session');
    var token = opentok.generateToken(req.app.get('session_id')); // generate new token for this client
    response(config.opentok.key, req.app.get('session_id'), token);
  }

});

module.exports = router;
