import React from 'react'
import { Box } from '@material-ui/core'

import Layout from '~/components/Layout'
import Typography from '~/components/Typography'
import homepage from '~/images/homepage.png'

const Home = () => {
  return (
    <Layout>
      <Box
        textAlign="center"
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <div>
          <Typography
            color="green1"
            style={{
              fontSize: 35,
              fontWeight: 700,
            }}
          >
            HỆ THỐNG HỖ TRỢ HỌC LẬP TRÌNH NGÔN NGỮ C++
          </Typography>
          <img src={homepage} width="410px" style={{ maxWidth: '100%' }} />
        </div>
      </Box>
    </Layout>
  )
}

export default Home
