import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { FAB, Portal, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from '@composables/useTranslation';
import { useStores } from '@stores';

export default function FabOverlay() {
  const { colors, fonts } = useTheme();
  const navigation = useNavigation();
  const [state, setState] = useState({ open: false });
  const { open } = state;
  const onStateChange = ({ open }) => setState({ open });
  const { translations } = useTranslation();
  const { themeStore } = useStores();

  return (
    <FAB.Group
      open={open}
      icon={'pen'}
      onPress = {() => {}}
      color={themeStore.theme.colors.primary}
      fabStyle={{ backgroundColor: colors.surface }}
      actions={[
        {
          icon: 'bug',
          label: translations['bugreport'],
          onPress: () =>
            navigation.navigate('Feedback', { screen: 'BugReport' }),
        },
        {
          icon: 'email',
          label: translations['feedback'],
          onPress: () =>
            navigation.navigate('Feedback', { screen: 'Feedback' }),
        },
      ]}
      onStateChange={onStateChange}
    />
  );
}
