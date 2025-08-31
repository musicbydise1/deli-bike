import { Jost } from 'next/font/google';
import { ORANGE_COLOR } from './colors';

// Define the font
export const jost = Jost({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  preload: true,
  fallback: ['Arial', 'sans-serif'],
  variable: '--font-jost',
});

// Import component themes
import { buttonTheme } from './components/button';

// Main theme configuration
export const theme = {
  fontFamily: jost.style.fontFamily || jost.style,
  fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: { fontFamily: jost.style.fontFamily || jost.style },
  colors: {
    primary: [
      ORANGE_COLOR,
      ORANGE_COLOR,
      ORANGE_COLOR,
      ORANGE_COLOR,
      ORANGE_COLOR,
      ORANGE_COLOR,
      ORANGE_COLOR,
      ORANGE_COLOR,
      ORANGE_COLOR,
      ORANGE_COLOR,
    ],
  },
  components: {
    Button: buttonTheme,
  },
};
