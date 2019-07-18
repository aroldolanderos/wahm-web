import namespace from '@/utils/namespace'

export default namespace('income', {
    getters: [
        'incomes',
        'search'
    ],
    actions: [
        'fetchIncomes'
    ],
    mutations: [
        'receivedIncomes',
        'setSearch',
        'clearFilters'
    ]
});