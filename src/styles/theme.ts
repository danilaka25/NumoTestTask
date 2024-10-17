const colors = {
  main: '#9763FF',
  second: '#EAE0FF',
  grey: '#C1C3C6',
  lightGray: '#E6E6E6',
  black: '#000000',
  white: '#FFFFFF',
};

const fonts = {
  bold: 'Inter-SemiBold',
  medium: 'Inter-Regular',
};

const fontSizes = {
  small: 12,
  medium: 16,
  large: 24,
  maximum: 36,
};

export const lightTheme = {
  colors,
  fonts,
  fontSizes,
};

export const darkTheme = {
  ...lightTheme,
  // no dark styles yet
};

export type AppTheme = typeof lightTheme;
