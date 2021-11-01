export default (theme) => {
  return {

    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignSelf: 'center',
    },

    fill: {
      display: 'flex',
      flex: 1,
    },

    txtPageNotFound: {
      marginTop: 80,
      [theme.breakpoints.down('xs')]: {
        marginTop: 60,
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: 50,
        fontWeight: 600,
        fontSize: '1.25rem',
        lineHeight: '1.5rem',
      },
    },

    txtBackToShopping: {
      marginTop: 8,
      [theme.breakpoints.down('xs')]: {
        marginTop: 8,
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: 4,
      },
    },

    btnHome: {
      alignSelf: 'center',
      marginTop: 16,
    },

    mainImage: {
      marginTop: 16,
    },

  }
}
  