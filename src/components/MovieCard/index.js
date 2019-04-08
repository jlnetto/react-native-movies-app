import React, { Component } from 'react'
import {
    View,
    TouchableOpacity,
    Image,
    Text,
    ActivityIndicator,
} from 'react-native'
import { object } from 'prop-types'
import {
  css,
  withStyles
} from '../../theme/config'

const PosterNotFound = require('../../assets/Icons/no-poster.png')

class MovieCard extends Component {

  state = {
    loading: false,
    posterNotFound: false,
  }

  renderImage = () => {
    const { 
      loading, 
      posterNotFound,
    } = this.state 
    const { 
      poster, 
      styles,
    } = this.props

    return (
      <View {...css(styles.imageView)}>
        {
          loading &&
          <View {...css(styles.loaderView)}>
            <ActivityIndicator size="large" color="#444" />
          </View>  
        }
        <Image
            {...css(styles.image)}
            source={posterNotFound ? PosterNotFound : {uri: poster}}
            onLoadStart={() => this.setState({loading: true})}
            onLoadEnd={() => this.setState({loading: false})}
            onError={() => this.setState({ posterNotFound: true })}
          />
      </View>
    ) 
  }

  render() {
    const { 
      title,
      runTime,
      styles,
      onPress
    } = this.props

    return (
      <TouchableOpacity onPress={onPress} {...css(styles.container)}>
        { this.renderImage() }
        <View>
          <Text
            {...css(styles.movieDescription)}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {title}
          </Text>
          <Text
            {...css(styles.movieDescription)}
          >
            {runTime}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

MovieCard.defaultProps = {
  styles: {},
}

MovieCard.propTypes = {
  styles: object,
}

export default withStyles(({ color, fontFamily, fontSize }) => ({
  container: {
    flexDirection: 'column',
    backgroundColor: color.white,
  },
  imageView: {
    elevation: 2,
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOffset: {
      height: 1,
      width: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    position: 'relative',
  },
  image: {
    borderRadius: 10,
    height: 130,
    width: 90,
  },
  movieDescription: {
    marginTop: 8,
    width: 90,
    fontSize: fontSize.f10,
    fontFamily: fontFamily.appFont,
    color: color.abbey,
  },
  loaderView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 130,
    width: 90,
    position: 'absolute',   
  },
}))(MovieCard)
  