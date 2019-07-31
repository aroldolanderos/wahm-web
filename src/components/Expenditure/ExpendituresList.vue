<template>
    <div class="expenditures-list">
        <h1>{{ $t('expenditures.title') }}</h1>
        <div class="card content-card" v-for="(exp, index) in expenditures.data" :key="index">
            <div class="row">
                <div class="col-lg-9">
                    <div class="row">
                        <div class="col-lg-1 align-self-center">
                            <div class="lvl-need" :style="{background: getColor(exp.level_need)}"></div>
                        </div>
                        <div class="col-lg-3">
                            <h4 class="exp-type">{{ exp.expenditure_type }}</h4>
                            <span class="created-at">
                                {{ exp.created_at | relativeTime }}
                            </span>
                        </div>
                        <div class="col-lg-8 align-self-end">
                            <div class="exp-name">
                                {{ exp.name }}
                                <span v-if="exp.expenditure_type == 'PRODUCT'">
                                    {{ exp.quantity }} {{ exp.measure }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 align-self-center text-right">
                    <h4 class="amount">{{ exp.amount | toCLP }}</h4>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import expendituresTypes from '@/types/expenditure';
    import {mapGetters} from 'vuex';
    export default {
        name: "ExpendituresList",
        data () {
            return {
                columns: [
                    'amount',
                    'expenditure_type',
                    'name',
                    'quantity',
                    'measure',
                    'category',
                    'level_need',
                    'created_at'
                ],
                options: {

                }
            }
        },
        mounted() {
            this.$store.dispatch(expendituresTypes.actions.fetchExpenditures);
        },
        computed: {
            ...mapGetters({
                expenditures: expendituresTypes.getters.expenditures
            })
        },
        methods: {
            getColor(lvl_need) {
                let percent = lvl_need*10;

                if (percent > 80) {
                    return '#28a745'
                } else if (percent > 50) {
                    return '#007bff'
                } else if (percent > 30) {
                    return '#ffc107'
                } else {
                    return '#dc3545'
                }
            }
        }
    }
</script>

<style lang="scss">
    .card {
        &.content-card {
            box-shadow: 0px 0px 13px 0px rgba(82, 63, 105, 0.05);
            background-color: #ffffff;
            margin-bottom: 5px;
            border-radius: 4px;
            padding: 6px 15px;

            .amount {
                margin-bottom: 0;
                font-size: 1.2rem;
                font-weight: 600;
                color: #6c7293;
            }
            .exp-name {
                font-size: 1rem;
                color: #a7abc3;
                padding-bottom: 0.5rem;
                font-weight: 500;
            }
            .exp-type {
                /*padding-top: 0rem;*/
                font-size: .8rem;
                font-weight: bold;
                margin-top: 6px;
                margin-bottom: -6px;
                color: #5d78ff;
            }
            .created-at {
                color: #a7abc3;
                font-weight: 400;
                font-size: 13px;
            }

            .lvl-need {
                height: 20px;
                width: 20px;
                border-radius: 50%;
            }
            .lvl-need-content {
                width: 100%;
                height: 5px;
                background-color: #ebedf2;
                .lvl-need-percent {
                    width: 100%;
                    height: 5px;
                    background-color: #0abb87;
                }
            }
        }
    }
</style>
