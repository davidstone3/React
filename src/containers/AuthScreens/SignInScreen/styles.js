import { StyleSheet } from 'react-native';
import { Colors, Metric } from '../../../themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundImg: {
    resizeMode: 'stretch'
  },
  parentContainer: {
    flex: 1
  },
  closeContainer: {
    alignItems: 'flex-end',
    marginRight: Metric.marginHorizontal,
  },
  mainContainer: {
    marginTop: Metric.height / 8,
    paddingHorizontal: Metric.marginHorizontal,
  },
  whiteBoldBigText: {
    ...Metric.font.bigBold,
    color: Colors.white,
    marginBottom: Metric.height / 30
  },
  subContainer: {
    paddingHorizontal: Metric.marginHorizontal,
  },
  inputContainer: {
    marginBottom: Metric.height / 40
  },
  forgotPasswordContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center'
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
    color: Colors.grey1,
    ...Metric.font.h4,
    fontWeight: '500'
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: Metric.height / 15,
    paddingHorizontal: Metric.marginHorizontal,
    justifyContent: 'space-between'
  },
  loginButton: {
    width: Metric.width - Metric.marginHorizontal * 5 - Metric.buttonHeight * 2
  },
  imgBtnContainer: {
    width: Metric.buttonHeight,
    height: Metric.buttonHeight,
    borderRadius: Metric.buttonHeight / 2
  },
  iconStyle: {
    width: Metric.buttonHeight - 10,
    height: Metric.buttonHeight - 10,
    borderRadius: (Metric.buttonHeight - 10) / 2
  },
  bottomContainer: {
    height: Metric.buttonHeight,
    backgroundColor: Colors.white,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomButtonContainer: {
    height: Metric.buttonHeight,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.white,
  }
});

