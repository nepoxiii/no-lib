<template>
  <div class="no-lib no-input-select">
    <no-menu
      v-model="displayMenu"
      :items="items"
      :selected="localValue"
      :close-at-click="!multiple"
      :multiple="multiple"
      :return-object="returnObject"
      :item-value="itemValue"
      :item-name="itemName"
      @select="select"
    >
      <no-input-text
        :value="textDisplay"
        :placeholder="placeholder"
        :readonly="!text"
        :icon-right="displayMenu ? 'chevron-up' : 'chevron-down'"
        :full-width="fullWidth"
      >
        <slot />
      </no-input-text>
    </no-menu>
  </div>
</template>

<script>

  import NoInputText from './no-input-text.vue'
  import NoMenu from '../no-menu.vue'
  import { modelInput } from 'assets/no-lib/mixins/model-input'

  export default {
    name: "no-input-select",
    mixins: [modelInput],
    components: {
      NoMenu,
      NoInputText
    },
    props: {
      value: {
        type: [String, Number, Array],
        default: null
      },
      items: {
        type: Array,
        default: () => []
      },
      /* returnType: {
        type: String,
        default: 'value' // index / object / value
      }, */
      returnObject: {
        type: Boolean,
        default: false
      },
      placeholder: {
        type: String,
        default: ''
      },
      multiple: {
        type: Boolean,
        default: false
      },
      text: {
        type: Boolean,
        default: false
      },
      itemValue: {
        type: String,
        default: 'value'
      },
      itemName: {
        type: String,
        default: 'name'
      },
      fullWidth: {
        type: Boolean,
        default: false
      },
      /* clearable: {
        type: Boolean,
        default: false
      } */
    },
    methods: {
      select (value) {
        this.localValue = value
      },
      getName (data) {
        return typeof data !== 'object' ? data : data[this.itemName]
      },
      getValue (data) {
        return String(typeof data !== 'object' ? data : data[this.itemValue])
      },
    },
    computed: {
      textDisplay () {
        if (this.multiple) {
          return this.items
            .filter(item => (this.localValue || []).findIndex(ref_item => String(ref_item) === this.getValue(item)) !== -1)
            .map(item => this.getName(item))
            .join(', ')
        } else {
          return this.getName(this.items.find(item => String(this.localValue) === this.getValue(item)))
        }
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
