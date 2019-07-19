import types from '@/types/expenditure'
import globalTypes from '@/types/global'
import Vue from 'vue'

const state = {
    expenditures: [],
    query: {
        search: ''
    }
};

const actions = {
    [types.actions.create]:  ({commit}, expenditureInput) => {
        commit(globalTypes.mutations.startProcessing);
        return new Promise( (resolve, reject) => {
            Vue.http.post('expenditures', expenditureInput)
                .then(expenditure => {
                    console.log(expenditure);
                    resolve(expenditure);
                })
                .catch(error => {
                    reject(error)
                })
                .finally(() => {
                    commit(globalTypes.mutations.stopProcessing);
                });
        })
    },
    [types.actions.fetchExpenditures]: ({commit}) => {
        commit(globalTypes.mutations.startProcessing);
        Vue.http.get('expenditures')
            .then( expenditures => {
                commit(types.mutations.receivedExpenditures, {apiResponse: expenditures});
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                commit(globalTypes.mutations.stopProcessing);
            })
    }
};

const getters = {
    [types.getters.search]: state => state.query.search,
    [types.getters.expenditures]: (state) => {
        let expenditures = state.expenditures;
        if (state.query.search) {
            expenditures = expenditures.filter(
                expenditure => expenditure.name
                    .toLowerCase()
                    .includes(state.query.search)
            )
        }
        return expenditures;
    }
};

const mutations = {
    [types.mutations.receivedExpenditures]: (state, {apiResponse}) => {
        state.expenditures = apiResponse.data;
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
