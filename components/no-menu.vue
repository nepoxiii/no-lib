<template>
  <div
    :class="{ 'no-menu-open': localValue }"
    class="no-lib no-menu"
  >
    <div @click="componentClick">
      <slot />
    </div>
    <transition name="no-fade-zoom">
      <div v-if="localValue" class="menu-window">
        <span
          v-for="(item, index) in displayItems"
          :key="'item-' + index"
          :class="{ clickable: item.clickable }"
          @click="itemClick(item, index)"
        >
          <no-input-checkbox v-if="item.checkbox" v-model="selected[index]">
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
      /* selected: {
        type: Array,
        default: () => []
      }, */
      returnType: {
        type: String,
        default: 'value' // index / object / value
      },
      closeAtClick: {
        type: Boolean,
        default: true
      },
      multiple: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      value (value) {
        if (value) {
          window.addEventListener('click', this.windowClick)
        } else {
          window.removeEventListener('click', this.windowClick)
        }
      },
      selected (value) {
        this.$emit('select', value.reduce((res, selected, index) => {
          if (selected) res.push(index)
          return res
        }, []), true)
      }
    },
    methods: {
      itemClick ({ client_data, checkbox }, index) {
        if (!this.multiple && !checkbox) {
          this.$emit('select', { data: client_data, index })
        }
        if (this.closeAtClick) {
          this.localValue = false
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
    created () {
      this.items.forEach(client_data => {
        const clickable = typeof client_data === 'object' && client_data.value !== undefined
        const checkbox = clickable && this.multiple
        this.displayItems.push({
          client_data,
          title: typeof client_data === 'string' ? client_data : client_data.name,
          clickable,
          checkbox
        })
        this.selected.push(checkbox && client_data.selected)
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
      selected: []
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

  .menu-window .no-input-checkbox
  {
    width: 100%;
  }

</style>
