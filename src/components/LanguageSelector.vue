<template>
    <div class="btn-group">
        <button type="button" class="btn btn-sm btn-outline-light dropdown-toggle"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            ({{currentLanguage.label}})
        </button>
        <div class="dropdown-menu dropdown-menu-right">
            <button class="dropdown-item"
                    type="button"
                    :class="{ active: lang.value===currentLanguage.value }"
                    @click.prevent="updatelanguage(lang.value)"
                    v-for="lang in languages">
                {{lang.label}}
            </button>
        </div>
    </div>
</template>

<script>
    import globalTypes from '@/types/global'
    import {mapActions} from 'vuex'
    export default {
        name: "LanguageSelector",
        data () {
            return {
                selected_language: 'es',
                languages: [
                    { value: 'es', label: 'Español' },
                    { value: 'en', label: 'English' },
                ]
            }
        },
        methods: {
            ...mapActions({
                setLanguage: globalTypes.actions.changeLanguage
            }),
            updatelanguage(language) {
                this.selected_language = language;
                this.setLanguage(this.selected_language);
                this.$i18n.locale = this.selected_language;
            }
        },
        computed: {
            currentLanguage () {
                return this.languages.filter(
                    language => language.value === this.selected_language
                )[0];
            }
        }
    }
</script>

<style scoped>

</style>
