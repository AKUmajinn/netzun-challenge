<template lang="pug">
  .input(
    :class="{ 'input--has-error': findIfExistErrorInThisField(allErrors, name) }"
  )
    label.input__label(
      v-if="placeholder"
      v-show="!findIfExistErrorInThisField(allErrors, name)"
      @click="setFocusToInput()"
    ) {{ placeholder }}

    .input__error-caption
      span(
        v-for="(error, i) in rulers" :key="i"
        v-show="checkIfRuleIsNotComplied(allErrors, error.rule)"
      ) {{ error.message }}

    input(
      :ref="name"
      :name="name"
      type='text'
      :value='value'
      @keypress="mixinjustAllowNumbers($event)"
      @input='updateValue'
      @change='updateValue'
      @blur="$emit('blur')"
      :disabled='disabled'
    )





</template>

<script>
export default {
  $_veeValidate: {
    name() {
      return this.name
    },
    value() {
      return this.value
    }
  },
  props: {
    value: String,
    inputStyle: {
      required: false,
      type: String
    },
    name: {
      required: false,
      type: String
    },

    placeholder: {
      required: false,
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    allErrors: {
      type: Array,
      required: false
    },
    rulers: {
      required: false,
      type: Array
    }
  },
  watch: {
    allErrors(val) {
      // console.log(val)
    }
  },
  methods: {
    updateValue(e) {
      this.$emit('input', e.target.value)
    },

    setFocusToInput() {
      this.$refs[this.name].focus()
    }
  }
}
</script>
