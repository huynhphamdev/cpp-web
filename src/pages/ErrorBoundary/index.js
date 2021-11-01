import React from 'react'
import { makeStyles } from '@material-ui/styles'

import styles from './styles'
import Typography from '~/components/Typography'
import Button from '~/components/Button'
import homepage from '~/images/homepage.png'

const useStyles = makeStyles(styles)

class ErrorBoundary extends React.Component {

  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.log(error)
    console.log(errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (<ErrorPage />)
    }

    return this.props.children
  }
}

const ErrorPage = () => {
  const classes = useStyles()

  return (
    <div className={classes.mainContainer}>
      <Typography
        variant="headline1"
        color='base7'
        align='center'
        className={classes.txtPageNotFound}
      >
        Trang đang bảo trì
      </Typography>
      <Button
        href='/'
        className={classes.btnHome}
      >
        Về trang chủ
      </Button>
      <img
        className={classes.mainImage}
        src={homepage} />
    </div>
  )
}

export default ErrorBoundary
