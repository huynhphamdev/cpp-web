import { action, makeObservable, observable } from 'mobx'
import { persist } from 'mobx-persist'

export default class SettingStore {
  constructor(rootStore) {
    this.rootStore = rootStore
    makeObservable(this)
  }

  @observable settings = {}
  @persist @observable isFirstCome = true

  @action setSettings = (settings) => {
    this.settings = settings.reduce((acc, cur) => {
      acc[cur.key] = cur.value
      return acc
    }, {})
  }

  @action setIsFirstCome = (v) => this.isFirstCome = v
}
