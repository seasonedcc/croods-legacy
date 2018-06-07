import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { Provider as CroodsProvider } from 'croods'

import store from './store/store'
import List from './todos/List'

const options = {
  name: 'todos',
  apiHost: 'foo.bar',
  renderLoading: () => <div>Loading...</div>,
  renderError: error => <div>Error: {error}</div>,
}

export default props => (
  <ReduxProvider store={store}>
    <CroodsProvider options={options}>
      <div style={{ textAlign: 'center', padding: 20 }}>
        <List />
      </div>
    </CroodsProvider>
  </ReduxProvider>
)
