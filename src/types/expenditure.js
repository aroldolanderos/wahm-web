import namespace from '@/utils/namespace'

export default namespace('expenditure', {
    actions: [
        'fetchExpenditures'
    ],

    getters: [
        'expenditures',
        'search'
    ],

    mutations: [
        'receivedExpenditures',
        'setSearch',
        'clearFilters'
    ]
});
