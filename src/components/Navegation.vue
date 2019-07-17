<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <router-link class="navbar-brand" :to="{ name: 'home' }">WAHM</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'incomes_view' }">
                        {{ $t('navigation.incomes') }}
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" :to="{ name: 'expenditures_view' }">
                        {{ $t('navigation.expenditures') }}
                    </router-link>
                </li>
                <li class="nav-item dropdown" v-if="user">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {{ user.data.firstname }} {{ user.data.lastname }}
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" href="#"  @click.prevent="logout()">
                            {{ $t('navigation.logout') }}
                        </a>
                    </div>
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
                isLogged: authTypes.getters.logged,
                user: authTypes.getters.user
            })
        }
    }
</script>
