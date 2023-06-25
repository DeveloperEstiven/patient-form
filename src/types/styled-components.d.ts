import type { CSSProp } from 'styled-components'
import { ThemeType } from '../theme/theme'

declare module 'styled-components' {
  //eslint-disable-next-line
  export interface DefaultTheme extends ThemeType {}
}

declare module 'react' {
  interface DOMAttributes<T> {
    css?: CSSProp
  }
}
