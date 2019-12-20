import { StyleSheet } from 'react-native';
import { Colors, Metric } from '../../themes';

export const styles = StyleSheet.create({
  inputContainer: {
    width: Metric.width - Metric.marginHorizontal * 4,
    flexDirection: 'row',
    height: Metric.textInputHeight + 3,
    borderRadius: Metric.textInputHeight / 2 + 1,
    backgroundColor: Colors.gray,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center'
  },
  input: {
    ...Metric.font.input,
    flex: 1,
    marginLeft: 20,
    color: Colors.white
  },
  icon: {
    width: 16,
    height: 16,
    resizeMode: 'contain'
  },
  iconContainer: {
    width: Metric.textInputHeight,
    height: Metric.textInputHeight,
    borderRadius: Metric.textInputHeight / 2,
    backgroundColor: Colors.grey,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconCheck: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    marginRight: 20
  }
});
