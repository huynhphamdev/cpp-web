import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import {
  Icon,
  IconButton,
  Box,
} from '@material-ui/core'

import styles from './styles'
import AdminLayout from '~/components/AdminLayout/index'
import { APIs } from '~/config'
import Table, { TableCell } from '~/components/Table/index'
import Form from './Form/index'
import { useStores } from '~/hooks/index'
import Typography from '~/components/Typography/index'

const useStyles = makeStyles(styles)

const initialSearch = {
  name: '',
  content: '',
  code: '',
}

const Search = () => {

  const classes = useStyles()

  const [searches, setSearches] = useState([])
  const [total, setTotal] = useState(0)
  const [query, setQuery] = useState(null)
  const [formOpen, setFormOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedSearch, setSelectedSearch] = useState(initialSearch)
  const { notificationStore } = useStores()

  const refresh = async () => {
    setLoading(true)
    const response = await APIs.getSearches(query)
    if (!response.ok) return
    setSearches(response.data.data.searches)
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

  const createSearch = () => {
    setSelectedSearch({...initialSearch})
    setFormOpen(true)
  }

  const onDelete = async (id, name) => {
    const confirm = await notificationStore.delete(`Xác nhận xoá "${name}"?`)
    if (confirm) {
      await APIs.deleteSearch({ id })
      refresh()
      notificationStore.snack('Xoá thành công')
    }
  }

  return (
    <AdminLayout
      title="Tra cứu"
      actions={[{
        label: 'Tạo mới',
        onClick: () => createSearch(),
      }]}
    >
      <Table
        headers={['#', 'Từ khoá', '']}
        onQueryChange={onQueryChange}
        loading={loading}
        total={total}
        data={searches}
        renderRow={(row, index) => (
          <React.Fragment>
            <TableCell className={classes.idCell}>
              <Typography variant='body'>
                {index + 1}
              </Typography>
            </TableCell>
            <TableCell className={classes.nameCell}>
              <Box className={classes.nameContainer}>
                <Typography variant='body' color='green1'>
                  {row.name}
                </Typography>
              </Box>
            </TableCell>
            <TableCell className={classes.actionCell}>
              <IconButton
                onClick={() => {
                  setSelectedSearch(row)
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
        search={selectedSearch}
        onSuccess={refresh}
      />

    </AdminLayout>
  )
}

export default Search
