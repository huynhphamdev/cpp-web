export default (theme) => {
  return {

    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignSelf: 'center',
      [theme.breakpoints.up('md')]: {
        alignItems: 'center',
      },
    },

    fill: {
      display: 'flex',
      flex: 1,
    },

    txtPageNotFound: {
      marginTop: 80,
      [theme.breakpoints.down('xs')]: {
        marginTop: 100,
      },
      [theme.breakpoints.down('sm')]: {
        marginTop: 100,
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
      [theme.breakpoints.up('md')]: {
        maxWidth: 878,
      },
      marginTop: 16,
      marginLeft: 16,
      marginRight: 16,
    },

  }
}
  