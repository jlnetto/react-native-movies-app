import React from 'react'
import {
  View,
  Image,
  Text,
} from 'react-native'
import { 
  node,
  string,
  object,
} from 'prop-types'
import {
  css,
  withStyles,
} from '../../theme/config'

const IconText = ({
  icon,
  text,
  styles,
}) => (
  <View {...css(styles.container)}>
    <Image 
      source={icon}
    />
    <Text {...css(styles.text)}>{text}</Text>
  </View>
)

IconText.propTypes = {
  icon: node,
  text: string,
  styles: object,
}

IconText.defaultProps = {
  icon: null,
  text: null,
  styles: {},
}

export default withStyles(({ 
  fontSize, 
  color, 
  fontFamily, 
}) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: fontSize.f12,
    color: color.osloGray,
    fontFamily: fontFamily.appFont,
    paddingLeft: 2,
  },
}))(IconText)

