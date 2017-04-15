import Vue from 'vue';
import Resource from 'vue-resource';
import config from '../config';
Vue.use(Resource);

Vue.http.options.root = config.BASE_API_URL;
Vue.http.options.emulateJSON = true;
Vue.http.options.emulateHTTP = true;

// Fixed 400 Bad Request when use jQuery serialize()
Vue.http.options.headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}

//application/json; charset=utf-8
//X-CSRF-Token

//  Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value');

export default {
    put(url, data) {
        return Vue.http.put(url, data);
    },
    get(url, data) {
        return Vue.http.get(url, data);
    },
    post(url, data) {
        return Vue.http.post(url, data);
    },
    delete(url, data) {
        return Vue.http.delete(url, data);
    }
}
