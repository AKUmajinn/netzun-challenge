<template lang="pug">
  .container.row
    h1 Cambia tu contraseña
    .input-group
      input-password(
        type='text'
        v-model="oldPassword"
        placeholder="Contraseña actual"
      )
      input-password(
        type='text'
        v-model="newPassword"
        placeholder="Contraseña nUEVA"
      )

      input-password(
        type='text'
        v-model="rePassword"
        placeholder="cONFIRMA LA NUEVA CONTRASEÑA"
      )
      a.btn(
        href="#"
        @click="send()"
      ) Crear
      a.btn.btn--ghost(
        href="#"
        @click="send()"
      ) Actualiza tu contraseña

</template>

<script>
import inputPassword from '@/components/formElements/inputPassword.vue'

export default {
  layout: 'auth',
  components: {
    inputPassword
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
      oldPassword: '',
      newPassword: '',
      rePassword: ''
    }
  },

  computed: {},

  watch: {},
  created() {},
  mounted() {},
  updated() {},
  methods: {
    async send() {
      // Intenta actualizar la contraseña y redirige al index
      try {
        await this.$axios.$put('/users/me/change_password', {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
          newPasswordConfirmation: this.newPasswordConfirmation
        })
        this.$router.push({ name: 'index' })
      } catch (error) {}
    }
  }
}
</script>
