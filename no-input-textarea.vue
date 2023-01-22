<template>
  <span class="no-lib no-input-textarea">
    <label v-if="isSlot">
      <slot />
    </label>
    <span class="input-textarea">
      <textarea
        v-model="text"
        :placeholder="placeholder"
        :rows="rows"
        :cols="cols"
      />
    </span>
  </span>
</template>

<script>

  export default {
    name: "no-input-textarea",
    props: {
      value: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      },
      rows: {
        type: [String, Number],
        default: 5
      },
      cols: {
        type: [String, Number],
        default: 50
      }
    },
    computed: {
      isSlot () {
        return !!this.$slots?.default?.length
      },
      text: {
        get () {
          return this.value
        },
        set (value) {
          this.$emit('input', value)
        }
      }
    }
  }

</script>

<style scoped>

  .no-input-textarea
  {
    display: flex;
    flex-direction: column;
    column-gap: 10px;
    width: 100%;
  }

  .input-textarea
  {
    /*
     * 'hit-box' bug
     * padding-bottom: 0;
     */
    padding: 5px 5px 0;
    background-color: rgba(var(--bleu-rgb), 0);
    border-radius: 10px;
    transition: .3s;
  }

  .input-textarea textarea
  {
    padding: 5px 12px;
    border-radius: 7px;
    background-color: white;
    box-shadow: 0 0 2px rgba(0,0,0,.7);
    border: 1px solid white;
    width: 100%;
    transition: all .3s, width 0s, height 0s;
  }

  .input-textarea textarea:focus
  {
    box-shadow: 0 0 5px var(--bleu);
    border-color: var(--bleu);
  }

  .input-textarea:hover,
  .input-textarea:has(textarea:focus)
  {
    background-color: rgba(var(--bleu-rgb), .3);
  }

  .input-textarea textarea::placeholder
  {
    color: rgb(210,210,210);
    transition: .2s;
  }

  .input-textarea textarea:focus::placeholder
  {
    opacity: .2;
  }

  .no-input-textarea label
  {
    padding: 0 5px;
  }

</style>
