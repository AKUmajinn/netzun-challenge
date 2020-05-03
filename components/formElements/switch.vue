<template lang="pug">
  .switch(
    :class="{ 'switch--selected' : switchValue }"
  )
    input(
      type='checkbox'
      name="switch"
      v-model="switchValue"
    )
    label(
      for='switch'
      @click="switchValue = !switchValue"
    ) Toggle



</template>

<script>
export default {
  props: {
    initialValue: { required: false, type: Boolean }
  },
  data() {
    return {
      switchValue: this.initialValue
    }
  },
  computed: {},
  watch: {
    switchValue(val) {
      this.$emit('onSwitchValue', val)
    }
  },
  methods: {
    setSwitchValue() {
      this.$emit('onSwitchValue', this.switchValue)
    }
  }
}
</script>
