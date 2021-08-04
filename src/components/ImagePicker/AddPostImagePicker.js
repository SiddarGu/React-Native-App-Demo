// React & React Native
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

// Third-party
import { DraggableGrid } from 'react-native-draggable-grid';
import { Text, Divider, withTheme, Button } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { observer } from 'mobx-react';

// Context
import { useStores } from '@stores';

// Custom Components
import AddButton from '@components/ImagePicker/AddButton';

const AddPostImagePicker = observer(({ openGallery, setIsScrollable }) => {
  const { addPostStore } = useStores();

  const renderItem = item => {
    if (item.key !== 'add')
      return (
        <View style={styles.item}>
          <FastImage style={styles.item} source={{ uri: item.uri }} />
        </View>
      );
    else return <AddButton />;
  };

  return (
    <DraggableGrid
      numColumns={3}
      renderItem={renderItem}
      data={addPostStore.draggableGridData}
      onDragStart={() => setIsScrollable(false)}
      onDragRelease={data => {
        addPostStore.setResortedData(data);
        // ! Prevent dragging image also trigger the parent scrollview to move
        setIsScrollable(true);
      }}
      onItemPress={item => {
        const currentIndex = addPostStore.draggableGridData.findIndex(
          x => x.key === item.key
        );
        addPostStore.setGalleryIndex(currentIndex);
        openGallery();
      }}
    />
  );
});

export default withTheme(AddPostImagePicker);
const styles = StyleSheet.create({
  // ! This item's size need to the same as the one in add button
  item: {
    width: 110,
    height: 110,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
