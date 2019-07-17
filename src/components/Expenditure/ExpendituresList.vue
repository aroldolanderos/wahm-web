<template>
    <div class="expenditures-list">
        <h1>{{ $t('expenditures.title') }}</h1>
        <table class="table">
            <thead class="thead-dark">
            <tr>
                <th scope="col">{{ $t('expenditures.model.amount') }}</th>
                <th scope="col">{{ $t('expenditures.model.type') }}</th>
                <th scope="col">{{ $t('expenditures.model.name') }}</th>
                <th scope="col">{{ $t('expenditures.model.quantity') }}</th>
                <th scope="col">{{ $t('expenditures.model.measure') }}</th>
                <th scope="col">{{ $t('expenditures.model.category') }}</th>
                <th scope="col">{{ $t('expenditures.model.lvl_need') }}</th>
                <th scope="col">{{ $t('expenditures.model.created_at') }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="exp in expenditures.data">
                <td>{{ exp.amount | toCLP }}</td>
                <td>{{ exp.expenditure_type }}</td>
                <td>{{ exp.name }}</td>
                <td>{{ exp.quantity }}</td>
                <td>{{ exp.measure }}</td>
                <td>{{ exp.category }}</td>
                <td>{{ exp.level_need }}</td>
                <td>{{ exp.created_at | relativeTime }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import expendituresTypes from '@/types/expenditure';
    import {mapGetters} from 'vuex';
    export default {
        name: "ExpendituresList",
        mounted() {
            this.$store.dispatch(expendituresTypes.actions.fetchExpenditures);
        },
        computed: {
            ...mapGetters({
                expenditures: expendituresTypes.getters.expenditures
            })
        }
    }
</script>

<style scoped>

</style>
