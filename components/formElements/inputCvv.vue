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
      v-model="cvvData"
      @keypress="mixinjustAllowNumbers($event)"
      @input='updateValue'
      @change='updateValue'
      @blur="$emit('blur')"
      :disabled='disabled'
      id="card[cvv]"
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
    cardType: {
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
  data() {
    return {
      cvvData: this.value,
      type: ''
    }
  },
  watch: {
    cvvData(val) {
      let cvvLenght = 3
      if (this.cardType === 'amex') {
        cvvLenght = 4
      }
      this.cvvData = this.mixinAddMaxLenght(val, cvvLenght)
    }
  },
  methods: {
    updateValue(e) {
      this.$emit('input', e.target.value)
    },

    setFocusToInput() {
      this.$refs[this.name].focus()
    },
    mixinAddSeparator(inputEntry, typeValidation, separtor) {
      const v = inputEntry.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
      let matches = ''
      let match = ''
      const parts = []
      switch (typeValidation) {
        case 'creditCard':
          matches = v.match(/\d{4,16}/g)
          match = (matches && matches[0]) || ''
          for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4))
          }
          break
        case 'expDate':
          matches = v.match(/\d{2,4}/g)
          match = (matches && matches[0]) || ''
          for (let i = 0, len = match.length; i < len; i += 2) {
            parts.push(match.substring(i, i + 2))
          }
          break
      }

      if (parts.length) {
        return parts.join(separtor)
      } else {
        return inputEntry
      }
    },
    mixinAddMaxLenght(inputEntry, length) {
      return inputEntry.substring(0, length)
    }
  }
}
</script>
