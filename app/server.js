(function () {
    'use strict';

    var server = require('./express'),
        io = require('./signaling'),
        port = process.env.PORT || 8080;

    server.listen(port, function () {
      console.log('Server listening at port %d', port);
    });

}).call(this);
