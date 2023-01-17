import {makeTheme} from 'dripsy';

const fontName = 'Avenir';

export const theme = makeTheme({
  colors: {
    $text: '#020202',
    $background: '#F8F8F8',
    $primary: '#334FFA',
    $textSecondary: '#9B9898',
    $white: '#FFFFFF',
    $green: '#00B833',
    $red: '#FF0000',
  },
  space: {
    // recommended: set 0 first, then double for consistent nested spacing
    $0: 0,
    $1: 4,
    $2: 8,
    $3: 16,
    $4: 32,
    $5: 64,
    $6: 128,
    $7: 256,
  },
  fontSizes: {
    $0: 12,
    $1: 14,
    $2: 16,
    $3: 18,
    $4: 24,
    $5: 28,
    $6: 32,
  },
  customFonts: {
    [fontName]: {
      bold: 'Avenir-Heavy',
      default: fontName,
      normal: fontName,
      300: 'Avenir-Light',
      400: fontName,
      500: 'Avenir-Medium',
      600: 'Avenir-Heavy',
      700: 'Avenir-Heavy',
      800: 'Avenir-Black',
      900: 'Avenir-Black',
    },
  },
  fonts: {
    root: fontName,
  },
  text: {
    body: {
      fontFamily: fontName,
      color: '$text',
    },
    label: {
      color: '$textSecondary',
      fontWeight: '800',
      py: 20,
      fontSize: 14,
    },
    h1: {
      fontWeight: '800',
    },
    h2: {
      fontWeight: '800',
    },
  },
  shadows: {
    sm: {
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowRadius: 2,
      shadowColor: 'rgba(0, 0, 0, 0.5)',
      shadowOpacity: 1,
      elevation: 2,
    },
    md: {
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowRadius: 4,
      shadowColor: 'rgba(0, 0, 0, 0.5)',
      shadowOpacity: 1,
      elevation: 4,
    },
  },
  layout: {
    screen: {
      flex: 1,
      backgroundColor: '$background',
    },
    container: {
      flex: 1,
      paddingHorizontal: 20,
    },
  },
});

type MyTheme = typeof theme;

declare module 'dripsy' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DripsyCustomTheme extends MyTheme {}
}
