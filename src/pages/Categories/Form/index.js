import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash-es'
import { makeStyles } from '@material-ui/core/styles'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core'

import styles from './styles'
import { APIs } from '~/config'
import { useStores } from '~/hooks/index'
import Button from '~/components/Button/index'
import Typography from '~/components/Typography/index'
import Cell from '~/components/Cell'
import Grid from '~/components/Grid'
import TextField from '~/components/TextField'

const useStyles = makeStyles(styles)

const Form = ({
  open,
  onClose,
  onSuccess,
  category: initialCategory,
}) => {
  const classes = useStyles()

  const [category, setCategory] = useState(initialCategory)
  const { notificationStore } = useStores()
  const isCreate = !initialCategory.id

  useEffect(() => {
    setCategory(_.cloneDeep(initialCategory))
  }, [initialCategory, open])

  const onChange = (key, value) => {
    setCategory({
      ...category,
      [key]: value,
    })
  }

  const onSave = async () => {
    if (isCreate) {
      const response = await APIs.createCategory(category)
      if (!response.ok) {
        notificationStore.snack('Tạo thất bại')
        return
      }
      notificationStore.snack('Tạo thành công')
    } else {
      const response = await APIs.updateCategory(category)
      if (!response.ok) {
        notificationStore.snack('Cập nhật thất bại')
        return
      }
      notificationStore.snack('Cập nhật thành công')
    }
    onClose()
    onSuccess()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Typography variant='header' className={classes.headerText}>
          {isCreate ? 'Tạo mới' : 'Cập nhật'}
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <Grid spacing={5} className={classes.grid}>
          <Cell item md={12} xs={12}>
            <TextField
              label="Tên chương"
              value={category.name}
              onChange={e => onChange('name', e.target.value)}
              variant="outlined"
            />
          </Cell>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.dialogActionBtn}
          color='grey1'
          textColor='black1'
          onClick={onClose}
        >
          Huỷ
        </Button>
        <Button 
          className={classes.dialogActionBtn}
          onClick={onSave}
        >
          {isCreate ? 'Tạo mới' : 'Lưu'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

Form.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
}

export default Form
