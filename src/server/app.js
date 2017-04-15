
'use strict';

var Hapi = require('hapi'),   
    mongoose = require('mongoose'),
    Path = require('path'),
    _ = require('mix-utils'),
    config = require('./config');


var server = new Hapi.Server();
server.connection({ port: config.port.www, host: 'localhost', routes: { cors: true } });


server.register({ register: require('inert') }, function (err) {
    if (err) throw err;

    server.route([{
        method: 'GET',
        path: '/www/js/{file*}',

        handler: {
            directory: {
                path: './www/js'
            }
        }
    },
    {
        method: 'GET',
        path: '/www/css/{file*}',
        handler: {
            directory: {
                path: './www/css'
            }
        }

    }
    ]);

//     server.route({
//     method: 'GET',
//     path: '/www/{param*}',
//     handler: {                                     // [3]
//       directory: {                                 // [3]
//         path: Path.join(__dirname, 'www'),      // [3]
//         listing: true                              // [3]
//       }                                            // [3]
//     }                                              // [3]
//   });

});

var routes = _.concat(require('./routes/auth'), require('./routes/app'));

require('./register')(server, routes);

server.start((err) => {
    if (err) {
        throw err;
    }
    // Create a new Mongoose connection instance
    mongoose.Promise = global.Promise;
    global.db = mongoose.connect(config.db, { promiseLibrary: global.Promise });

    console.log(`Server running at: ${server.info.uri}`);
});
