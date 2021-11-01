import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import Editor from '@monaco-editor/react'

import styles from './styles'
import { APIs } from '~/config'
import Layout from '~/components/Layout/index'
import Typography from '~/components/Typography/index'
import Button from '~/components/Button/index'
import { InputAdornment } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import TextField from '~/components/TextField'

const useStyles = makeStyles(styles)

const Exercise = () => {
  const { id } = useParams()
  const classes = useStyles()
  const history = useHistory()

  const [exercise, setExcercise] = useState(null)
  const [showCode, setShowCode] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchExercise()
    setShowCode(false)
  }, [id])

  const fetchExercise = async () => {
    const response = await APIs.getExercise({ id })
    if (!response.ok) {
      history.replace('/404')
      return
    }
    setExcercise(response.data.data)
  }

  if (!exercise) {
    return (
      <Layout>
        <div />
      </Layout>
    )
  }

  const onKeyPress = async (e) => {
    if (e.key === 'Enter') {
      const response = await APIs.getExercises({
        query: search,
        limit: 1,
      })

      if (!response.ok || !response.data.data) return
      history.push(`/exercises/${response.data.data.exercises[0].id}`)
    }
  }


  const [title, question] = exercise ? exercise.name.split(':').map(i => i.trim()) : []

  return (
    <Layout >
      <div className={classes.mainContainer}>
        <div className={classes.searchContainer}>
          <TextField
            value={search}
            onKeyPress={onKeyPress}
            onChange={e => setSearch(e.target.value)}
            placeholder='Nhập dạng bài tập'
            variant="outlined"
            onEnter={(e) => console.log(e)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="inherit" />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <Typography
          variant='header'
          className={classes.txtExerciseName}
          color="black1"
        >
          {title || exercise.name}
        </Typography>

        <div className={classes.wrapContainer}>
          <div className={classes.centerContainer}>
            <Typography
              variant='label'
              color="black1"
            >
              Câu hỏi
            </Typography>
            <div className={classes.questionBox}>
              <Typography
                variant='body'
                color="black1"
              >
                {question || exercise.name}
              </Typography>
            </div>
            {showCode ? (
              <>
                <Typography
                  variant='label'
                  color="black1"
                  className={classes.txtAnswer}
                >
                  Lời giải tham khảo
                </Typography>
                <Editor
                  height="400px"
                  defaultLanguage="cpp"
                  value={exercise.content}
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
                <Demo exercise={exercise} />
              </>
            ) : (
              <Button
                className={classes.demoButton}
                onClick={() => setShowCode(true)}
              >
                Xem lời giải
              </Button>
            )}
          </div>
        </div>
      </div>

    </Layout>
  )
}

const Demo = ({
  exercise,
}) => {
  const classes = useStyles()

  const [demoVisibility, setDemoVisibility] = useState(false)
  const [imgIndex, setImgIndex] = useState(0)

  useEffect(() => {
    setDemoVisibility(false)
    setImgIndex(0)
  }, [exercise])

  const onNext = () => {
    const index = (imgIndex + 1) % exercise.visualize_images.length
    setImgIndex(index)
  }

  const onPrev = () => {
    const index = (imgIndex + exercise.visualize_images.length - 1) % exercise.visualize_images.length
    setImgIndex(index)
  }

  if (!exercise || !exercise.visualize_images || exercise.visualize_images.length <= 0) {
    return null
  }
  return (
    <>
      <Button
        className={classes.demoButton}
        onClick={() => setDemoVisibility(true)}
      >
        Xem demo
      </Button>
      {
        demoVisibility && (
          <div className={classes.demoContainer}>
            <img
              src={exercise.visualize_images[imgIndex]}
              alt="logo"
              className={classes.demoImg}
            />
            <div className={classes.demoControl}>
              <Button
                className={classes.smallButton}
                onClick={onPrev}
              >
                {'<'}
              </Button>
              <Typography
                variant='label'
                color="black1"
              >
                {imgIndex + 1} / {exercise.visualize_images.length}
              </Typography>
              <Button
                className={classes.smallButton}
                onClick={onNext}
              >
                {'>'}
              </Button>
            </div>
          </div>
        )
      }
    </>
  )
}

export default Exercise
