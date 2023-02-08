<template>
  <div ref="no-carousel" class="no-lib no-carousel">
    <div
      v-if="isSlot"
      :class="{ 'no-carousel-flux': defaultFlux }"
      @mousedown="mousedownFlux"
      @mouseup="mouseupFlux"
      @mousemove="mousemoveFlux"
      @mouseleave="mouseupFlux"
    >
      <slot />
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
          const scrollIndex = this.scrollX ? 'scrollLeft' : 'scrollTop'
          const positionIndex = this.scrollX ? 'clientX' : 'clientY'
          const positionStartIndex = this.scrollX ? 'x' : 'y'
          this.$refs['no-carousel'].getElementsByClassName('no-carousel-flux')[0][scrollIndex] = this.startPosition[positionStartIndex] - e[positionIndex]
          console.log(this.startPosition[positionStartIndex], e[positionIndex], this.startPosition[positionStartIndex] - e[positionIndex])
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
    data: () => ({
      grabbing: false,
      startPosition: null
    })
  }

</script>

<style scoped>

  .no-carousel
  {
    width: 100%;
  }

  /*
   * slider flux
   */
  .no-carousel:deep(.no-carousel-flux)
  {
    background-color: #334ba6;
    overflow: auto;
    cursor: grab;
    white-space: nowrap;
    /* scroll-snap-type: x mandatory;
    scroll-padding: 0; */
  }

  /*
   * slide
   */
  .no-carousel:deep(.no-carousel-flux) > *
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
