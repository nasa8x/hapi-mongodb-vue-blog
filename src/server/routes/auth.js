// Invoke 'strict' JavaScript mode
'use strict';

var Member = require('../models/member'),
    Hash = require('mix-hash');

// Define the routes module' method
module.exports = [{
    method: 'POST',
    path: '/login',
    config: {
        // Use the 'session' auth strategy to allow bell to handle the oauth flow.
        //auth: { mode: 'try' },
        //auth: 'session',
        auth: false,
        //plugins: { 'hapi-auth-cookie': { redirectTo: false } },
        handler: (request, reply) => {
            // Here we take the profile that was kindly pulled in
            // by bell and set it to our cookie session.
            // This will set the cookie during the redirect and
            // log them into your application.

            //  console.log(request.payload);

            if (!request.payload.uid || !request.payload.pwd) {
                reply({ msg: 'Missing username or password', stt: 0 });
            } else {
                var _pwd = Hash.sha256(request.payload.pwd);

                var _uid = request.payload.uid || request.payload.mail;
                Member.findOne({ uid: _uid, pwd: _pwd }, (err, doc) => {
                    if (doc) {

                        if (doc.stt == 0) {
                            return reply({ stt: 0, msg: "Your account needs to be activated" });
                        } else {
                            //request.auth.session.set(doc);
                            request.cookieAuth.set(doc);
                            // User is now logged in, redirect them to their account area
                            return reply({ stt: 1, msg: "Login successfuly!" });
                        }

                    } else {
                        reply({ msg: 'Invalid username or password', stt: 0 });
                    }
                });

            }

        }
    }
},
// --------------Register----------------

{
    method: 'POST',
    path: '/register',
    config: {
        // Use the 'session' auth strategy to allow bell to handle the oauth flow.
        //auth: { mode: 'try' },
        //auth: 'session',
        auth: false,
        //plugins: { 'hapi-auth-cookie': { redirectTo: false } },
        handler: (request, reply) => {
            // Here we take the profile that was kindly pulled in
            // by bell and set it to our cookie session.
            // This will set the cookie during the redirect and
            // log them into your application.

            //  console.log(request.payload);

            if (!request.payload.uid || !request.payload.pwd) {
                reply({ msg: 'Missing username or password', stt: 0 });
            } else {
                var _pwd = Hash.sha256(request.payload.pwd);
                var _uid = request.payload.uid || request.payload.mail;
                Member.findOne({ uid: _uid }, (err, doc) => {
                    if (doc) {
                        return reply({ stt: -1, msg: "Email has been registered" });
                    } else {
                        var _obj = new Member({
                            fn: request.payload.fn,
                            ln: request.payload.ln,
                            pwd: _pwd,
                            uid: _uid,
                            mail: _uid
                        }).save(function (err, doc) {
                            return reply({ stt: 1, msg: "Congratulations on your successful registration" });
                        });
                    }
                });

            }

        }
    }
},

// Get credentials info

{
    method: ['GET', 'POST'],
    path: '/auth/session',
    config: {
        auth: {
            strategy: 'session',
            mode: 'try'
        },

        handler: function (request, reply) {
            var auth = request.auth.credentials;
            reply({
                session: {
                    id: auth._id,
                    user_id: auth.uid,
                    mail: auth.mail,
                    fn: auth.fn,
                    ln: auth.ln,
                    name: [auth.fn, auth.ln].join(' ')
                },
                token: '',
                authenticated: request.auth.isAuthenticated
            });
        }
    }
},


// This route is used to the logout the user.  This will **not**
// logout the user from the provider they used to login.

{
    method: 'GET',
    path: '/logout',
    config: {

        handler: (request, reply) => {
            // Clear the cookie
            //request.auth.session.clear();
            request.cookieAuth.clear();
            return reply.redirect('/');
        }
    }
}

]