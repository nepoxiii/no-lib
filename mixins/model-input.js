export const modelInput = {
  // props: value
  watch: {
    localValue (newValue) {
      this.$emit('input', newValue)
    }
  },
  created () {
    this.localValue = this.value
  },
  data: () => ({
    localValue: null
  })
}
