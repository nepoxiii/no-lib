<template>
  <div class="no-lib no-input-select">
    <no-menu
      v-model="displayMenu"
      :items="items"
      :close-at-click="false"
      :multiple="multiple"
      @select="select"
    >
      <no-input-text
        v-model="textDisplay"
        :placeholder="placeholder"
        :readonly="true"
        :icon-right="displayMenu ? 'chevron-up' : 'chevron-down'"
      >
        <slot />
      </no-input-text>
    </no-menu>
  </div>
</template>

<script>

  import NoInputText from './no-input-text.vue'
  import NoMenu from '../no-menu.vue'
  // import { modelInput } from 'assets/no-lib/mixins/model-input'

  export default {
    name: "no-input-select",
    // mixins: [modelInput],
    components: {
      NoMenu,
      NoInputText
    },
    props: {
      value: {
        type: [String, Number],
        default: null
      },
      items: {
        type: Array,
        default: () => []
      },
      returnType: {
        type: String,
        default: 'value' // index / object / value
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
      },
      /* clearable: {
        type: Boolean,
        default: false
      } */
    },
    watch: {
      localValue ({ item, index }) {
        switch (this.returnType) {
          case 'value':
            this.$emit('input', typeof item === 'object' ? item.value : item)
            break
          case 'index':
            this.$emit(index)
            break
          case 'object':
          default:
            this.$emit(item)
            break
        }
        this.textDisplay = item === null
          ? ''
          : this.textDisplay = typeof item === 'object'
            ? item.name !== undefined
              ? item.name
              : item.value
            : item
      }
    },
    methods: {
      select (item, index) {
        console.log(item, index)
        this.localValue = { item, index }
      }
    },
    data: () => ({
      displayMenu: false,
      textDisplay: '',
      localValue: null
      // returnValueMultiple: []
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
