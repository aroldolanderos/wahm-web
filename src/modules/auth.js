import types from '@/types/auth'
import globalTypes from '@/types/global'
import Vue from 'vue';
import vueResource from "vue-resource";

Vue.use(vueResource);
Vue.http.options.root = process.env.VUE_APP_API_URL_WAHM;
Vue.http.interceptors.push((request, next) => {
    request.headers.set('Authorization', `Bearer: ${window.localStorage.getItem('_token')}`);
    next();
});

const state = {
    user: null,
    logged: !!window.localStorage.getItem('_token')
};

const actions = {
    [types.actions.login]: ({commit}, userInput) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) => {
            Vue.http.post('login', userInput)
                .then(user => {
                    window.localStorage.setItem('_token', user.body.token);
                    commit(types.mutations.setUser);
                    resolve(user);
                })
                .catch(error => {
                    reject(error)
                })
                .finally(() => {
                    commit(globalTypes.mutations.stopProcessing);
                });
        })
    },
    [types.actions.register]: ({commit}, userInput) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) => {
            Vue.http.post('register', userInput)
                .then(user => {
                    resolve(user);
                })
                .catch(error => {
                    reject(error)
                })
                .finally(() => {
                    commit(globalTypes.mutations.stopProcessing);
                })
        })
    },
    [types.actions.updateProfile]: ({commit}, userInput) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) => {
            Vue.http.put('proile', {user: userInput})
                .then(user => {
                    window.localStorage.setItem('_token', user.body.token);
                    commit(types.mutations.setUser);
                    resolve(user);
                })
                .catch(error => {
                    reject(error)
                })
                .finally(() => {
                    commit(globalTypes.mutations.stopProcessing);
                });
        })
    },
    [types.actions.logout]: ({commit}) => {
        window.localStorage.removeItem('_token');
        commit(types.mutations.setUser);
    }
};

const getters = {
    // obtenemos el usuario
    [types.getters.user]: (state) => {
        return state.user
    },
    // esta logeado?
    [types.getters.logged]: (state) => {
        return state.logged;
    }
};

const mutations = {
    // establecemos el usuario a travez del jwt
    [types.mutations.setUser]: (state) => {
        if (window.localStorage.getItem('_token')) {
            const token = window.localStorage.getItem('_token');
            const jwtDecode = require('jwt-decode');
            state.user = jwtDecode(token);
            state.logged = true;
        } else {
            state.logged = false;
            state.user = null;
        }
    },
    [types.mutations.setLogged]: (state, logged) => {
        state.logged = logged
    }
};

export default {
    state,
    actions,
    getters,
    mutations
}