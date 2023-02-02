<template>
  <button
    class="no-lib no-btn"
    :class="{ loading }"
    :type="type"
    @click="e => $emit('click', e)"
  >
    <span>
      <slot />
    </span>
  </button>
</template>

<script>

  export default {
    name: "no-btn",
    props: {
      type: {
        type: String,
        default: null
      },
      loading: {
        type: Boolean,
        default: false
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
    font-weight: 500;
    color: var(--color);
    transition: .2s;
  }

  .no-btn:after
  {
    content: var(--emoji);
    position: absolute;
    inset: 0;
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

  .no-btn:before
  {
    content: '';
    height: 19px;
    width: 19px;
    background-color: transparent;
    border-width: 2px;
    border-color: transparent;
    border-style: solid;
    border-left-color: var(--color);
    border-top-color: var(--color);
    border-radius: 50px;
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    transition: .2s;
    animation: rotate-simple .4s reverse infinite linear;
    opacity: 0;
  }

  .no-btn.loading:before
  {
    opacity: 1;
  }

  .no-btn.loading span,
  .no-btn.loading:after
  {
    opacity: 0;
  }

  @keyframes rotate-simple {
    from { transform: rotate(360deg) }
    to { transform: rotate(0) }
  }

</style>
