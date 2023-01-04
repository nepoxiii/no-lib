<template>
  <span class="all-no-input-checkbox" @click="select">
    <span class="container-no-input-checkbox">
      <span class="no-input-checkbox" :class="{ unselected: !value_input }">
        <transition name="fast-fade">
          <span v-if="value_input">👍</span>
        </transition>
      </span>
    </span>
    <span v-if="isSlot">
      <slot />
    </span>
    <input v-show="false" type="checkbox" v-model="value_input" />
  </span>
</template>

<script>

  import noStyle from './no-style.css'
  import { useCssVars } from 'vue'
  useCssVars(noStyle)

  export default {
    name: "no-input-checkbox",
    props: {
      value: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      select () {
        this.value_input = !this.value_input
        this.$emit('input', this.value_input)
      }
    },
    computed: {
      isSlot () {
        return !!this.$slots?.default?.length
      }
    },
    mounted () {
      this.value_input = this.value
    },
    data: () => ({
      value_input: false
    })
  }

</script>

<style scoped>

  .all-no-input-checkbox
  {
    display: flex;
    align-items: center;
    column-gap: 10px;
    cursor: pointer;
    user-select: none;
    width: fit-content;
  }

  .container-no-input-checkbox
  {
    padding: 5px;
    display: flex;
    width: fit-content;
    height: fit-content;
    border-radius: 10px;
    background-color: rgba(var(--bleu-rgb), 0);
    transition: .3s;
  }

  .all-no-input-checkbox:hover .container-no-input-checkbox
  {
    background-color: rgba(var(--bleu-rgb), .3);
  }

  .no-input-checkbox
  {
    box-shadow: 0 0 5px var(--bleu);
    border-radius: 7px;
    height: 1.6em;
    width: 1.6em;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1em;
    background-color: var(--bleu);
    transition: .3s;
  }

  .no-input-checkbox:active
  {
    background-color: var(--bleu-2);
  }

  .no-input-checkbox.unselected
  {
    box-shadow: 0 0 2px rgba(0,0,0,.7);
    background-color: white;
  }

  .no-input-checkbox.unselected:active
  {
    background-color: rgb(220,220,220);
  }

</style>
