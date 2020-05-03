<template lang="pug">
  .select(
    :class="organizationClass"
  )
    label.select__label(
      v-show="!findIfExistErrorInThisField(allErrors, name)"
    ) {{ placeholder }}
    .select__error-caption
      span(
        v-for="(error, i) in rulers" :key="i"
        v-show="checkIfRuleIsNotComplied(allErrors, error.rule)"
      ) {{ error.message }}
    //-- hide
    select
      option(
        v-for="(option, key) in options" :key="key"
        :value="option.value"
      ) {{ option.name }}
    //-- hide

    .select__content(
      @click="open = !open"
    )
      span {{ title }}
        triangle-down-icon
      ul
        li.select__option(
          v-for="(option, key) in options" :key="key"
          :class="{ 'select__option-active' : key === selectedIndex }"
          @click.prevent="selectThisOption(option, key)"
        ) {{ option.name }}

</template>

<script>
import triangleDownIcon from '@/components/icons/triangleDown.vue'

export default {
  /* eslint-disable vue/require-default-prop */
  components: {
    triangleDownIcon
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
    options: { required: false, type: Array },
    organization: { required: false, type: String },
    placeholder: { required: false, type: String },
    name: {
      required: false,
      type: String
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
      open: false,
      selectedOption: null,
      selectedIndex: null
    }
  },
  computed: {
    title() {
      return this.selectedOption === null ? '------' : this.selectedOption.name
    },
    organizationClass() {
      const cssClass = {
        'select--open': this.open,
        'select--has-error': this.findIfExistErrorInThisField(
          this.allErrors,
          this.name
        )
      }
      cssClass['select--' + this.organization] = true
      return cssClass
    }
  },

  watch: {},
  created() {},
  mounted() {},
  updated() {},
  methods: {
    selectThisOption(option, key) {
      this.selectedOption = option
      this.selectedIndex = key
      // this.open = false
      this.$emit('input', option.value)
      console.log('hey')
    }
  }
}
</script>
