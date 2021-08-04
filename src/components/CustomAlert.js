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
import Modal from 'react-native-modal';

// Context
import { useStores } from '@stores';
import { useTranslation } from '@composables/useTranslation';
import ThickDivider from '@components/ThickDivider';

// Constants

// Custom Components

export default CustomAlert = ({
  isVisible,
  onBackButtonPress,
  onBackdropPress,
  title,
  leftBtnText,
  rightBtnText,
  leftBtnOnPress,
  rightBtnOnPress,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      onBackdropPress={onBackdropPress}
      onBackButtonPress={onBackButtonPress}
      style={styles.backDrop}>
      <View>
        <Surface style={styles.modalContainer}>
          <View style={styles.titleWrapper}>
            <Title style={styles.modalTitle}>{title}</Title>
          </View>

          <ThickDivider />

          <View style={styles.modalItemWrapper}>
            <Button
              style={{ width: '50%' }}
              contentStyle={{ padding: 8 }}
              onPress={leftBtnOnPress}>
              <Subheading>{leftBtnText}</Subheading>
            </Button>
            <ThickDivider vertical />
            <Button
              style={{ width: '50%' }}
              contentStyle={{ padding: 8 }}
              onPress={rightBtnOnPress}>
              <Subheading>{rightBtnText}</Subheading>
            </Button>
          </View>
        </Surface>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backDrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    borderRadius: 10,
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  modalItemWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalTitle: {
    padding: 5,
  },
});
