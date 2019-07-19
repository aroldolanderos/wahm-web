<template>
    <div class="row">
        <div class="col-lg-12">
            <ExpendituresForm></ExpendituresForm>
        </div>
        <div class="col-lg-12">
            <ExpendituresList></ExpendituresList>
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
