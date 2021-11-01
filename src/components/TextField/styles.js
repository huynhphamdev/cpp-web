export default (theme) => {
  const {
    base4,
  } = theme.palette.common

  return {
    root: {
      '& .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: base4,
      },
    },
  }
}
