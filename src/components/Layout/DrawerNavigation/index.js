import React, { useState, useEffect } from 'react'
import Proptypes from 'prop-types'
import { Box, Drawer, InputAdornment, Tab, Tabs } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link, useLocation } from 'react-router-dom'
import { Autocomplete, createFilterOptions } from '@material-ui/lab'
import { useHistory } from 'react-router-dom'

import styles from './styles'
import Logo from '~/images/logo192.png'
import DeveloperOutline from '~/images/developer_outline.png'
import TextField from '~/components/TextField'
import { Search } from '@material-ui/icons'
import Lessons from '~/components/Layout/DrawerNavigation/Lessons'
import Exercises from '~/components/Layout/DrawerNavigation/Exercises'
import { APIs } from '~/config'

const useStyles = makeStyles(styles)

function TabPanel(props) {
  const { children, value, index } = props

  return (
    <div hidden={value !== index}>
      {value === index && (
        <Box paddingTop={1}>
          {children}
        </Box>
      )}
    </div>
  )
}

const DrawerNavigation = ({
  displayPermanent,
  drawerOpen,
  setDrawerOpen,
}) => {
  const classes = useStyles()
  const location = useLocation()
  const history = useHistory()

  const [tab, setTab] = useState(location.pathname.startsWith('/exercises') ? 1 : 0)
  const [searches, setSearches] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    fetchSearches()
  }, [])

  const fetchSearches = async () => {
    const response = await APIs.getSearches({
      offset: 0,
      limit: 200,
    })
    if (response.ok) {
      setSearches(response.data.data.searches)
    }
  }

  console.log(query)

  return (
    <Drawer
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
        paperAnchorDockedLeft: classes.dock,
      }}
      open={drawerOpen || displayPermanent}
      onClose={() => setDrawerOpen(false)}
      variant={displayPermanent ? 'permanent' : 'temporary'}
    >
      <div className={classes.mainContainer}>
        <div>
          <Link
            to="/"
            className={classes.logoContainer}
          >
            <img
              className={classes.logo}
              src={Logo}
              alt="logo"
            />
          </Link>
          <Autocomplete
            options={query ? searches : []}
            inputValue={query}
            onInputChange={(e, v) => setQuery(v)}
            getOptionLabel={(option) => option?.name ? option?.name : ''}
            onChange={(e, value) => {
              history.replace(`/searches/${value.id}`)
            }}
            filterOptions={createFilterOptions({ limit: 5 })}
            noOptionsText='Không tìm thấy kết quả'
            freeSolo={!query} // to hide No Options
            popupIcon={null}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Tra cứu'
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search color="inherit" />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Tabs
            className={classes.tabs}
            value={tab}
            variant="fullWidth"
            onChange={(e, i) => setTab(i)}
          >
            <Tab classes={{ root: classes.tab }} label="Bài học" />
            <Tab classes={{ root: classes.tab }} label="Bài tập" />
          </Tabs>
          <TabPanel value={tab} index={0}>
            <Lessons />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <Exercises />
          </TabPanel>
        </div>
        <Box textAlign="center">
          <img src={DeveloperOutline} width="80%" />
        </Box>
      </div>
    </Drawer>
  )
}

DrawerNavigation.propTypes = {
  displayPermanent: Proptypes.bool.isRequired,
  drawerOpen: Proptypes.bool.isRequired,
  setDrawerOpen: Proptypes.func.isRequired,
}

export default DrawerNavigation
