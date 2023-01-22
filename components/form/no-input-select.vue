<template>
  <div class="no-lib no-input-select">
    <no-menu
      v-model="displayMenu"
      :items="items"
      :selected="multiple ? localMultipleValues : localValue"
      :close-at-click="false"
      :multiple="multiple"
      :return-type="returnType"
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

  export default {
    name: "no-input-select",
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
      value () {
        if (this.multiple) {
          this.localMultipleValues = this.value
        } else {
          this.localValue = this.value
        }
      },
      localValue ({ data, index }) {
        let res = data
        switch (this.returnType) {
          case 'value':
            res = typeof data === 'object' ? data.value : data
            break
          case 'index':
            res = index
            break
          /* case 'object':
          default:
            res = item
            break */
        }
        this.updateTitle(data)
        this.$emit('input', res)
      },
      localMultipleValues (items) {
        const res_emit = []
        const res_title = []
        if (items) {
          items.forEach(item => {
            if (this.returnType === 'value' && typeof this.items[item] === 'object') {
              res_emit.push(this.items[item].value)
              res_title.push(this.titleItem(this.items[item]))
            }
          })
        }
        this.textDisplay = res_title.join(', ')
        console.log(res_emit)
        this.$emit('input', res_emit)
      }
    },
    methods: {
      select (value, multiple) {
        if (!!multiple) {
          this.localMultipleValues = value
        } else {
          this.localValue = value
        }
      },
      titleItem (item) {
        return item === null
          ? ''
          : typeof item === 'object'
            ? item.name !== undefined
              ? item.name
              : item.value
            : item
      },
      updateTitle (data) {
        this.textDisplay = this.titleItem(data)
      }
    },
    created () {
      if (this.multiple) {
        // console.log(this.value)
        this.localMultipleValues = this.value
      } else {
        this.localValue = this.value
      }
    },
    data: () => ({
      displayMenu: false,
      textDisplay: '',
      localValue: null,
      localMultipleValues: []
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
