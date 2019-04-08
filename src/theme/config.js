import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet'
import reactNativeInterface from 'react-with-styles-interface-react-native'
import { css, withStyles } from 'react-with-styles'

import OmdbTheme from './OmdbTheme'

ThemedStyleSheet.registerTheme(OmdbTheme)
ThemedStyleSheet.registerInterface(reactNativeInterface)

export { css, withStyles, ThemedStyleSheet }