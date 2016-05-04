var connect = require('connect');
var serveStatic = require('serve-static');
connect()
    .use('/', serveStatic('./bld'))
    .use('/lib', serveStatic('./lib'))
    .use('/dev/src', serveStatic('./dev/src'))
    .listen(888);