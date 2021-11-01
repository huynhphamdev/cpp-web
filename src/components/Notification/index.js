import React from 'react'
import { observer } from 'mobx-react'
import { makeStyles } from '@material-ui/styles'
import {
  Icon,
  Dialog,
  DialogTitle,
  Snackbar,
  IconButton,
  DialogContent,
  DialogActions,
} from '@material-ui/core'

import styles from './styles'
import { useStores } from '~/hooks'
import Button from '../Button/index'
import Typography from '../Typography/index'
import Cell from '~/components/Cell'
import Grid from '~/components/Grid'

const useStyles = makeStyles(styles)

const Notification = () => {
  const classes = useStyles()
  const { notificationStore } = useStores()

  const onSnackClose = () => {
    notificationStore.setSnackOpen(false)
  }

  const onDialogClose = (e, reason) => {
    if (reason === 'backdropClick') return

    notificationStore.setDialogOpen(false)
  }

  return (
    <React.Fragment>
      <Snackbar
        open={notificationStore.snackOpen}
        action={(
          <IconButton size="small" aria-label="close" color="inherit" onClick={onSnackClose}>
            <Icon fontSize="small">close</Icon>
          </IconButton>
        )}
        onClose={onSnackClose}
        message={notificationStore.snackMessage}
        ContentProps={{
          classes: {
            message: classes.snackMessage,
          },
        }}
        autoHideDuration={300000}
      />
      <Dialog
        open={notificationStore.dialogOpen}
        onClose={onDialogClose}
        fullWidth
        maxWidth='xs'
      >
        <DialogTitle>
          <Typography className={classes.headerText}>
            Thông báo
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid spacing={5} className={classes.grid}>
            <Cell item md={12} xs={12}>
              <Typography className={classes.messageText}>
                {notificationStore.dialogMessage}
              </Typography>
            </Cell>
          </Grid>
        </DialogContent>
        <DialogActions>
          {notificationStore.dialogActions.map(({ variant, onClick, color, textColor, content }) => (
            <Button
              className={classes.dialogActionBtn}
              variant={variant}
              key={content}
              color={color}
              textColor={textColor}
              onClick={() => {
                onDialogClose()
                onClick()
              }}
            >
              {content}
            </Button>
          ))}

        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default observer(Notification)
