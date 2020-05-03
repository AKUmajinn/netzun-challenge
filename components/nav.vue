<template lang="pug">
  .nav
    p Brand

    ul
      li
        nuxt-link(
          :to="{ name: 'index' } "
        ) Productos
      li
        nuxt-link(
          :to="{ name: 'companies' } "
        ) Compañias

    p.user-menu Hola!,
      a(
        href="#"
        @click.preveny="showLogout = !showLogout"
      )   {{ user.name }}

      ul(
        v-show="showLogout"
      )
        li
          a(
            @click="logOut()"
          ) Desconectarse
        li
          nuxt-link(
            :to="{ name: 'profile-edit'} "
          ) Editar perfil

</template>

<script>
import { mapState } from 'vuex'
import inputText from '@/components/formElements/inputText.vue'

export default {
  components: {
    inputText
  },
  props: {
    // propierty: { required: false, type: String },
  },

  data() {
    return {
      showLogout: false
    }
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user
    })
  },

  watch: {},
  created() {},
  mounted() {},
  updated() {},
  methods: {
    async logOut() {
      try {
        await this.$auth.logout()
        this.$router.push({ name: 'login' })
      } catch (error) {}
    }
  }
}
</script>
