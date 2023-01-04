
const listMdiIcon = color => ({
  'menu-down': `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="${color}" d="M7,10L12,15L17,10H7Z" />
  </svg>`
})

export const mdiIcon = (slug, color) => listMdiIcon(color)[slug]
