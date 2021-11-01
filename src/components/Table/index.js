import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import {
  Table as MuiTable,
  TableContainer,
  TableHead,
  TableRow,
  TableCell as MuiTableCell,
  TableSortLabel,
  TableBody,
  TablePagination,
  LinearProgress,
} from '@material-ui/core'

import styles from './styles'
import Typography from '../Typography/index'

const useStyles = makeStyles(styles)

const Table = ({
  headers,
  data,
  total,
  loading,
  renderRow,
  onQueryChange,
}) => {
  const classes = useStyles()
  const [order, setOrder] = useState('desc')
  const [orderBy, setOrderBy] = useState('created_at')
  const [rowsPerPage, setRowsPerPage] = useState(25)
  const [page, setPage] = useState(0)

  useEffect(() => {
    if (!onQueryChange) return
    onQueryChange({
      order,
      order_by: orderBy,
      limit: rowsPerPage,
      offset: page * rowsPerPage,
    })
  }, [order, orderBy, rowsPerPage, page])

  const toggleSort = (index) => {
    if (!headers[index]?.key) return
    const { key } = headers[index]

    setOrder(orderBy === key && order === 'asc' ? 'desc' : 'asc')
    setOrderBy(key)
  }

  const onChangeRowsPerPage = (e) => {
    setRowsPerPage(e.target.value)
    setPage(0)
  }

  return (
    <React.Fragment>
      <TableContainer className={classes.mainContainer}>
        {loading && (<LinearProgress className={classes.loading} />)}
        <MuiTable>
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell key={index}>
                  <TableSortLabel
                    hideSortIcon={typeof header === 'string'}
                    active={orderBy === (header.key ? header.key : index)}
                    direction={orderBy === (header.key ? header.key : index) ? order : 'asc'}
                    onClick={() => toggleSort(index)}
                  >
                    <Typography variant='label'>
                      {header.title ? header.title : header}
                    </Typography>
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? data.map((row, index) => (
              <TableRow key={index} hover>
                {renderRow(row, index)}
              </TableRow>
            )) : (
              <TableRow>
                <TableCell align="center" colSpan={headers.length}>
                  <Typography variant='body'>
                    Không có dữ liệu
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </MuiTable>
      </TableContainer>
      {!!total && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100, 200]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage='Hiển thị:'
          labelDisplayedRows={({from, to, count}) => `${from}-${to} trong ${count}`}
          page={page}
          onPageChange={(e, p) => setPage(p)}
          onRowsPerPageChange={onChangeRowsPerPage}
        />
      )}
    </React.Fragment>
  )
}

Table.propTypes = {
  headers: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  total: PropTypes.number,
  renderRow: PropTypes.func.isRequired,
  onQueryChange: PropTypes.func,
  loading: PropTypes.bool,
}

Table.defaultProps = {
  onQueryChange: null,
  total: 0,
  loading: false,
}

export const TableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.grey1,
    color: theme.palette.common.black1,
  },
  root: {
    borderBottom: `1px solid ${theme.palette.common.grey1}`,
    padding: '12px 16px',
  },
}))(MuiTableCell)

export default Table
