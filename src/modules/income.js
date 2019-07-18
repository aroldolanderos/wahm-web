import types from '@/types/income'
import globalTypes from '@/types/global'
import Vue from 'vue'

import vueResource from "vue-resource"
Vue.use(vueResource);
Vue.http.options.root = process.env.VUE_APP_API_URL_WAHM;
Vue.http.interceptors.push((request, next) => {
    request.headers.set('Authorization', `Bearer: ${window.localStorage.getItem('_token')}`);
    console.log(request.headers);
    next();
});

const state = {
    incomes: [],
    query: {
        search: ''
    }
};

const actions = {
    [types.actions.fetchIncomes]: ({commit}) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise((resolve, reject) => {
            Vue.http.get('incomes')
                .then(incomes => {
                    commit(types.mutations.receivedIncomes, {apiResponse: incomes});
                    resolve(incomes.data);
                })
                .catch(error => {
                    reject(error)
                })
                .finally(() => {
                    commit(globalTypes.mutations.stopProcessing);
                });
        });
    }
};

const getters = {
    [types.getters.search]: state => state.query.search,
    [types.getters.incomes]: (state) => {
        let incomes = state.incomes;
        if (state.query.search) {
            incomes = incomes.filter(income => income.name .toLowerCase().includes(state.query.search));
            return incomes;
        }
    }
};

const mutations = {
    [types.mutations.receivedIncomes]: (state, {apiResponse}) => {
        state.incomes = apiResponse.data;
    },
    [types.mutations.setSearch]: (state, query) => {
        state.query.search = query;
    },
    [types.mutations.clearFilters]: (state) => {
        state.query = {
            search: ''
        }
    }
};

export default {
    state,
    actions,
    getters,
    mutations
}