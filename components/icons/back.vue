<template>
  <div class="icon">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <g>
        <rect
          width="24"
          height="24"
          transform="translate(24) rotate(90)"
          fill="#fff"
          opacity="0"
        />
        <path
          d="M19,11H7.14l3.63-4.36A1,1,0,0,0,9.23,5.36l-5,6a1.19,1.19,0,0,0-.09.15.127.127,0,0,1-.07.13.961.961,0,0,0,0,.72.127.127,0,0,0,.07.13,1.19,1.19,0,0,0,.09.15l5,6a1,1,0,1,0,1.54-1.28L7.14,13H19a1,1,0,0,0,0-2Z"
          fill="#fff"
        />
      </g>
    </svg>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
// import component from '@/components/component.vue'

export default {
  components: {
    // component
  },
  props: {
    // propierty: { required: false, type: String },
  },

  data() {
    return {
      data: ''
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
