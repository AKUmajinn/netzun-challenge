<template lang="pug">
  .c-login.container-fluid.row
    .c-login__image.col-xl-8
      img(src="https://placekitten.com/700/1000")
    .c-login__form.col-xl-4.col-s-12
      h1 Registro
      .input-group
        input-text(
          type='text'
          v-model="name"
          placeholder="Nombre"
        )
        input-text(
          type='text'
          v-model="email"
          placeholder="Email"
        )
        input-password(
          type='text'
          v-model="password"
          placeholder="contraseña"
        )
        input-password(
          type='text'
          v-model="rePassword"
          placeholder="Confirmar contraseña"
          @enter="send()"
        )
        a.btn(
          @click="send()"
          href="#"
        ) Entrar
</template>

<script>
import inputText from '@/components/formElements/inputText.vue'
import inputPassword from '@/components/formElements/inputPassword.vue'
export default {
  auth: 'guest',

  components: {
    inputText,
    inputPassword
  },

  data() {
    return {
      name: '',
      email: '',
      password: '',
      rePassword: ''
    }
  },
  methods: {
    async send() {
      const response = await this.$axios.post('/auth/signup', {
        name: this.name,
        email: this.email,
        password: this.password,
        passwordConfirmation: this.rePassword
      })

      this.$auth
        .setUserToken(response.data.sessionId)
        .then(() => this.$toast.success('User set!'))
    }
  }
}
</script>
