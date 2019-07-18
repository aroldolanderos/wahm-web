import types from '@/types/income'
import globalTypes from '@/types/global'
import Vue from 'vue'

const state = {
    incomes: [],
    query: {
        search: ''
    }
};

const actions = {
    [types.actions.fetchIncomes]: ({commit}) => {
        commit(globalTypes.mutations.startProcessing);
        Vue.http.get('incomes')
            .then( incomes => {
                commit(types.mutations.receivedIncomes, {apiResponse: incomes});
            })
            .catch(error => {
                console.error(error)
            })
            .finally(() => {
                commit(globalTypes.mutations.stopProcessing);
            });
    }
};

const getters = {
    [types.getters.search]: state => state.query.search,
    [types.getters.incomes]: (state) => {
        let incomes = state.incomes;
        if (state.query.search) {
            incomes = incomes.filter(income => income.name .toLowerCase().includes(state.query.search));
        }
        return incomes;
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