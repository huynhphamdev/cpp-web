export default (theme) => {
  return {
    mainContainer: {
      backgroundColor: theme.palette.common.background,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      width: '100%',
      height: '100%',
    },

    paper: {
      width: 402,
      padding: 48,
    },


    logo: {
      width: 52,
    },

    field: {
      marginTop: 24,
    },
  }
}
