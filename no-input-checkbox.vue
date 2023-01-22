<template>
  <label class="no-lib no-input-checkbox">
    <span class="container-no-input-checkbox">
      <span class="checkbox-case" :class="{ unselected: !model }">
        <transition name="fast-fade">
          <span v-if="model">👍</span>
        </transition>
      </span>
    </span>
    <span v-if="isSlot">
      <slot />
    </span>
    <input v-show="false" type="checkbox" v-model="model" />
  </label>
</template>

<script>

  export default {
    name: "no-input-checkbox",
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      model (value) {
        this.value_input = value
      }
    },
    computed: {
      isSlot () {
        return !!this.$slots?.default?.length
      },
      value_input: {
        get () {
          return this.value
        },
        set (value) {
          this.$emit('input', value)
        }
      }
    },
    data: () => ({
      model: false
    })
  }

</script>

<style scoped>

  .no-input-checkbox
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

  .no-input-checkbox:hover .container-no-input-checkbox
  {
    background-color: rgba(var(--bleu-rgb), .3);
  }

  .checkbox-case
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

  .checkbox-case:active
  {
    background-color: var(--bleu-2);
  }

  .checkbox-case.unselected
  {
    box-shadow: 0 0 2px rgba(0,0,0,.7);
    background-color: white;
  }

  .checkbox-case.unselected:active
  {
    background-color: rgb(220,220,220);
  }

</style>
