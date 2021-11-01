const styles = (theme) => {
  const drawerWidth = 226
  const { primary } = theme.palette.common
  return {
    mainContainer: {
      marginLeft: drawerWidth,
      [theme.breakpoints.down('md')]: {
        marginLeft: 0,
      },
    },

    menuIcon: {
      color: primary,
    },

    menuIconButton: {
      paddingLeft: 0,
    },

    content: {
      margin: theme.spacing(3),
    },

    actions: {
      marginLeft: theme.spacing(2),
    },
  }
}

export default styles
