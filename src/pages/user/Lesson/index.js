import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import ReactHtmlParser from 'react-html-parser'
import { useHistory } from 'react-router-dom'

import styles from './styles'
import { APIs } from '~/config'
import Layout from '~/components/Layout/index'
import Typography from '~/components/Typography/index'

const useStyles = makeStyles(styles)

const Lesson = () => {
  const { id } = useParams()
  const classes = useStyles()
  const history = useHistory()

  const [lesson, setLesson] = useState(null)
  const [nodeHtml, setNodeHtml] = useState(null)

  useEffect(() => {
    fetchLesson()
  }, [id])

  const transform = (node) => {
    if (node.type === 'tag' && node.name === 'img') {
      return (
        <span key={node.attribs.src} className={classes.htmlContainer}>
          <img src={node.attribs.src} alt={node.attribs.alt} />
        </span>
      )
    }
  }

  const fetchLesson = async () => {
    const response = await APIs.getLesson({ id })
    if (!response.ok) {
      history.replace('/404')
      return
    }
    setLesson(response.data.data)

    const node = ReactHtmlParser (response.data.data.content, {
      transform: transform,
    })
    setNodeHtml(node)
  }

  if (!lesson) {
    return (
      <Layout>
        <div />
      </Layout>
    )
  }

  return (
    <Layout >
      <div className={classes.mainContainer}>
        <img
          src={lesson.banner}
          alt="logo"
          className={classes.banner}
        />
        <Typography
          variant='label'
          className={classes.txtCategory}
          color="black1"
        >
          {lesson.category.name}
        </Typography>
        <Typography
          className={classes.txtLessonName}
          color="black1"
        >
          {lesson.title}
        </Typography>
        <Typography
          variant='body'
          className={classes.txtContent}
          color="black1"
          component={'span'}
        >
          {nodeHtml}
        </Typography>
      </div>
    </Layout>
  )
}

export default Lesson
