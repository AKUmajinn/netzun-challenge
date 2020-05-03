<template lang="pug">
  .container
    //- Solo muetsra la opcion de crear una empresa en caso que el usuario no tenga una
    .row(
      v-if="user.companyId === null || user.companyId === undefined "
    )
      .header
        h1 Bienvenido
          small Escoge la compañia a la que perteneces

        nuxt-link.btn(
          :to="{ name: 'companies-add' }"
        ) Crear una nueva
    .row
      h2 Listado de Compañias

    .row
      ul.card-list(
        v-if="companies.length > 0"
      )

        company-card(
          v-for="company in companies" :key="company.id"
          :company="company"
        )

      div(
        v-else
      ) Aun no hay compañias registradas

</template>

<script>
import { mapState } from 'vuex'
import companyCard from '@/components/companyCard.vue'

export default {
  layout: 'auth',
  components: {
    companyCard
  },
  props: {
    // propierty: { required: false, type: String },
  },
  async fetch({ store, $axios, params, redirect }) {
    // obtiene las compañias en el server side
    const data = await $axios.$get('/companies')
    store.commit('SET_DATA', { destination: 'companies', data })
  },

  data() {
    return {
      data: ''
    }
  },

  computed: {
    ...mapState({
      companies: (state) => state.companies,
      user: (state) => state.auth.user
    })
  },

  watch: {},
  created() {},
  mounted() {},
  updated() {},
  methods: {}
}
</script>
