# Croods

> A React + Redux framework for creating CRUDs

[![NPM](https://img.shields.io/npm/v/croods.svg)](https://www.npmjs.com/package/croods) [![CircleCI](https://circleci.com/gh/SeasonedSoftware/croods.svg?style=svg)](https://circleci.com/gh/SeasonedSoftware/croods) [![Maintainability](https://api.codeclimate.com/v1/badges/09e8becc8b94e5760abb/maintainability)](https://codeclimate.com/github/SeasonedSoftware/croods/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/09e8becc8b94e5760abb/test_coverage)](https://codeclimate.com/github/SeasonedSoftware/croods/test_coverage)

1. [About](#About)
2. [Install](#Install)
3. [Usage](#Usage)

## About

Croods is a library that abstracts most of the details (actions, reducers. etc) needed to integrate a REST API with an react/redux application. More details on our [docs](https://croods-docz.netlify.com/).


## Install

```bash
yarn add croods
```

## Usage

```jsx
// src/App.js

import React from 'react'

import { createReducer, List } from 'croods'
import { Provider as CroodsProvider } from 'croods'
import { Provider as ReduxProvider } from 'react-redux'

import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import './App.css'

const rootReducer = combineReducers({ beagle: createReducer('beagle') })
const store = createStore(rootReducer, applyMiddleware(thunk))

export default props => (
  <ReduxProvider store={store}>
    <CroodsProvider baseUrl="https://dog.ceo/api/breed/beagle">
      <List
        name="beagle"
        path="/images"
        parseListResponse={({ message: list }) => ({ list })}
        render={list => (
          <div>
            <h1>Hello Beagles!</h1>
            <ul>
              {list.map((item, index) => (
                <li key={index}>
                  <img src={item} alt="" />
                </li>
              ))}
            </ul>
          </div>
        )}
      />
    </CroodsProvider>
  </ReduxProvider>
)
```

## License

MIT © [SeasonedSoftware](https://github.com/SeasonedSoftware)
