const styles = (theme) => {
  return {
    listItem: {
      '&:hover': {
        backgroundColor: theme.palette.common.greenMinus1,
      },
    },

    active: {
      backgroundColor: theme.palette.common.greenMinus1,
    },

    lessonText: {
      marginLeft: 24,
    },
  }
}

export default styles
