<template>
  <div
    :id="'no-input-select-' + autoId"
    class="no-lib"
    @click="displayMenu = true"
  >
    <no-menu
      v-model="displayMenu"
      :items="items"
      :close-at-click="false"
      @select="test"
    >
      <no-input-text
        ref="no-input-text"
        :placeholder="placeholder"
      >
        <slot />
      </no-input-text>
    </no-menu>
  </div>
</template>

<script>

  import NoInputText from './no-input-text.vue'
  import NoMenu from './no-menu.vue'

  export default {
    name: "no-input-select",
    components: {
      NoMenu,
      NoInputText
    },
    props: {
      value: {
        default: null
      },
      items: {
        type: Array,
        default: () => []
      },
      placeholder: {
        type: String,
        default: ''
      }
    },
    methods: {
      windowClick (e) {
        if (e.path.findIndex(el => el.id === ('no-input-select-' + this.autoId)) === -1) this.displayMenu = false
      },
      test (e) {
        console.log(e)
      }
    },
    computed: {
      autoId () {
        return Math.floor(Math.random() * 999);
      }
    },
    mounted () {
      window.addEventListener('click', this.windowClick)
    },
    beforeDestroy () {
      window.removeEventListener('click', this.windowClick)
    },
    data: () => ({
      displayMenu: true
    })
  }

</script>

<style scoped>

</style>
