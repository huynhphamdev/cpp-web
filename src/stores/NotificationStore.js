import { action, makeObservable, observable } from 'mobx'

class NotificationStore {
  constructor (rootStore) {
    this.rootStore = rootStore
    makeObservable(this)
  }

  @observable snackOpen = false
  @observable snackMessage = ''
  @observable snackOptions = {}

  @observable dialogOpen = false
  @observable dialogMessage = ''
  @observable dialogActions = []

  @action setSnackOpen = (open) => {
    this.snackOpen = open
  }

  @action setDialogOpen = (open) => {
    this.dialogOpen = open
  }

  @action snack = (message, options = {}) => {
    this.snackMessage = message
    this.snackOptions = options
    this.setSnackOpen(true)
  }

  @action alert = (message) => {
    return new Promise((resolve => {
      this.dialogMessage = message
      this.setDialogOpen(true)
      this.dialogActions = [
        {
          content: 'OK',
          variant: 'contained',
          color: 'primary',
          onClick: () => resolve(true),
        },
      ]
    }))
  }

  @action confirm = (message) => {
    return new Promise((resolve => {
      this.dialogMessage = message
      this.setDialogOpen(true)
      this.dialogActions = [
        {
          content: 'Cancel',
          variant: 'outlined',
          color: 'primary',
          onClick: () => resolve(false),
        },
        {
          content: 'OK',
          variant: 'contained',
          color: 'primary',
          onClick: () => resolve(true),
        },
      ]
    }))
  }

  @action delete = (message) => {
    return new Promise((resolve => {
      this.dialogMessage = message
      this.setDialogOpen(true)
      this.dialogActions = [
        {
          content: 'Huỷ',
          variant: 'contained',
          color: 'grey1',
          textColor: 'black1',
          onClick: () => resolve(false),
        },
        {
          content: 'Xác nhận',
          variant: 'contained',
          color: 'red1',
          textColor: 'white',
          onClick: () => resolve(true),
        },
      ]
    }))
  }
}

export default NotificationStore
