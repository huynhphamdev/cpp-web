import React, { useEffect, useState } from 'react'
import { Collapse, ListItem, ListItemText } from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import cx from 'classnames'
import { Link, useParams, useLocation } from 'react-router-dom'

import styles from './styles'
import { APIs } from '~/config'
import Typography from '~/components/Typography'

const useStyles = makeStyles(styles)

const Lessons = () => {
  const classes = useStyles()
  const [categories, setCategories] = useState([])
  const [open, setOpen] = React.useState({})
  const { id } = useParams()
  const location = useLocation()

  const currentLesson = location.pathname.startsWith('/lessons') ? id : null

  useEffect(() => {
    if (categories.length === 0) return

    const defaultCategory = currentLesson ?
      categories.find(c => c.lessons.some(l => l.id === currentLesson))
      : null

    const catId = defaultCategory?.id || categories[0].id

    setOpen({
      ...open,
      [catId]: true,
    })
  }, [categories])

  useEffect(() => {
    const load = async () => {
      const response = await APIs.getCategories()
      if (!response.ok) return

      setCategories(response.data.data.categories)
    }

    load()
  }, [])

  return (
    <div>
      {categories.map((category) => (
        <div key={category.id}>
          <ListItem
            button
            alignItems="flex-start"
            disableGutters
            className={classes.listItem}
            onClick={() => setOpen({
              ...open,
              [category.id]: !open[category.id],
            })}
          >
            {open[category.id] ? <ExpandLess /> : <ExpandMore />}
            <ListItemText
              disableTypography
              primary={(
                <Typography variant="label">
                  {category.name}
                </Typography>
              )}
            />
          </ListItem>
          {category.lessons.length > 0 && (
            <Collapse in={open[category.id]} timeout="auto" unmountOnExit>
              {category.lessons.map((lesson) => (
                <ListItem
                  key={lesson.id}
                  button
                  className={cx(classes.listItem, {
                    [classes.active]: currentLesson === lesson.id,
                  })}
                  disableGutters
                >
                  <Link to={`/lessons/${lesson.id}`}>
                    <ListItemText
                      primary={(
                        <Typography
                          variant="menu"
                          color={currentLesson === lesson.id ? 'green1' : 'inherit'}
                          className={classes.lessonText}
                        >
                          {lesson.title}
                        </Typography>
                      )}
                    />
                  </Link>
                </ListItem>
              ))}
            </Collapse>
          )}
        </div>
      ))}
    </div>
  )
}

export default Lessons
