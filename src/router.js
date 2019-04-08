import { createStackNavigator, createAppContainer } from 'react-navigation'

// Routers
import Dashboard from './pages/Dashboard'
import MovieDetail from './pages/MovieDetail'

const navigator = createStackNavigator(
  {
    Movies: Dashboard,
    MoviesInfo: MovieDetail,
  },
  {
    initialRouteName: 'Movies',
  }
);

export default createAppContainer(navigator);