import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  Avatar,
  ActivityIndicator,
  Subheading,
  Title,
  Surface,
  Divider,
} from 'react-native-paper';

export default ThickDivier = ({ style, vertical }) => {
  if (vertical)
    return <Divider style={[{ width: 1, height: '100%' }, style]} />;
  else return <Divider style={[{ height: 1 }, style]} />;
};
