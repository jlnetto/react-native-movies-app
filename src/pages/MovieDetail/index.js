import React, { Component } from 'react'
import {
  View,
  Image,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { includes } from 'lodash'
import store from 'react-native-simple-store'
import {
  css,
  withStyles
} from  '../../theme/config'
import IconText from '../../ui/IconText'
import { movieDetails } from '../../services/endpoints'

const ArrowIcon = require('../../assets/Icons/arrow.png')
const HeartIcon = require('../../assets/Icons/heart.png')
const HeartSelectedIcon = require('../../assets/Icons/heart-selected.png')
const StarIcon = require('../../assets/Icons/star.png')
const ClockIcon = require('../../assets/Icons/clock.png')
const FilmIcon = require('../../assets/Icons/film.png')
const PosterNotFound = require('../../assets/Icons/image-not-found.png')

const { height, width } = Dimensions.get('window')

class MovieDetais extends Component {
  
  static navigationOptions = {
    header: null,
  }

  state = {
    favorite: false,
    movieDetails: {},
    posterNotFound: false,
  }

  componentDidMount() {
    this.fetchMovieDetails()
    this.isFavoriteMovie()
  }
  
  fetchMovieDetails = async () => {
    const { navigation: { state: { params: { movieId }}}} = this.props
    let movie = {}
    
    try {
      movie = await movieDetails(movieId)
      this.setState({
        movieDetails: movie
      })
    } catch(err) {
        console.log(err)
    }  
  }
  
  isFavoriteMovie = () => {
    const { navigation: { state: { params: { movieId }}}} = this.props

    store.get('favoriteMovies')
    .then((res) => {
       if (includes(res, movieId)) {
          this.setState({
            favorite: true,
          })
       }
    })
  }

  handleLikeMovie = () => {
    const { navigation: { state: { params: { movieId }}}} = this.props

    store.get('favoriteMovies')
    .then((res) => {
      if (includes(res, movieId)) {
        this.setState({ 
          favorite: false 
        }, () => {
          const newArray = res.filter(movie => movie !== movieId)
          store.save('favoriteMovies', newArray)
        })
      } else {
        this.setState({ 
          favorite: true 
        }, () => {
          store.push('favoriteMovies', movieId)
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  renderHeaderActions = () => {
    const { favorite } = this.state
    const { 
      styles, 
      navigation: { 
        goBack 
      } 
    } = this.props

    return (
      <View {...css(styles.headerActions)}>
        <View>
          <TouchableOpacity 
            {...css(styles.touchArea)}  
            onPress={() => goBack()}
          >
            <Image 
              {...css(styles.backToHomeButton)}
              source={ArrowIcon}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity 
            {...css(styles.touchArea)} 
            onPress={this.handleLikeMovie}
          >
            <Image 
              source={favorite ? HeartSelectedIcon : HeartIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderDescriptionContent = () => {
    const { styles } = this.props
    const { 
      movieDetails: { 
        Title, 
        imdbRating, 
        Runtime, 
        Year, 
        Plot, 
        Actors,
        Genre,
        Director,
      }
    } = this.state

    return (
      <View {...css(styles.cardDescription)}>
        <View {...css(styles.rowCenter)}>
          <Text {...css(styles.movieTitle)} >{Title}</Text>
          <View {...css(styles.movieOverviewContainer)}>
            <IconText 
              icon={StarIcon}
              text={imdbRating}
            />
            <IconText 
              icon={ClockIcon}
              text={Runtime}
            />
            <IconText
              icon={FilmIcon}
              text={Year}
            />
          </View>
        </View> 
        <View {...css(styles.row)}>
          <Text {...css(styles.subtitle)}>Plot</Text>
          <Text {...css(styles.text)}>{Plot}</Text>
        </View>
        <View {...css(styles.row)}>
          <Text {...css(styles.subtitle)}>Cast</Text>
          <Text {...css(styles.text)}>{Actors}</Text>
        </View>
        <View {...css(styles.row)}>
          <Text {...css(styles.subtitle)}>Genre</Text>
          <Text {...css(styles.text)}>{Genre}</Text>
        </View>
        <View {...css(styles.row)}>
          <Text {...css(styles.subtitle)}>Director</Text>
          <Text {...css(styles.text)}>{Director}</Text>
        </View>
      </View>
    )
  }  

  render() {
    const { styles } = this.props
    const { 
      posterNotFound,
      movieDetails: { Poster } 
    } = this.state

    return (
      <ScrollView {...css(styles.container)}>
        <View {...css(styles.mainView)}>
          <View {...css(styles.imageView)}>
            {this.renderHeaderActions()}
            <Image 
              {...css(styles.image)}
              source={posterNotFound ? PosterNotFound : { uri: Poster }}
              onError={() => this.setState({ posterNotFound: true })}
            /> 
          </View>
          <View {...css(styles.descriptionView)}>
            {this.renderDescriptionContent()}
          </View>
        </View>
      </ScrollView>
    )
  }
}

export default withStyles(({ color, fontSize, fontFamily }) => ({
  container: { 
    flex: 1,
    backgroundColor: color.white,
  },
  mainView: {
    alignItems: 'center',
    backgroundColor: color.white,
    height: height + 200,
  },
  imageView: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    width: '100%',
    height: height/2 - 50,
    elevation: 3,
    shadowColor: 'rgba(0, 0, 0, 0.30)',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    overflow: 'hidden',
    alignItems: 'center',
  },
  image: {
    opacity: 0.7,
    width: '100%',
    height: '100%',
  },
  headerActions: { 
    width: width > 320 ? width - 30 : width - 20, 
    zIndex: 1, 
    position: 'absolute', 
    top: 45, 
    justifyContent: 'space-between', 
    alignItems: 'center',
    flexDirection: 'row',
  },
  touchArea: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionView: {
    position: 'absolute',
    zIndex: 10,
    borderRadius: 10,
    top: height/2 - 80,
    height,
    width: width > 320 ? width - 40 : width - 20,
    backgroundColor: color.white,
    elevation: 4,
    shadowColor: 'rgba(0, 0, 0, 0.30)',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  cardDescription: {
    flexDirection: 'column',
    paddingHorizontal: 20,
  },
  movieTitle: {
    fontSize: fontSize.f18,
    color: color.shark,
    fontFamily: fontFamily.appFont,
  },
  movieOverviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    justifyContent: 'space-between',
  },
  subtitle: {
    fontFamily: fontFamily.appFont,
    color: color.shark,
    fontSize: fontSize.f13,
  },
  text: {
    fontSize: fontSize.f12,
    color: color.osloGray,
    lineHeight: 24,
  },
  rowCenter: {
    alignItems: 'center',
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
    paddingVertical: 20,
  },
  row: {
    borderBottomColor: '#eeeeee',
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
    paddingVertical: 20,
  },
}))(MovieDetais)



