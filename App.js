import React, { Component } from 'react'
import RootRouter from './src/router'
import store from 'react-native-simple-store'
import { isEmpty } from 'lodash'
export default class App extends Component {

  componentWillMount() {
    console.disableYellowBox
    isEmpty(store.get('favoriteMovies')) && this.setFavoritesMoviesStore()
  }
  
  setFavoritesMoviesStore = () => (
    store.push('favoriteMovies', [])
  )

  render() {
    return (
      <RootRouter />
    )
  }
}

