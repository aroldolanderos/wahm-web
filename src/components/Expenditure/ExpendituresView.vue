<template>
    <div class="row">
        <div class="col-lg-8">
            <ExpendituresList></ExpendituresList>
        </div>
        <div class="col-lg-4">
            <ExpendituresForm></ExpendituresForm>
        </div>
    </div>
</template>

<script>
    import ExpendituresList from '@/components/Expenditure/ExpendituresList'
    import ExpendituresForm from '@/components/Expenditure/ExpendituresForm'
    export default {
        name: "ExpendituresView",
        components: {
            ExpendituresList,
            ExpendituresForm
        }
    }
</script>

<style scoped>

</style>
