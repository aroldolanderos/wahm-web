<template>
    <div class="expenditures-list">
        <h1>Expenditures</h1>
        <table class="table">
            <thead class="thead-dark">
            <tr>
                <th scope="col">Amount</th>
                <th scope="col">Type</th>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Measure</th>
                <th scope="col">Category</th>
                <th scope="col">Lvl Need</th>
                <th scope="col">Date</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="exp in expenditures.data">
                <td>${{ exp.amount }}</td>
                <td>{{ exp.expenditure_type }}</td>
                <td>{{ exp.name }}</td>
                <td>{{ exp.quantity }}</td>
                <td>{{ exp.measure }}</td>
                <td>{{ exp.category }}</td>
                <td>{{ exp.level_need }}</td>
                <td>{{ exp.created_at }}</td>
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
