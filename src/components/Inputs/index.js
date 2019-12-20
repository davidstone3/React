import React from 'react';
import { Image, TextInput, View } from 'react-native';
import { styles } from './styles';
import { Colors } from '../../themes';

export const Input = ({
  style,
  onChangeText,
  iconSource,
  placeholder,
  value,
  secureTextEntry,
  isValid,
  keyboardType
}) => {
  const input = isValid ? [styles.input, { fontWeight: 'bold' }] : styles.input;
  return (
    <View style={isValid ? [styles.inputContainer, { backgroundColor: Colors.darkGreen, borderColor: Colors.green }, style] : [styles.inputContainer, style]}>
      <View style={isValid ? [styles.iconContainer, { backgroundColor: Colors.green }] : styles.iconContainer}>
        <Image source={iconSource} style={styles.icon} />
      </View>
      <TextInput
        style={value.length ? input : [styles.input, { fontStyle: 'italic' }]}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.border}
        underlineColorAndroid="transparent"
        value={value}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
      {isValid && <Image source={require('../../assets/icon_check.png')} style={styles.iconCheck} />}
    </View>
  );
};
