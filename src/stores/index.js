import { create } from 'mobx-persist'
import UserStore from './UserStore'
import NotificationStore from './NotificationStore'
import SettingStore from '~/stores/SettingStore'

class RootStore {
  constructor() {
    this.userStore = new UserStore(this)
    this.notificationStore = new NotificationStore(this)
    this.settingStore = new SettingStore(this)
  }
}

const hydrate = create({
  storage: localStorage,
  jsonify: true,
})

export const hydrateAll = (rootStore) => {
  return Promise.all([
    hydrate('user', rootStore.userStore),
    hydrate('setting', rootStore.settingStore),
  ])
}

export const rootStore = new RootStore()
