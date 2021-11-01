import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'

import { StoreContext } from '~/contexts'
import { rootStore } from '~/stores'

import ErrorBoundary from './ErrorBoundary'
import Notification from '~/components/Notification'
import NotFound from '~/pages/NotFound'
import Home from '~/pages/user/Home'
import Login from '~/pages/Login'
import Lessons from '~/pages/Lessons'
import Categories from '~/pages/Categories'
import Exercises from '~/pages/Exercises'
import Searches from '~/pages/Searches'
import Exercise from '~/pages/user/Exercise'
import Lesson from '~/pages/user/Lesson'
import Search from '~/pages/user/Search'

const useStyles = makeStyles({
  '@global': {
    body: {
      margin: 0,
    },
    a: {
      textDecoration: 'none',
      color: 'unset',
    },
    '*::-webkit-scrollbar': {
      width: '0.5rem',
      backgroundColor: '#EAE9FC',
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: '#8887B1',
      borderRadius: 100,
    },
  },
})

function App() {
  useStyles()

  return (
    <StoreContext.Provider value={rootStore}>
      <ErrorBoundary>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/exercises/:id' component={Exercise} />
            <Route exact path='/lessons/:id' component={Lesson} />
            <Route exact path='/searches/:id' component={Search} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/admin' render={() => (<Redirect to="/admin/lessons" />)}  />
            <Route exact path='/admin/lessons' component={Lessons} />
            <Route exact path='/admin/exercises' component={Exercises} />
            <Route exact path='/admin/categories' component={Categories} />
            <Route exact path='/admin/searches' component={Searches} />
            <Route path='/404' component={NotFound} />
            <Redirect to='/404' />
          </Switch>
        </BrowserRouter>
        <Notification />
      </ErrorBoundary>
    </StoreContext.Provider>
  )
}

export default App
