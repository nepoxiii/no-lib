<template>
  <span class="no-input-text" :class="{ fullWidth }">
    <label v-if="isSlot">
      <slot />
    </label>
    <span class="input-text">
      <input
        v-model="text"
        type="text"
        :placeholder="placeholder"
      />
    </span>
  </span>
</template>

<script>

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
      fullWidth: {
        type: Boolean,
        default: false
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
      }
    },
    created () {
      this.text = this.value
    },
    data: () => ({
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
    transition: .3s;
  }

  .no-input-text:not(.fullWidth) .input-text
  {
    max-width: 500px;
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

  .no-input-text label
  {
    padding: 0 5px;
  }

</style>
