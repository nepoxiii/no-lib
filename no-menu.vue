<template>
  <div class="no-lib no-menu">
    <slot />
    <transition name="fade">
      <div v-if="value" class="menu-window">
        <span
          v-for="(item, index) in items"
          :key="'item-' + index"
          :class="{ clickable: typeof item === 'object' ? item.value : false }"
          @click="itemClick(item)"
        >
          {{ typeof item === 'string' ? item : item.name }}
        </span>
      </div>
    </transition>
  </div>
</template>

<script>

  export default {
    name: "no-menu",
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
      }
    },
    methods: {
      itemClick (item) {
        this.$emit('select', item)
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
    box-shadow: 0 0 10px rgba(0,0,0,.2);
    margin-top: 5px;
    width: calc(100% - 10px);
    left: 5px;
    right: 5px;
    border-radius: 5px;
    padding: 5px;
    display: flex;
    flex-direction: column;
  }

  .menu-window > *
  {
    padding: 5px 10px;
    background-color: white;
    transition: .2s;
  }

  .menu-window > *:not(:last-child)
  {
    border-bottom: 1px solid rgb(230,230,230);
  }

  .menu-window > *.clickable
  {
    cursor: pointer;
  }

  .menu-window > *.clickable:hover
  {
    background-color: rgba(var(--bleu-rgb), .3);
  }

</style>
