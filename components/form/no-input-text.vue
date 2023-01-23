<template>
  <span
    class="no-lib no-input-text"
    :class="{ fullWidth }"
    @click="componentClick"
  >
    <label v-if="isSlot">
      <slot />
    </label>
    <span class="input-text">
      <input
        v-model="localValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        @focus="e => $emit('focus', e)"
        @focusout="e => $emit('focusout', e)"
      />
      <span
        v-if="iconRight"
        class="icon-right"
        v-html="mdiIcon(iconRight, 'rgb(100,100,100)')"
      />
    </span>
  </span>
</template>

<script>

  import { mdiIcon } from '../../lib/mdi-icon'
  import { modelInput } from 'assets/no-lib/mixins/model-input'

  export default {
    name: "no-input-text",
    mixins: [modelInput],
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
      disabled: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
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
    methods: {
      componentClick (e) {
        this.$emit('click', e)
      }
    },
    computed: {
      isSlot () {
        return !!this.$slots?.default?.length
      },
    },
    data: () => ({
      mdiIcon,
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
    display: flex;
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

  .input-text input:focus,
  .no-menu-open .input-text input
  {
    box-shadow: 0 0 5px var(--bleu);
    border-color: var(--bleu);
  }

  .input-text:hover,
  .input-text:has(input:focus),
  .no-menu-open .input-text
  {
    background-color: rgba(var(--bleu-rgb), .3);
  }

  .input-text input::placeholder
  {
    color: rgb(210,210,210);
    transition: .2s;
  }

  .input-text input:not(:read-only):focus::placeholder
  {
    opacity: .2;
  }

  .input-text input:read-only::selection
  {
    background-color: transparent;
  }

  .input-text
  {
    user-select: none !important;
    outline: none !important;
    pointer-events:none !important;
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
  }

  .input-text:has(.icon-right) input
  {
    padding-right: 30px;
  }

</style>
