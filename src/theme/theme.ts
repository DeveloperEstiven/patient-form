export type ThemeType = typeof theme

export const theme = {
  font: 'Roboto',

  colors: {
    body: '#f0f8ff',
    font: '#768798',
    primary: '#1f8fff',
    danger: '#e74d3c',
  },
} as const
