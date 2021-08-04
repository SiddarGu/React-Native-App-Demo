import React from 'react';
import { InputToolbar } from 'react-native-gifted-chat';

export const renderInputToolbar = (props, theme) => (
  <InputToolbar
    {...props}
    containerStyle={{
      backgroundColor: theme.colors.surface,
    }}
    primaryStyle={{ alignItems: 'center' }}
  />
);
