import { StyleSheet } from 'react-native';
import { Metric, Colors } from '../../../themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundImg: {
    resizeMode: 'stretch'
  },
  parentContainer: {
    paddingHorizontal: Metric.marginHorizontal
  },
  closeContainer: {
    alignItems: 'flex-end'
  },
  whiteBoldBigText: {
    ...Metric.font.bigBold,
    color: Colors.white,
    marginBottom: Metric.height / 30
  },
  mainContainer: {
    marginTop: Metric.height / 8,
  },
  inputContainer: {
    marginBottom: Metric.height / 40
  },
  buttonContainer: {
    width: Metric.width - Metric.marginHorizontal * 4,
    marginTop: Metric.height / 30
  },
  subContainer: {
    paddingHorizontal: Metric.marginHorizontal,
  },
  termsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    marginEnd:20,
    marginStart:20,
  },
  whiteText: {
    color: Colors.white,
    ...Metric.font.h4,
    fontWeight: '500'
  },
  redText: {
    color: Colors.red1,
    ...Metric.font.h4,
    fontWeight: '500'
  },
  grayText: {
    color: Colors.lightGrey,
    ...Metric.font.h1
  },
  buttonsContainer: {
    alignItems: 'center',
    marginVertical: Metric.height / 30
  },
  buttonsSubContainer: {
    flexDirection: 'row',
    marginTop: Metric.height / 30,
  },
  space: {
    width: Metric.width / 5
  }
});

