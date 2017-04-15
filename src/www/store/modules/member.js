import api from '../../api';
import { MEMBER_LOGIN, MEMBER_LOGOUT, MEMBER_REGISTER, MEMBER_INFO, REQUEST_AUTH, REQUEST_AUTH_SUCCESS } from '../const';

export default {
    state: {
        info: {},
        user: {},
        status: false,
        token: ''
    },

    mutations: {

        [REQUEST_AUTH_SUCCESS](state, data) {
            if (data) {
                state.token = data.token
                state.session = data.session
                state.authenticated = data.authenticated;
                localStorage.setItem("auth", 1);
                // console.log(JSON.stringify(data));
            } else {
                state.token = '';
                state.session = null;
                state.authenticated = false;
                localStorage.removeItem("auth");
            }
        },
    },

    getters: {
        authenticated: state => state.authenticated
    },
    actions: {
        [REQUEST_AUTH]({ commit }, data) {
            return api.post('/auth/session').then(res => {
                commit(REQUEST_AUTH_SUCCESS, res.body);
                return res.json();
            }, error => {
                commit(REQUEST_AUTH_SUCCESS, null);
                console.log(error);
            });
        },
        [MEMBER_LOGIN]({ commit }, payload) {
            return api.post('/login', payload);
        },

        [MEMBER_REGISTER]({ commit }, payload) {
            return api.post('/register', payload);
        },

        [MEMBER_LOGOUT]({ commit }) {
            return api.get('/logout').then(res => {
                window.location.reload(true);
            });
        },
    }
}
