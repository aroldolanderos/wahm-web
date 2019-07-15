<template>
    <div class="login">
        <div class="row justify-content-center">
            <div class="col-12 col-md-4 col-lg-4">
                <h1 class="text-center text-muted"><u>Iniciar sesión</u></h1>
                <div class="alert alert-dabger" v-if="error">
                    Error procesando el formulario
                </div>
                <hr>
                <div class="form-login">
                    <form autocomplete="off" @submit.prevent="validateBeforeSubmit">
                        <div class="form-group">
                            <label for="email">Email address</label>
                            <input id="email"
                                   type="email"
                                   class="form-control" :class="{ 'is-invalid': errors.has('email') }"
                                   placeholder="Enter email"
                                   name="email"
                                   v-model="email"
                                   v-validate>
                            <div class="invalid-feedback" :class="{ 'd-none': !errors.has('email') }">
                                {{ errors.first('email') }}
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input id="password"
                                   type="password"
                                   class="form-control" :class="{ 'is-invalid': errors.has('password') }"
                                   placeholder="Password"
                                   name="password"
                                   v-model="password"
                                   v-validate data-vv-rules="required|min:4">
                            <div class="invalid-feedback" :class="{ 'd-none': !errors.has('password') }">
                                {{ errors.first('password') }}
                            </div>
                        </div>
                        <hr>
                        <button type="submit" class="btn btn-primary btn-block">Iniciar sessión</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import authTypes from '@/types/auth'
    import {mapActions} from 'vuex'
    export default {
        name: "login",
        data() {
            return {
                email: '',
                password: '',
                error: null
            }
        },
        methods: {
            ...mapActions({
                login: authTypes.actions.login
            }),
            validateBeforeSubmit() {
                this.$validator.validateAll()
                    .then(result => {
                        if (!result) {

                        } else {
                            this.login({
                                email: this.email,
                                password: this.password
                            }).then(
                                user => {
                                    this.$router.push('/')
                                },
                                error => {
                                    this.error = true;
                                }
                            )
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        }
    }
</script>

<style scoped>

</style>