<template>
    <div class="expenditures-form-content">
        <h1>Form</h1>
        <form class="awas-validated" @submit.prevent="validateBeforeSubmit">
            <div class="form-row align-items-end">
                <div class="form-group col-md-12">
                    <label>Monto</label>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text">$</span>
                        </div>
                        <input type="text" class="form-control" placeholder="Monto" name="amount"
                               :class="{ 'is-invalid': errors.has('amount') }"
                               v-validate data-vv-rules="required"
                               v-model="amount">
                        <div class="invalid-feedback" :class="{ 'd-none': !errors.has('amount') }">
                            {{ errors.first('amount') }}
                        </div>
                    </div>
                </div>

                <div class="form-group col-md-12">
                    <label>Tipo</label>
                    <select id="inputState" class="form-control"
                            v-model="expenditure_type">
                        <option value="PRODUCT">Producto</option>
                        <option value="SERVICE">Servicio</option>
                    </select>
                </div>

                <div class="form-group col-md-12">
                    <label>Nombre</label>
                    <input type="text" class="form-control"
                           placeholder="Nombre"
                           name="name"
                           :class="{ 'is-invalid': errors.has('name') }"
                           v-model="name"
                           v-validate data-vv-rules="required|alpha_spaces">
                    <div class="invalid-feedback" :class="{ 'd-none': !errors.has('name') }">
                        {{ errors.first('name') }}
                    </div>
                </div>

                <div class="form-group col-md-6" v-if="expenditure_type==='PRODUCT'">
                    <label>Cantidad</label>
                    <input type="text" class="form-control" placeholder="Cantidad"
                           v-model="quantity">
                </div>
                <div class="form-group col-md-6" v-if="expenditure_type==='PRODUCT'">
                    <label>Medida</label>
                    <input type="text" class="form-control" placeholder="Medida"
                           v-model="measure">
                </div>
                <div class="form-group col-md-12">
                    <label>Categoría</label>
                    <input type="text" class="form-control" placeholder="Categoría"
                           v-model="category">
                </div>
                <div class="form-group col-md-12">
                    <label>Necesidad</label>
                    <input type="number" class="form-control"
                           placeholder="Necesidad"
                        v-model="level_need">
                </div>
                <div class="form-group col-md-12">
                    <button type="submit" class="btn btn-primary btn-block">Registrar Gasto</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import expenditureTypes from '@/types/expenditure'
    import {mapActions} from 'vuex'
    export default {
        name: "ExpendituresForm",
        data() {
            return {
                amount: '',
                expenditure_type: 'PRODUCT',
                name: '',
                quantity: '',
                measure: '',
                category: '',
                level_need: 5,
                error: null
            }
        },
        methods: {
            ...mapActions({
                createNew: expenditureTypes.actions.create
            }),
            validateBeforeSubmit() {
                this.$validator.validateAll()
                    .then( result => {
                        if (result) {
                            this.createNew({
                                amount: this.amount,
                                expenditure_type: this.expenditure_type,
                                name: this.name,
                                quantity: this.quantity,
                                measure: this.measure,
                                category: this.category,
                                level_need: this.level_need,
                            }).then( expenditure => {
                                    // console.log("resultado desde component: "+expenditure.body.data);
                                })
                                .catch( error => {
                                    console.error(error);
                                })
                        }
                    })
                    .catch( error => {
                        console.error(error);
                    });
            }
        }
    }
</script>

<style scoped>

</style>
