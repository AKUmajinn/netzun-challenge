<template lang="pug">
  .container.row
    h1 Editar producto
    .input-group
      input-text(
        type='text'
        v-model="name"
        placeholder="Nombre"
      )

      input-text(
        type='text'
        v-model="sku"
        placeholder="sku"
      )
      input-text(
        type='text'
        v-model="price"
        placeholder="Precio"
      )
      input-text(
        type='text'
        v-model="discount"
        placeholder="descuento"
      )
      a.btn(
        href="#"
        @click="send()"
      ) Crear

</template>

<script>
import { mapGetters } from 'vuex'
import inputText from '@/components/formElements/inputText.vue'

export default {
  layout: 'auth',
  components: {
    inputText
  },
  props: {
    // propierty: { required: false, type: String },
  },
  async fetch({ store, $axios, params, redirect }) {
    const company = await $axios.$get('/companies')
    store.commit('SET_DATA', { destination: 'companies', data: company })
  },

  data() {
    return {
      name: '',
      sku: '',
      price: '',
      discount: ''
    }
  },

  computed: {
    ...mapGetters({
      userCompany: 'userCompany'
    })
  },

  watch: {},
  created() {},
  mounted() {},
  updated() {},
  methods: {
    async send() {
      // Intenta el actualizar el producto y redirige al index
      try {
        await this.$axios.$put(`/products/${this.$route.params.id} `, {
          name: this.name,
          sku: this.sku,
          price: this.price,
          discount: this.discount
        })
        this.$router.push({ name: 'index' })
      } catch (error) {}
    }
  }
}
</script>
