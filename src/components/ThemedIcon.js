import React, { useRef, useState, useMemo, useCallback } from 'react';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'react-native-paper';

export default ThemedIcon = ({ size, padding, name, solid, mode, onPress }) => {
  const { colors } = useTheme();

  if (mode === 'MaterialIcon') {
    return (
      <MaterialIcon
        name={name}
        size={size}
        style={{ paddingHorizontal: padding }}
        solid={solid ? solid : true}
        color={colors.text}
        onPress={onPress}
      />
    );
  } else if (mode === 'Ionicon') {
    return (
      <Ionicon
        name={name}
        size={size}
        style={{ paddingHorizontal: padding }}
        solid={solid ? solid : true}
        color={colors.text}
        onPress={onPress}
      />
    );
  } else {
    return (
      <FontAwesome5Icon
        name={name}
        size={size}
        style={{ paddingHorizontal: padding, width:40, textAlign:'center'}}
        solid={solid ? solid : true}
        color={colors.text}
        onPress={onPress}
      />
    );
  }
};
