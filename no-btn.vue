<template>
  <button class="no-lib no-btn">
    <slot />
  </button>
</template>

<script>

  export default {
    name: "no-btn",
    computed: {
      isSlot () {
        return !!this.$slots?.default?.length
      }
    },
  }

</script>

<style scoped>

  .no-btn
  {
    --background-color: var(--bleu);
    --active-background-color: var(--bleu-2);
    --color: white;
    --emoji: '✋';

    width: fit-content;
    height: fit-content;
    background-color: var(--background-color);
    border-radius: 3px;
    padding: 5px 15px;
    border: none;
    /*
     * border: 1px solid var(--background-color)
     */
    box-shadow: 0 0 3px var(--background-color);
    cursor: pointer;
    position: relative;
    user-select: none;
    min-height: 20px;
    min-width: 60px;
    transition: .2s;
  }

  .no-btn >>> *
  {
    color: var(--color);
    font-weight: 600;
    font-size: .9em;
    transition: .2s;
  }

  .no-btn:after
  {
    content: var(--emoji);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: .3s;
  }

  .no-btn:hover:after
  {
    opacity: 1;
  }

  .no-btn:hover >>> *
  {
    color: transparent;
  }

  .no-btn:active
  {
    background-color: var(--active-background-color);
  }

  .no-btn:disabled
  {
    opacity: .5;
    filter: grayscale(100%);
  }

  .no-btn.danger
  {
    --background-color: var(--rouge);
    --active-background-color: var(--rouge-2);
    --emoji: '😈';
  }

  .no-btn.green
  {
    --background-color: var(--vert);
    --active-background-color: var(--vert-2);
    --emoji: '🚀';
  }

  .no-btn.big-danger
  {
    --background-color: rgb(70,70,70);
    --active-background-color: black;
    --emoji: '💀';
  }

  .no-btn.secondary
  {
    background-color: transparent;
    --color: var(--background-color);
  }

  .no-btn.tertiary
  {
    background-color: transparent;
    --color: var(--background-color);
    box-shadow: none;
    border: none;
    /*
     * border-color: transparent;
     */
  }

  .no-btn.white
  {
    background-color: white;
    --color: var(--background-color);
  }

  .no-btn.white.tertiary
  {
    /*
     * border-color: white;
     */
    box-shadow: 0 0 3px white;
  }

  .no-btn.flat
  {
    box-shadow: none;
    border: 1px solid var(--background-color);
  }

  .no-btn.flat.tertiary
  {
    border-color: transparent;
  }

  .no-btn.flat.tertiary.white
  {
    border-color: white;
  }

</style>
