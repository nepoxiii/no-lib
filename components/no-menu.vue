<template>
  <div
    :class="{ 'no-menu-open': localValue, fullWidth }"
    class="no-lib no-menu"
  >
    <div @click="componentClick">
      <slot />
    </div>
    <transition name="no-fade-zoom">
      <div v-show="localValue" class="menu-window">
        <span
          v-for="(item, index) in displayItems"
          :key="'item-' + index"
          :class="{ clickable: item.clickable, selected: findSelected === index }"
          @click="itemClick(item)"
        >
          <no-input-checkbox
            v-if="item.checkbox"
            v-model="item.checked"
            @input="v => itemCheck(item, v)"
          >
            {{ item.title }}
          </no-input-checkbox>
          <template v-else>
            {{ item.title }}
          </template>
        </span>
      </div>
    </transition>
  </div>
</template>

<script>

  import NoInputCheckbox from './form/no-input-checkbox.vue'
  import { modelInput } from 'assets/no-lib/mixins/model-input'

  export default {
    name: "no-menu",
    mixins: [modelInput],
    components: {
      NoInputCheckbox
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      items: {
        type: Array,
        default: () => []
      },
      selected: {
        type: [String, Number, Array],
        default: null
      },
      /* returnType: {
        type: String,
        default: 'value' // index / object / value
      }, */
      returnObject: {
        type: Boolean,
        default: false
      },
      closeAtClick: {
        type: Boolean,
        default: true
      },
      multiple: {
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
    },
    watch: {
      value (value) {
        if (value) {
          window.addEventListener('click', this.windowClick)
        } else {
          window.removeEventListener('click', this.windowClick)
        }
      },
    },
    methods: {
      getName (data) {
        return typeof data !== 'object' ? data : data[this.itemName]
      },
      getValue (data) {
        return String(typeof data !== 'object' ? data : data[this.itemValue])
      },
      itemClick ({ client_data, checkbox }) {
        const returnValue = this.returnObject || typeof client_data !== 'object'
          ? client_data
          : client_data.value
        if (returnValue !== undefined) {
          if (!this.multiple && !checkbox) {
            this.$emit('select', returnValue)
          }
          if (this.closeAtClick) {
            this.localValue = false
          }
        }
      },
      itemCheck ({ client_data, checkbox }, value) {
        if (this.localValue) {
          const returnValue = this.returnObject || typeof client_data !== 'object'
            ? client_data
            : client_data.value
          if (returnValue !== undefined) {
            if (this.multiple && checkbox) {
              const getArray = this.selected ? [...this.selected] : []
              const findIndex = getArray.findIndex(item => item === returnValue)
              if (findIndex === -1 && value) {
                getArray.push(returnValue)
              } else if (!value) {
                getArray.splice(findIndex, 1)
              }
              this.$emit('select', getArray)
            }
            if (this.closeAtClick) {
              this.localValue = false
            }
          }
        }
      },
      windowClick (e) {
        const get_path = e.path || e.composedPath() || []
        if (get_path.findIndex(el => typeof el.className === 'string' && el.className.split(' ').includes('no-menu')) === -1) {
          this.localValue = false
        }
      },
      componentClick () {
        this.localValue = !this.localValue
      },
    },
    computed: {
      findSelected () {
        if (!this.multiple) {
          return this.items.findIndex(item => typeof item !== 'object'
            ? String(item) === String(this.selected)
            : String(item[this.itemValue]) === String(this.selected)
          )
        } else {
          return false
        }
      }
    },
    created () {
      this.displayItems = this.items.map(client_data => {
        const clickable = client_data.clickable !== false
        const title = typeof client_data === 'object' ? client_data.name : client_data
        const checkbox = clickable && this.multiple
        const checked = checkbox && (this.selected || []).findIndex(item => this.getValue(client_data) === String(item)) !== -1
        return {
          client_data,
          title,
          checked,
          clickable,
          checkbox,
        }
      })
    },
    mounted () {
      if (this.value) window.addEventListener('click', this.windowClick)
    },
    beforeDestroy () {
      if (this.value) window.removeEventListener('click', this.windowClick)
    },
    data: () => ({
      displayItems: [],
      // selected: []
      // autoId: Math.floor(Math.random() * 999)
    })
  }

</script>

<style scoped>

  .no-menu
  {
    position: relative;
  }

  .menu-window
  {
    position: absolute;
    z-index: 20;
    box-shadow: 0 0 10px rgba(0,0,0,.2);
    margin-top: 5px;
    width: calc(100% - 10px);
    left: 5px;
    right: 5px;
    border-radius: 5px;
    padding: 5px;
    display: flex;
    flex-direction: column;
    background-color: white;
  }

  .menu-window:not(.fullWidth)
  {
    max-width: calc(500px - 10px);
  }

  .menu-window > *
  {
    padding: 5px 10px;
    background-color: white;
    transition: .2s;
  }

  .menu-window > *:first-child
  {
    border-radius: 3px 3px 0 0;
  }

  .menu-window > *:last-child
  {
    border-radius: 0 0 3px 3px;
  }

  .menu-window > *:not(:last-child)
  {
    border-bottom: 1px solid rgb(230,230,230);
  }

  .menu-window > *.clickable
  {
    cursor: pointer;
  }

  .menu-window > *.clickable:not(:has(.no-input-checkbox)):hover
  {
    background-color: rgba(var(--bleu-rgb), .3);
  }

  .menu-window > *.clickable:not(:has(.no-input-checkbox)):active
  {
    background-color: rgba(var(--bleu-rgb), .5);
  }

  .menu-window > *.selected:not(:has(.no-input-checkbox))
  {
    background-color: var(--bleu);
    color: white;
  }

  .menu-window > *.selected:not(:has(.no-input-checkbox)):hover
  {
    background-color: rgba(var(--bleu-rgb), .8);
  }

  .menu-window .no-input-checkbox
  {
    width: 100%;
  }

</style>
