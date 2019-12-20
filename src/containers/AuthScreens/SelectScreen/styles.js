import { StyleSheet } from 'react-native';
import { Colors, Metric } from '../../../themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundImg: {
    resizeMode: 'stretch'
  },
  mainContainer: {
    marginTop: Metric.height / 1.7,
    alignItems: 'center',
    marginHorizontal: Metric.width / 8
  },
  bottomIconContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  whiteTinySmallText: {
    ...Metric.font.h5Tiny,
    color: Colors.white,
    textAlign: 'center'
  },
  whiteBoldText: {
    ...Metric.font.h3Bold1,
    color: Colors.white,
  },
  whiteTinyText: {
    ...Metric.font.h3Tiny,
    color: Colors.white,
  },
  labelContainer: {
    flexDirection: 'row'
  },
  buttonsContainer: {
    marginTop: Metric.height / 30,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between'
  },
  bottomSubContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  whiteBoldSmallText: {
    ...Metric.font.h6Bold,
    color: Colors.white,
    fontStyle: 'italic'
  },
  iconMiami: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
    marginLeft: 5
  }
});
