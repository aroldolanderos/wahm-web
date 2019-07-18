import namespace from '@/utils/namespace'

export default namespace('expenditure', {
    actions: [
        'fetchExpenditures',
        'search'
    ],

    getters: [
        'expenditures'
    ],

    mutations: [
        'receivedExpenditures',
        'setSearch',
        'clearFilters'
    ]
});
