<template lang="pug">
  li.company-card
    img(
      src="https://placekitten.com/300/300"
    )
    .company-card__content
      p.title {{ company.name }}
      p {{ company.ruc }}

      //- Solo muetsra la opcion de unirse a esta empresa en caso que el usuario no tenga una
      a.btn.btn--ghost(
        v-if="user.companyId === null || user.companyId === undefined"
        href="#"
        @click="join()"
      ) Unirse

</template>

<script>
import { mapState } from 'vuex'
// import component from '@/xcomponents/component.vue'

export default {
  components: {
    // component
  },
  props: {
    company: { required: false, type: Object }
  },

  data() {
    return {
      data: ''
    }
  },

  watch: {},

  computed: {
    ...mapState({
      user: (state) => state.auth.user
    })
  },
  created() {},
  mounted() {},
  updated() {},
  methods: {
    async join() {
      try {
        await this.$axios.$post('/companies/join', {
          companyId: this.company.id
        })

        const user = await this.$axios.$get('/users/me')
        this.$auth.setUser(user)
        this.$router.push({ name: 'index' })
      } catch (error) {}
    }
  }
}
</script>
