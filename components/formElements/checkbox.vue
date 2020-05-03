<template lang="pug">
  label.checkbox
    input(
      type="checkbox"
      :value='value'
      :checked="value"
      @change="$emit('onCheck', value)"
    )
    span.checkbox__box

</template>

<script>
// import { mapState } from 'vuex'
// import component from '@/components/component.vue'

export default {
  components: {
    // component
  },
  props: {
    value: Boolean
    // propierty: { required: false, type: String },
  },

  data() {
    return {
      aceptTerm: false
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
  methods: {}
}
</script>
