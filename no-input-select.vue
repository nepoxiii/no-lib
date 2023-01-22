<template>
  <div class="no-lib no-input-select">
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
    methods: {
      test (e) {
        console.log(e)
      }
    },
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
