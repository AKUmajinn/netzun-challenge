<template lang="pug">
  .container.row
    h1 Actualiza tu perfil
    .input-group
      input-text(
        type='text'
        v-model="name"
        placeholder="Nombre"
      )

      input-text(
        type='text'
        v-model="email"
        placeholder="email"
      )
      a.btn(
        href="#"
        @click="send()"
      ) Crear
      nuxt-link.btn.btn--ghost(
        :to="{ name: 'profile-change-password' }"
      ) Actualiza tu contraseña

</template>

<script>
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
    // obtive las capoñanias para poder realizar el filtro de la del usuario en el getter
    const company = await $axios.$get('/companies')
    store.commit('SET_DATA', { destination: 'companies', data: company })
  },

  data() {
    return {
      name: '',
      email: ''
    }
  },

  computed: {},

  watch: {},
  created() {},
  mounted() {},
  updated() {},
  methods: {
    async send() {
      // Intenta actualizar el usuario y redirige al index
      try {
        await this.$axios.$put('/users/me', {
          name: this.name,
          email: this.email
        })
        this.$router.push({ name: 'index' })
      } catch (error) {}
    }
  }
}
</script>
