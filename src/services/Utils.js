import _ from 'lodash-es'

import { rootStore } from '~/stores'

const handleErrorResponse = (response) => {
  const code = _.get(response, 'data.meta.code', null)
  if (!code) return

  rootStore.notificationStore.snack(`errorMsg.${code}`)
}

const sleep = async (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const parseResponseError = (meta) => {
  return `#${meta.code} ${meta.error_message}`
}

const parseJWT = (token) => {
  return JSON.parse(atob(token.split('.')[1]))
}

export {
  sleep,
  parseJWT,
  parseResponseError,
  handleErrorResponse,
}
