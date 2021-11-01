export default (theme) => {

  return {

    headerText: {
      marginLeft: -8,
    },

    label: {
      marginBottom: 6,
    },

    checkboxLabel: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: '1.21rem',
    },

    grid: {
      marginTop: 1,
      marginBottom: 1,
    },

    dialogActionBtn: {
      width: 104,
    },

    editor: {
      backgroundColor: theme.palette.common.black2,
      marginTop: 24,
    },

    wrapperEditor: {
      backgroundColor: theme.palette.common.black2,
    },

    imageUploaderContainer: {
      display: 'flex',
    },

    imageUploader: {
      flex: 1,
    },

    deleteButton: {
      color: theme.palette.common.red1,
    },

    visible: {
      opacity: 1,
    },

    invisible: {
      opacity: 0,
    },

  }

}
