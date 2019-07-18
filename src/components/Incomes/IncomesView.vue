<template>
    <div class="row">
        <div class="col-lg-8">
            <IncomesList></IncomesList>
        </div>
        <div class="col-lg-4">
            <IncomesForm></IncomesForm>
        </div>
    </div>
</template>

<script>
    import IncomesList from '@/components/Incomes/IncomesList'
    import IncomesForm from '@/components/Incomes/IncomesForm'
    export default {
        name: 'incomeList',
        components: {
            IncomesList,
            IncomesForm
        }
    }
</script>

<style scoped>

</style>
