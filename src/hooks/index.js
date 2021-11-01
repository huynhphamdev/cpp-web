import { useContext, useEffect, useState } from 'react'
import { isWidthUp, useMediaQuery, useTheme } from '@material-ui/core'
import { useLocation } from 'react-router'

import { StoreContext } from '~/contexts'

const useStores = () => {
  const stores = useContext(StoreContext)
  return stores
}

const useWidth = () => {
  const theme = useTheme()
  const keys = [...theme.breakpoints.keys].reverse()
  return (
    keys.reduce((output, key) => {
      const matches = useMediaQuery(theme.breakpoints.up(key))
      return !output && matches ? key : output
    }, null) || 'xs'
  )
}

const useIsMobile = () => {
  const width = useWidth()

  const [isPhone, setIsPhone] = useState(false)
  useEffect(() => {
    setIsPhone(!isWidthUp('md', width))
  }, [width])

  return isPhone
}

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export {
  useQuery,
  useStores,
  useIsMobile,
}
