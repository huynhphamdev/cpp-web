const styles = (theme) => {
  const drawerWidth = 300
  const {
    primary,
    greenMinus1,
    grey1,
    grey3,
  } = theme.palette.common
  return {
    drawer: {
      width: drawerWidth,
    },

    drawerPaper: {
      width: drawerWidth,
      backgroundColor: grey1,
    },

    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
      margin: theme.spacing(0, 1),
    },

    dock: {
      border: 'none',
    },

    link: {
      margin: theme.spacing(0.5, 1.5),
      padding: theme.spacing(1.5),
      textDecoration: 'none',
      color: primary,
      transition: '0.3s',
      borderRadius: 8,
      '&:hover': {
        backgroundColor: greenMinus1,
      },
      alignItems: 'center',
      display: 'flex',
    },

    navItems: {
      textAlign: 'left',
    },

    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },

    logo: {
      width: 32,
      height: 'auto',
      marginRight: theme.spacing(1),
    },

    selected: {
      backgroundColor: greenMinus1,
    },

    icon: {
      marginRight: theme.spacing(1),
    },

    tabs: {
      marginTop: theme.spacing(1),
    },

    tab: {
      weight: 600,
      minWidth: 100,
      color: grey3,
      textTransform: 'none',
      '&.Mui-selected': {
        color: primary,
      },
    },
  }
}

export default styles
