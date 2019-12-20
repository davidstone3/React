import { StyleSheet } from 'react-native';
import { Colors, Metric } from '../../themes';

export const styles = StyleSheet.create({
  buttonContainer: {
    width: Metric.width / 3.3,
    height: Metric.buttonHeight,
    borderRadius: Metric.buttonHeight / 2,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button1Container: {
    width: Metric.width / 1.5,
    height: Metric.buttonHeight,
    borderRadius: Metric.buttonHeight / 2,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  whiteButtonText: {
    ...Metric.font.h3Bold,
    color: Colors.white,
  },
  darkButtonText: {
    ...Metric.font.h3Bold,
    color: Colors.darkBlack,
  },
  redButtonContainer: {
    width: Metric.width / 1.5,
    height: Metric.buttonHeight,
    borderRadius: Metric.buttonHeight / 2,
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconCloseContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35
  },
  iconClose: {
    width: 15,
    height: 15,
    resizeMode: 'cover'
  },
  imageCircleButton: {
    width: 60,
    height: 60,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  imgBackground: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconButton: {
    width: 50,
    height: 50,
    resizeMode: 'contain'
  }
});
