import 'styled-components';
import { defaultTheme } from '../styles/theme/defaultTheme';

type ThemeType = typeof defaultTheme;

declare module 'styled-components' {
  export interface defaultTheme extends ThemeType {}
}