import namespace from '@/utils/namespace'

export default namespace('expenditure', {
    actions: [
        'fetchExpenditures',
        'search',
        'create',
        'update'
    ],

    getters: [
        'expenditures'
    ],

    mutations: [
        'receivedExpenditures',
        'addExpenditure',
        'setSearch',
        'clearFilters'
    ]
});
