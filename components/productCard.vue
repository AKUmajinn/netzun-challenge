<template lang="pug">
  li.product-card
    img(
      src="https://placekitten.com/300/300"
    )
    .product-card__discount - {{ product.discount }}
    .product-card__content
      p.title {{ product.name }}
      p {{ product.price }}
      nuxt-link.btn.btn--ghost(
        :to="{ name: 'products-update-id', params: { id: product.id } }") Editar

</template>

<script>
import { mapState } from 'vuex'
// import component from '@/xcomponents/component.vue'

export default {
  components: {
    // component
  },
  props: {
    product: { required: false, type: Object }
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
  methods: {}
}
</script>
