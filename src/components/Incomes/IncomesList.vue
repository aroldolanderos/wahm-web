<template>
    <div>
        <h1>{{ $t('incomes.title') }}</h1>
        <table class="table">
            <thead class="thead-dark">
            <tr>
                <th scope="col">{{ $t('incomes.model.amount') }}</th>
                <th scope="col">{{ $t('incomes.model.name') }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="income in incomes.data">
                <td>{{ income.amount | toCLP}}</td>
                <td>{{ income.name }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import incomeTypes from '@/types/income'
    import {mapGetters} from 'vuex';
    export default {
        name: 'incomeView',
        mounted() {
            this.$store.dispatch(incomeTypes.actions.fetchIncomes);
        },
        computed: {
            ...mapGetters({
                incomes: incomeTypes.getters.incomes
            })
        }
    }
</script>

<style scoped>

</style>
