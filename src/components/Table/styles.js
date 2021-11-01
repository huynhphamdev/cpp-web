const styles = (theme) => {
  return {
    mainContainer: {
      position: 'relative',
      border: `1px solid ${theme.palette.common.grey1}`,
      borderRadius: 4,
    },

    loading: {
      position: 'absolute',
      width: '100%',
    },
  }
}

export default styles
