<template>
    <div class="expenditures-list">
        <h1>{{ $t('expenditures.title') }}</h1>
        <!--<v-client-table :data="expenditures.data"-->
                        <!--:options="options"-->
                        <!--:columns="columns">-->
        <!--</v-client-table>-->
        <!--<table class="table">-->
            <!--<thead class="thead-dark">-->
            <!--<tr>-->
                <!--<th scope="col">{{ $t('expenditures.model.amount') }}</th>-->
                <!--<th scope="col">{{ $t('expenditures.model.type') }}</th>-->
                <!--<th scope="col">{{ $t('expenditures.model.name') }}</th>-->
                <!--<th scope="col">{{ $t('expenditures.model.quantity') }}</th>-->
                <!--<th scope="col">{{ $t('expenditures.model.measure') }}</th>-->
                <!--<th scope="col">{{ $t('expenditures.model.category') }}</th>-->
                <!--<th scope="col">{{ $t('expenditures.model.lvl_need') }}</th>-->
                <!--<th scope="col">{{ $t('expenditures.model.created_at') }}</th>-->
            <!--</tr>-->
            <!--</thead>-->
            <!--<tbody>-->
            <!--<tr v-for="(exp, index) in expenditures.data" :key="index">-->
                <!--<td>{{ exp.amount | toCLP }}</td>-->
                <!--<td>{{ exp.expenditure_type }}</td>-->
                <!--<td>{{ exp.name }}</td>-->
                <!--<td>{{ exp.quantity }}</td>-->
                <!--<td>{{ exp.measure }}</td>-->
                <!--<td>{{ exp.category }}</td>-->
                <!--<td>{{ exp.level_need }}</td>-->
                <!--<td>{{ exp.created_at | relativeTime }}</td>-->
            <!--</tr>-->
            <!--</tbody>-->
        <!--</table>-->

        <div class="card content-card" v-for="(exp, index) in expenditures.data" :key="index">
            <div class="row">
                <div class="col-sm-12 col-lg-12">
                    <div class="row">
                        <div class="col-6 col-lg-10">
                            <div class="row">
                                <div class="col-lg-4">
                                    <h4 class="exp-type">{{ exp.expenditure_type }}</h4>
                                </div>
                                <div class="col-lg-8">
                                    <div class="exp-name">
                                        {{ exp.name }}
                                        <span v-if="exp.expenditure_type == 'PRODUCT'">
                                            {{ exp.quantity }}{{ exp.measure }}
                                        </span>
                                    </div>
                                    <div class="lvl-need-content">
                                        <div class="lvl-need-percent"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 col-lg-2 text-right">
                            <h4 class="amount">{{ exp.amount | toCLP }}</h4>
                        </div>
                        <div class="col-lg-12 text-right align-self-end">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="created-at">
                                        {{ exp.created_at | relativeTime }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
        }
    }
</script>

<style lang="scss">
    .card {
        &.content-card {
            box-shadow: 0px 0px 13px 0px rgba(82, 63, 105, 0.05);
            background-color: #ffffff;
            margin-bottom: 20px;
            border-radius: 4px;
            padding: 10px 15px 5px 15px;

            .amount {
                margin-bottom: 0;
                font-size: 1.8rem;
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
                margin-bottom: 0;
                color: #5d78ff;
            }
            .created-at {
                color: #a7abc3;
                font-weight: 400;
                font-size: 13px;
            }

            .lvl-need-content {
                width: 100%;
                height: 5px;
                background-color: #ebedf2;
                padding-right: 20%;
                .lvl-need-percent {
                    width: 100%;
                    height: 5px;
                    background-color: #0abb87;
                }
            }
        }
    }
</style>
