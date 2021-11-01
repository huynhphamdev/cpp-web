import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import {
  Icon,
  IconButton,
} from '@material-ui/core'

import styles from './styles'
import AdminLayout from '~/components/AdminLayout/index'
import { APIs } from '~/config'
import Table, { TableCell } from '~/components/Table/index'
import Form from './Form/index'
import { useStores } from '~/hooks/index'
import Typography from '~/components/Typography/index'

const useStyles = makeStyles(styles)

const initialExercise = {
  name: '',
  content: '',
  visualize_images: [],
}

const Exercise = () => {

  const classes = useStyles()

  const [exercises, setExercises] = useState([])
  const [total, setTotal] = useState(0)
  const [query, setQuery] = useState(null)
  const [formOpen, setFormOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState(initialExercise)
  const { notificationStore } = useStores()

  const refresh = async () => {
    setLoading(true)
    const response = await APIs.getExercises(query)
    if (!response.ok) return
    setExercises(response.data.data.exercises)
    setTotal(response.data.data.total)
    setLoading(false)
  }

  useEffect(() => {
    refresh()
  }, [query] )

  const onQueryChange = async (options) => {
    setQuery({
      ...options,
      order: 'asc',
      order_by: 'id',
    })
  }

  const createExercise = () => {
    setSelectedExercise({...initialExercise})
    setFormOpen(true)
  }

  const onDelete = async (id, name) => {
    const confirm = await notificationStore.delete(`Xác nhận xoá "${name}"?`)
    if (confirm) {
      await APIs.deleteExercise({ id })
      refresh()
      notificationStore.snack('Xoá thành công')
    }
  }

  return (
    <AdminLayout
      title="Chương"
      actions={[{
        label: 'Tạo mới',
        onClick: () => createExercise(),
      }]}
    >
      <Table
        headers={['#', 'Câu hỏi', '']}
        onQueryChange={onQueryChange}
        loading={loading}
        total={total}
        data={exercises}
        renderRow={(row, index) => (
          <React.Fragment>
            <TableCell className={classes.idCell}>
              <Typography variant='body'>
                {index + 1}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant='body'>
                {row.name}
              </Typography>
            </TableCell>
            <TableCell className={classes.actionCell}>
              <IconButton
                onClick={() => {
                  setSelectedExercise(row)
                  setFormOpen(true)
                }}
              >
                <Icon className={classes.editButton}>drive_file_rename_outline</Icon>
              </IconButton>
              <IconButton
                onClick={() => onDelete(row.id, row.name)}
              >
                <Icon className={classes.deleteButton}>delete_outline</Icon>
              </IconButton>
            </TableCell>
          </React.Fragment>
        )}
      />

      <Form
        open={formOpen}
        onClose={() => setFormOpen(false)}
        exercise={selectedExercise}
        onSuccess={refresh}
      />

    </AdminLayout>
  )
}

export default Exercise
