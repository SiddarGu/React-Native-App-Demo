// React & React Native
import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';

// Third-party
import { observer } from 'mobx-react';
import {
  Divider,
  useTheme,
  Title,
  Subheading,
  Portal,
  Dialog,
  Button,
  Surface,
} from 'react-native-paper';

// Context
import { useStores } from '@stores';
import { useTranslation } from '@composables/useTranslation';

// Constants

// Custom Components

export default __name__ = () => {
  /******************
   * Initialization *
   ******************/
  const {translations} = useTranslation();
  const {colors, fonts} = useTheme();
  const {} = useStores();

  /**************
   * components *
   **************/

  return (

  );
}

const styles = StyleSheet.create({});
