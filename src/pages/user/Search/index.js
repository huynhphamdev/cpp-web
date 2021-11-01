import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import Editor from '@monaco-editor/react'
import {
  Box,
} from '@material-ui/core'
import ReactHtmlParser from 'react-html-parser'

import styles from './styles'
import { APIs } from '~/config'
import Layout from '~/components/Layout/index'
import Typography from '~/components/Typography/index'

const useStyles = makeStyles(styles)

const Search = () => {
  const { id } = useParams()
  const classes = useStyles()
  const history = useHistory()

  const [search, setSearch] = useState(null)

  useEffect(() => {
    fetchSearches()
  }, [id])

  const fetchSearches = async () => {
    const response = await APIs.getSearch({ id })
    if (!response.ok) {
      history.replace('/404')
      return
    }
    setSearch(response.data.data)
  }

  if (!search) {
    return (
      <Layout>
        <div />
      </Layout>
    )
  }

  return (
    <Layout >
      <div className={classes.mainContainer}>
        <div className={classes.headerContainer}>
          <Typography
            variant='header'
            className={classes.txtExerciseName}
            color="black1"
          >
            Tra cứu
          </Typography>
          <Box className={classes.nameContainer}>
            <Typography variant='body' color='green1' className={classes.bold}>
              {search.name}
            </Typography>
          </Box>
        </div>

        <div className={classes.wrapContainer}>
          <div className={classes.centerContainer}>
            <Typography
              variant='label'
              color="black1"
            >
              Giải thích
            </Typography>
            {
              search.content && (
                <Typography
                  variant='body'
                  className={classes.txtContent}
                  color="black1"
                >
                  { ReactHtmlParser (search.content) }
                </Typography>
              )
            }
            {
              search.code && (
                <>
                  <Typography
                    variant='label'
                    color="black1"
                    className={classes.txtDemoHeader}
                  >
                    Code minh hoạ
                  </Typography>
                  <Editor
                    height="400px"
                    defaultLanguage="cpp"
                    value={search.code}
                    theme='vs-dark'
                    options={{
                      readOnly: true,
                      minimap: {
                        enabled: false,
                      },
                    }}
                    className={classes.editor}
                    wrapperClassName={classes.wrapperEditor}
                  />
                </>
              )
            }
          </div>
        </div>
      </div>

    </Layout>
  )
}

export default Search
