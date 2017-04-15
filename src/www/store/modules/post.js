import api from '../../api'
import { POST_FETCH, POST_FETCH_SUCCESS, POST_SAVE, POST_DETAIL, POST_DETAIL_SUCCESS ,POST_CLEAN_SUCCESS,POST_CLEAN} from '../const'

export default {
    state: {
        docs: [],
        page: 1,
        pages:100,
        info: null,
        suggest: [],
        recommended: []
    },

    mutations: {
        [POST_FETCH_SUCCESS](state, data) {
            state.docs = state.docs.concat(data.docs);
            state.pages = data.pages;
            if (state.page <= data.pages) {
                state.page = state.page + 1
            }
        },
        [POST_DETAIL_SUCCESS](state, data) {

            state.info = data.info;
            state.suggest = data.suggest;
            state.recommended = data.recommended;
        }, 
        [POST_CLEAN_SUCCESS](state) {
            state.docs = [];
            state.page = 1;
            state.pages = null;
            state.suggest = [];
            state.recommended = [];

        }

    },
    getters: {
        docs: state => state.docs,
        page: state => state.page,
        pages: state => state.pages,
        info: state => state.info,
        suggest: state => state.suggest,
        recommended: state => state.recommended
    },

    actions: {
        [POST_FETCH]({ commit }, payload) {
            return api.post('post/fetch', payload).then(res => {
                commit(POST_FETCH_SUCCESS, res.body);
            });
        },
        [POST_DETAIL]({ commit }, payload) {
            return api.post('post/info', payload).then(res => {
                commit(POST_DETAIL_SUCCESS, res.body);
            });
        },
        [POST_CLEAN]({ commit }, payload) {
            commit(POST_CLEAN_SUCCESS);
        },

    }
}
