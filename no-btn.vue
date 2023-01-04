<template>
  <button class="no-btn">

  </button>
</template>

<script>

  export default {
    name: "no-btn",
  }

</script>

<style scoped>

  .no-btn
  {
    width: fit-content;
    height: fit-content;
    background-color: var(--bleu);
    border-radius: 4px;
    padding: 5px 20px;
    color: white !important;
    cursor: pointer;
    position: relative;
    user-select: none;
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

  .no-btn:hover
  {
    color: var(--bleu) !important;
  }

  .no-btn:active
  {
    background-color: var(--bleu-2);
    color: var(--bleu-2) !important;
  }

  .no-btn:disabled
  {
    opacity: .5;
    filter: grayscale(100%);
  }

  .no-btn-danger
  {
    background-color: var(--rouge);
  }

  .no-btn-danger:hover
  {
    color: var(--rouge) !important;
  }

  .no-btn-danger:active
  {
    color: var(--rouge-2) !important;
    background-color: var(--rouge-2);
  }

  .no-btn-danger:after
  {
    content: '😈';
  }

  .no-btn-green
  {
    background-color: var(--vert);
  }

  .no-btn-green:hover
  {
    color: var(--vert) !important;
  }

  .no-btn-green:active
  {
    color: var(--vert-2) !important;
    background-color: var(--vert-2);
  }

  .no-btn-green:after
  {
    content: '🚀';
  }

  .no-btn-secondary
  {
    color: var(--bleu) !important;
    background-color: white;
  }

  .no-btn-secondary:hover
  {
    color: white !important;
  }

  .no-btn-secondary:active
  {
    color: rgb(240,240,240) !important;
    background-color: rgb(240,240,240);
  }

  .no-btn-big-danger
  {
    background-color: rgb(70,70,70);
  }

  .no-btn-big-danger:hover
  {
    color: rgb(70,70,70) !important;
  }

  .no-btn-big-danger:active
  {
    color: black !important;
    background-color: black;
  }

  .no-btn-big-danger:after
  {
    content: '💀';
  }

</style>
