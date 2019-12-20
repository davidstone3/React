import React from 'react';
import { TouchableOpacity, Text, Image, ImageBackground } from 'react-native';
import { styles } from './styles';

export const SmallWhiteButton = ({
  onPress,
  label,
  style,
  textStyle
}) => (
  <TouchableOpacity style={[styles.buttonContainer, style]} onPress={onPress}>
    <Text style={[styles.darkButtonText, textStyle]}>
      {label}
    </Text>
  </TouchableOpacity>
);

export const WhiteButton = ({
  onPress,
  label,
  style,
  textStyle
}) => (
  <TouchableOpacity style={[styles.button1Container, style]} onPress={onPress}>
    <Text style={[styles.darkButtonText, textStyle]}>
      {label}
    </Text>
  </TouchableOpacity>
);

export const RedButton = ({
  onPress,
  label,
  style,
  textStyle
}) => (
  <TouchableOpacity style={[styles.redButtonContainer, style]} onPress={onPress}>
    <Text style={[styles.whiteButtonText, textStyle]}>
      {label}
    </Text>
  </TouchableOpacity>
);

export const CloseButton = ({
  onPress,
  style
}) => (
  <TouchableOpacity style={[styles.iconCloseContainer, style]} onPress={onPress}>
    <Image source={require('../../assets/icon_close.png')} style={styles.iconClose} />
  </TouchableOpacity>
);

export const ImageButton = ({
  onPress,
  style,
  iconSource,
  iconStyle
}) => (
  <TouchableOpacity onPress={onPress} style={[styles.imageCircleButton, style]}>
    <Image source={iconSource} style={[styles.iconButton, iconStyle]}/>
  </TouchableOpacity>
);
