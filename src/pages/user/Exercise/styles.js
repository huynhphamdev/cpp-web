export default (theme) => {
  return {

    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
    },

    txtExerciseName: {
      marginTop: 32,
      marginLeft: 30,
      [theme.breakpoints.down('md')]: {
        marginLeft: 0,
      },
      fontSize: '1.625rem',
      lineHeight: '1.93rem',
    },

    wrapContainer: {
      display: 'flex',
      justifyContent: 'center',
    },

    centerContainer: {
      maxWidth: 800,
      width: '100%',
      flex: 1,
      marginTop: 20,
    },

    searchContainer: {
      margin: '12px 30px 0',
      [theme.breakpoints.down('md')]: {
        marginLeft: 0,
      },
    },

    questionBox: {
      padding: 12,
      backgroundColor: theme.palette.common.grey1,
      borderRadius: 4,
      marginTop: 6,
    },

    txtAnswer: {
      marginTop: 16,
    },

    editor: {
      backgroundColor: theme.palette.common.black2,
      marginTop: 24,
    },

    wrapperEditor: {
      marginTop: 6,
      backgroundColor: theme.palette.common.black2,
    },

    demoButton: {
      marginTop: 16,
    },

    demoContainer: {
      marginTop: 16,
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 26,
    },

    demoImg: {
      flex: 1,
    },

    demoControl: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },

    smallButton: {
      marginLeft: 20,
      marginRight: 20,
      width: 10,
    },

  }
}
