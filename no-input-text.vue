<template>
  <span class="no-lib no-input-text" :class="{ fullWidth }">
    <label v-if="isSlot">
      <slot />
    </label>
    <span class="input-text">
      <input
        v-model="text"
        :type="type"
        :placeholder="placeholder"
        @focus="e => $emit('focus', e)"
        @focusout="e => $emit('focusout', e)"
      />
      <span v-if="iconRight" class="icon-right" v-html="mdiIcon(iconRight, 'rgb(70,70,70)')" />
    </span>
  </span>
</template>

<script>

  import { mdiIcon } from './mdi-icon'

  export default {
    name: "no-input-text",
    props: {
      value: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'text'
      },
      fullWidth: {
        type: Boolean,
        default: false
      },
      iconRight: {
        type: String,
        default: null
      }
    },
    watch: {
      text (value) {
        this.$emit('input', value)
      }
    },
    computed: {
      isSlot () {
        return !!this.$slots?.default?.length
      },
    },
    created () {
      this.text = this.value
    },
    data: () => ({
      mdiIcon,
      text: ''
    })
  }

</script>

<style scoped>

  .no-input-text
  {
    display: flex;
    flex-direction: column;
    column-gap: 10px;
  }

  .input-text
  {
    padding: 5px;
    background-color: rgba(var(--bleu-rgb), 0);
    border-radius: 10px;
    position: relative;
    transition: .3s;
  }

  .no-input-text:not(.fullWidth) .input-text
  {
    max-width: 500px;
  }

  .no-input-text label
  {
    padding: 0 5px;
  }

  .input-text input
  {
    padding: 5px 12px;
    border-radius: 7px;
    background-color: white;
    box-shadow: 0 0 2px rgba(0,0,0,.7);
    border: 1px solid white;
    width: 100%;
    transition: .3s;
  }

  .input-text input:focus
  {
    box-shadow: 0 0 5px var(--bleu);
    border-color: var(--bleu);
  }

  .input-text:hover,
  .input-text:has(input:focus)
  {
    background-color: rgba(var(--bleu-rgb), .3);
  }

  .input-text input::placeholder
  {
    color: rgb(210,210,210);
    transition: .2s;
  }

  .input-text input:focus::placeholder
  {
    opacity: .2;
  }

  .icon-right
  {
    position: absolute;
    right: 10px;
    top: 0;
    bottom: 0;
    margin: auto;
    height: 25px;
    width: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 100px;
    font-size: .8em;
    color: rgb(80,80,80);
    box-shadow: 0 0 5px rgba(255,255,255,1);
  }

</style>
