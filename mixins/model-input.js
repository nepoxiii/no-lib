export const modelInput = {
  // props: value
  watch: {
    localValue (newValue) {
      this.$emit('input', newValue)
    },
    value (value) {
      this.localValue = value
    }
  },
  created () {
    this.localValue = this.value
  },
  data: () => ({
    localValue: null
  })
}
