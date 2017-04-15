// Invoke 'strict' JavaScript mode
'use strict';

// http://www.bigeng.io/oauth-authentication-and-session-management-in/
// https://github.com/adambrault/hapi-bell-twitter-cookie/blob/master/index.js


// Load the module dependencies
var Mustache = require('mustache'),
    cookie = require('hapi-auth-cookie'),   
    parser = require('hapi-bodyparser'),
    vision = require('vision'),
    seo = require('hapi-seo'),
    crumb = require('crumb'),
    config = require('../config');

module.exports = function (server, routes) {

    server.register([cookie, parser, vision], function (err) {

        // Register Mustache Templates rendering 
        server.views({
            engines: {
                html: {
                    compile: function (template) {
                        Mustache.parse(template);
                        return function (context) {
                            return Mustache.render(template, context);
                        };
                    }
                }
            },
            //relativeTo: __dirname,
            path: './views'
        });

        //Setup the session strategy
        server.auth.strategy('session', 'cookie', {
            cookie: 'sid',
            password: config.secret, //Use something more secure in production
            //redirectTo: '/login', //If there is no session, redirect here
            appendNext: true,
            isSecure: false //Should be set to true (which is the default) in production
        });

        // //Setup the social Twitter login strategy
        // server.auth.strategy('twitter', 'bell', {
        //     provider: 'twitter',
        //     password: config.secret, //Use something more secure in production
        //     clientId: config.twitter.clientID,
        //     clientSecret: config.twitter.clientSecret,
        //     isSecure: false //Should be set to true (which is the default) in production
        // });


        // //Setup the social facebook login strategy
        // server.auth.strategy('facebook', 'bell', {
        //     provider: 'facebook',
        //     password: config.secret, //Use something more secure in production
        //     clientId: config.facebook.clientID,
        //     clientSecret: config.facebook.clientSecret,
        //     isSecure: false //Should be set to true (which is the default) in production
        // });

        // //Setup the social google login strategy
        // server.auth.strategy('google', 'bell', {
        //     provider: 'google',
        //     password: config.secret, //Use something more secure in production
        //     clientId: config.google.clientID,
        //     clientSecret: config.google.clientSecret,
        //     isSecure: false //Should be set to true (which is the default) in production
        // });

      
        server.route(routes);

    });
};
