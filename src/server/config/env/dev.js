// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'development' environment configuration object
module.exports = {
    port: {
        www: 8080
    },
    db: 'mongodb://localhost/blog',
    secret: '85e031c316ba1c4c386079a92783badf2c2125fd4756916d42470a13f61de4aa',
    log: {
        collection: 'logs',
        level: 'all'
    }  

};
