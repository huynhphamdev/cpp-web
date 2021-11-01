const styles = (theme) => {
  const drawerWidth = 300
  const { primary } = theme.palette.common
  return {
    mainContainer: {
      marginLeft: drawerWidth,
      [theme.breakpoints.down('md')]: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
      },
    },

    menuIcon: {
      color: primary,
    },

    menuIconButton: {
      position: 'fixed',
    },

    actions: {
      marginLeft: theme.spacing(2),
    },
  }
}

export default styles
