import { persist } from 'mobx-persist'
import { action, computed, makeObservable, observable } from 'mobx'
import jwt_decode from 'jwt-decode'

class UserStore {
  constructor (rootStore) {
    this.rootStore = rootStore
    makeObservable(this)
  }

  @persist @observable token = ''
  @persist('object') @observable user = null
  @persist('object') @observable session = null

  @action setToken = (token) => {
    this.token = token
  }

  @action setUser = (user) => {
    this.user = user
  }

  @action setSession = (session) => {
    this.session = session
  }

  @computed get isAuthed() {
    try {
      return this.token && jwt_decode(this.token).exp * 1000 > Date.now()
    } catch (e) {
      console.log(e)
      return false
    }
  }
}

export default UserStore
