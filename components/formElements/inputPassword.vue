<template lang="pug">
  .input
    //- ( :class="{ 'input--has-error': findIfExistErrorInThisField(allErrors, name) }" )
    label.input__label(
      @click="setFocusToInput()"
    ) {{ placeholder }}
    //-  v-show="!findIfExistErrorInThisField(allErrors, name)"
    //-.input__error-caption
      span(
        v-for="(error, i) in rulers" :key="i"
        v-show="checkIfRuleIsNotComplied(allErrors, error.rule)"
      ) {{ error.message }}

    input(
      :ref="name"
      :name="name"
      :type='!showPass ? "password" : "text" '
      :value='value'
      @keyup.enter="$emit('enter', $event)"
      @input='updateValue'
      @change='updateValue'
      @blur="blur()"
      @focus="focus = true"
      :disabled='disabled'
      :id="id"

    )
      //-:class="{ 'error': findIfExistErrorInThisField(allErrors, name) }"
    //-.input__show-pass(
      :class="{ 'focus' : focus }"
      @click.prevent="showPass = !showPass"
    //-)
      icon-hide-pass(
        v-if="!showPass"
      )
      icon-show-pass(
        v-else
      )




</template>

<script>
import iconHidePass from '@/components/icons/hidePassword.vue'
import iconShowPass from '@/components/icons/showPassword.vue'

export default {
  components: {
    iconHidePass,
    iconShowPass
  },
  $_veeValidate: {
    name() {
      return this.name
    },
    value() {
      return this.value
    }
  },
  props: {
    id: {
      required: false,
      type: String
    },
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
  data() {
    return {
      focus: false,
      showPass: false
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
    },
    blur() {
      this.focus = false
      this.$emit('blur')
    }
  }
}
</script>
