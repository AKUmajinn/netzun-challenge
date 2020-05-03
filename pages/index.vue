<template lang="pug">
  .container
    .row
      .header
        h1 {{ userCompany[0].name }}
          small {{ userCompany[0].ruc }}

        a.btn(
          @click.prevent="leaveCompany()"
        ) Dejar Compañia
    .row
      .col-xl-12
        .header
          h2 Productos
          nuxt-link.btn(
            :to="{ name: 'products-add' }"
          ) Agregar producto

        ul.card-list(
          v-if="products.length > 0"
        )
          product-card(
            v-for="product in products" :key="product.id"
            :product="product"
          )
        div(v-else) Tu compañia aun no tiene productos

</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import productCard from '@/components/productCard.vue'
export default {
  layout: 'auth',

  components: {
    productCard
  },
  async fetch({ store, $axios, params, redirect }) {
    // En el caso de en el server side, encontrar que el usuario no tiene compañia, mandarlo a el registro de, de lo contrario TODO:

    if (
      store.state.auth.user.companyId === undefined ||
      store.state.auth.user.companyId === null
    ) {
      redirect('/companies')
    } else {
      const company = await $axios.$get('/companies')
      store.commit('SET_DATA', { destination: 'companies', data: company })

      const products = await $axios.$get('/products')
      store.commit('SET_DATA', { destination: 'products', data: products })
    }
  },
  data() {
    return {
      email: '',
      password: '',
      searchString: ''
    }
  },
  computed: {
    ...mapState({
      products: (state) => state.products
    }),
    ...mapGetters({
      userCompany: 'userCompany'
    })
  },
  methods: {
    ...mapActions({
      set_data: 'set_data'
    }),

    async leaveCompany() {
      try {
        await this.$axios.$post('/companies/leave')
        const user = await this.$axios.$get('/users/me')
        this.$auth.setUser(user)
        this.$router.push({ name: 'companies' })
      } catch (error) {}
    }
  }
}
</script>
