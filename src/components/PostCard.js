import { StyleSheet, View, ViewStyle, Image, StyleProp } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import React, { useState } from 'react';
import { useTheme } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { observer } from 'mobx-react';

export default PostCard = observer(({ item, style, cardWidth }) => {
  const { colors } = useTheme();
  return (
    <Card style={style}>
      <CardCover source={{ uri: item.uri }} cardWidth={cardWidth} />
      <Card.Content style={{ backgroundColor: colors.surface }}>
        <Title>{item.title}</Title>
      </Card.Content>
    </Card>
  );
});

const CardCover = ({ index, total, style, cardWidth, ...rest }) => {
  const [containerHeight, setContainerHeight] = useState(0);

  const { roundness } = useTheme();

  let coverStyle;

  if (index === 0) {
    if (total === 1) {
      coverStyle = {
        borderRadius: roundness,
      };
    } else {
      coverStyle = {
        borderTopLeftRadius: roundness,
        borderTopRightRadius: roundness,
      };
    }
  } else if (typeof total === 'number' && index === total - 1) {
    coverStyle = {
      borderBottomLeftRadius: roundness,
    };
  }

  return (
    <View
      style={[
        styles.container,
        coverStyle,
        style,
        { height: containerHeight },
      ]}>
      <FastImage
        onLoad={e => {
          const width = e.nativeEvent.width;
          const height = e.nativeEvent.height;
          setContainerHeight((cardWidth * height) / width);
        }}
        {...rest}
        style={[styles.image, coverStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eeeeee',
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    justifyContent: 'flex-end',
  },
});
