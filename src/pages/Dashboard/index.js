import React, { Component } from 'react'
import {
  Platform,
  View,
  ScrollView,
  Text,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native'
import {
  css,
  withStyles,
} from '../../theme/config'
import InputIcon from '../../ui/InputIcon'
import MovieCard from '../../components/MovieCard'
import {
  getMovies,
  searchMovies,
} from '../../services/endpoints'

const PlayIcon = require('../../assets/Icons/play.png')
const SearchIcon = require('../../assets/Icons/search.png')
const EmptyStateImg = require('../../assets/Icons/empty.png')
const { width, height } = Dimensions.get('window')

class Dashboard extends Component { 
  static navigationOptions = {
    header: null,
  }

  state = {
    searchText: '',
    moviesData: [],
    loader: true,
  }

  componentDidMount() {
    const loadedMovies = getMovies('you')
    loadedMovies
    .then(data => this.setState({ moviesData: data, loader: false }))
    .catch(err => console.log(err))
  }

  handleSearchText = text => {
    this.setState({ searchText: text, loader: true })
    const searchedMovies = searchMovies(text)
    searchedMovies
    .then(data => {
      if ( data.Response === "False" ) {
        this.setState({ moviesData: [], loader: false })
      } else {
        this.setState({ moviesData: data.Search, loader: false })
      }
    })
    .catch(err => console.log(err)) 
  }

  renderEmptyState = () => {
    const { styles } = this.props
  
    return (
      <View {...css(styles.emptyView)}>
        <Image source={EmptyStateImg} />
        <Text {...css(styles.emptyStateText)}>Don’t know what you search?</Text>
        <Text {...css(styles.emptyStateSubText)}>Try search again!</Text>
      </View>
    )
  }

  renderMoviesCards = () => {
    const { moviesData } = this.state
    const { styles } = this.props
    
    if (moviesData.length === 0) return this.renderEmptyState()
    
    return (
      <View {...css(styles.moviesList)}>
        { 
          moviesData.map(card => (
            <MovieCard 
              key={card.imdbID}
              poster={card.Poster}
              title={card.Title}
              onPress={() => this.props.navigation.navigate('MoviesInfo', { movieId: card.imdbID })}
            />
          ))
        }
      </View>
    )
  }

  renderContentPage = () => {
    const { styles } = this.props 
    const { loader } = this.state

    return !loader ? this.renderMoviesCards() 
    : (
        <View {...css(styles.loaderView)}>
          <ActivityIndicator size="large" color="#444" />
        </View>
      )
    }
  
  render() {
    const { styles } = this.props
    
    return (
      <ScrollView {...css(styles.container)}>
        <View {...css(styles.logoView)}>
          <Image
            source={PlayIcon}
          />
          <View {...css(styles.appNameView)}>
            <Text {...css(styles.nextLogoText)}>Next Play</Text>
            <Text {...css(styles.nextSubText)}>Movies</Text>
          </View>
        </View>
        <View {...css(styles.inputView)}>
          <InputIcon 
            placeholder="Search for movies"
            onChange={this.handleSearchText}
            icon={SearchIcon}
            value={this.state.searchText}
          />
        </View>
        <View {...css(styles.moviesView)}>
          <Text {...css(styles.movieSectionTitle)}>
            All Movies
          </Text>
          {this.renderContentPage()}
        </View>
      </ScrollView>
    )
  }
}

export default withStyles(({ 
  fontSize, 
  color, 
  fontFamily, 
}) => ({
  container: {
    backgroundColor: color.white,
    paddingTop: Platform.OS === 'android' ? 15 : 60,
    paddingHorizontal: width > 320 ? 30 : 20,
    flex: 1,
    flexDirection: 'column',
  },
  logoView: {
    flexDirection: 'row',
    width: 140,
    justifyContent: 'space-between',
  },
  appNameView: {
    flexDirection: 'column',
  },
  nextLogoText: {
    fontFamily: fontFamily.appFont,
    fontSize: fontSize.f24,
    color: color.shark,
  },
  nextSubText: {
    fontFamily: fontFamily.appFont,
    fontSize: fontSize.f13,
    color: color.osloGray,
  },
  inputView: {
    paddingTop: 40,
  },
  moviesView: {
    paddingVertical: 40,
  },
  movieSectionTitle: {
    fontFamily: fontFamily.appFont,
    fontSize: fontSize.f20,
    color: color.shark,
    paddingBottom: 40,
  },
  moviesList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  emptyStateText: {
    color: color.mineShaft,
    fontSize: fontSize.f18,
    fontFamily: fontFamily.appFont,
    paddingTop: 40,
    paddingBottom: 10,
  },
  emptyStateSubText: {
    color: color.spunPearl,
    fontSize: fontSize.f16,
    fontFamily: fontFamily.appFont,
  },
  loaderView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height/2,
  } 
}))(Dashboard)