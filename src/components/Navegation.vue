<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">WAHM</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'incomes_view' }">
                        Incomes
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'expenditures_view' }">
                        Expenditures
                    </router-link>
                </li>
                <li class="nav-item" v-if="isLogged">
                    <a href="#" @click.prevent="_logout()">Logout</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import authTypes from '@/types/auth'
    export default {
        name: 'Navigation',
        methods: {
            ...mapActions({
                _logout: authTypes.actions.logout
            }),
            logout() {
                this._logout();
                this.$router.push({name: 'login'})
            },
        },
        computed: {
            ...mapGetters({
                isLogged: authTypes.getters.logged
            })
        }
    }
</script>