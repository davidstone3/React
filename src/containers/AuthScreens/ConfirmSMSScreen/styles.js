import { StyleSheet } from 'react-native';
import { Colors, Metric } from '../../../themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  closeContainer: {
    alignItems: 'flex-end',
    marginRight: Metric.marginHorizontal,
  },
  mainContainer: {
    flex: 1,
    marginHorizontal: Metric.marginHorizontal,
    alignItems: 'center'
  },
  whiteBoldBigText: {
    ...Metric.font.bigBold,
    color: Colors.white,
    marginVertical: Metric.height / 30,
    marginHorizontal: Metric.marginHorizontal
  },
  descriptionContainer: {
    marginTop: Metric.height / 30
  },
  whiteText: {
    ...Metric.font.h4,
    color: Colors.white,
    textAlign: 'center',
  },
  inputContainer: {
    height: 80
  },
  codeInputStyle: {
    ...Metric.font.big,
    color: Colors.white,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Metric.height / 10
  },
  whiteSmallBoldText: {
    ...Metric.font.h5Bold,
    color: Colors.white
  },
  whiteSmallText: {
    ...Metric.font.h5,
    color: Colors.white,
  },
  resendButton: {
    borderBottomColor: Colors.border,
    borderBottomWidth: 1
  }
});

