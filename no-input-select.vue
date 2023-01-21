<template>
  <div
    :id="'no-input-text-' + autoId"
    class="no-lib"
    @click="componentClick"
  >
    <no-menu
      v-model="displayMenu"
      :items="items"
      :close-at-click="false"
      :multiple="multiple"
      @select="test"
    >
      <no-input-text
        :placeholder="placeholder"
        :disabled="true"
        :icon-right="displayMenu ? 'chevron-up' : 'chevron-down'"
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
      },
      multiple: {
        type: Boolean,
        default: false
      },
      textEntry: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      displayMenu (value) {
        if (value) {
          window.addEventListener('click', this.windowClick)
        } else {
          window.removeEventListener('click', this.windowClick)
        }
      }
    },
    methods: {
      windowClick (e) {
        const get_path = e.path || e.composedPath() || []
        if (get_path.findIndex(el => el.id === ('no-input-text-' + this.autoId)) === -1) {
          this.displayMenu = false
        }
      },
      componentClick (e) {
        const get_path = e.path || e.composedPath() || []
        if (this.displayMenu) {
          if (get_path.findIndex(el => el.className === 'menu-window') === -1) {
            this.displayMenu = false
          }
        } else {
          this.displayMenu = true
        }
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
    /* mounted () {
      if (this.displayMenu) window.addEventListener('click', this.windowClick)
    },
    beforeDestroy () {
      window.removeEventListener('click', this.windowClick)
    }, */
    data: () => ({
      displayMenu: false
    })
  }

</script>

<style scoped>

  .no-input-text,
  .no-input-text >>> *
  {
    cursor: pointer;
  }

</style>
