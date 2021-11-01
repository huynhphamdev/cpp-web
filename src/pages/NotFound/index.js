import React from 'react'
import { makeStyles } from '@material-ui/styles'

import styles from './styles'
import Layout from '~/components/Layout'
import Typography from '~/components/Typography'
import Button from '~/components/Button'
import homepage from '~/images/homepage.png'
import { Box } from '@material-ui/core'

const useStyles = makeStyles(styles)

const NotFound = () => {

  const classes = useStyles()

  return (
    <Layout>
      <Box
        textAlign="center"
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Typography
          color="green1"
          style={{
            fontSize: 35,
            fontWeight: 700,
          }}
        >
          Trang không tồn tại
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
      </Box>
    </Layout>
  )
}

export default NotFound
