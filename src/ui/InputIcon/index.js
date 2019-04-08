import React from 'react'
import {
  View,
  TextInput,
  Image,
} from 'react-native'
import { 
  func,
  node,
  string,
  object,
} from 'prop-types'
import {
  css,
  withStyles,
} from '../../theme/config'

const InputIcon = ({
  onChange,
  placeholder,
  icon,
  styles,
}) => (
  <View {...css(styles.inputContainer)}>
    <Image 
      {...css(styles.icon)}
      source={icon}
    />
    <TextInput
      {...css(styles.input)}
      placeholder={placeholder}
      onChangeText={onChange}
    />
  </View>
)

InputIcon.propTypes = {
  onChange: func.isRequired,
  icon: node,
  placeholder: string,
  styles: object,
}

InputIcon.defaultProps = {
  onChange: () => {},
  icon: null,
  styles: {},
  placeholder: 'Search'
}

export default withStyles(({ 
  fontSize, 
  color, 
  fontFamily, 
}) => ({
  inputContainer: {
    borderRadius: 22,
    borderColor: color.blueHaze,
    borderWidth: 1,
    paddingVertical: 9,
    paddingHorizontal: 14,
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    paddingLeft: 8,
    backgroundColor: 'transparent',
    fontFamily: fontFamily.appFont,
    fontSize: fontSize.f12,
    color: color.blueHaze,
  },
  icon: {

  }
}))(InputIcon)

