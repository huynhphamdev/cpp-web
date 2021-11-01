const colors = {
  primary: '#22A183',
  secondary: '#22A183',
  greenMinus1: 'rgba(34, 161, 131, 0.07)',
  green1: '#22A283',
  green2: '#1B9578',
  black1: '#0A1835',
  black2: '#1E1E1E',
  whiteMinus1: 'rgba(255, 255, 255, 0.5)',
  white: '#FFFFFF',
  redMinus1: 'rgba(255, 79, 79, 0.07)',
  red1: '#FF4F4F',
  red2: '#F43B3B',
  greyMinus1: '#FAFBFC',
  grey1: '#F4F4F4',
  grey2: '#E5E5E5',
  grey3: '#C4C4C4',
  yellow1: '#FFC107',
  code1: '#00D8E6',
  code2: '#7000FF',
  code3: '#FF4F4F',
  code4: '#FFC107',
  code5: '#FFFFFF',
  background: '#E5E5E5',
}

const palette = {
  common: colors,
  primary: {
    light: colors.primary,
    main: colors.primary,
    dark: colors.secondary,
  },
  secondary: {
    light: colors.primary,
    main: colors.secondary,
    dark: colors.secondary,
  },
  error: {
    light: colors.red1,
    main: colors.red1,
    dark: colors.red1,
  },
  warning: {
    light: colors.yellow1,
    main: colors.yellow1,
    dark: colors.yellow1,
  },
  info: {
    light: colors.code1,
    main: colors.code1,
    dark: colors.code1,
  },
  success: {
    light: colors.green2,
    main: colors.green2,
    dark: colors.green2,
  },
}

const overrides = {
  MuiTextField: {
    root: {
      width: '100%',
    },
  },
}

const spacing = (factor) => {
  return `${0.5 * factor}rem`
}

const typography = {
  fontFamily: '\'Inter\', sans-serif',
  fontSize: 14,
}

const global = {
  // Maximum content width when resolution is large
  maxContentWidth: 1200,
}

export default {
  global,
  spacing,
  palette,
  overrides,
  typography,
}
