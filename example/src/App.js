import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { Provider as CroodsProvider } from 'croods'
import Router from 'react-router-dom/BrowserRouter'
import Switch from 'react-router-dom/Switch'
import Route from 'react-router-dom/Route'

import './App.css'
import store from './store/store'
import List from './colors/List'
import Info from './colors/Info'
import New from './colors/New'
import Edit from './colors/Edit'

export default props => (
  <ReduxProvider store={store}>
    <CroodsProvider baseUrl="https://reqres.in/api">
      <Router>
        <Switch>
          <Route exact path="/" component={List} />
          <Route exact path="/new" component={New} />
          <Route exact path="/:id/edit" component={Edit} />
          <Route exact path="/:id" component={Info} />
        </Switch>
      </Router>
    </CroodsProvider>
  </ReduxProvider>
)
