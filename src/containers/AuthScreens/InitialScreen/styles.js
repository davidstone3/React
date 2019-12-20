import { StyleSheet } from 'react-native';
import { Metric } from '../../../themes';

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
  buttonsContainer: {
    marginTop: Metric.height / 30 + Metric.font.h3.fontSize,
    height: Metric.buttonHeight * 2 + Metric.height / 60,
    justifyContent: 'space-between'
  }
});

