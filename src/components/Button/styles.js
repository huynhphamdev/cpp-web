export default (theme) => {
  const { common } = theme.palette

  return {
    button: {
      padding: 12,
      borderRadius: '8px',
    },

    contained: ({ color, disabled }) => {
      const backgroundColor = disabled ? common.base3 : common[color]
      return {
        // border: theme.isLightColor(color) ? `2px solid ${common.base3}` : 'unset',
        backgroundColor,
        '&:hover': {
          backgroundColor,
        },
      }
    },

    text: {
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  }
}
