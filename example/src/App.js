import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { Provider as CroodsProvider } from 'croods'
import Router from 'react-router-dom/BrowserRouter'
import Route from 'react-router-dom/Route'

import store from './store/store'
import List from './colors/List'
import Info from './colors/Info'

export default props => (
  <ReduxProvider store={store}>
    <CroodsProvider baseUrl="https://reqres.in/api">
      <Router>
        <div style={{ textAlign: 'center', padding: 20 }}>
          <Route exact path="/" component={List} />
          <Route exact path="/:id" component={Info} />
        </div>
      </Router>
    </CroodsProvider>
  </ReduxProvider>
)
