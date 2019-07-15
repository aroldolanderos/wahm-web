<template>
    <div class="register">
        <div class="row justify-content-center">
            <div class="col-12 col-md-5 col-lg-5">
                <h1 class="text-center text-muted"><u>Registro de Usuario</u></h1>
                <div class="alert alert-dabger" v-if="error">
                    Error procesando el formulario
                </div>
                <hr>
                <div class="form-login">
                    <form autocomplete="off" @submit.prevent="validateBeforeSubmit" class="form-row">
                        <div class="col-12 col-md-6">
                            <div class="form-group">
                                <label for="email">Firstname</label>
                                <input id="firstname"
                                       type="text"
                                       class="form-control" :class="{ 'is-invalid': errors.has('firstname') }"
                                       placeholder="Enter firstname"
                                       name="firstname"
                                       v-model="firstname"
                                       v-validate data-vv-rules="required|alpha">
                                <div class="invalid-feedback" :class="{ 'd-none': !errors.has('firstname') }">
                                    {{ errors.first('firstname') }}
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="form-group">
                                <label for="email">Lastname</label>
                                <input id="lastname"
                                       type="text"
                                       class="form-control" :class="{ 'is-invalid': errors.has('lastname') }"
                                       placeholder="Enter lastname"
                                       name="lastname"
                                       v-model="lastname"
                                       v-validate data-vv-rules="required|alpha">
                                <div class="invalid-feedback" :class="{ 'd-none': !errors.has('lastname') }">
                                    {{ errors.first('lastname') }}
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-group">
                                <label for="email">Email address</label>
                                <input id="email"
                                       type="email"
                                       class="form-control" :class="{ 'is-invalid': errors.has('email') }"
                                       placeholder="Enter email"
                                       name="email"
                                       v-model="email"
                                       v-validate data-vv-rules="required|email">
                                <div class="invalid-feedback" :class="{ 'd-none': !errors.has('email') }">
                                    {{ errors.first('email') }}
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input id="password"
                                       ref="password"
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
                            <div class="form-group">
                                <label for="confirm-password">Confirm Password</label>
                                <input id="confirm-password"
                                       class="form-control"
                                       type="password"
                                       name="confirm_password"
                                       v-model="confirm_password"
                                       placeholder="Confirm password"
                                       v-validate
                                       data-vv-rules="required|confirmed:password"
                                       data-vv-as="password"
                                       :class="{ 'is-invalid': errors.has('confirm_password') }">
                                <div class="invalid-feedback" :class="{ 'd-none': !errors.has('confirm_password') }">
                                    {{ errors.first('confirm_password') }}
                                </div>
                            </div>
                        </div>
                        <hr>
                        <button type="submit" class="btn btn-primary btn-block">Registrarme</button>
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
        name: "Register",
        data() {
            return {
                firstname: '',
                lastname: '',
                email: '',
                birthday: '',
                password: '',
                confirm_password: '',
                error: null
            }
        },
        methods: {
            ...mapActions({
                login: authTypes.actions.login,
                register: authTypes.actions.register
            }),
            validateBeforeSubmit() {
                this.$validator.validateAll()
                    .then( result => {
                        if (result) {
                            // registrar nuevo usuario
                            this.register({
                                firstname: this.firstname,
                                lastname: this.lastname,
                                email: this.email,
                                password: this.password
                            }).then(
                                userRegistered => {
                                    // si registro ok, logea al nuevo usuario
                                    this.login({
                                        email: userRegistered.body.email,
                                        password: this.password
                                    }).then(
                                        user => {
                                            this.$router.push('/')
                                        },
                                        error => {
                                            this.error = true;
                                        }
                                    )
                                },
                                error => {
                                    this.error = true;
                                }
                            )
                        }
                    })
            }
        }
    }
</script>

<style scoped>
    .register {
        margin-top: 100px;
    }
</style>