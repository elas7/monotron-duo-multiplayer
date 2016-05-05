let server = require('./express');
let io = require('./signaling');
let port = process.env.PORT || 8080;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});
