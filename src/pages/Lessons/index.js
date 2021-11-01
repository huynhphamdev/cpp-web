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

const initialLesson = {
  banner: '',
  category: {},
  category_id: '',
  content: '',
  title: '',
}

const Lesson = () => {

  const classes = useStyles()

  const [lessons, setLessons] = useState([])
  const [total, setTotal] = useState(0)
  const [query, setQuery] = useState(null)
  const [formOpen, setFormOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedLesson, setSelectedLesson] = useState(initialLesson)
  const { notificationStore } = useStores()

  const refresh = async () => {
    setLoading(true)
    const response = await APIs.getLessons(query)
    if (!response.ok) return
    setLessons(response.data.data.lessons)
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

  const createLesson = () => {
    setSelectedLesson({...initialLesson})
    setFormOpen(true)
  }

  const onDelete = async (id, title) => {
    const confirm = await notificationStore.delete(`Xác nhận xoá "${title}"?`)
    if (confirm) {
      await APIs.deleteLesson({ id })
      refresh()
      notificationStore.snack('Xoá thành công')
    }
  }

  return (
    <AdminLayout
      title="Bài học"
      actions={[{
        label: 'Tạo mới',
        onClick: () => createLesson(),
      }]}
    >
      <Table
        headers={['#', 'Avatar', 'Tên bài học', 'Chương', '']}
        onQueryChange={onQueryChange}
        total={total}
        loading={loading}
        data={lessons}
        renderRow={(row, index) => (
          <React.Fragment>
            <TableCell className={classes.idCell}>
              <Typography variant='body'>
                {index + 1}
              </Typography>
            </TableCell>
            <TableCell>
              <img
                src={row.banner}
                alt="logo"
                className={classes.logo}
              />
            </TableCell>
            <TableCell>
              <Typography variant='body'>
                {row.title}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant='body'>
                {row.category?.name}
              </Typography>
            </TableCell>
            <TableCell className={classes.actionCell}>
              <IconButton
                onClick={() => {
                  setSelectedLesson(row)
                  setFormOpen(true)
                }}
              >
                <Icon className={classes.editButton}>drive_file_rename_outline</Icon>
              </IconButton>
              <IconButton
                onClick={() => onDelete(row.id, row.title)}
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
        lesson={selectedLesson}
        onSuccess={refresh}
      />

    </AdminLayout>
  )
}

export default Lesson
