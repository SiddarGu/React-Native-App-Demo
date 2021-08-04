import React, { useRef, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Divider, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';

import { useStores } from '@stores';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import { useTranslation } from '@composables/useTranslation';

export default AddButton = () => {
  const { addPostStore } = useStores();
  const { translations } = useTranslation();
  const { colors } = useTheme();

  const ImagePickerHandler = async () => {
    const options = {
      mediaType: 'image',
      doneTitle: translations['done'],
      cancelTitle: translations['cancel'],
      // ios only
      maximumMessageTitle: '',
      messageTitleButton: translations['maximum_images_notification_button'],
      maximumMessage: translations['maximum_images_notification_message'],
      tapHereToChange: translations['tap_here_to_change'],
      emptyMessage: translations['empty_gallery_notification'],
      selectedAssets: [],
      isPreview: false,
      maxSelectedAssets: addPostStore.maxFiles,
    };
    try {
      const images = await MultipleImagePicker.openPicker(options);

      // !NOTE we need to add file:// in the front url or it won't work
      const simpleCheck = uri => {
        if (uri.startsWith('content://')) return uri;
        if (!uri.startsWith('file://')) return 'file://' + uri;
        return uri;
      };

      const imageArr = images.map(obj => simpleCheck(obj.path));
      addPostStore.addImages(imageArr);
    } catch (err) {
      console.log('Image Picker:', err);
    }
  };

  return (
    <TouchableOpacity onPress={ImagePickerHandler}>
      <View
        style={[{ backgroundColor: colors.surface }, styles.addButtonFrame]}>
        <Icon name={'plus'} size={30} color={colors.text} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // ! This item's size need to the same as the one in add post image picker
  addButtonFrame: {
    width: 110,
    height: 110,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
