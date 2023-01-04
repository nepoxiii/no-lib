<template>
  <span class="hero-text-field" :class="{ fullWidth }">
    <span v-if="isSlot">
      <slot />
    </span>
    <span class="text-field">
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
    name: "hero-checkbox",
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

  .hero-text-field
  {
    display: flex;
    flex-direction: column;
    column-gap: 10px;
  }

  .text-field
  {
    padding: 5px;
    background-color: rgba(var(--bleu-rgb), 0);
    border-radius: 10px;
    transition: .3s;
  }

  .hero-text-field:not(.fullWidth) .text-field
  {
    max-width: 500px;
  }

  .text-field input
  {
    padding: 5px 12px;
    border-radius: 7px;
    background-color: white;
    box-shadow: 0 0 2px rgba(0,0,0,.7);
    border: 1px solid white;
    width: 100%;
    transition: .3s;
  }

  .text-field input:focus
  {
    box-shadow: 0 0 5px var(--bleu);
    border-color: var(--bleu);
  }

  .text-field:hover,
  .text-field:has(input:focus)
  {
    background-color: rgba(var(--bleu-rgb), .3);
  }

  .text-field input::placeholder
  {
    transition: .2s;
  }

  .text-field input:focus::placeholder
  {
    opacity: .3;
  }

</style>
