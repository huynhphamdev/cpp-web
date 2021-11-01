import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash-es'
import { makeStyles } from '@material-ui/core/styles'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  Icon,
  IconButton,
} from '@material-ui/core'
import Editor from '@monaco-editor/react'

import styles from './styles'
import { APIs } from '~/config'
import { useStores } from '~/hooks/index'
import Button from '~/components/Button/index'
import Typography from '~/components/Typography/index'
import Cell from '~/components/Cell'
import Grid from '~/components/Grid'
import TextField from '~/components/TextField'
import ImageUploader from '~/components/ImageUploader/index'

const useStyles = makeStyles(styles)

const Form = ({
  open,
  onClose,
  onSuccess,
  exercise: initialExercise,
}) => {
  const classes = useStyles()

  const [exercise, setExercise] = useState(initialExercise)
  const [imageUploader, setImageUploader] = useState([])
  const [isVisualize, setVisualize] = useState(false)
  const { notificationStore } = useStores()
  const isCreate = !initialExercise.id

  useEffect(() => {
    const cloneExercise = _.cloneDeep(initialExercise)
    setExercise(cloneExercise)
    setVisualize(cloneExercise.visualize_images.length > 0)
    setImageUploader([])
    setImageUploader([
      ...cloneExercise.visualize_images,
      '',
    ])
  }, [initialExercise, open])

  const onChange = (key, value) => {
    setExercise({
      ...exercise,
      [key]: value,
    })
  }

  const onChangeImage = (index, value) => {
    if (index < imageUploader.length - 1) {
      imageUploader[index] = value
      setImageUploader([])
      setImageUploader(imageUploader)
    } else {
      imageUploader.pop()
      const newImageUploader = [
        ...imageUploader,
        value,
        '',
      ]
      setImageUploader(newImageUploader)
    }
  }

  const onRemoveImage = (index, item) => {
    if (item === '') return
    const newImageUploader = _.cloneDeep(imageUploader)
    newImageUploader.splice(index, 1)
    setImageUploader([])
    setImageUploader(newImageUploader)
  }

  const onVisualizeChange = () => {
    setVisualize(!isVisualize)
  }

  const onSave = async () => {
    var newExercise = exercise
    if (!isVisualize) {
      newExercise = {
        ...exercise,
        visualize_images: [],
      }
    } else {
      newExercise = {
        ...exercise,
        visualize_images: imageUploader.slice(0, -1),
      }
    }
    if (isCreate) {
      const response = await APIs.createExercise(newExercise)
      if (!response.ok) {
        notificationStore.snack('Tạo thất bại')
        return
      }
      notificationStore.snack('Tạo thành công')
    } else {
      const response = await APIs.updateExercise(newExercise)
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
              label="Câu hỏi"
              value={exercise.name}
              onChange={e => onChange('name', e.target.value)}
              variant="outlined"
            />
          </Cell>
          <Cell item md={12} xs={12}>
            <Typography variant='label' className={classes.label}>
              Lời giải
            </Typography>
            <Editor
              height="300px"
              defaultLanguage="cpp"
              defaultValue={exercise.content}
              theme='vs-dark'
              options={{
                minimap: {
                  enabled: false,
                },    
              }}
              onChange={v => onChange('content', v)}
              className={classes.editor}
              wrapperClassName={classes.wrapperEditor}
            />
          </Cell>
          <Cell item md={12} xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isVisualize}
                  onChange={onVisualizeChange}
                  name="checkedB"
                  color="primary"
                />
              }
              classes={{
                label: classes.checkboxLabel,
              }}
              label='Visualize'
            />
          </Cell>
          {
            isVisualize && (
              <>
                {
                  imageUploader.map((item, index) => {
                    return (
                      <Cell key={index} md={12} xs={12}>
                        <div className={classes.imageUploaderContainer}>
                          <ImageUploader
                            containerStyle={classes.imageUploader}
                            label="Ảnh minh hoạ"
                            value={imageUploader[index]}
                            onChange={v => onChangeImage(index, v)}
                            variant="outlined"
                          />
                          <IconButton
                            className={item === '' ? classes.invisible : classes.visible}
                            onClick={() => onRemoveImage(index, item)}
                          >
                            <Icon className={classes.deleteButton}>delete_outline</Icon>
                          </IconButton>
                        </div>
                      </Cell>
                    )
                  })
                }
              </>
            )
          }
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
  exercise: PropTypes.object.isRequired,
}

export default Form
