export const modelInput = {
  // props: value
  watch: {
    localValue (newValue, oldValue) {
      if (typeof this.value === 'boolean') {
        // type boolean (ex : checkbox) on vérifie simplement le changement
        if (!!newValue !== !!oldValue) this.$emit('input', newValue)
      } else if (oldValue === null) {
        // valeur initiale, on vérifie que la nouvelle n'est pas vide
        if (!!newValue) this.$emit('input', newValue)
      } else if (oldValue !== newValue) {
        // changement de valeur, on vérifie qu'elle change réellement
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
