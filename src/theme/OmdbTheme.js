import { Platform } from 'react-native'

export default {
  fontSize: {
    f10: 10,
    f11: 11,
    f12: 12,
    f13: 13,
    f14: 14,
    f15: 15,
    f16: 16,
    f17: 17,
    f18: 18,
    f20: 20,
    f22: 22,
    f24: 24,
  },
  color: {
    white: '#FFFFFF',
    shark: '#212224',
    blueHaze: '#C4C9DF',
    osloGray: '#868E96',
    abbey: '#4A4E52',
    mineShaft: '#3B3B3B',
    spunPearl: '#A9A9B0'
  },
  fontFamily: {
    appFont: Platform.OS === 'android' ? 'Roboto' : 'Helvetica',
  },
}

//Color Names
//http://chir.ag/projects/name-that-color/