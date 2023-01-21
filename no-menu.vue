<template>
  <div class="no-lib no-menu">
    <slot />
    <transition name="no-fade-zoom">
      <div v-if="value" class="menu-window">
        <span
          v-for="(item, index) in items"
          :key="'item-' + index"
          :class="{ clickable: typeof item === 'object' ? item.value : false }"
          @click="itemClick(item)"
        >
          <no-input-checkbox v-if="multiple && typeof item === 'object' && item.value !== undefined">
            {{ typeof item === 'string' ? item : item.name }}
          </no-input-checkbox>
          <template v-else>
            {{ typeof item === 'string' ? item : item.name }}
          </template>
        </span>
      </div>
    </transition>
  </div>
</template>

<script>

  import NoInputCheckbox from './no-input-checkbox.vue'

  export default {
    name: "no-menu",
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
      closeAtClick: {
        type: Boolean,
        default: true
      },
      multiple: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      itemClick (item) {
        if (typeof item === 'string' || item.value !== undefined) {
          this.$emit('select', item)
        }
        if (this.closeAtClick) {
          this.display = false
          this.$emit('input', this.display)
        }
      }
    },
    mounted () {
      this.display = this.value
    },
    data: () => ({
      display: false
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
