import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
} from 'react-native';
import { Text, Avatar, Divider, useTheme } from 'react-native-paper';

import { observer } from 'mobx-react';
import { useStores } from '../../stores';
import ThickDivider from '../../components/ThickDivider';
import { FlatList } from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'John Sally',
    content: 'Message 1 preview',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'Lord Triss',
    content: 'Message 2 preview',
  },
  {
    id: '323dse-c605-48d3-a4f8-fbd91aa97f63',
    name: 'First Last',
    content: 'Message 3 preview',
  },
];

export default InboxScreen = observer(({ navigation }) => {
  const { themeStore } = useStores();

  const Card = ({ id, name, content }) => {
    return (
      <View style={{ flexDirection: 'column', height: 100, justifyContent: 'space-between' }}>
        <ThickDivider />
        <TouchableOpacity onPress={() =>
        navigation.navigate('MessageNavigator', {
          id: id,
          name: name,
        })
      }>
        <View style={{ flexDirection: 'row', marginHorizontal: 10, alignItems: 'center' }}>
          <Avatar.Text
            size={50}
            label="XD"
            style={{ backgroundColor: themeStore.theme.colors.primary }}
          />
          <View style={{ flexDirection: 'column', marginLeft:10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{name}</Text>
            <Text>{content}</Text>
          </View>
        </View>
        </TouchableOpacity>
        <ThickDivider />
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <Card id={item.id} title={item.title} name={item.name} content={item.content} />
  );

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <FlatList
        style={{width: '100%'}}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  rowFront: {
    justifyContent: 'center',
    height: 85,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 135,
  },
  backRightBtnLeft: {
    right: 135,
  },
  backRightBtnRight: {
    right: 0,
  },
});
