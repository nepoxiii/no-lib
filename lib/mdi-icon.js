
const listMdiIcon = color => ({
  'menu-down': `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="${color}" d="M7,10L12,15L17,10H7Z" />
  </svg>`,
  'menu-up': `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="${color}" d="M7,15L12,10L17,15H7Z" />
  </svg>`,
  'chevron-down': `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="${color}" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
  </svg>`,
  'chevron-up': `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="${color}" d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" />
  </svg>`,
  'ticket-percent-outline': `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="${color}" d="M14.8 8L16 9.2L9.2 16L8 14.8L14.8 8M4 4H20C21.11 4 22 4.89 22 6V10C20.9 10 20 10.9 20 12C20 13.11 20.9 14 22 14V18C22 19.11 21.11 20 20 20H4C2.9 20 2 19.11 2 18V14C3.11 14 4 13.11 4 12C4 10.9 3.11 10 2 10V6C2 4.89 2.9 4 4 4M4 6V8.54C5.24 9.26 6 10.57 6 12C6 13.43 5.24 14.75 4 15.46V18H20V15.46C18.76 14.75 18 13.43 18 12C18 10.57 18.76 9.26 20 8.54V6H4M9.5 8C10.33 8 11 8.67 11 9.5C11 10.33 10.33 11 9.5 11C8.67 11 8 10.33 8 9.5C8 8.67 8.67 8 9.5 8M14.5 13C15.33 13 16 13.67 16 14.5C16 15.33 15.33 16 14.5 16C13.67 16 13 15.33 13 14.5C13 13.67 13.67 13 14.5 13Z" />
  </svg>`
})

export const mdiIcon = (slug, color) => listMdiIcon(color)[slug]