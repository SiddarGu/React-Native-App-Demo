// React & React Native
import React, { Fragment, useRef, useState } from 'react';

// Third-party
import Gallery from 'react-native-awesome-gallery';
import { observer } from 'mobx-react';

// Context
import { useStores } from '@stores';

export default ImageGallery = observer(({ navigation }) => {
  const ref = useRef(null);
  const { addPostStore } = useStores();

  const exitGalleryMode = () => navigation.goBack();
  return (
    <Gallery
      ref={ref}
      data={addPostStore.galleryImages}
      onIndexChange={newIndex => {
        if (newIndex < 0) exitGalleryMode();
      }}
      onSwipeToClose={exitGalleryMode}
    />
  );
});
