import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme, Surface } from 'react-native-paper';

export default MapBubble = props => {
  const { colors } = useTheme();
  let innerChildView = props.children;

  if (props.onPress) {
    innerChildView = (
      <TouchableOpacity onPress={props.onPress}>
        {props.children}
      </TouchableOpacity>
    );
  }

  return (
    <Surface style={[styles.container, props.style]}>{innerChildView}</Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 30,
    bottom: 18,
    justifyContent: 'center',
    minHeight: 80,
    position: 'absolute',
    left: 80,
    right: 80,
  },
});
