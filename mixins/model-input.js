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
    console.log(this.value)
    this.localValue = this.value
  },
  data: () => ({
    localValue: null
  })
}
