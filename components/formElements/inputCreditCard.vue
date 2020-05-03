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
      v-model="ccData"
      @keypress="mixinjustAllowNumbers($event)"
      @input='updateValue'
      @change='updateValue'
      @blur="$emit('blur')"
      :disabled='disabled'
      :id="id"
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
    id: {
      required: false,
      type: String
    },
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
  data() {
    return {
      ccData: this.value,
      type: ''
    }
  },
  watch: {
    ccData(val) {
      this.ccData = this.mixinAddSeparator(val, 'creditCard', ' ')
    }
  },
  methods: {
    updateValue(e) {
      this.$emit('input', e.target.value)

      this.setTypeOfCreditCard(e.target.value)
    },

    setFocusToInput() {
      this.$refs[this.name].focus()
    },
    setTypeOfCreditCard(val) {
      const valWithotSpaces = val.replace(/[^0-9.]/g, '')
      // this.type = window.payU.cardPaymentMethod(val)

      let re = new RegExp('^4')

      if (valWithotSpaces === '') {
        this.type = ''
        this.$emit('creditCardType', '')
      }

      // visa
      if (valWithotSpaces.match(re) != null) {
        this.type = 'visa'
        this.$emit('creditCardType', 'visa')
      }

      // Mastercard
      if (
        /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(
          valWithotSpaces
        )
      ) {
        this.type = 'mastercard'
        this.$emit('creditCardType', 'mastercard')
      }

      re = new RegExp('^3[47]')
      // American Express
      if (valWithotSpaces.match(re) != null) {
        this.type = 'amex'
        this.$emit('creditCardType', 'amex')
      }

      // Diners
      re = new RegExp('^36')
      if (valWithotSpaces.match(re) != null) {
        this.type = 'diners'
        this.$emit('creditCardType', 'diners')
      }
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
    }
  }
}
</script>
