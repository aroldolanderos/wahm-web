<template>
    <div class="expenditures-form-content">
        <h1>Form</h1>
        <form class="awas-validated" @submit.prevent="validateBeforeSubmit">
            <div class="form-row align-items-end">
                <div class="form-group col-md-2">
                    <label>Monto</label>
                    <div class="input-group input-group-lg">
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

                <div class="form-group col-md-1">
                    <label>Tipo</label>
                    <select id="inputState" class="form-control form-control-lg"
                            v-model="type">
                        <option value="PRODUCT">Producto</option>
                        <option value="SERVICE">Servicio</option>
                    </select>
                </div>

                <div class="form-group col-md-3">
                    <label>Nombre</label>
                    <input type="text" class="form-control form-control-lg"
                           placeholder="Nombre"
                           name="name"
                           :class="{ 'is-invalid': errors.has('name') }"
                           v-model="name"
                           v-validate data-vv-rules="required|alpha_spaces">
                    <div class="invalid-feedback" :class="{ 'd-none': !errors.has('name') }">
                        {{ errors.first('name') }}
                    </div>
                </div>

                <div class="form-group col-md-1">
                    <label>Cantidad</label>
                    <input type="text" class="form-control form-control-lg" placeholder="Cantidad"
                           v-model="quantity">
                </div>
                <div class="form-group col-md-1">
                    <label>Medida</label>
                    <input type="text" class="form-control form-control-lg" placeholder="Medida"
                           v-model="measure">
                </div>
                <div class="form-group col-md-2">
                    <label>Categoría</label>
                    <input type="text" class="form-control form-control-lg" placeholder="Categoría"
                           v-model="category">
                </div>
                <div class="form-group col-md-1">
                    <label>Necesidad</label>
                    <input type="number" class="form-control form-control-lg"
                           placeholder="Necesidad"
                        v-model="lvl_need">
                </div>
                <div class="form-group col-md-1">
                    <button type="submit" class="btn btn-primary">Registrar Gasto</button>
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
                type: 'PRODUCT',
                name: '',
                quantity: '',
                measure: '',
                category: '',
                lvl_need: 5,
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
                                type: this.type,
                                name: this.name,
                                quantity: this.quantity,
                                meassure: this.meassure,
                                category: this.category,
                                lvl_need: this.lvl_need,
                            }).then( expenditure => {
                                    console.log("resultado desde component: "+expenditure);
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
