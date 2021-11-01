export default (theme) => {
  const {
    base2,
    base4,
    base7,
  } = theme.palette.common

  return {
    input: {
      padding: theme.spacing(1.25, 0.75),
    },

    textField: {
      borderRadius: '100px',
      backgroundColor: base2,
      color: base4,
      '&:hover': {
        backgroundColor: base2,
      },
    },

    focused: {
      '&&': {
        backgroundColor: base2,
        color: base7,
      },
    },

    endAdornment: {
      marginRight: theme.spacing(0.75),
    },

    popupIndicator: {
      display: 'none',
    },

    noOptions: {
      display: 'none',
    },

    popper: {
      boxShadow: 'none',
    },
  }
}
