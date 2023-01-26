<template>
  <label class="no-lib no-input-checkbox" @click="componentClick">
    <span class="container-no-input-checkbox">
      <span class="checkbox-case" :class="{ unselected: !localValue }">
        <transition name="fast-fade">
          <span v-if="localValue">👍</span>
        </transition>
      </span>
    </span>
    <span v-if="isSlot">
      <slot />
    </span>
    <input v-show="false" type="checkbox" v-model="localValue" @click.stop />
  </label>
</template>

<script>

  import { modelInput } from 'assets/no-lib/mixins/model-input'

  export default {
    name: "no-input-checkbox",
    mixins: [modelInput],
    props: {
      value: {
        type: Boolean,
        default: false
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
      }
    }
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
