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
import Editor from '~/components/Editor'
import CodeEditor from '~/components/CodeEditor/index'

const useStyles = makeStyles(styles)

const Form = ({
  open,
  onClose,
  onSuccess,
  search: initialSearch,
}) => {
  const classes = useStyles()

  const [search, setSearch] = useState(initialSearch)
  const [editorContent, setEditorContent] = useState('')
  const { notificationStore } = useStores()
  const isCreate = !initialSearch.id

  useEffect(() => {
    setSearch(_.cloneDeep(initialSearch))
    setEditorContent(initialSearch.content)
  }, [initialSearch, open])

  const onChange = (key, value) => {
    setSearch({
      ...search,
      [key]: value,
    })
  }

  const onSave = async () => {
    if (isCreate) {
      const response = await APIs.createSearch(search)
      if (!response.ok) {
        notificationStore.snack('Tạo thất bại')
        return
      }
      notificationStore.snack('Tạo thành công')
    } else {
      const response = await APIs.updateSearch(search)
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
      maxWidth="md"
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
              label="Từ khoá"
              value={search.name}
              onChange={e => onChange('name', e.target.value)}
              variant="outlined"
            />
          </Cell>
          <Cell md={12} xs={12}>
            <Typography variant='label' className={classes.label}>
              Ý nghĩa
            </Typography>
            <Editor
              initialValue={editorContent}
              onChange={v => onChange('content', v)}
            />
          </Cell>
          <Cell item md={12} xs={12}>
            <Typography variant='label' className={classes.label}>
              Code minh hoạ
            </Typography>
            <CodeEditor
              defaultValue={search.code}
              onChange={v => onChange('code', v)}
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
  search: PropTypes.object.isRequired,
}

export default Form
