export default (theme) => {
  return {

    mainContainer: {
      display: 'flex',
      flexDirection: 'column',
    },

    headerContainer: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 32,
      marginLeft: 30,
    },

    nameContainer: {
      backgroundColor: '#eff8f6',
      width: 'fit-content',
      padding: 8,
      borderRadius: 8,
      marginLeft: 24,
    },

    bold: {
      fontWeight: '600',
    },

    wrapContainer: {
      display: 'flex',
      justifyContent: 'center',
    },

    centerContainer: {
      maxWidth: 800,
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      marginTop: 20,
    },

    txtContent: {
      lineHeight: '1.65rem',
    },

    txtDemoHeader: {
      marginTop: 20,
    },

    editor: {
      backgroundColor: theme.palette.common.black2,
      marginTop: 24,
    },

    wrapperEditor: {
      marginTop: 6,
      backgroundColor: theme.palette.common.black2,
    },

  }
}
