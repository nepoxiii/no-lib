export const modelInput = {
  // props: value
  watch: {
    localValue (newValue, oldValue) {
      if (typeof this.value === 'boolean') {
        if (!!newValue !== !!oldValue) this.$emit('input', newValue)
      } else if (oldValue === null) {
        if (!!newValue) this.$emit('input', newValue)
      } else if (oldValue !== newValue) {
        this.$emit('input', newValue)
      }
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
