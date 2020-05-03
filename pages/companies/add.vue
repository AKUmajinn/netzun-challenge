<template lang="pug">
  .container.row
    h1 Crear compañia

    .input-group
      input-text(
        type='text'
        v-model="name"
        placeholder="Nombre"
      )

      input-text(
        type='text'
        v-model="ruc"
        placeholder="ruc"
      )
      a.btn(
        href="#"
        @click="send()"
      ) Guardar

</template>

<script>
// import { mapState } from 'vuex'
import inputText from '@/components/formElements/inputText.vue'

export default {
  layout: 'auth',
  components: {
    inputText
  },
  props: {
    // propierty: { required: false, type: String },
  },

  data() {
    return {
      name: '',
      ruc: ''
    }
  },

  computed: {
    // ...mapState({
    // homeCampaign: state => state.homeCampaign
    // })
  },

  watch: {},
  created() {},
  mounted() {},
  updated() {},
  methods: {
    async send() {
      try {
        await this.$axios.$post('/companies/create_join', {
          name: this.name,
          ruc: this.ruc
        })
        const user = await this.$axios.$get('/users/me')
        this.$auth.setUser(user)
        this.$router.push({ name: 'index' })
      } catch (error) {}
    }
  }
}
</script>
