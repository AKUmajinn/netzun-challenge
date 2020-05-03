<template lang="pug">
  .c-login.container-fluid.row
    .c-login__image.col-xl-8
      img(src="https://placekitten.com/700/1000")
    .c-login__form.col-xl-4.col-s-12
      h1 Login
      .input-group
        input-text(
          type='text'
          v-model="email"
          placeholder="Email"
        )
        input-password(
          type='text'
          v-model="password"
          placeholder="password"
          @enter="validate()"
        )
        a.btn(
          href="#"
          @click.prevent="send()"
        ) Entrar
        nuxt-link.btn.btn--ghost(
          :to="{ name: 'register' }"
        ) Registrate
</template>

<script>
import inputText from '@/components/formElements/inputText.vue'
import inputPassword from '@/components/formElements/inputPassword.vue'
export default {
  components: {
    inputText,
    inputPassword
  },
  layout: '',

  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async send() {
      // Intenta el login, y setea el token de forma manual a travez del auth module y redirige al index
      const data = {
        email: this.email,
        password: this.password
      }
      try {
        const response = await this.$auth.loginWith('local', {
          data
        })
        await this.$auth.setUserToken(response.data.sessionId)
        this.$router.push({ name: 'index' })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
