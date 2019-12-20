import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  width,
  height,
  marginHorizontal: 20,
  buttonHeight: 40,
  textInputHeight: 35,
  tabBar: {
    tabLabelMarginBottom: 7,
    height: 60
  },
  font: {
    big: {
      fontSize: 23
    },
    bigBold: {
      fontSize: 23,
      fontWeight: 'bold'
    },
    h1: {
      fontSize: 18
    },
    h1Bold: {
      fontSize: 18,
      fontWeight: 'bold'
    },
    h2: {
      fontSize: 16,
      fontWeight: 'bold'
    },
    h2Bold: {
      fontSize: 16
    },
    h3: {
      fontSize: 15
    },
    h3Tiny: {
      fontSize: 15,
      fontWeight: '100'
    },
    h3Bold: {
      fontSize: 15,
      fontWeight: 'bold'
    },
    h3Bold1: {
      fontSize: 15,
      fontWeight: '900'
    },
    h4: {
      fontSize: 13
    },
    h4Tiny: {
      fontSize: 13,
      fontWeight: '100'
    },
    h5: {
      fontSize: 11
    },
    h5Tiny: {
      fontSize: 11,
      fontWeight: '100'
    },
    h5Bold: {
      fontSize: 11,
      fontWeight: 'bold'
    },
    h6Bold: {
      fontSize: 9,
      fontWeight: 'bold'
    },
    input: {
      fontSize: 15
    }
  }
}
