import { create as createAPI } from '~/services/APIs'
import packageJson from '../../package.json'

const Configs = {
  local: {
    API_URL: 'http://localhost',
  },
  prod: {
    API_URL: 'https://api.hotrohocc.com.vn',
  },
}

const constants = {
}

// eslint-disable-next-line no-undef
export const APIs = createAPI(Configs[__ENV__].API_URL)

// eslint-disable-next-line no-undef
console.log(`${packageJson.version} (${__ENV__})`)

export default {
  APIs,
  ...constants,
  // eslint-disable-next-line no-undef
  ...Configs[__ENV__],
}
