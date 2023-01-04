<template>
  <button class="no-btn">
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
    border: none;
    width: fit-content;
    height: fit-content;
    background-color: var(--bleu);
    border-radius: 4px;
    padding: 5px 20px;
    cursor: pointer;
    position: relative;
    user-select: none;
    min-height: 20px;
    min-width: 60px;
    transition: .2s;
  }

  .no-btn >>> *
  {
    color: white;
    transition: .2s;
  }

  .no-btn:after
  {
    content: '✋';
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
    color: var(--bleu);
  }

  .no-btn:active
  {
    background-color: var(--bleu-2);
  }

  .no-btn:active >>> *
  {
    color: var(--bleu-2);
  }

  .no-btn:disabled
  {
    opacity: .5;
    filter: grayscale(100%);
  }

  .no-btn.danger
  {
    background-color: var(--rouge);
  }

  .no-btn.danger:hover >>> *
  {
    color: var(--rouge);
  }

  .no-btn.danger:active
  {
    background-color: var(--rouge-2);
  }

  .no-btn.danger:active >>> *
  {
    color: var(--rouge-2);
  }

  .no-btn.danger:after
  {
    content: '😈';
  }

  .no-btn.green
  {
    background-color: var(--vert);
  }

  .no-btn.green:hover >>> *
  {
    color: var(--vert);
  }

  .no-btn.green:active
  {
    background-color: var(--vert-2);
  }

  .no-btn.green:active >>> *
  {
    color: var(--vert-2);
  }

  .no-btn.green:after
  {
    content: '🚀';
  }

  .no-btn.secondary
  {
    background-color: white;
  }

  .no-btn.secondary >>> *
  {
    color: var(--bleu);
  }

  .no-btn.secondary:hover >>> *
  {
    color: white;
  }

  .no-btn.secondary:active
  {
    background-color: rgb(240,240,240);
  }

  .no-btn.secondary:active >>> *
  {
    color: rgb(240,240,240);
  }

  .no-btn.big-danger
  {
    background-color: rgb(70,70,70);
  }

  .no-btn.big-danger:hover >>> *
  {
    color: rgb(70,70,70);
  }

  .no-btn.big-danger:active
  {
    background-color: black;
  }

  .no-btn.big-danger:active >>> *
  {
    color: black;
  }

  .no-btn.big-danger:after
  {
    content: '💀';
  }

</style>
