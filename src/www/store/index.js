import Vue from 'vue'
import Vuex from 'vuex'
import Member from './modules/member';
import Post from './modules/post';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'prod',
  modules: {
    member: Member,
    post: Post
  }

});

export default store;
