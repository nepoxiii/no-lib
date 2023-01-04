<template>
  <span class="all-hero-checkbox" @click="select">
    <span class="container-hero-checkbox">
      <span class="hero-checkbox" :class="{ unselected: !value }">
        <transition name="fast-fade">
          <span v-if="value">👍</span>
        </transition>
      </span>
    </span>
    <span v-if="isSlot">
      <slot />
    </span>
  </span>
</template>

<script>

  export default {
    name: "hero-checkbox",
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      select () {
        this.$emit('input', !this.value)
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

  .all-hero-checkbox
  {
    display: flex;
    align-items: center;
    column-gap: 10px;
    cursor: pointer;
    user-select: none;
    width: fit-content;
  }

  .container-hero-checkbox
  {
    padding: 5px;
    display: flex;
    width: fit-content;
    height: fit-content;
    border-radius: 10px;
    background-color: rgba(var(--bleu-rgb), 0);
    transition: .3s;
  }

  .all-hero-checkbox:hover .container-hero-checkbox
  {
    background-color: rgba(var(--bleu-rgb), .3);
  }

  .hero-checkbox
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

  .hero-checkbox:active
  {
    background-color: var(--bleu-2);
  }

  .hero-checkbox.unselected
  {
    box-shadow: 0 0 2px rgba(0,0,0,.7);
    background-color: white;
  }

  .hero-checkbox.unselected:active
  {
    background-color: rgb(220,220,220);
  }

</style>
