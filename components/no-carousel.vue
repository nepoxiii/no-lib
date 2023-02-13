<template>
  <div
    ref="no-carousel"
    class="no-lib no-carousel"
    :style="{ '--translate-flux': translateFlux }"
  >
    <div
      v-if="isSlot"
      class="no-carousel-container"
      @mousedown="mousedownFlux"
      @mousemove="mousemoveFlux"
    >
      <div :class="{ 'no-carousel-flux': defaultFlux }">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'no-carousel',
    props: {
      scrollX: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      mousedownFlux (e) {
        this.grabbing = true
        this.startPosition = {
          x: e.clientX,
          y: e.clientY
        }
      },
      mouseupFlux () {
        this.grabbing = false
        this.startPosition = null
      },
      mousemoveFlux (e) {
        if (this.grabbing) {
          // const scrollIndex = this.scrollX ? 'scrollLeft' : 'scrollTop'
          const translateIndex = this.scrollX ? 'translateX' : 'translateY'
          const positionIndex = this.scrollX ? 'clientX' : 'clientY'
          const positionStartIndex = this.scrollX ? 'x' : 'y'
          this.translateFlux = translateIndex + '(-' + (this.startPosition[positionStartIndex] - e[positionIndex]) + 'px)'
          // this.$refs['no-carousel'].getElementsByClassName('no-carousel-flux')[0][scrollIndex] = this.startPosition[positionStartIndex] - e[positionIndex]
          // console.log(this.startPosition[positionStartIndex], e[positionIndex], this.startPosition[positionStartIndex] - e[positionIndex])
        }
      }
    },
    computed: {
      isSlot () {
        return !!this.$slots?.default?.length
      },
      defaultFlux () {
        return !(this.$slots.default.length === 1 && this.$slots.default[0].data.class === 'no-carousel-flux')
      }
    },
    mounted () {
      window.addEventListener('mouseup', this.mouseupFlux)
    },
    beforeDestroy () {
      window.removeEventListener('mouseup', this.mouseupFlux)
    },
    data: () => ({
      grabbing: false,
      startPosition: null,
      translateFlux: 0
    })
  }

</script>

<style scoped>

  .no-carousel
  {
    width: 100%;
    --translate-flux: 0;
  }

  /*
   * slider container
   */
  .no-carousel-container
  {
    overflow: hidden;
    cursor: grab;
    white-space: nowrap;
    transform: var(--translate-flux);
    /* scroll-snap-type: x mandatory;
    scroll-padding: 0; */
  }

  /*
   * slider flux
   */
  .no-carousel-container:deep(.no-carousel-flux)
  {
    transform: var(--translate-flux);
  }

  /*
   * slide
   */
  .no-carousel-container:deep(.no-carousel-flux) > *
  {
    border: 3px solid #a63333;
    display: inline-block;
    width: 100%;
    /* scroll-snap-align: start; */
  }

  .no-carousel:has(> .no-carousel-flux),
  .no-carousel > *:has(> .no-carousel-flux)
  {
    display: grid;
    grid-template: auto / 1fr;
  }

</style>
