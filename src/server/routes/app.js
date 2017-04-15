// Invoke 'strict' JavaScript mode
'use strict';

var mongoose = require('mongoose'),
    _ = require('mix-utils'),
    async = require('async'),
    Joi = require('joi'),
    Post = require('../models/post'),
    config = require('../config');



// Define the routes module' method
module.exports = [

    // -----------posts---------
    {
        method: 'POST',
        path: '/api/post/fetch',
        config: {
            auth: false,
            validate: {
                payload: {
                    page: Joi.number(),
                    search: Joi.string().allow('')
                }
            },

            handler: (request, reply) => {
                //var _limit = request.payload.limit;
                var _page = request.payload.page;
                var _kwd = request.payload.search;
                var _condition = [{ stt: 1 }];
                var _sort = { crt: -1 };

                if (!_.isEmpty(_kwd)) {
                    _condition.push({ tl: new RegExp(_kwd, 'ig') });
                }

                Post.paginate({ $and: _condition }, {
                    page: _page,
                    limit: 18,
                    select: { tl: 1, img: 1, sid: 1, stt: 1, crt: 1 },
                    sort: _sort
                },
                    function (err, result) {

                        if (result) {
                            reply(result);
                        } else {
                            reply({docs: []});
                        }

                    });

            }
        }
    },

    {
        method: 'POST',
        path: '/api/post/info',
        config: {
            auth: false,

            handler: (request, reply) => {
                let _id = request.payload.id;

                Post.findOne({ sid: _id }, (err, doc) => {
                    if (doc) {
                        //Update views + 1
                        Post.update({ _id: doc._id }, { $set: { v: doc.v + 1 } }, () => { });

                        var _kwd = doc.tags.length > 0 ? doc.tags.join(' ') : doc.tl;
                        var _tag = doc.tags.length > 0 ? doc.tags[0] : doc.tl;

                        async.parallel({
                            suggest: function (callback) {

                                Post.find({ $text: { $search: _kwd }, _id: { $ne: doc._id }, stt: { $gte: 1 } }, { score: { $meta: "textScore" } })
                                    .sort({ score: { $meta: 'textScore' } })
                                    .select({ tl: 1, v: 1, img: 1, sid: 1, stt: 1, crt: 1 })
                                    .limit(4)
                                    .exec(function (err, docs) {
                                        if (err)
                                            console.log(err);

                                        callback(null, docs);

                                    });


                            },
                            recommended: function (callback) {

                                Post.find({ $text: { $search: _tag }, _id: { $ne: doc._id }, stt: { $gte: 1 }, })
                                    .sort({ stt: -1, crt: -1 })
                                    .select({ tl: 1, v: 1, img: 1, sid: 1, stt: 1, crt: 1 })
                                    .limit(3)
                                    .exec(function (err, docs) {
                                        if (err)
                                            console.log(err);

                                        callback(null, docs);
                                    });


                            }

                        },
                            function (err, results) {
                                if (err)
                                    console.log(err);

                                return reply({
                                    info: doc,
                                    suggest: results.suggest,
                                    recommended: results.recommended
                                });
                            });



                    } else {
                        return reply({});
                    }
                })

            }
        }
    },






    // ------------PUT--------------

    // {
    //     method: 'POST',
    //     path: '/api/link/save',
    //     config: {

    //         auth: {
    //             strategy: 'session',
    //             mode: 'try'
    //         },

    //         handler: (request, reply) => {
    //             var _uid = request.auth.credentials._id;
    //             var _obj = request.payload;

    //             if (_.isEmpty(_obj._id)) {
    //                 _obj._id = new mongoose.Types.ObjectId();
    //             }

    //             Post.findOneAndUpdate({ _id: _obj._id, _uid: _uid }, _obj, { new: true, upsert: true, setDefaultsOnInsert: true }, function (err, doc) {

    //                 if (err) {
    //                     console.log(err);
    //                     return reply(err);
    //                 }



    //                 console.log(doc);

    //                 var _host = !_.isEmpty(doc.host) ? doc.host : config.shrink.domain;
    //                 var _url = _.format("http://{0}/{1}", _host, doc._sid);

    //                 return reply({ stt: 1, msg: 'Save successfully.', url: _url });

    //             });

    //         }
    //     }
    // },

    // // ------------REMOVE--------------

    // {
    //     method: 'POST',
    //     path: '/api/link/delete',
    //     config: {

    //         auth: {
    //             strategy: 'session',
    //             mode: 'try'
    //         },

    //         handler: (request, reply) => {
    //             var _uid = request.auth.credentials._id;
    //             var _ids = request.payload.ids;

    //             Link.remove({ _id: { $in: _ids }, _uid: _uid }, function (err, doc) {
    //                 if (doc) {
    //                     reply({ stt: 1, msg: "Item have been removed" });

    //                 } else {
    //                     reply({ msg: "Page not found!" });
    //                 }

    //             });

    //         }
    //     }
    // },

    {
        method: 'GET',
        //path: '/',
        path: '/{path*}',
        config: {
            plugins: {
                seo: { enabled: false }
            },
            handler: function (request, reply) {
                reply.view('index.html', {});
            }

        }

    }

]
