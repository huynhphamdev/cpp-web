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
import { Autocomplete } from '@material-ui/lab'

import styles from './styles'
import { APIs } from '~/config'
import { useStores } from '~/hooks/index'
import Button from '~/components/Button/index'
import Typography from '~/components/Typography/index'
import Cell from '~/components/Cell'
import Grid from '~/components/Grid'
import TextField from '~/components/TextField'
import Editor from '~/components/Editor'
import ImageUploader from '~/components/ImageUploader/index'

const useStyles = makeStyles(styles)

const Form = ({
  open,
  onClose,
  onSuccess,
  lesson: initialLesson,
}) => {
  const classes = useStyles()

  const [lesson, setLesson] = useState(initialLesson)
  const [categories, setCategories] = useState([])
  const [editorContent, setEditorContent] = useState('')
  const { notificationStore } = useStores()
  const isCreate = !initialLesson.id

  useEffect(() => {
    setLesson(_.cloneDeep(initialLesson))
    setEditorContent(initialLesson.content)
  }, [initialLesson, open])

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    const response = await APIs.getCategories({
      offset: 0,
      limit: 200,
    })
    if (response.ok) {
      setCategories(response.data.data.categories)
    }
  }

  const onChange = (key, value) => {
    setLesson({
      ...lesson,
      [key]: value,
    })
  }

  const onSave = async () => {
    if (isCreate) {
      const response = await APIs.createLesson(lesson)
      if (!response.ok) {
        notificationStore.snack('Tạo thất bại')
        return
      }
      notificationStore.snack('Tạo thành công')
    } else {
      const response = await APIs.updateLesson(lesson)
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
          <Cell md={12} xs={12}>
            <TextField
              label="Tên bài học"
              value={lesson.title}
              onChange={e => onChange('title', e.target.value)}
              variant="outlined"
            />
          </Cell>
          <Cell md={6} xs={12}>
            <Autocomplete
              options={categories}
              value={initialLesson.category}
              getOptionLabel={(option) => option?.name ? option?.name : ''}
              onChange={(e, value) => {
                if (value) {
                  onChange('category_id', value.id)
                } else {
                  onChange('category_id', null)
                }
              }}
              renderInput={(params) => <TextField {...params} label="Chương" variant="outlined" />}
            />
          </Cell>
          <Cell md={6} xs={12}>
            <ImageUploader
              label="Ảnh bìa"
              value={lesson.banner}
              onChange={v => onChange('banner', v)}
              variant="outlined"
            />
          </Cell>
          <Cell md={12} xs={12}>
            <Editor
              initialValue={editorContent}
              onChange={v => onChange('content', v)}
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
  lesson: PropTypes.object.isRequired,
}

export default Form
