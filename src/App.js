import React, {Component} from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxPromise from 'redux-promise'
import {Provider} from 'react-redux'
import bookmarkRedoucer from './services/bookmark/redoucer'
import Navigator from './scenes/AppNavigator'

const reducers = combineReducers({
  bookmarkJobs: bookmarkRedoucer
})

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore)

class App extends Component {
  render () {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <Navigator/>
      </Provider>
    )
  }
}

export default App
