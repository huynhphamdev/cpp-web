import React, { useEffect, useState } from 'react'
import { Icon, ListItem, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link, useParams, useLocation } from 'react-router-dom'

import styles from './styles'
import { APIs } from '~/config'
import Typography from '~/components/Typography'
import cx from 'classnames'

const useStyles = makeStyles(styles)

const Exercises = () => {
  const classes = useStyles()
  const [exercises, setExercises] = useState([])
  const { id } = useParams()
  const location = useLocation()

  const currentExercise = location.pathname.startsWith('/exercises') ? id : null

  useEffect(() => {
    const load = async () => {
      const response = await APIs.getExercises()
      if (!response.ok) return

      setExercises(response.data.data.exercises)
    }

    load()
  }, [])

  return (
    <div>
      {exercises.map((exercise) => (
        <div key={exercise.id}>
          <Link to={`/exercises/${exercise.id}`}>
            <ListItem
              button
              disableGutters
              className={cx(classes.listItem, {
                [classes.active]: currentExercise === exercise.id,
              })}
            >
              <Icon color="inherit" className={classes.icon}>lightbulb_outlined</Icon>
              <ListItemText
                disableTypography
                primary={(
                  <Typography color="inherit" variant="label">
                    {exercise.name.split(':')[0]}
                  </Typography>
                )}
              />
            </ListItem>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Exercises
